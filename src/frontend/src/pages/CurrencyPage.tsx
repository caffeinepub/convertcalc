import { ConversionCard } from "../components/ConversionCard";

export function CurrencyPage() {
  return (
    <div className="flex flex-col gap-4" data-ocid="currency-page">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Currency
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Convert between world currencies
        </p>
      </div>
      <ConversionCard type="currency" />
    </div>
  );
}
