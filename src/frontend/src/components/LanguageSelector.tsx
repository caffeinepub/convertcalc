import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const LANGUAGES = [
  { code: "en", flag: "🇺🇸", native: "English", english: "English" },
  { code: "th", flag: "🇹🇭", native: "ไทย", english: "Thai" },
  { code: "lo", flag: "🇱🇦", native: "ລາວ", english: "Lao" },
  { code: "es", flag: "🇪🇸", native: "Español", english: "Spanish" },
  { code: "fr", flag: "🇫🇷", native: "Français", english: "French" },
  { code: "de", flag: "🇩🇪", native: "Deutsch", english: "German" },
  { code: "zh-CN", flag: "🇨🇳", native: "中文", english: "Chinese" },
  { code: "ar", flag: "🇸🇦", native: "العربية", english: "Arabic" },
  { code: "vi", flag: "🇻🇳", native: "Tiếng Việt", english: "Vietnamese" },
  { code: "id", flag: "🇮🇩", native: "Indonesia", english: "Indonesian" },
  { code: "ja", flag: "🇯🇵", native: "日本語", english: "Japanese" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();
  const language = currentLanguage;
  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <Select.Root
      value={language}
      onValueChange={(val) => setLanguage(val as LanguageCode)}
    >
      <Select.Trigger
        data-ocid="language-selector"
        aria-label="Select language"
        className="flex items-center gap-1 h-9 px-2 rounded-lg text-sm font-medium text-foreground bg-transparent hover:bg-secondary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      >
        <span className="text-base leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span className="hidden sm:inline max-w-[64px] truncate">
          {current.native}
        </span>
        <Select.Icon asChild>
          <ChevronDown className="h-3 w-3 opacity-60 shrink-0" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          align="end"
          className="z-50 min-w-[160px] rounded-xl border border-border bg-popover shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95"
        >
          <Select.Viewport className="p-1">
            {LANGUAGES.map((lang) => (
              <Select.Item
                key={lang.code}
                value={lang.code}
                className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg cursor-pointer text-foreground outline-none hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary transition-smooth select-none"
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {lang.flag}
                </span>
                <Select.ItemText>{lang.native}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
