import { Button } from "@/components/ui/button";
import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { ChevronDown, Square, Volume2 } from "lucide-react";
import { useSpeechContext } from "../context/SpeechContext";

// ── Sub-components ────────────────────────────────────────────────────────

function Label({
  htmlFor,
  children,
}: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
    >
      {children}
    </label>
  );
}

function SliderRow({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  displayValue: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-xs font-mono text-foreground tabular-nums">
          {displayValue}
        </span>
      </div>
      <Slider.Root
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="relative flex items-center select-none touch-none h-5 w-full"
        aria-label={label}
      >
        <Slider.Track className="bg-border relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-primary rounded-full shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-primary/90 transition-colors cursor-grab active:cursor-grabbing" />
      </Slider.Root>
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────

interface SpeechSettingsPanelProps {
  /** Optional language to filter available voices */
  lang?: string;
}

export function SpeechSettingsPanel({ lang = "en" }: SpeechSettingsPanelProps) {
  const {
    isSupported,
    isSpeaking,
    volume,
    rate,
    audioFeedback,
    selectedVoiceName,
    getAvailableVoices,
    setVolume,
    setRate,
    setAudioFeedback,
    setSelectedVoice,
    stop,
  } = useSpeechContext();

  const voices = getAvailableVoices(lang);
  const effectiveVoice = selectedVoiceName || voices[0]?.name || "";

  if (!isSupported) {
    return (
      <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground flex items-center gap-2">
        <Volume2 size={16} className="shrink-0" />
        Text-to-speech is not supported in this browser.
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm"
      data-ocid="speech-settings-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-primary" />
          <span className="font-semibold text-sm text-foreground">
            Speech Settings
          </span>
        </div>
        {isSpeaking && (
          <Button
            variant="outline"
            size="sm"
            onClick={stop}
            aria-label="Stop speaking"
            data-ocid="speech-stop-btn"
            className="h-7 gap-1.5 text-xs"
          >
            <Square size={11} />
            Stop
          </Button>
        )}
      </div>

      {/* Voice selector */}
      <div className="flex flex-col gap-2">
        <Label>Voice</Label>
        <Select.Root value={effectiveVoice} onValueChange={setSelectedVoice}>
          <Select.Trigger
            className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-colors hover:bg-muted/40 data-ocid-voice-select"
            aria-label="Select voice"
            data-ocid="voice-select"
          >
            <Select.Value placeholder="Select a voice…">
              {voices.find((v) => v.name === effectiveVoice)?.name ??
                "Default voice"}
            </Select.Value>
            <Select.Icon>
              <ChevronDown size={14} className="text-muted-foreground" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className="z-50 overflow-hidden rounded-lg border border-border bg-popover shadow-xl animate-in fade-in-0 zoom-in-95"
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport className="p-1 max-h-52 overflow-y-auto">
                {voices.map((v) => (
                  <Select.Item
                    key={v.name}
                    value={v.name}
                    className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=checked]:font-medium"
                  >
                    <Select.ItemText>
                      {v.name}
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        ({v.lang})
                      </span>
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Volume slider */}
      <SliderRow
        id="speech-volume"
        label="Volume"
        value={volume}
        min={0}
        max={1}
        step={0.05}
        onChange={setVolume}
        displayValue={`${Math.round(volume * 100)}%`}
      />

      {/* Speed slider */}
      <SliderRow
        id="speech-rate"
        label="Speed"
        value={rate}
        min={0.5}
        max={2}
        step={0.1}
        onChange={setRate}
        displayValue={`${rate.toFixed(1)}×`}
      />

      {/* Audio feedback toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="audio-feedback">Audio Feedback</Label>
          <span className="text-xs text-muted-foreground">
            Beep on action completion
          </span>
        </div>
        <Switch.Root
          id="audio-feedback"
          checked={audioFeedback}
          onCheckedChange={setAudioFeedback}
          data-ocid="audio-feedback-toggle"
          className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
          aria-label="Enable audio feedback"
        >
          <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
        </Switch.Root>
      </div>
    </div>
  );
}
