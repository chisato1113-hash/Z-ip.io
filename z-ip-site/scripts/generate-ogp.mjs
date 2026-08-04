/**
 * OGP画像ジェネレータ（言語別 1200x630）
 * 墨(--ink-900)地に自前のワードマーク＋タグラインの無彩色カード。
 * ストック素材はロゴに使わない（第8-1章）→ ワードマークは自前テキストのみ。
 * TODO(z-ip): モノクロ写真を背景に敷く場合は素材確定後に差し替え。第7-3章
 *
 * 実行: node scripts/generate-ogp.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const cards = {
  ja: '日本の物語を、世界同時に。',
  en: 'Japanese stories, everywhere at once.',
  zh: '日本的故事，同步抵达世界。',
};

// sharp のテキストバックエンドに CJK フォントが無く豆腐化するため、
// OGP カードは Latin のみ（ワードマーク＋ラベル）で構成する。
// 各言語のタグラインは og:title 等のメタで出力済み。
// TODO(z-ip): CJK タグラインをカード内にも入れる場合は、CJKフォントを埋め込んで再生成
function svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#0B0A09"/>
    <rect x="60.5" y="60.5" width="1079" height="509" fill="none" stroke="#2E2A26" stroke-width="1"/>
    <text x="100" y="300" font-family="Inter, sans-serif" font-size="24" letter-spacing="7"
      fill="#E8543F" font-weight="500">GLOBAL MANGA PUBLISHER</text>
    <text x="96" y="470" font-family="Georgia, 'Times New Roman', serif" font-size="170"
      font-weight="600" letter-spacing="4">
      <tspan fill="#F7F3EC">Z</tspan><tspan fill="#E8543F">-</tspan><tspan fill="#F7F3EC">IP</tspan>
    </text>
  </svg>`;
}

await mkdir('public/og', { recursive: true });
for (const lang of Object.keys(cards)) {
  await sharp(Buffer.from(svg())).png().toFile(`public/og/${lang}.png`);
  console.log(`generated public/og/${lang}.png`);
}
console.log('done.');
