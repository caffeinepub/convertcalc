import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number>;
    convertLength(amount: number, fromUnit: string, toUnit: string): Promise<number>;
    convertTemperature(amount: number, fromUnit: string, toUnit: string): Promise<number>;
    convertVolume(amount: number, fromUnit: string, toUnit: string): Promise<number>;
    convertWeight(amount: number, fromUnit: string, toUnit: string): Promise<number>;
    getLengthUnits(): Promise<Array<string>>;
    getSupportedCurrencies(): Promise<Array<string>>;
    getTemperatureUnits(): Promise<Array<string>>;
    getVolumeUnits(): Promise<Array<string>>;
    getWeightUnits(): Promise<Array<string>>;
}
