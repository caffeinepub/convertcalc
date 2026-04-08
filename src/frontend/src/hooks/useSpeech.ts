import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

export interface SpeechSettings {
  selectedVoiceName: string;
  volume: number;
  rate: number;
  audioFeedback: boolean;
}

const STORAGE_KEY = "convertcalc-speech-settings";
const DEFAULT_SETTINGS: SpeechSettings = {
  selectedVoiceName: "",
  volume: 1,
  rate: 1,
  audioFeedback: true,
};

// ── Language voice filter ─────────────────────────────────────────────────

function getLangPrefix(lang: string): string {
  if (lang.startsWith("ar")) return "ar";
  if (lang.startsWith("zh")) return "zh";
  if (lang === "th") return "th";
  if (lang === "lo") return "lo";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("vi")) return "vi";
  if (lang.startsWith("id")) return "id";
  return lang.slice(0, 2);
}

function filterVoices(
  voices: SpeechSynthesisVoice[],
  lang: string,
): SpeechSynthesisVoice[] {
  const prefix = getLangPrefix(lang);
  const filtered = voices.filter((v) =>
    v.lang.toLowerCase().startsWith(prefix),
  );
  return filtered.length > 0 ? filtered : voices;
}

// ── Audio feedback beep ───────────────────────────────────────────────────

function playBeep(): void {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 400;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.02);
    osc.onended = () => void ctx.close();
  } catch {
    // AudioContext unavailable — silent fallback
  }
}

// ── Load/save settings ────────────────────────────────────────────────────

function loadSettings(): SpeechSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(settings: SpeechSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage unavailable — silent fallback
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useSpeech() {
  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [settings, setSettings] = useState<SpeechSettings>(loadSettings);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load voices — they load async in most browsers
  useEffect(() => {
    if (!isSupported) return;

    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) setVoices(v);
    };

    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [isSupported]);

  // Persist settings whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string, lang = "en") => {
      if (!isSupported || !text.trim()) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = settings.volume;
      utterance.rate = settings.rate;
      utterance.lang = lang;

      // Select voice
      const filtered = filterVoices(voices, lang);
      const preferred = filtered.find(
        (v) => v.name === settings.selectedVoiceName,
      );
      const voice = preferred ?? filtered[0] ?? null;
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, voices, settings],
  );

  const triggerAudioFeedback = useCallback(() => {
    if (settings.audioFeedback) playBeep();
  }, [settings.audioFeedback]);

  // Derived voice list for a given language
  const getAvailableVoices = useCallback(
    (lang: string) => filterVoices(voices, lang),
    [voices],
  );

  // Settings setters
  const setSelectedVoice = useCallback((name: string) => {
    setSettings((s) => ({ ...s, selectedVoiceName: name }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setSettings((s) => ({ ...s, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setRate = useCallback((rate: number) => {
    setSettings((s) => ({ ...s, rate: Math.max(0.5, Math.min(2, rate)) }));
  }, []);

  const setAudioFeedback = useCallback((audioFeedback: boolean) => {
    setSettings((s) => ({ ...s, audioFeedback }));
  }, []);

  return {
    isSupported,
    isSpeaking,
    voices,
    availableVoices: voices,
    selectedVoiceName: settings.selectedVoiceName,
    volume: settings.volume,
    rate: settings.rate,
    audioFeedback: settings.audioFeedback,
    speak,
    stop,
    triggerAudioFeedback,
    getAvailableVoices,
    setSelectedVoice,
    setVolume,
    setRate,
    setAudioFeedback,
  };
}
