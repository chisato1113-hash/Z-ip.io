import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// GitHub Pages では「ユーザー名.github.io/リポジトリ名/」のサブパスで配信される。
// GitHub Actions ビルド時のみ（deploy.yml が GITHUB_PAGES=true を設定）、
// GITHUB_REPOSITORY（"owner/repo"・Actions が自動設定）から site/base を組み立てる。
// Netlify や独自ドメイン（ルート配信）では従来どおり site='https://www.z-ip.co.jp', base='/'。
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const ghRepo = process.env.GITHUB_REPOSITORY || ''; // e.g. "chisato1113-hash/z-ip-site"
const [ghOwner, ghName] = ghRepo.includes('/') ? ghRepo.split('/') : ['', 'z-ip-site'];

export default defineConfig({
  // 【要確認】正式ドメインが決まり次第、下の 'https://www.z-ip.co.jp' を差し替える
  site: isGithubPages && ghOwner ? `https://${ghOwner}.github.io` : 'https://www.z-ip.co.jp',
  // 独自ドメイン（CNAME）で GitHub Pages を使う場合は base を '/' に戻すこと
  base: isGithubPages ? `/${ghName}/` : '/',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: false, // 日本語はプレフィックスなし（/）
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja',
          en: 'en',
          zh: 'zh-Hans',
        },
      },
    }),
  ],
});
