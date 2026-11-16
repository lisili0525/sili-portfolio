import { useEffect, useRef, useState } from 'react';

const email = 'lslhwzyshpy@gmail.com';

export function ContactLinks() {
  const [open,setOpen] = useState(false), [status,setStatus] = useState('');
  const root = useRef(null), trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    const outside = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    const escape = event => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown',outside);
    document.addEventListener('focusin',outside);
    document.addEventListener('keydown',escape);
    return () => {
      document.removeEventListener('pointerdown',outside);
      document.removeEventListener('focusin',outside);
      document.removeEventListener('keydown',escape);
    };
  },[open]);
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus('Email copied'); }
    catch { setStatus('Select the address above to copy it.'); }
  }
  return <div ref={root} className="room-contact">
    <nav className="contact-links" aria-label="Contact and profiles">
      <button ref={trigger} type="button" aria-label="Email Sili" aria-expanded={open} aria-controls="email-card" onClick={() => {setOpen(value => !value);setStatus('');}}><span>Email</span></button>
      <a href="https://github.com/lisili0525" aria-label="Sili on GitHub (opens in a new tab)" target="_blank" rel="noopener noreferrer"><span>GitHub</span></a>
      <a href="https://www.linkedin.com/in/sili-li-3b7337150/" aria-label="Sili on LinkedIn (opens in a new tab)" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span></a>
    </nav>
    {open && <section id="email-card" className="email-card" aria-label="Contact Sili by email">
      <p className="eyebrow">Say hello</p>
      <a className="email-address" href={`mailto:${email}`}>{email}</a>
      <div className="email-actions"><a href={`mailto:${email}`}>Write an email ↗</a><button type="button" onClick={copy}>Copy address</button></div>
      <p className="email-status" role="status">{status}</p>
    </section>}
  </div>;
}
