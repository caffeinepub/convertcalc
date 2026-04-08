import { useCallback, useState } from "react";
import type {
  ConversionHistoryItem,
  ConversionType,
  UnitOption,
} from "../types";

// ── Local conversion tables (backend fallback) ─────────────────────────────

const LENGTH_TO_METERS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  nmi: 1852,
};

const WEIGHT_TO_KG: Record<string, number> = {
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  t: 1000,
  oz: 0.028349523,
  lb: 0.45359237,
  st: 6.35029318,
};

const VOLUME_TO_L: Record<string, number> = {
  ml: 0.001,
  cl: 0.01,
  dl: 0.1,
  l: 1,
  m3: 1000,
  tsp: 0.00492892,
  tbsp: 0.0147868,
  floz: 0.0295735,
  cup: 0.236588,
  pt: 0.473176,
  qt: 0.946353,
  gal: 3.78541,
};

const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.919,
  GBP: 0.787,
  JPY: 149.5,
  CAD: 1.362,
  AUD: 1.524,
  CHF: 0.896,
  CNY: 7.236,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.974,
  KRW: 1325,
  SGD: 1.342,
  HKD: 7.823,
  SEK: 10.42,
  NOK: 10.56,
  DKK: 6.889,
  NZD: 1.628,
  ZAR: 18.63,
  RUB: 91.5,
  THB: 33.5,
  LAK: 21025.0,
  VND: 24500,
  IDR: 15700,
};

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;
  switch (from) {
    case "C":
      celsius = value;
      break;
    case "F":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "K":
      celsius = value - 273.15;
      break;
    case "R":
      celsius = ((value - 491.67) * 5) / 9;
      break;
    default:
      celsius = value;
  }
  switch (to) {
    case "C":
      return celsius;
    case "F":
      return (celsius * 9) / 5 + 32;
    case "K":
      return celsius + 273.15;
    case "R":
      return ((celsius + 273.15) * 9) / 5;
    default:
      return celsius;
  }
}

function localConvert(
  value: number,
  from: string,
  to: string,
  type: ConversionType,
): number {
  if (from === to) return value;
  switch (type) {
    case "length": {
      const base = value * (LENGTH_TO_METERS[from] ?? 1);
      return base / (LENGTH_TO_METERS[to] ?? 1);
    }
    case "weight": {
      const base = value * (WEIGHT_TO_KG[from] ?? 1);
      return base / (WEIGHT_TO_KG[to] ?? 1);
    }
    case "volume": {
      const base = value * (VOLUME_TO_L[from] ?? 1);
      return base / (VOLUME_TO_L[to] ?? 1);
    }
    case "temperature":
      return convertTemperature(value, from, to);
    case "currency": {
      const inUSD = value / (CURRENCY_RATES[from] ?? 1);
      return inUSD * (CURRENCY_RATES[to] ?? 1);
    }
    default:
      return value;
  }
}

// ── Unit lists ─────────────────────────────────────────────────────────────

