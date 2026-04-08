import { ConversionCard } from "../components/ConversionCard";
import { useLanguage } from "../context/LanguageContext";

export function CurrencyPage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-4" data-ocid="currency-page">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          {t("tabCurrency")}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t("descCurrency")}
        </p>
      </div>
      <ConversionCard type="currency" />
    </div>
  );
}
