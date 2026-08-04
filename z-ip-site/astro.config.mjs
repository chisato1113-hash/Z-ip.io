import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.z-ip.co.jp', // 【要確認】正式ドメインが決まり次第差し替える {/* TODO(z-ip): 正式ドメイン */}
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
