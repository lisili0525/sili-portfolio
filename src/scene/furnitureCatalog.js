import { hotspots } from '../data/hotspots.js';
const workstationArtwork='assets/room-workstation-no-pen-v1.png';
const hit=id=>hotspots.find(hotspot=>hotspot.id===id);
const part=(id,path,extra={})=>({id,path,...extra});
const object=(id,origin,parts,extra={})=>({id,origin,position:{...origin},parts,...extra});

// Every movable/decorative prop has its own artwork mask and ownership record.
export const furniture = {
  rug:object('rug',{x:400,y:820},[part('woven-rug','M436 824 L1151 823 L1284 941 L371 941 Z')]),
  piano:object('piano',{x:0,y:355},[
    part('cabinet','M10 365 Q8 361 17 361 L363 360 Q372 361 371 368 L370 378 L359 382 L360 479 L368 486 L371 519 L386 548 Q396 551 395 566 L393 605 Q391 622 382 633 L377 780 L358 782 L352 771 L62 776 L52 782 L14 782 L12 637 L0 617 L0 559 L10 546 L12 382 L12 380 Z',{source:'assets/room-hidden-surfaces-v1.png'}),
    part('keyboard','M42 549 L367 542 L392 558 L391 596 L40 604 Z'),
    part('brass-trim','M42 545 Q197 544 365 534 L365 542 Q198 552 43 552 Z',{animation:'piano-brass-trim'}),
    part('sheet-music','M118 439 Q147 420 201 436 Q238 421 273 433 L290 517 L212 528 L136 530 Z',{animation:'music-paper'})
  ],{hotspot:hit('piano'),supports:{top:{x:275.88,y:368.872,width:9.8,group:'piano'},keys:{x:334.4,y:564.6,width:9.8,group:'piano'}}}),
  workChair:object('work-chair',{x:1238,y:629},[],{image:'assets/desk-chair-v1.png',height:311,supports:{seat:{x:1362.68,y:766.915,width:10.5,group:'workstation'}}}),
  pianoBench:object('piano-bench',{x:80,y:675},[
    part('wooden-bench',hit('piano').paths[1]),
    part('bench-blanket','M149 679 Q218 665 294 675 Q326 683 332 701 L329 757 L320 772 L294 780 L219 787 L201 781 L199 707 Z')
  ],{supports:{seat:{x:239.096,y:698.222,width:11.2,group:'piano'}}}),
  portrait:object('wall-portrait',{x:390,y:145},[part('frame-and-portrait',hit('photos').paths[0])],{hotspot:hit('photos')}),
  calendar:object('calendar',{x:646,y:142},[
    part('hanging-loop','M669 170 L718 142 Q722 140 726 147 L770 170 Z'),
    part('calendar-page',hit('calendar').paths[0],{animation:'calendar-paper'})
  ],{hotspot:hit('calendar')}),
  coffeeCabinet:object('coffee-cabinet',{x:500,y:516},[
    part('cabinet-and-counter','M502 527 L513 517 L821 517 L837 530 L835 545 L828 548 L831 710 L827 719 L815 718 L810 701 L528 701 L527 716 L509 718 L507 547 L501 544 Z')
  ],{supports:{counter:{x:543.4,y:521.314,width:9.4,group:'counter'}}}),
  tennis:object('tennis-corner',{x:879,y:490},[
    part('red-racket','M988 497 Q990 490 997 493 L1005 496 L1006 504 L986 576 Q1006 613 995 654 Q985 696 963 707 Q938 714 924 694 Q915 672 925 640 Q931 609 951 580 L976 549 Z'),part('blue-racket',hit('tennis').paths[1]),part('ball-basket',hit('tennis').paths[2])
  ],{hotspot:hit('tennis')}),
  stool:object('window-stool',{x:1070,y:535},[
    part('stool-top','M1091 538 L1105 534 L1182 534 L1195 538 L1196 554 L1090 555 Z',{edgePadding:1}),
    part('stool-left-leg','M1100 554 L1116 554 L1090 714 L1081 717 L1072 714 Z',{edgePadding:1}),
    part('stool-right-leg','M1170 554 L1187 554 L1205 713 L1198 717 L1188 714 Z',{edgePadding:1}),
    part('stool-step','M1082 601 L1194 600 L1199 606 L1199 622 L1078 623 L1077 607 Z',{edgePadding:1}),
    part('stool-lower-rung','M1092 669 L1183 669 L1185 682 L1090 682 Z',{edgePadding:1})
  ],{supports:{step:{x:1145.32,y:606.945,width:9.6,group:'window'}}}),
  bookcase:object('bookcase',{x:1495,y:188},[
    part('wooden-bookcase','M1505 225 L1672 185 L1672 852 L1645 852 L1643 580 L1505 580 Z')
  ],{supports:{top:{x:1588.4,y:211.725,width:8.4,group:'bookcase'},step:{x:1596.76,y:442.27,width:8.4,group:'bookcase'}}}),
  desk:object('work-desk',{x:1210,y:580},[
    part('desk-frame','M1213 596 L1296 583 L1460 568 L1560 582 L1672 598 L1672 717 L1552 725 L1211 623 Z M1241 640 L1285 655 L1259 804 L1244 815 Q1230 815 1210 808 L1208 801 Z M1516 715 L1579 715 L1558 913 Q1544 927 1528 927 Q1510 926 1491 915 L1490 911 Z',{source:workstationArtwork})
  ],{supports:{top:{x:1554.96,y:663.405,width:10,group:'workstation'}}}),
  computer:object('computer',{x:1296,y:497},[
    part('laptop',hit('desk').paths[0],{source:workstationArtwork})
  ],{hotspot:{...hit('desk'),id:'computer',entry:'computer',label:'Use the computer',paths:[hit('desk').paths[0]]}}),
  notebook:object('desk-notebook',{x:1370,y:570},[
    part('open-notebook','M1401 568 L1478 572 L1501 575 L1567 602 L1556 641 L1552 653 L1538 665 L1460 650 L1437 651 L1368 638 Z',{source:workstationArtwork,edgePadding:1}),
    part('writing-pen','M1473 655 L1513 623 Q1521 615 1527 623 Q1531 628 1525 633 L1488 666 Q1481 672 1475 666 Q1470 662 1473 655 Z',{animation:'pen-idle',source:'assets/room-hidden-surfaces-v1.png',edgePadding:0})
  ],{hotspot:{...hit('desk'),id:'desk',paths:[hit('desk').paths[1]]}}),
  stationery:object('stationery',{x:1275,y:531},[
    part('pencils','M1284 550 L1281 535 L1285 532 L1291 545 L1296 531 L1300 534 L1298 547 L1310 534 L1315 536 L1309 550 Z',{source:workstationArtwork}),
    part('pencil-cup',hit('desk').paths[2],{source:workstationArtwork})
  ]),
  lamp:object('desk-lamp',{x:1420,y:376},[
    part('lamp','M1424 435 L1440 411 L1466 402 L1474 384 Q1484 375 1496 384 L1500 399 L1578 456 L1582 468 L1556 558 L1576 570 L1578 588 L1533 595 L1519 588 L1520 578 L1539 568 L1562 470 L1492 417 L1506 449 L1499 466 L1479 468 Z',{source:workstationArtwork})
  ]),
  deskBooks:object('desk-books',{x:1560,y:579},[
    part('book-stack','M1594 579 L1664 582 L1672 608 L1663 615 L1669 632 L1672 655 L1657 668 L1578 654 L1568 641 L1575 623 L1563 616 L1568 600 L1587 601 Z',{source:workstationArtwork})
  ]),
  sofa:object('sofa',{x:0,y:799},[
    part('sofa-body','M0 821 Q45 796 99 809 L129 817 Q206 809 251 823 L298 823 Q401 827 435 854 L456 891 L468 941 L0 941 Z'),
    part('sofa-cushion','M238 873 L258 855 L308 871 L408 851 Q427 853 429 872 L415 893 L440 941 L264 941 Z'),
    part('sofa-throw','M0 815 Q31 795 59 805 L80 810 L87 803 L111 810 L125 808 L150 825 L159 849 L183 941 L115 941 L84 884 L76 865 L53 850 L22 847 Z')
  ],{supports:{seat:{x:267.52,y:851.605,width:13,group:'sofa'}}}),
  coffeeTable:object('coffee-table',{x:648,y:831},[
    part('round-coffee-table','M650 905 Q664 867 733 848 Q828 823 954 837 Q1077 839 1129 892 Q1150 913 1146 941 L648 941 Z',{source:'assets/room-hidden-surfaces-v1.png'})
  ],{supports:{top:{x:785.84,y:903.36,width:13,group:'table'}}}),
  album:object('table-album',{x:687,y:823},[
    part('physical-album',hit('album').paths[0])
  ],{hotspot:hit('album')}),
  wallShelf:object('wall-shelf',{x:5,y:162},[
    part('shelf','M5 248 L366 247 L375 253 L374 267 L348 270 L338 306 L325 306 L326 270 L20 272 L6 266 Z'),
    part('shelf-books','M213 181 L231 181 L233 167 L260 166 L274 163 L285 173 L286 249 L211 250 Z'),
    part('camera','M300 210 L312 209 L315 201 L329 201 L332 207 L351 210 L356 218 L359 243 L351 249 L298 247 L293 240 L294 218 Z')
  ]),
  mouse:object('toy-mouse',{x:1050,y:733},[
    part('mouse-toy','M1050 771 L1064 753 L1076 749 L1078 737 L1089 733 L1099 737 L1109 741 L1122 738 L1131 747 L1135 755 L1150 767 L1149 776 L1174 780 L1180 785 L1174 788 L1144 780 L1106 786 L1060 781 Z')
  ])
};

