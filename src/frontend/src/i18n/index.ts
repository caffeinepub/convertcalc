export type LanguageCode =
  | "en"
  | "th"
  | "lo"
  | "es"
  | "fr"
  | "de"
  | "zh-CN"
  | "ar"
  | "vi"
  | "id"
  | "ja";

export type LanguageDir = "ltr" | "rtl";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: LanguageDir;
  locale: string;
}

export const LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    locale: "en-US",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ภาษาไทย",
    dir: "ltr",
    locale: "th-TH",
  },
  {
    code: "lo",
    name: "Lao",
    nativeName: "ພາສາລາວ",
    dir: "ltr",
    locale: "lo-LA",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    locale: "es-ES",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    locale: "fr-FR",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    dir: "ltr",
    locale: "de-DE",
  },
  {
    code: "zh-CN",
    name: "Chinese Simplified",
    nativeName: "简体中文",
    dir: "ltr",
    locale: "zh-CN",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    locale: "ar-SA",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    dir: "ltr",
    locale: "vi-VN",
  },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    dir: "ltr",
    locale: "id-ID",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    dir: "ltr",
    locale: "ja-JP",
  },
];

export const LANGUAGE_MAP: Record<LanguageCode, Language> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l]),
) as Record<LanguageCode, Language>;

export const DEFAULT_LANGUAGE: LanguageCode = "en";
export const STORAGE_KEY = "convertcalc_language";
