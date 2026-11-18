import { useEffect } from 'react';

// One delegated listener covers scene objects, moving cats and interface controls.
export function useInteractionFeedback(roomRef) {
  useEffect(() => {
    const room = roomRef.current;
    const timers = new Map();
    const target = event => event.target.closest?.('button,a');
    const activate = event => {
      const button = target(event);
      if (!button) return;
      clearTimeout(timers.get(button));
      button.dataset.feedback = 'active';
      button.dataset.feedbackInput = event.detail === 0 ? 'keyboard' : 'pointer';
      timers.set(button, setTimeout(() => {
        button.dataset.feedback = 'expired';
        timers.delete(button);
      }, 600));
    };
    const enter = event => {
      const button = target(event);
      // Touch-generated hover must not revive the glow after activation.
      if (event.pointerType !== 'mouse' || !button || button.contains(event.relatedTarget)) return;
      if (button.dataset.feedback === 'expired') delete button.dataset.feedback;
    };
    const keyboard = event => {
      if (event.key !== 'Tab') return;
      for (const button of room.querySelectorAll('[data-feedback-input]')) delete button.dataset.feedbackInput;
    };
    room.addEventListener('keydown', keyboard, true);
    room.addEventListener('click', activate, true);
    room.addEventListener('pointerover', enter);
    return () => {
      room.removeEventListener('keydown', keyboard, true);
      room.removeEventListener('click', activate, true);
      room.removeEventListener('pointerover', enter);
      for (const timer of timers.values()) clearTimeout(timer);
    };
  }, [roomRef]);
}
