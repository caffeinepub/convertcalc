import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { useCallback } from "react";
import { useConversion } from "../hooks/useConversion";
import type { ConversionType } from "../types";
import { HistoryPanel } from "./HistoryPanel";
import { UnitSelector } from "./UnitSelector";

interface ConversionCardProps {
  type: ConversionType;
}

const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 6, 8];

function formatNumber(value: number, precision: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: precision,
    minimumFractionDigits: 0,
  }).format(value);
}

export function ConversionCard({ type }: ConversionCardProps) {
  const {
    units,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    inputValue,
    setInputValue,
    precision,
    setPrecision,
    result,
    isValid,
    history,
    swap,
    addToHistory,
    clearHistory,
    reset,
  } = useConversion(type);

  const toUnit_ = units.find((u) => u.code === toUnit);
  const toSymbol = toUnit_?.symbol ?? toUnit;

  const isZeroOrEmpty =
    inputValue === "" || inputValue === "0" || Number(inputValue) === 0;

  const formattedResult =
    isValid && result !== null && !isZeroOrEmpty
      ? formatNumber(result, precision)
      : isZeroOrEmpty
        ? "0"
        : "—";

  const handleConvert = useCallback(() => {
    addToHistory();
  }, [addToHistory]);

  return (
    <div className="flex flex-col gap-4">
      {/* From section */}
      <div className="rounded-2xl bg-card border border-border shadow-sm p-4 flex flex-col gap-3">
        <UnitSelector
          units={units}
          value={fromUnit}
          onChange={setFromUnit}
          label="From"
          data-ocid="from-unit-selector"
        />
        <Input
          type="number"
          inputMode="decimal"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="0"
          className="h-14 text-2xl font-mono font-semibold bg-background border-border text-foreground px-4 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary transition-smooth [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          data-ocid="from-input"
        />
      </div>

      {/* Swap button */}
      <div className="flex justify-center -my-1 relative z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={swap}
          className="h-11 w-11 rounded-xl bg-card border-border shadow-sm hover:bg-muted/60 transition-smooth"
          aria-label="Swap units"
          data-ocid="swap-button"
        >
          <ArrowLeftRight className="h-4 w-4 text-foreground" />
        </Button>
      </div>

      {/* To section */}
      <div className="rounded-2xl bg-card border border-border shadow-sm p-4 flex flex-col gap-3">
        <UnitSelector
          units={units}
          value={toUnit}
          onChange={setToUnit}
          label="To"
          data-ocid="to-unit-selector"
        />
        <div
          className={`h-14 flex items-center px-4 rounded-xl border text-2xl font-mono font-semibold select-all cursor-text
            ${
              isValid && !isZeroOrEmpty
                ? "bg-muted/50 border-border text-foreground"
                : isZeroOrEmpty
                  ? "bg-muted/50 border-border text-foreground"
                  : "bg-muted/30 border-border/50 text-muted-foreground"
            }`}
          aria-live="polite"
          aria-label={`Result: ${isValid ? `${formattedResult} ${toSymbol}` : "Please enter a valid number"}`}
          data-ocid="result-display"
        >
          {isZeroOrEmpty ? (
            <span className="flex items-center gap-2 flex-1 min-w-0">
              <span className="flex-1 min-w-0 truncate">
                0
                <span className="text-base font-sans font-normal text-muted-foreground ml-2">
                  {toSymbol}
                </span>
              </span>
            </span>
          ) : isValid ? (
            <span className="flex items-center gap-2 flex-1 min-w-0">
              <span className="flex-1 min-w-0 truncate">
                {formattedResult}
                <span className="text-base font-sans font-normal text-muted-foreground ml-2">
                  {toSymbol}
                </span>
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground text-base font-sans font-normal">
              Enter value
            </span>
          )}
        </div>
      </div>

      {/* Precision selector */}
      <fieldset className="flex items-center gap-2 px-1 border-none p-0 m-0">
        <legend className="text-xs text-muted-foreground font-medium float-left">
          Result:
        </legend>
        <div className="flex gap-1 ml-2">
          {PRECISION_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrecision(p)}
              className={`min-w-[36px] h-11 px-2 rounded-lg text-xs font-semibold transition-smooth
                ${
                  precision === p
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              aria-pressed={precision === p}
              data-ocid={`precision-${p}`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleConvert}
          disabled={!isValid}
          className="h-14 w-full text-base font-semibold rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-smooth shadow-sm disabled:opacity-40"
          data-ocid="convert-button"
        >
          Convert
        </Button>
        <Button
          variant="outline"
          onClick={reset}
          className="h-12 w-full text-sm font-medium rounded-2xl border-destructive/40 text-destructive hover:bg-destructive/10 transition-smooth"
          data-ocid="reset-button"
        >
          Reset
        </Button>
      </div>

      {/* History */}
      <HistoryPanel history={history} onClear={clearHistory} />
    </div>
  );
}
