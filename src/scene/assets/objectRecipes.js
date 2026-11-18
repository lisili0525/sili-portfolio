import { openLeftPanes,openRightPanes,closedLeftPanes,closedRightPanes } from './windowPanes.js';
import { furniture, plants } from '../furnitureCatalog.js';
import { coffeeStation, roomWindow, originalArtwork } from '../sceneObjects.js';

export { books } from './books.js';
import { books } from './books.js';

export { artworkKey } from './assetKey.js';
const recipe = (id, owner, path, extra = {}) => ({ id, owner, source: originalArtwork, path, edgePadding: 3.5, kind:'object', ...extra });

export function objectRecipes() {
  const result = Object.values(furniture).flatMap(object => object.parts.map(part => recipe(
    `${object.id}--${part.id}`, object.id, part.path,
    { ...part, id:`${object.id}--${part.id}`, source:part.source || originalArtwork,
      animation:part.animation || null, pivot:part.pivot || null, supports:object.supports || null },
  )));
  result.push(...plants.flatMap(object => object.parts.map(part => recipe(`${object.id}--${part.id}`, object.id, part.path,
    { ...part, id:`${object.id}--${part.id}`, source:part.source || originalArtwork, animation:part.animation || null, pivot:part.pivot || null, kind:'plant',exclude:object.id==='bookcase-plant'?furniture.lamp.parts.map(part=>part.path):[] }))));
  result.push(...Object.entries(coffeeStation.parts).map(([id,path]) => recipe(`coffee-station--${id}`,coffeeStation.id,path)));
  result.push(
    recipe('window--frame','room-window',roomWindow.parts.frame,{source:'assets/room-module-underpainting-v2.png',edgePadding:.5,exclude:['M954 178 H1356 V441 H954 Z']}),
    recipe('window--rod','room-window',roomWindow.parts.rod,{source:'assets/room-module-underpainting-v2.png'}),
    recipe('window--left-sash','room-window',roomWindow.parts.leftSash,{exclude:openLeftPanes}),
    recipe('window--right-sash','room-window',roomWindow.parts.rightSash,{exclude:openRightPanes}),
    recipe('window--closed-glass','room-window','M954 178 H1356 V441 H954 Z',{source:'assets/window-closed-v1.png',exclude:[...closedLeftPanes,...closedRightPanes]}),
    recipe('curtain--open-left','room-window',roomWindow.parts.leftCurtain),
    recipe('curtain--open-right','room-window',roomWindow.parts.rightCurtain),
    recipe('curtain--closed-left','room-window',roomWindow.parts.closedLeft,{source:'assets/curtains-closed-v1.png'}),
    recipe('curtain--closed-right','room-window',roomWindow.parts.closedRight,{source:'assets/curtains-closed-v1.png'}),
  );
  for(const [state,panes,source] of [
    ['open-left',openLeftPanes,originalArtwork],['open-right',openRightPanes,originalArtwork],
    ['closed',[...closedLeftPanes,...closedRightPanes],'assets/window-closed-v1.png'],
  ]){
    result.push(recipe(`window--${state}-view`,'window-scenery',panes.join(' '),{source,edgePadding:0,kind:'scenery',glassCompensation:true}));
    result.push(recipe(`window--${state}-pane`,'window-glass',panes.join(' '),{source,edgePadding:0,kind:'glass',markup:'<rect width="1672" height="941" fill="white" fill-opacity="0.031372549"/>'}));
  }
  const deskFrame=furniture.desk.parts.find(part=>part.id==='desk-frame');
  result.push(recipe('work-desk--foreground','work-desk',deskFrame.path,{source:deskFrame.source,edgePadding:0,kind:'occluder'}));
  return result;
}
