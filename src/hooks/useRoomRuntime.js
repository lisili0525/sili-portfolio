import { useEffect, useRef, useState } from 'react';
import { createPianoController } from '../controllers/piano.js';
import { createJourneyController } from '../controllers/journeys.js';
import { createCatController } from '../controllers/cats.js';

export function useRoomRuntime(rootRef) {
  const services = useRef({});
  const [piano, setPiano] = useState({state:'idle', selectedTrack:0, muted:false, engaged:false, status:''});
  useEffect(() => {
    const runtime = services.current;
    runtime.piano = createPianoController(rootRef.current, runtime, setPiano);
    runtime.cats = createCatController(rootRef.current);
    runtime.actions = createJourneyController(rootRef.current, runtime);
    return () => {
      runtime.actions.destroy(); runtime.cats.destroy(); runtime.piano.destroy();
    };
  }, [rootRef]);
  return {services, piano};
}
