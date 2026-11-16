import { useEffect, useState } from 'react';

export function useFullscreen() {
  const [active,setActive] = useState(false);
  const [busy,setBusy] = useState(false);
  const [status,setStatus] = useState('');
  const root = document.documentElement;
  const request = root.requestFullscreen || root.webkitRequestFullscreen;
  const exit = document.exitFullscreen || document.webkitExitFullscreen;
  const supported = Boolean((document.fullscreenEnabled ?? document.webkitFullscreenEnabled) && request && exit);
  useEffect(() => {
    const update = () => setActive(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    update();
    document.addEventListener('fullscreenchange',update);
    document.addEventListener('webkitfullscreenchange',update);
    return () => {
      document.removeEventListener('fullscreenchange',update);
      document.removeEventListener('webkitfullscreenchange',update);
    };
  },[]);
  async function toggle() {
    if (!supported) return;
    setBusy(true);
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) await exit.call(document);
      else await request.call(root);
      setStatus('');
    } catch { setStatus('Fullscreen is unavailable in this browser view. Try a separate browser window.'); }
    finally { setBusy(false); }
  }
  return {active,busy,status,supported,toggle};
}
