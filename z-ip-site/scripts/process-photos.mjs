import sharp from 'sharp';
const SRC = '/private/tmp/claude-501/-Users-tezukachisato-Desktop-Claude-Code/59dd3898-8d22-4bb6-9aa4-180d92fe174a/scratchpad/final';
const jobs = [
  ['hero.jpg',             'public/video/hero-poster.jpg',           1920, 1080, 78],
  ['closing.jpg',          'src/assets/images/closing.jpg',          1600, 640,  82],
  ['header-services.jpg',  'src/assets/images/header-services.jpg',  1600, 600,  82],
  ['header-about.jpg',     'src/assets/images/header-about.jpg',     1600, 600,  82],
  ['engine-panel.jpg',     'src/assets/images/engine-panel.jpg',     800,  1000, 84],
  ['engine-clipyield.jpg', 'src/assets/images/engine-clipyield.jpg', 800,  1000, 84],
  ['panel-detail-1.jpg',   'src/assets/images/panel-detail-1.jpg',   900,  600,  84],
  ['panel-detail-2.jpg',   'src/assets/images/panel-detail-2.jpg',   900,  600,  84],
];
for (const [src, out, w, h, q] of jobs) {
  await sharp(`${SRC}/${src}`).resize(w, h, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: q, progressive: true, mozjpeg: true }).toFile(out);
  console.log('wrote', out, w + 'x' + h);
}
console.log('done');
