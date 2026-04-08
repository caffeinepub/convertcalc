import { type ReactNode, createContext, useContext } from "react";
import { useSpeech } from "../hooks/useSpeech";

// ── Context type ──────────────────────────────────────────────────────────

type SpeechContextValue = ReturnType<typeof useSpeech>;

const SpeechContext = createContext<SpeechContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────

export function SpeechProvider({ children }: { children: ReactNode }) {
  const speech = useSpeech();
  return (
    <SpeechContext.Provider value={speech}>{children}</SpeechContext.Provider>
  );
}

// ── Consumer hook ─────────────────────────────────────────────────────────

export function useSpeechContext(): SpeechContextValue {
  const ctx = useContext(SpeechContext);
  if (!ctx) {
    throw new Error("useSpeechContext must be used inside <SpeechProvider>");
  }
  return ctx;
}
