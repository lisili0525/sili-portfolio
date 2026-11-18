// Shared world coordinates keep art, interaction and support anchors together.
export const roomSpace = {width:1672, height:941};
export const originalArtwork = 'assets/room-clean-v7.png';

export function moduleStyle(module) {
  return {
    left:`${(module.position.x-module.origin.x)/roomSpace.width*100}%`,
    top:`${(module.position.y-module.origin.y)/roomSpace.height*100}%`
  };
}

export function supportPoint(module, name) {
  const point=module.supports[name];
  return {...point,
    x:(point.x+module.position.x-module.origin.x)/roomSpace.width*100,
    y:(point.y+module.position.y-module.origin.y)/roomSpace.height*100};
}

export const coffeeStation = {
  id:'coffee-station', origin:{x:560,y:380}, position:{x:560,y:380},
  hotspot:{
    id:'coffee', entry:'coffee', label:'Something brewing', tooltip:[41,40],
    paths:[
      'M577 413 L593 411 L587 406 Q585 399 593 399 L626 399 Q635 400 628 410 L655 411 Q670 411 670 426 L670 497 L682 501 L682 522 L578 524 L574 513 L575 502 L577 497 L570 496 L571 424 Q570 416 577 413 Z',
      'M686 388 L731 388 Q738 389 735 400 L732 422 L720 439 L722 448 L733 452 L741 518 Q741 524 733 524 L682 523 L680 517 L685 455 L697 447 L698 438 L686 424 L681 399 Q679 390 686 388 Z',
      'M751 449 L760 446 L762 439 L779 440 L782 447 L790 449 L791 458 L785 463 Q797 474 798 486 L797 515 Q794 525 775 524 L754 522 Q744 519 746 509 L745 478 L752 464 L747 458 Z',
      'M708 497 Q718 490 742 495 L743 500 Q758 495 753 508 Q751 514 742 514 L739 523 L713 524 Z'
    ]
  },
  supports:{counter:{x:543.4,y:521.314,width:9.4,group:'counter'}},
  animation:{steamDuration:3.4,brewPulseDuration:1.2}
};
coffeeStation.parts = {
  machine:coffeeStation.hotspot.paths[0],
  grinder:coffeeStation.hotspot.paths[1],
  beans:coffeeStation.hotspot.paths[2],
  cup:coffeeStation.hotspot.paths[3]
};

export const roomWindow = {
  id:'room-window', origin:{x:865,y:110}, position:{x:865,y:110},
  parts:{
    frame:'M931 164 H1376 V478 H931 Z',
    rod:'M889 142 A11 11 0 1 1 867 142 A11 11 0 1 1 889 142 Z M888 135 H1428 V149 H888 Z M1449 142 A11 11 0 1 1 1427 142 A11 11 0 1 1 1449 142 Z',
    closedLeft:'M886 120 Q889 111 901 117 Q911 109 922 117 Q933 109 945 117 Q956 109 968 117 Q980 109 993 117 Q1005 109 1018 117 Q1030 109 1043 117 Q1055 109 1068 117 Q1080 109 1094 117 Q1106 109 1120 117 Q1134 109 1146 117 L1158 119 L1157 477 Q1145 486 1123 480 Q1106 488 1087 481 Q1068 487 1050 481 Q1031 488 1012 481 Q992 488 973 481 Q953 487 934 481 Q915 488 897 481 Q884 485 883 476 Z',
    closedRight:'M1155 120 Q1158 111 1171 117 Q1182 109 1194 117 Q1206 109 1219 117 Q1231 109 1244 117 Q1256 109 1270 117 Q1282 109 1296 117 Q1308 109 1322 117 Q1334 109 1348 117 Q1360 109 1374 117 Q1386 109 1400 117 Q1415 109 1430 118 L1430 476 Q1418 487 1400 480 Q1383 487 1364 481 Q1345 488 1326 481 Q1307 488 1288 481 Q1268 487 1249 481 Q1229 488 1210 481 Q1190 487 1173 481 Q1161 486 1155 477 Z',
    leftCurtain:'M883 119 Q883 111 892 117 Q902 109 912 117 Q920 110 930 117 Q941 109 950 117 Q963 109 977 119 L978 143 Q972 216 949 274 L933 319 L940 325 L941 338 L933 349 L945 476 Q934 488 918 481 Q905 490 892 482 Q878 486 873 477 L889 349 L886 343 L887 326 L895 318 Q883 255 883 195 Z',
    rightCurtain:'M1334 120 Q1334 111 1343 117 Q1353 110 1364 117 Q1373 110 1383 117 Q1392 110 1402 117 Q1412 109 1424 119 L1430 146 L1430 260 L1426 318 L1429 325 L1426 343 L1417 349 L1440 476 Q1430 487 1417 481 Q1404 489 1390 481 Q1376 486 1367 476 L1375 348 L1365 340 L1363 325 L1372 319 Q1347 250 1338 190 Z',
    leftSash:'M970 187 L1009 231 L1009 402 L959 437 L958 213 Z',
    rightSash:'M1341 188 L1304 230 L1304 401 L1352 437 L1354 212 Z'
  },
  supports:{sill:{x:1128.6,y:445.093,width:10.5,group:'window'}},
  animation:{leftDuration:6.2,rightDuration:7.1},
  tooltip:[69,11.5]
};
