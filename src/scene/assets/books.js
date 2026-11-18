import { originalArtwork } from '../sceneObjects.js';

// Authoring coordinates are always in the original 1672 × 941 room space.
// Stable IDs survive changes to titles/content and image file revisions.
const polygon = points => `M${points.map(point => point.join(' ')).join(' L')} Z`;
const book = (id, shelf, points, color, extra = {}) => ({ id, owner: shelf, kind: 'book',
  source: originalArtwork, path: polygon(points), edgePadding: .6, repairColor: color,
  content: { title: null, author: null, entry: null }, ...extra });

export const books = [
  book('wall-shelf-book-01','wall-shelf',[[210,193],[232,192],[233,249],[210,249]],'#c77946'),
  book('wall-shelf-book-02','wall-shelf',[[227,184],[238,179],[249,183],[250,249],[228,249]],'#755343'),
  book('wall-shelf-book-03','wall-shelf',[[246,168],[259,166],[267,168],[269,248],[247,249]],'#407c77'),
  book('wall-shelf-book-04','wall-shelf',[[269,177],[274,172],[286,173],[286,248],[269,249]],'#e8c09b'),
  book('bookcase-top-book-01','bookcase',[[1564,257],[1580,255],[1580,321],[1564,322]],'#e4b089'),
  book('bookcase-top-book-02','bookcase',[[1579,248],[1598,246],[1599,322],[1579,323]],'#345b75'),
  book('bookcase-top-book-03','bookcase',[[1598,247],[1617,246],[1617,321],[1598,322]],'#737c47'),
  book('bookcase-top-book-04','bookcase',[[1616,236],[1637,233],[1639,319],[1616,320]],'#ebbd93'),
  book('bookcase-top-book-05','bookcase',[[1637,235],[1657,235],[1657,319],[1638,319]],'#c66537'),
  book('bookcase-middle-book-01','bookcase',[[1562,373],[1576,372],[1576,431],[1562,430]],'#aa673c'),
  book('bookcase-middle-book-02','bookcase',[[1575,360],[1596,360],[1596,431],[1575,431]],'#798047'),
  book('bookcase-middle-book-03','bookcase',[[1596,361],[1617,361],[1618,432],[1596,432]],'#375d79'),
  book('bookcase-middle-book-04','bookcase',[[1616,350],[1637,350],[1638,432],[1617,432]],'#e6ba93'),
  book('bookcase-middle-book-05','bookcase',[[1637,352],[1658,352],[1658,432],[1637,432]],'#b77844'),
  book('bookcase-bottom-book-01','bookcase',[[1591,472],[1611,472],[1611,539],[1591,537]],'#ecc09b'),
  book('bookcase-bottom-book-02','bookcase',[[1610,464],[1634,462],[1635,543],[1610,541]],'#345b78'),
  book('bookcase-bottom-book-03','bookcase',[[1634,465],[1658,464],[1658,548],[1634,545]],'#d99960'),
  book('desk-book-01','desk-books',[[1596,579],[1665,582],[1671,608],[1662,615],[1594,606],[1594,583]],'#9d6049',{source:'assets/room-workstation-no-pen-v1.png'}),
  book('desk-book-02','desk-books',[[1576,607],[1594,609],[1665,615],[1670,631],[1660,644],[1575,630],[1568,622],[1568,615]],'#497b6e',{source:'assets/room-workstation-no-pen-v1.png'}),
  book('desk-book-03','desk-books',[[1574,631],[1660,643],[1670,641],[1671,655],[1658,669],[1576,654],[1568,646],[1568,638]],'#a65946',{source:'assets/room-workstation-no-pen-v1.png'}),
];
