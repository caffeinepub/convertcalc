import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Volume2, VolumeOff, VolumeX } from "lucide-react";
import { useSpeechContext } from "../context/SpeechContext";

// ── Props ─────────────────────────────────────────────────────────────────

interface SpeakButtonProps {
  text: string;
  lang?: string;
  className?: string;
  /** Size variant: "sm" (default) or "md" */
  size?: "sm" | "md";
  "aria-label"?: string;
}

// ── Component ─────────────────────────────────────────────────────────────

export function SpeakButton({
  text,
  lang = "en",
  className,
  size = "sm",
  "aria-label": ariaLabel,
}: SpeakButtonProps) {
  const { isSupported, isSpeaking, speak, stop } = useSpeechContext();

  const iconSize = size === "md" ? 18 : 15;

  const Icon = !isSupported ? VolumeOff : isSpeaking ? VolumeX : Volume2;

  const label =
    ariaLabel ??
    (!isSupported
      ? "Text-to-speech unavailable"
      : isSpeaking
        ? "Stop speaking"
        : "Read aloud");

  function handleClick() {
    if (!isSupported) return;
    if (isSpeaking) {
      stop();
    } else {
      speak(text, lang);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={!isSupported}
      aria-label={label}
      title={label}
      data-ocid="speak-btn"
      onClick={handleClick}
      className={cn(
        "rounded-full transition-colors duration-200",
        isSpeaking && "text-primary bg-primary/10 animate-pulse",
        !isSupported && "opacity-40 cursor-not-allowed",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
        className,
      )}
    >
      <Icon size={iconSize} />
    </Button>
  );
}
