// Registered to the chair's seat and floor, independently of the upper-body
// raster canvas. Calves render behind the chair; hips/thighs rest on its seat.
export function DeskSeatedBody({layer}) {
  const legs=layer==='legs';
  return <svg className={`desk-seated-anatomy desk-seated-${layer}`} viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`desk-pants-${layer}`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#f5cc97"/><stop offset="1" stopColor="#dda475"/></linearGradient>
      <linearGradient id={`desk-hoodie-${layer}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#534c6f"/><stop offset="1" stopColor="#474257"/></linearGradient>
    </defs>
    <g stroke="#382c25" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <g className="desk-anatomy-computer">
        {legs?<>
          <path fill={`url(#desk-pants-${layer})`} d="M1345 773 Q1377 769 1390 786 L1396 908 Q1388 917 1376 913 L1367 806 Q1353 804 1345 793Z"/>
          <path fill="#f6e9d3" d="M1375 908 Q1385 914 1396 907 L1406 916 Q1414 923 1407 928 Q1387 935 1374 925Z"/>
          <path fill={`url(#desk-pants-${layer})`} d="M1365 773 Q1401 771 1414 788 Q1418 800 1413 821 L1412 909 Q1404 918 1391 912 L1390 809 Q1375 804 1365 791Z"/>
          <path fill="#f8ebd7" d="M1391 907 Q1401 914 1413 907 L1434 916 Q1442 921 1436 928 Q1415 936 1390 926Z"/>
          <path fill="none" stroke="#b7a48e" strokeWidth="1.6" d="M1391 921 Q1415 929 1437 922 M1398 913l12 4m-7-8 12 5"/>
          <path fill="none" stroke="#b58057" strokeWidth="1.8" d="M1395 833q9 7 16 1 M1396 899q7 5 14-1"/>
        </>:<>
          <path fill={`url(#desk-pants-${layer})`} d="M1289 739 Q1331 735 1385 741 Q1405 752 1401 768 Q1381 786 1339 786 Q1301 787 1290 773Z"/>
          <path fill={`url(#desk-hoodie-${layer})`} d="M1285 704 Q1334 710 1410 704 L1406 742 Q1399 763 1370 773 Q1328 782 1293 767 Q1286 752 1285 723Z"/>
          <path fill="none" stroke="#363342" strokeWidth="2" d="M1293 763 Q1333 779 1394 760"/>
          <path fill="none" stroke="#5d5675" strokeWidth="1.8" d="M1294 745q10 12 25 14"/>
        </>}
      </g>
      <g className="desk-anatomy-writing">
        {legs?<>
          <path fill={`url(#desk-pants-${layer})`} d="M1380 777 Q1413 775 1420 792 L1415 910 Q1405 917 1395 912 L1397 808 Q1385 803 1380 794Z"/>
          <path fill="#eee0c9" d="M1394 908 Q1405 914 1416 909 L1429 919 Q1435 926 1428 930 Q1409 935 1392 925Z"/>
          <path fill={`url(#desk-pants-${layer})`} d="M1417 784 Q1443 779 1449 799 L1445 911 Q1433 919 1422 912 L1425 810 Q1416 806 1417 784Z"/>
          <path fill="#f8ebd7" d="M1422 907 Q1434 915 1446 908 L1467 918 Q1476 925 1468 932 Q1444 941 1420 930Z"/>
          <path fill="none" stroke="#b7a48e" strokeWidth="1.6" d="M1422 924 Q1444 933 1470 925 M1429 915l14 4m-8-9 15 6"/>
          <path fill="none" stroke="#b58057" strokeWidth="1.8" d="M1428 834q9 8 18 0 M1427 898q7 6 16 0"/>
        </>:<>
          <path fill={`url(#desk-pants-${layer})`} d="M1290 730 Q1341 745 1415 714 Q1418 735 1406 749 L1432 778 Q1452 783 1449 799 Q1444 807 1427 804 L1368 790 Q1321 792 1300 783 Q1287 779 1290 756Z"/>
          <path fill="none" stroke="#bc865e" strokeWidth="2" d="M1344 748q-6 22-1 38 M1375 761q32 26 58 26 M1433 790l-15 8"/>
        </>}
      </g>
    </g>
  </svg>;
}
