// Relative autonomous outing rates. Direct greetings and jump speeds stay intact.
export const roamingRates = {viola:.5, java:.7};

export function paceRoaming(actions, rate) {
  const pauses=actions.filter(action=>action.x===undefined&&!action.outside&&action.duration>=2);
  const pauseTime=pauses.reduce((total,action)=>total+action.duration,0);
  if(!pauseTime||rate>=1) return actions;
  const cycleTime=actions.reduce((total,action)=>total+action.duration,0);
  const extraRest=cycleTime*(1/rate-1);
  for(const action of pauses) action.duration+=extraRest*action.duration/pauseTime;
  return actions;
}
