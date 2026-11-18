const polygon=points=>`M${points.map(point=>point.join(' ')).join(' L')} Z`;
function paneGrid(corners) {
  const [a,b,c,d]=corners;
  const point=(u,v)=>[a[0]*(1-u)*(1-v)+b[0]*u*(1-v)+c[0]*u*v+d[0]*(1-u)*v,
    a[1]*(1-u)*(1-v)+b[1]*u*(1-v)+c[1]*u*v+d[1]*(1-u)*v];
  return [[.08,.43],[.58,.92]].flatMap(([u0,u1])=>[[.07,.29],[.38,.62],[.72,.94]].map(([v0,v1])=>polygon([point(u0,v0),point(u1,v0),point(u1,v1),point(u0,v1)])));
}
export const openLeftPanes=paneGrid([[968,204],[1003,236],[1003,399],[965,426]]);
export const openRightPanes=paneGrid([[1310,235],[1343,204],[1346,426],[1310,399]]);
export const closedLeftPanes=[
  'M970 189 H1040 V252 H970 Z','M1055 189 H1133 V252 H1055 Z',
  'M970 269 H1040 V333 H970 Z','M1055 269 H1133 V333 H1055 Z',
  'M970 350 H1040 V425 H970 Z','M1055 350 H1133 V425 H1055 Z',
];
export const closedRightPanes=[
  'M1171 189 H1247 V252 H1171 Z','M1261 189 H1338 V252 H1261 Z',
  'M1171 269 H1247 V333 H1171 Z','M1261 269 H1338 V333 H1261 Z',
  'M1171 350 H1247 V425 H1171 Z','M1261 350 H1338 V425 H1261 Z',
];
