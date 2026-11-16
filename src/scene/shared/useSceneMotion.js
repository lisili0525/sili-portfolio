import { useEffect, useState } from 'react';

export function useSceneMotion() {
  const [allowed,setAllowed]=useState(()=>!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setAllowed(!document.hidden&&!media.matches);
    update();media.addEventListener('change',update);document.addEventListener('visibilitychange',update);
    return ()=>{media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
  },[]);
  return allowed;
}