export const plants = [
  object('shelf-plant',{x:18,y:106},[
    part('plant-pot','M113 182 L174 174 L190 224 L181 245 L142 249 L126 235 Z'),
    part('trailing-leaves','M20 155 Q20 139 49 140 L48 128 Q52 112 76 116 L91 107 L114 109 L126 120 L148 116 L167 121 L189 117 L211 129 L232 153 L224 173 L203 185 L209 206 L190 215 L175 210 L164 236 L147 244 L150 263 L137 278 L142 300 L130 323 L128 344 L108 367 L111 386 L91 402 L92 424 L82 438 L77 461 L69 478 L63 500 L55 505 L47 488 L53 465 L47 451 L55 435 L54 414 L63 395 L63 378 L47 367 L55 349 L53 333 L36 324 L38 304 L27 296 L37 275 L25 268 L22 252 L32 232 L19 220 L21 198 L28 183 L19 178 Z',{animation:'plant-leaves',pivot:[120,190]})
  ]),
  object('bookcase-plant',{x:1492,y:120},[
    part('leaf-cascade','M1507 120 H1672 V211 L1590 230 L1560 263 L1545 295 L1532 337 L1518 396 L1480 396 L1480 260 L1490 223 L1507 220 Z',{})
  ]),
  object('desk-plant',{x:1504,y:514},[
    part('desk-leaves','M1504 545 L1512 542 L1516 520 L1524 514 L1531 537 L1541 526 L1548 533 L1543 548 L1556 549 L1554 563 L1533 575 L1510 569 Z',{animation:'plant-leaves',pivot:[1530,563]})
  ]),
  object('table-plant',{x:976,y:801},[
    part('pot','M1012 871 L1079 875 L1071 924 L1059 931 L1024 928 L1014 920 Z'),
    part('leaves','M976 844 L986 827 L1006 824 L1018 808 L1041 812 L1057 804 L1078 806 L1091 823 L1083 842 L1098 849 L1095 871 L1111 882 L1121 904 L1115 930 L1101 932 L1089 917 L1080 896 L1065 888 L1056 865 L1040 878 L1026 863 L1011 871 L1003 891 L988 883 L978 869 Z',{animation:'plant-leaves',pivot:[1047,881]})
  ]),
  object('sofa-plant',{x:0,y:768},[
    part('floor-leaves','M0 768 L15 779 L23 776 L37 783 L47 785 L59 801 L58 817 L0 819 Z',{animation:'plant-leaves',pivot:[21,815]})
  ])
];

export const furnitureModules = [...Object.values(furniture),...plants];
