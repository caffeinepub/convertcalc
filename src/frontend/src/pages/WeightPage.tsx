import { ConversionCard } from "../components/ConversionCard";
import { useLanguage } from "../context/LanguageContext";

export function WeightPage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2" data-ocid="weight-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          {t("tabWeight")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("descWeight")}</p>
      </div>
      <ConversionCard type="weight" />
    </div>
  );
}
