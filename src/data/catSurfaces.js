// Coordinates describe paw contact points in the shared room artwork.
export const catSurfaces = {
  floorLeft: {x:28, y:86, width:14, floor:true},
  floorCenter: {x:49, y:86, width:14, floor:true},
  floorRight: {x:72, y:87, width:14, floor:true},
  floorSofa: {x:28, y:91, width:14, floor:true},
  'piano-bench': {x:14.3, y:74.2, width:11.2, group:'piano'},
  'piano-keys': {x:20, y:60, width:9.8, group:'piano'},
  'piano-top': {x:16.5, y:39.2, width:9.8, group:'piano'},
  'coffee-counter': {x:32.5, y:55.4, width:9.4, group:'counter'},
  'coffee-table': {x:47, y:96, width:13, group:'table'},
  chair: {x:81.5, y:81.5, width:10.5, group:'workstation'},
  desk: {x:93, y:70.5, width:10, group:'workstation'},
  'bookshelf-step': {x:95.5, y:47, width:8.4, group:'bookcase'},
  bookshelf: {x:95, y:22.5, width:8.4, group:'bookcase'},
  sofa: {x:16, y:90.5, width:13, group:'sofa'},
  stool: {x:68.5, y:64.5, width:9.6, group:'window'},
  window: {x:67.5, y:47.3, width:10.5, group:'window'}
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
