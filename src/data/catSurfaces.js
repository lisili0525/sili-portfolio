import { furniture } from "../scene/furnitureCatalog.js";
import { coffeeStation, roomWindow, supportPoint } from "../scene/sceneObjects.js";

// Coordinates describe paw contact points in the shared room artwork.
export const catSurfaces = {
  floorLeft: {x:28, y:86, width:14, floor:true},
  floorCenter: {x:49, y:86, width:14, floor:true},
  floorRight: {x:72, y:87, width:14, floor:true},
  floorSofa: {x:28, y:91, width:14, floor:true},
  'piano-bench': supportPoint(furniture.pianoBench,'seat'),
  'piano-keys': supportPoint(furniture.piano,'keys'),
  'piano-top': supportPoint(furniture.piano,'top'),
  'coffee-counter': supportPoint(furniture.coffeeCabinet,'counter'),
  'coffee-table': supportPoint(furniture.coffeeTable,'top'),
  chair: supportPoint(furniture.workChair,'seat'),
  desk: supportPoint(furniture.desk,'top'),
  'bookshelf-step': supportPoint(furniture.bookcase,'step'),
  bookshelf: supportPoint(furniture.bookcase,'top'),
  sofa: supportPoint(furniture.sofa,'seat'),
  stool: supportPoint(furniture.stool,'step'),
  window: supportPoint(roomWindow,'sill')
};

// Each route returns by its incoming stepping stones before walking elsewhere.
export const catExcursions = {
  'piano-bench':['floorLeft','piano-bench'],
  'piano-top':['floorLeft','piano-bench','piano-keys','piano-top'],
  'coffee-counter':['floorLeft','coffee-counter'],
  'coffee-table':['floorCenter','coffee-table'],
  bookshelf:['floorRight','chair','desk','bookshelf-step','bookshelf'],
  desk:['floorRight','chair','desk'],
  chair:['floorRight','chair'],
  sofa:['floorSofa','sofa'],
  window:['floorRight','stool','window']
};
