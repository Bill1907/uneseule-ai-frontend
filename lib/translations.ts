import koMessages from "@/messages/ko.json";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";

export const locales = ["ko", "en", "es"] as const;
export const defaultLocale = "ko" as const;

export type Locale = (typeof locales)[number];

export const translations = {
  ko: koMessages,
  en: enMessages,
  es: esMessages,
};

export function getTranslation(locale: Locale, key: string, params?: Record<string, string | number>) {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value) return key;

  // Handle interpolation
  if (params && typeof value === 'string') {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }

  return value;
}

export function getTranslations(locale: Locale) {
  return (key: string, params?: Record<string, string | number>) => getTranslation(locale, key, params);
}
