import { coffeeStation } from "../scene/sceneObjects.js";

// Traced in the shared 1672 x 941 room coordinate system.
// Transparent SVG fills provide hit targets; the same paths provide the glow.
export const hotspots = [
  {
    id:'piano', entry:'music', label:'At the piano', tooltip:[12,37],
    paths:[
      'M10 365 Q8 361 17 361 L363 360 Q372 361 371 368 L370 378 L359 382 L360 479 L368 486 L371 519 L386 548 Q396 551 395 566 L393 605 Q391 622 382 633 L377 780 L358 782 L352 771 L62 776 L52 782 L14 782 L12 637 L0 617 L0 559 L10 546 L12 382 L12 380 Z',
      'M84 697 Q106 684 151 680 L294 675 Q344 678 377 692 L382 711 L371 724 L374 799 L366 804 L355 800 L350 732 L332 736 L331 787 L322 792 L309 787 L306 740 L145 747 L144 801 L136 807 L121 802 L118 742 L106 735 L106 787 L98 793 L86 788 Z'
    ]
  },
  coffeeStation.hotspot,
  {
    id:'photos', entry:'photos', firstPage:true, label:'Rachel & me', tooltip:[30.4,15],
    paths:['M398 147 L614 146 Q622 146 622 155 L621 357 Q621 365 612 366 L399 366 Q391 366 392 357 L392 155 Q392 148 398 147 Z']
  },
  {
    id:'album', entry:'photos', label:'Open the photo album', tooltip:[50,86.5],
    paths:['M692 861 L818 832 L855 833 L875 826 L910 824 L977 894 L975 906 L850 941 L824 939 L807 941 L714 932 L680 875 Z']
  },
  {
    id:'calendar', entry:'milestones', label:'Along the way', tooltip:[43,17],
    paths:['M655 166 L783 166 Q791 165 791 174 L790 326 Q790 334 782 333 L655 333 Q647 333 648 325 L648 174 Q647 166 655 166 Z']
  },
  {
    id:'tennis', entry:'tennis', label:'On the court', tooltip:[58,51],
    paths:[
      'M988 497 Q990 490 997 493 L1005 496 L1006 504 L986 576 Q970 595 968 609 L961 636 L942 638 Q930 629 932 613 Q938 593 951 580 L976 549 Z',
      'M1017 511 Q1025 506 1034 513 L1033 527 L1026 580 L1028 608 Q1041 626 1047 648 Q1060 693 1038 710 Q1015 725 990 709 Q966 694 973 666 Q977 636 997 613 L1011 578 Z',
      'M883 651 Q883 642 890 636 Q889 624 903 623 Q910 608 925 613 Q938 611 944 625 Q955 622 961 635 Q974 637 974 649 L967 704 Q966 716 933 716 Q900 716 892 704 Z'
    ]
  },
  {
    id:'desk', entry:'workstation', label:'At my workstation', tooltip:[86,52],
    paths:[
      'M1327 579 L1359 505 Q1361 497 1373 499 L1471 502 Q1482 503 1478 516 L1456 575 L1417 607 L1351 613 L1297 604 L1297 594 Z',
      'M1402 571 L1490 587 L1519 583 L1559 609 L1549 640 L1553 650 L1541 660 L1464 647 L1438 649 L1372 635 Z',
      'M1278 549 Q1294 541 1315 547 L1310 586 L1282 591 Z'
    ]
  }
];
