export function ContactLinks() {
  return <div className="room-contact">
    {/* Restore plain beam artwork over the retired painted envelope. */}
    <svg className="contact-beam-repair" viewBox="0 0 1672 941" aria-hidden="true" focusable="false">
      <defs><clipPath id="contact-beam-patch"><rect x="1434" y="15" width="58" height="46" rx="4" /></clipPath></defs>
      <image href="assets/room-architecture-v2.png" x="90" y="0" width="1672" height="941" clipPath="url(#contact-beam-patch)" />
    </svg>
    <nav className="contact-links" aria-label="Contact and profiles">
      <a href="https://github.com/lisili0525" aria-label="Sili on GitHub (opens in a new tab)" target="_blank" rel="noopener noreferrer"><span>GitHub</span></a>
      <a href="https://www.linkedin.com/in/sili-li-3b7337150/" aria-label="Sili on LinkedIn (opens in a new tab)" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span></a>
    </nav>
  </div>;
}
