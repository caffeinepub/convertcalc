import { ConversionCard } from "../components/ConversionCard";
import { useLanguage } from "../context/LanguageContext";

export function VolumePage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2" data-ocid="volume-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          {t("tabVolume")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("descVolume")}</p>
      </div>
      <ConversionCard type="volume" />
    </div>
  );
}
