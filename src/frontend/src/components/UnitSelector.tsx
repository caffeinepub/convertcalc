import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UnitOption } from "../types";

interface UnitSelectorProps {
  units: UnitOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  "data-ocid"?: string;
}

export function UnitSelector({
  units,
  value,
  onChange,
  label,
  "data-ocid": dataOcid,
}: UnitSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide pl-1">
          {label}
        </span>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="h-11 bg-card border-border text-foreground font-body text-sm"
          data-ocid={dataOcid}
        >
          <SelectValue placeholder="Enter value" />
        </SelectTrigger>
        <SelectContent className="max-h-64 bg-card border-border">
          {units.map((unit) => (
            <SelectItem
              key={unit.code}
              value={unit.code}
              className="font-body text-sm cursor-pointer min-h-[44px] flex items-center"
            >
              <span className="font-semibold text-foreground mr-1">
                {unit.code}
              </span>
              <span className="text-muted-foreground">— {unit.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
