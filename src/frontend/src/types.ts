export type ConversionType =
  | "currency"
  | "length"
  | "temperature"
  | "weight"
  | "volume";

export interface UnitOption {
  code: string;
  label: string;
  symbol?: string;
}

export interface ConversionHistoryItem {
  id: string;
  type: ConversionType;
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  timestamp: number;
}

export interface ConversionResult {
  value: number;
  formatted: string;
}
