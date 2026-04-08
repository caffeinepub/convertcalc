import { ConversionCard } from "../components/ConversionCard";

export function TemperaturePage() {
  return (
    <div className="flex flex-col gap-2" data-ocid="temperature-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          Temperature
        </h1>
        <p className="text-sm text-muted-foreground">
          Celsius, Fahrenheit, Kelvin & Rankine
        </p>
      </div>
      <ConversionCard type="temperature" />
    </div>
  );
}
