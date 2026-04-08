import { ConversionCard } from "../components/ConversionCard";
import { useLanguage } from "../context/LanguageContext";

export function LengthPage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2" data-ocid="length-page">
      <div className="mb-1">
        <h1 className="text-xl font-display font-semibold text-foreground">
          {t("tabLength")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("descLength")}</p>
      </div>
      <ConversionCard type="length" />
    </div>
  );
}
