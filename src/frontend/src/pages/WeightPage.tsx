import { ConversionCard } from "../components/ConversionCard";

export function WeightPage() {
  return (
    <div className="flex flex-col gap-2" data-ocid="weight-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          Weight
        </h1>
        <p className="text-sm text-muted-foreground">
          Kilograms, pounds, grams, ounces, stones & more
        </p>
      </div>
      <ConversionCard type="weight" />
    </div>
  );
}
