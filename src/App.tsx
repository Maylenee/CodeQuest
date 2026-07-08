import { useEffect, useState } from "react";
import { SelectionScreen } from "./components/onboarding/SelectionScreen";
import { SurveyFlow } from "./components/onboarding/SurveyFlow";
import { LearnPage } from "./components/learn/LearnPage";
import { seedInit } from "./api";

type Phase = "selection" | "survey" | "complete";

export default function App() {
  const [phase, setPhase] = useState<Phase | "loading">("loading");
  const [track, setTrack] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        await seedInit();
      } catch (e) {
        // silently fail
      }
      const stored = localStorage.getItem("codequest_onboarded");
      if (stored === "true") setPhase("complete");
      else setPhase("selection");
    }
    init();
  }, []);

  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="text-[var(--color-text-muted)] text-lg">Memuat...</div>
      </div>
    );
  }

  if (phase === "selection") {
    return (
      <SelectionScreen
        onSelect={(t) => {
          setTrack(t);
          setPhase("survey");
        }}
      />
    );
  }

  if (phase === "survey") {
    return (
      <SurveyFlow
        selectedTrack={track || "python"}
        onComplete={() => {
          localStorage.setItem("codequest_onboarded", "true");
          setPhase("complete");
        }}
      />
    );
  }

  return <LearnPage />;
}
