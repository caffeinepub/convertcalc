import { ConversionCard } from "../components/ConversionCard";

export function LengthPage() {
  return (
    <div className="flex flex-col gap-2" data-ocid="length-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          Length
        </h1>
        <p className="text-sm text-muted-foreground">
          Inches, centimeters, feet, meters, miles & more
        </p>
      </div>
      <ConversionCard type="length" />
    </div>
  );
}
