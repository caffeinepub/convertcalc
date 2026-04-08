import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_MAP,
  type LanguageCode,
  type LanguageDir,
  STORAGE_KEY,
} from "../i18n";
import { ar } from "../i18n/translations/ar";
import { de } from "../i18n/translations/de";
import type { TranslationKeys } from "../i18n/translations/en";
import { en } from "../i18n/translations/en";
import { es } from "../i18n/translations/es";
import { fr } from "../i18n/translations/fr";
import { id } from "../i18n/translations/id";
import { ja } from "../i18n/translations/ja";
import { lo } from "../i18n/translations/lo";
import { th } from "../i18n/translations/th";
import { vi } from "../i18n/translations/vi";
import { zhCN } from "../i18n/translations/zh-CN";

// ── Translation map ────────────────────────────────────────────────────────
const TRANSLATIONS: Record<LanguageCode, TranslationKeys> = {
  en,
  th,
  lo,
  es,
  fr,
  de,
  "zh-CN": zhCN,
  ar,
  vi,
  id,
  ja,
};

// ── Context interface ──────────────────────────────────────────────────────
interface LanguageContextValue {
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: keyof TranslationKeys) => string;
  dir: LanguageDir;
  locale: string;
  formatNumber: (value: number, decimals?: number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// ── Helpers ────────────────────────────────────────────────────────────────
function resolveInitialLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && stored in LANGUAGE_MAP) return stored;
  } catch {
    // localStorage may be unavailable
  }
  // Try to match browser language
  const browserLang = navigator.language.split("-")[0];
  const match = LANGUAGES.find(
    (l) => l.code === browserLang || l.code.startsWith(browserLang),
  );
  return match ? match.code : DEFAULT_LANGUAGE;
}

function applyDocumentAttributes(code: LanguageCode): void {
  const lang = LANGUAGE_MAP[code];
  document.documentElement.dir = lang.dir;
  document.documentElement.lang = code;
}

// ── Provider ───────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(
    resolveInitialLanguage,
  );

  // Apply dir/lang attributes on initial render and on change
  useEffect(() => {
    applyDocumentAttributes(currentLanguage);
  }, [currentLanguage]);

  const setLanguage = useCallback((code: LanguageCode) => {
    setCurrentLanguage(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }, []);

  const translations = TRANSLATIONS[currentLanguage] ?? en;

  const t = useCallback(
    (key: keyof TranslationKeys): string => {
      return (translations[key] as string) ?? (en[key] as string) ?? key;
    },
    [translations],
  );

  const langMeta = LANGUAGE_MAP[currentLanguage];
  const dir = langMeta.dir;
  const locale = langMeta.locale;

  const formatNumber = useCallback(
    (value: number, decimals = 4): string => {
      try {
        return new Intl.NumberFormat(locale, {
          minimumFractionDigits: 0,
          maximumFractionDigits: decimals,
        }).format(value);
      } catch {
        return value.toFixed(decimals);
      }
    },
    [locale],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ currentLanguage, setLanguage, t, dir, locale, formatNumber }),
    [currentLanguage, setLanguage, t, dir, locale, formatNumber],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export { LANGUAGES };
export type { LanguageCode, LanguageDir, TranslationKeys };
