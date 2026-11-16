# Pixel inspection and a static contact sheet, not browser CSS verification.
# Run from the repository root: powershell -File checks/sleeping-cats.ps1
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$css = Get-Content -Raw 'styles.css'
if ($css -notmatch 'data-pose="sleep"\] \.cat-sprite\{clip-path:inset\(0 9% 0 0\)\}') { throw 'Sleeping crop changed; remeasure it.' }
$canvas = [System.Drawing.Bitmap]::new(724, 804)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.Clear([System.Drawing.Color]::FromArgb(246, 243, 234))
$font = [System.Drawing.Font]::new('Arial', 14)
try {
  $row = 0
  foreach ($name in @('viola', 'java')) {
    $atlas = [System.Drawing.Bitmap]::FromFile((Join-Path $PWD "assets/$name-poses-v1.png"))
    try {
      if ($atlas.Width -ne 2172 -or $atlas.Height -ne 362) { throw "$name atlas dimensions changed" }
      $cell = $atlas.Clone([System.Drawing.Rectangle]::new(1448, 0, 362, 362), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
      try {
        $bodyMax = -1; $strayMin = 362; $bodyPixels = 0; $strayPixels = 0
        for ($x = 0; $x -lt 362; $x++) {
          for ($y = 0; $y -lt 362; $y++) {
            # Ignore near-transparent atlas dust (alpha <= 8 of 255).
            if ($cell.GetPixel($x, $y).A -le 8) { continue }
            if ($x -lt 320) { $bodyMax = [Math]::Max($bodyMax, $x); $bodyPixels++ }
            else { $strayMin = [Math]::Min($strayMin, $x); $strayPixels++ }
          }
        }
        $cut = 362 * .91
        if ($bodyPixels -eq 0 -or $strayPixels -eq 0 -or $bodyMax -ge $cut - 2 -or $strayMin -le $cut + 2) { throw "$name crop no longer lies safely in the empty gap" }
        # CSS clips in local sprite space before scaleX mirrors the result.
        for ($x = [int][Math]::Ceiling($cut); $x -lt 362; $x++) {
          for ($y = 0; $y -lt 362; $y++) { $cell.SetPixel($x, $y, [System.Drawing.Color]::Transparent) }
        }
        $graphics.DrawString("$name - original facing", $font, [System.Drawing.Brushes]::Black, 12, ($row * 402 + 8))
        $graphics.DrawImageUnscaled($cell, 0, ($row * 402 + 40))
        $cell.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)
        $graphics.DrawString("$name - mirrored", $font, [System.Drawing.Brushes]::Black, 374, ($row * 402 + 8))
        $graphics.DrawImageUnscaled($cell, 362, ($row * 402 + 40))
        Write-Output "PASS: $name body ends at $bodyMax; crop at $cut; stray starts at $strayMin. Both facings retain the body."
      } finally { $cell.Dispose() }
    } finally { $atlas.Dispose() }
    $row++
  }
  New-Item -ItemType Directory -Force 'tmp' | Out-Null
  $canvas.Save((Join-Path $PWD 'tmp/sleeping-cats-review.png'), [System.Drawing.Imaging.ImageFormat]::Png)
} finally { $font.Dispose(); $graphics.Dispose(); $canvas.Dispose() }
