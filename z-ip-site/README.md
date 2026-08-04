# 株式会社Z-IPホールディングス コーポレートサイト

Astro（静的サイト）で構築した、日本語・英語・簡体中文の3言語コーポレートサイトです。
4ページ構成（TOP / サービス / about / コンタクト）× 3言語＋各言語のサンクスページ＝15ページ。

- **フレームワーク**: Astro（`output: 'static'`）
- **CSS**: Tailwind CSS（Preflightオフ／デザイントークンは `src/styles/global.css`）
- **言語**: TypeScript（strict）
- **多言語**: Astro 標準の i18n ルーティング（`ja` はプレフィックスなし、`/en/` `/zh/`）
- **フォント**: `@fontsource` でセルフホスト（Inter / Noto Sans JP / Noto Sans SC）
- **画像**: `astro:assets`（AVIF/WebP 自動生成）
- **デザイン**: [Linear](https://linear.app/) を参照したダーク基調・サンセリフ・角丸。唯一のアクセントは朱（Z-IPブランド色）。全写真・動画は CSS でモノクロ統一。

## セットアップ

```bash
npm install
npm run dev      # 開発サーバ（http://localhost:4321）
npm run build    # 本番ビルド → dist/
npm run preview  # ビルド成果物をローカル確認
```

> `sharp` と `esbuild` はネイティブ／インストールスクリプトを使います。環境によっては
> `npm install` 時にビルドスクリプトの許可が必要です。

型チェック・整形:

```bash
npm run astro -- check   # TypeScript 型チェック
npm run format           # Prettier
npm run lint             # ESLint
```

## デプロイ

- **Netlify（第1候補）**: リポジトリを接続すると `netlify.toml` の設定で自動ビルド。
  コンタクトフォームは **Netlify Forms**（`data-netlify="true"` ＋ honeypot）で自動検知されます。
- **Vercel / GitHub Pages**: `dist/` を吐く静的サイトなので配信自体は可能。
  ただし **GitHub Pages は Netlify Forms が使えない** ため、その場合は
  `src/components/ContactForm.astro` の TODO に従い送信先を [Formspree](https://formspree.io/) 等へ差し替えてください。

`astro.config.mjs` の `site`（正式ドメイン）を確定後に差し替えると、hreflang・OGP・sitemap の絶対URLが揃います。

## ディレクトリ構成

```
src/
├─ components/
│  ├─ pages/            # ページ本体（言語非依存）: Top / Services / About / Contact / Thanks
│  ├─ fonts/            # 言語別フォント読み込み（FontsJa / FontsEn / FontsZh）
│  └─ *.astro           # Header / Footer / LangSwitcher / HeroVideo / EngineCard など
├─ layouts/BaseLayout.astro   # <html lang>, meta, hreflang, Header/Footer
├─ i18n/
│  ├─ ui.ts             # 型・辞書ローダ・言語切替ヘルパ（ja.json を型の原典とする）
│  ├─ ja.json / en.json / zh.json   # 全文言（3言語で同一キー構造）
├─ styles/global.css    # デザイントークン＋ベーススタイル
├─ assets/images/       # astro:assets が処理する画像
└─ pages/               # 12ページ＋thanks3の薄いルートラッパー
public/
├─ video/hero-poster.jpg  # ヒーロー動画のポスター
├─ og/                    # OGP画像（言語別）
└─ favicon.svg
scripts/                 # 画像・OGP生成の補助スクリプト（sharp）
```

文言はすべて `src/i18n/*.json` に集約。`ja.json` を原典とし、`en/zh` が同じキー構造を持つことを TypeScript が検査します。

## Z-IP側で確定・差し替えが必要な項目（コード内に `TODO(z-ip)` コメントあり）

- **ヒーロー動画本体** `public/video/hero.mp4` / `hero.webm`（現状はポスター画像のみ表示）
- **正式ドメイン**（`astro.config.mjs` の `site`、`public/robots.txt`）
- **プライバシーポリシー本文**（3言語）／特定商取引法に基づく表記の要否
- **問い合わせ用メールアドレス**（`src/i18n/*.json` の `pages.contact` 周辺／コンタクトページ右側）
- **役員の氏名・顔写真・経歴**（about チーム。現状は役職カードのみ）
- **公開してよいKPI数値**（TOP 数値ストリップは未確定のため非表示）
- **MangaFlow / 分析ダッシュボードの実画面**（分析ダッシュボードは線画プレースホルダー）
- **CLIPYIELD の正式ドメイン**（現状は GitHub Pages のURL）
- **ホスティング最終決定**とフォーム送信先

## 素材について

写真は Pexels（商用利用可・帰属不要）から取得し、モノクロ統一を前提に選定・トリミングしています。
差し替え時は `src/assets/images/` の同名ファイルを置き換えて再ビルドしてください。

---

© 2026 Z-IP Holdings, Inc.
