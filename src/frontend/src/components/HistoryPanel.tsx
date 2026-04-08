import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import type { TranslationKeys } from "../i18n/translations/en";
import type { ConversionHistoryItem } from "../types";

interface HistoryPanelProps {
  history: ConversionHistoryItem[];
  onClear?: () => void;
}

function formatValue(v: number): string {
  if (Math.abs(v) >= 1000000) return v.toExponential(3);
  if (Math.abs(v) >= 0.0001) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(
      v,
    );
  }
  return v.toExponential(3);
}

function timeAgoLabel(
  diff: number,
  t: (key: keyof TranslationKeys) => string,
): string {
  if (diff < 60000) return t("timeJustNow");
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  return `${Math.floor(diff / 3600000)}h`;
}

export function HistoryPanel({ history, onClear }: HistoryPanelProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  if (history.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden"
      data-ocid="history-panel"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] text-sm font-medium text-foreground hover:bg-muted/40 transition-smooth"
        data-ocid="history-toggle"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {t("labelHistory")}{" "}
          <span className="text-muted-foreground font-normal">
            ({history.length})
          </span>
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="border-t border-border">
          {onClear && (
            <div className="flex justify-end px-4 py-2 border-b border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-8 text-xs text-muted-foreground hover:text-destructive gap-1"
                data-ocid="history-clear"
              >
                <Trash2 className="h-3 w-3" />
                {t("clearHistory")}
              </Button>
            </div>
          )}
          <ul className="divide-y divide-border/50">
            {history.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
                data-ocid="history-item"
              >
                <span className="font-mono text-foreground">
                  {formatValue(item.fromValue)}{" "}
                  <span className="text-muted-foreground font-sans font-medium">
                    {item.fromUnit}
                  </span>
                  <span className="text-muted-foreground mx-2">→</span>
                  {formatValue(item.toValue)}{" "}
                  <span className="text-muted-foreground font-sans font-medium">
                    {item.toUnit}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground ml-3 shrink-0">
                  {timeAgoLabel(Date.now() - item.timestamp, t)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
