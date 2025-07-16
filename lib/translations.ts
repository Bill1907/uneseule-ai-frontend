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

export function getTranslation(locale: Locale, key: string) {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

export function getTranslations(locale: Locale) {
  return (key: string) => getTranslation(locale, key);
}
