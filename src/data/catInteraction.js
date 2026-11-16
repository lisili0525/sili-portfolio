// The crouching hand is calibrated against the existing 576px interaction cell.
export function catMeetingPoint(cat, actorX) {
  const gap=13.1;
  let facing=actorX<=cat.x?1:-1;
  if(cat.x-gap<13) facing=-1;
  if(cat.x+gap>87) facing=1;
  return {x:cat.x-facing*gap,y:Math.max(77,Math.min(94,cat.y-cat.width*.98+9.2)),facing};
}

export function canReachCat(cat) {
  return cat.surface==='floor'||cat.y>=78;
}
