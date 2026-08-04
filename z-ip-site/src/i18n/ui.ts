import { getRelativeLocaleUrl } from 'astro:i18n';
import ja from './ja.json';
import enRaw from './en.json';
import zhRaw from './zh.json';

/**
 * 日本語辞書を唯一の原典（型ソース）とする。
 * en / zh は同じ構造を持つことを TypeScript にチェックさせ、
 * キーの入れ忘れをビルド時に落とす。
 */
export type UiDict = typeof ja;

export const en: UiDict = enRaw;
export const zh: UiDict = zhRaw;

export const locales = ['ja', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

/** <html lang> / hreflang に使う BCP-47 表記 */
export const htmlLang: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
  zh: 'zh-Hans',
};

const dictionaries: Record<Locale, UiDict> = { ja, en, zh };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** URL の先頭セグメントから現在のロケールを判定する（無ければ defaultLocale） */
export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if (maybeLocale && isLocale(maybeLocale)) return maybeLocale;
  return defaultLocale;
}

/** その言語の辞書を返す */
export function useTranslations(locale: Locale): UiDict {
  return dictionaries[locale];
}

/**
 * 現在のパスから「ロケール非依存のスラッグ」を取り出す。
 * 例: /en/services/ -> "services/"、/ -> ""、/services/ -> "services/"
 */
export function getSlugFromPath(pathname: string): string {
  let path = pathname.replace(/^\/+/, '');
  const [first, ...rest] = path.split('/');
  if (first && isLocale(first)) {
    path = rest.join('/');
  }
  return path;
}

/**
 * 「同じページの別言語版」への URL を返す。
 * LangSwitcher はこれを使い、TOP に戻さず現在ページのスラッグを保持する。
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const slug = getSlugFromPath(pathname);
  return getRelativeLocaleUrl(targetLocale, slug);
}
