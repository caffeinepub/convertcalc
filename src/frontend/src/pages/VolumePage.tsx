import { ConversionCard } from "../components/ConversionCard";

export function VolumePage() {
  return (
    <div className="flex flex-col gap-2" data-ocid="volume-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          Volume
        </h1>
        <p className="text-sm text-muted-foreground">
          Liters, gallons, milliliters, fluid ounces, cups, pints & more
        </p>
      </div>
      <ConversionCard type="volume" />
    </div>
  );
}