export const UNIT_LISTS: Record<ConversionType, UnitOption[]> = {
  currency: [
    { code: "USD", label: "US Dollar", symbol: "$" },
    { code: "EUR", label: "Euro", symbol: "€" },
    { code: "GBP", label: "British Pound", symbol: "£" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥" },
    { code: "CAD", label: "Canadian Dollar", symbol: "CA$" },
    { code: "AUD", label: "Australian Dollar", symbol: "A$" },
    { code: "CHF", label: "Swiss Franc", symbol: "Fr" },
    { code: "CNY", label: "Chinese Yuan", symbol: "¥" },
    { code: "INR", label: "Indian Rupee", symbol: "₹" },
    { code: "MXN", label: "Mexican Peso", symbol: "$" },
    { code: "BRL", label: "Brazilian Real", symbol: "R$" },
    { code: "KRW", label: "South Korean Won", symbol: "₩" },
    { code: "SGD", label: "Singapore Dollar", symbol: "S$" },
    { code: "HKD", label: "Hong Kong Dollar", symbol: "HK$" },
    { code: "SEK", label: "Swedish Krona", symbol: "kr" },
    { code: "NOK", label: "Norwegian Krone", symbol: "kr" },
    { code: "DKK", label: "Danish Krone", symbol: "kr" },
    { code: "NZD", label: "New Zealand Dollar", symbol: "NZ$" },
    { code: "ZAR", label: "South African Rand", symbol: "R" },
    { code: "THB", label: "Thai Baht", symbol: "฿" },
    { code: "LAK", label: "Lao Kip", symbol: "₭" },
    { code: "VND", label: "Vietnamese Dong", symbol: "₫" },
    { code: "IDR", label: "Indonesian Rupiah", symbol: "Rp" },
  ],
  length: [
    { code: "mm", label: "Millimeter", symbol: "mm" },
    { code: "cm", label: "Centimeter", symbol: "cm" },
    { code: "m", label: "Meter", symbol: "m" },
    { code: "km", label: "Kilometer", symbol: "km" },
    { code: "in", label: "Inch", symbol: "in" },
    { code: "ft", label: "Foot", symbol: "ft" },
    { code: "yd", label: "Yard", symbol: "yd" },
    { code: "mi", label: "Mile", symbol: "mi" },
    { code: "nmi", label: "Nautical Mile", symbol: "nmi" },
  ],
  temperature: [
    { code: "C", label: "Celsius", symbol: "°C" },
    { code: "F", label: "Fahrenheit", symbol: "°F" },
    { code: "K", label: "Kelvin", symbol: "K" },
    { code: "R", label: "Rankine", symbol: "°R" },
  ],
  weight: [
    { code: "mg", label: "Milligram", symbol: "mg" },
    { code: "g", label: "Gram", symbol: "g" },
    { code: "kg", label: "Kilogram", symbol: "kg" },
    { code: "t", label: "Metric Ton", symbol: "t" },
    { code: "oz", label: "Ounce", symbol: "oz" },
    { code: "lb", label: "Pound", symbol: "lb" },
    { code: "st", label: "Stone", symbol: "st" },
  ],
  volume: [
    { code: "ml", label: "Milliliter", symbol: "ml" },
    { code: "cl", label: "Centiliter", symbol: "cl" },
    { code: "dl", label: "Deciliter", symbol: "dl" },
    { code: "l", label: "Liter", symbol: "L" },
    { code: "m3", label: "Cubic Meter", symbol: "m³" },
    { code: "tsp", label: "Teaspoon", symbol: "tsp" },
    { code: "tbsp", label: "Tablespoon", symbol: "tbsp" },
    { code: "floz", label: "Fluid Ounce", symbol: "fl oz" },
    { code: "cup", label: "Cup", symbol: "cup" },
    { code: "pt", label: "Pint", symbol: "pt" },
    { code: "qt", label: "Quart", symbol: "qt" },
    { code: "gal", label: "Gallon", symbol: "gal" },
  ],
};

const DEFAULT_UNITS: Record<ConversionType, [string, string]> = {
  currency: ["USD", "EUR"],
  length: ["in", "cm"],
  temperature: ["F", "C"],
  weight: ["lb", "kg"],
  volume: ["cup", "l"],
};

// ── Hook ──────────────────────────────────────────────────────────────────

export function useConversion(type: ConversionType) {
  const [fromUnit, setFromUnit] = useState<string>(DEFAULT_UNITS[type][0]);
  const [toUnit, setToUnit] = useState<string>(DEFAULT_UNITS[type][1]);
  const [inputValue, setInputValue] = useState<string>("");
  const [precision, setPrecision] = useState<number>(4);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  const units = UNIT_LISTS[type];

  const numericInput = Number.parseFloat(inputValue);
  const isValid = !Number.isNaN(numericInput);

  const result = isValid
    ? localConvert(numericInput, fromUnit, toUnit, type)
    : null;

  const swap = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result !== null) {
      setInputValue(
        new Intl.NumberFormat("en-US", {
          maximumFractionDigits: precision,
          useGrouping: false,
        }).format(result),
      );
    }
  }, [fromUnit, toUnit, result, precision]);

  const addToHistory = useCallback(() => {
    if (result === null || !isValid) return;
    const item: ConversionHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      fromValue: numericInput,
      fromUnit,
      toValue: result,
      toUnit,
      timestamp: Date.now(),
    };
    setHistory((prev) => [item, ...prev].slice(0, 10));
  }, [result, isValid, type, numericInput, fromUnit, toUnit]);

  const reset = useCallback(() => {
    setInputValue("");
    setFromUnit(DEFAULT_UNITS[type][0]);
    setToUnit(DEFAULT_UNITS[type][1]);
  }, [type]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
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
  };
}
