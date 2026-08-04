/**
 * プレースホルダー画像ジェネレータ（開発用）
 *
 * 素材（Pexels/Unsplash）が用意できるまでの「差し替え前提」の無彩色プレースホルダーを生成する。
 * - 人物・ロゴ・取引先を捏造しない（第9章）。抽象的な階調のみ。
 * - どれも差し替え対象であることが分かるよう "IMAGE TODO" を薄く焼き込む。
 * - サイト側で .zi-media により最終的にグレースケール化されるが、素材自体も無彩色で出す。
 *
 * 実行: node scripts/generate-placeholders.mjs
 * 実素材が届いたら同じパスに置き換え、このスクリプトは不要になる。
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const targets = [
  // [T-1] ヒーローのポスター（動画未配置時に表示）
  { path: 'public/video/hero-poster.jpg', w: 1920, h: 1080, label: 'HERO POSTER' },
  // [T-3] 2つのエンジン（4:5 縦）
  { path: 'src/assets/images/engine-panel.jpg', w: 800, h: 1000, label: 'PANEL' },
  { path: 'src/assets/images/engine-clipyield.jpg', w: 800, h: 1000, label: 'CLIPYIELD' },
  // [T-7] クロージング（横長）
  { path: 'src/assets/images/closing.jpg', w: 1600, h: 640, label: 'CLOSING' },
  // 下層ページヘッダー（16:6）
  { path: 'src/assets/images/header-services.jpg', w: 1600, h: 600, label: 'SERVICES' },
  { path: 'src/assets/images/header-about.jpg', w: 1600, h: 600, label: 'ABOUT' },
  // about / services 補助写真
  { path: 'src/assets/images/about-office.jpg', w: 1200, h: 800, label: 'OFFICE' },
  { path: 'src/assets/images/panel-detail-1.jpg', w: 900, h: 600, label: 'PANEL 1' },
  { path: 'src/assets/images/panel-detail-2.jpg', w: 900, h: 600, label: 'PANEL 2' },
];

function svgFor(w, h, label) {
  // 対角グラデーション＋細いグリッド＋中央の薄い "IMAGE TODO"
  const fontSize = Math.round(Math.min(w, h) * 0.05);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2a2622"/>
        <stop offset="55%" stop-color="#4a453f"/>
        <stop offset="100%" stop-color="#6b665f"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="#8a857c" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" stroke="#ffffff" stroke-width="1" opacity="0.06"/>
    <line x1="${w / 2}" y1="0" x2="${w / 2}" y2="${h}" stroke="#ffffff" stroke-width="1" opacity="0.06"/>
    <text x="${w / 2}" y="${h / 2}" fill="#f7f3ec" opacity="0.22" font-family="Inter, sans-serif"
      font-size="${Math.round(fontSize * 0.7)}" font-weight="500" letter-spacing="5"
      text-anchor="middle" dominant-baseline="middle">IMAGE TODO · ${label}</text>
  </svg>`;
}

for (const t of targets) {
  await mkdir(dirname(t.path), { recursive: true });
  const svg = Buffer.from(svgFor(t.w, t.h, t.label));
  const img = sharp(svg).grayscale();
  if (t.path.endsWith('.jpg')) {
    await img.jpeg({ quality: 82, progressive: true }).toFile(t.path);
  } else {
    await img.png().toFile(t.path);
  }
  console.log(`generated ${t.path} (${t.w}x${t.h})`);
}
console.log('done.');
