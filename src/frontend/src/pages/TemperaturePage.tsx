import { ConversionCard } from "../components/ConversionCard";
import { useLanguage } from "../context/LanguageContext";

export function TemperaturePage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2" data-ocid="temperature-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          {t("tabTemperature")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("descTemperature")}</p>
      </div>
      <ConversionCard type="temperature" />
    </div>
  );
}
