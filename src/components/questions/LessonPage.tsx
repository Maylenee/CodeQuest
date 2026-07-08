import { useEffect, useState } from "react";
import { Mascot } from "../ui/Mascot";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { Confetti } from "../ui/Confetti";
import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";
import { PredictOutput } from "./PredictOutput";
import { useGameStore } from "../../lib/store";
import { questionsGet, questionVerify, progressUpdate, submissionCreate, userStreak } from "../../api";
import { ArrowLeft, Lightbulb, Heart } from "lucide-react";
import type { Question } from "../../lib/types";
import "../learn/LearningPath.css";

interface LessonPageProps {
  lessonId: string;
  onBack: () => void;
}

export function LessonPage({ lessonId, onBack }: LessonPageProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const { xp, addXp, showConfetti, setShowConfetti, hearts, setHearts, userId } = useGameStore();

  useEffect(() => {
    async function load() {
      try {
        const data = await questionsGet(lessonId);
        setQuestions(data.questions || []);
        setLessonTitle(data.lesson?.title || "");
      } catch (e) {
        console.error("Failed to load questions", e);
      }
      setLoading(false);
    }
    load();
  }, [lessonId]);

  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  const handleAnswer = (answer: any) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));
  };

  const handleCheck = async () => {
    if (!question) return;
    const answer = answers[question.id];
    if (answer === undefined || answer === null) return;

    try {
      const result = await questionVerify({ questionId: question.id, answer });
      const isCorrect = result.correct;
      setCorrect(isCorrect);
      setShowResult(true);

      if (isCorrect) {
        addXp(question.xpReward || 10);
        const uid = localStorage.getItem("codequest_userId") || "user-default";
        await submissionCreate({
          userId: uid,
          questionId: question.id,
          code: JSON.stringify(answer),
          result: { correct: true },
          score: question.xpReward || 10,
        });
        await userStreak(uid);
      } else {
        setHearts(Math.max(0, hearts - 1));
      }
    } catch (e) {
      // fallback: client-side check
      const content = JSON.parse(JSON.stringify(question.content));
      let isCorrect = false;
      if (question.type === "mcq" || question.type === "predict_output") {
        isCorrect = answer === (content as any).correctAnswer;
      } else if (question.type === "fill_blank") {
        const blanks = (content as any).blanks || [];
        isCorrect = blanks.every((b: any) => answer[b.id]?.trim() === b.answer);
      }
      setCorrect(isCorrect);
      setShowResult(true);
      if (isCorrect) addXp(question.xpReward || 10);
      else setHearts(Math.max(0, hearts - 1));
    }
  };

  const handleNext = async () => {
    setShowResult(false);
    setShowHint(false);
    setCorrect(false);
    if (isLast) {
      setLessonComplete(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
      const uid = localStorage.getItem("codequest_userId") || "user-default";
      await progressUpdate({ userId: uid, lessonId, status: "completed", score: 30, xpReward: 20 });
    } else {
      setCurrentQ((p) => p + 1);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-[var(--color-text-muted)]">Memuat soal...</div>;
  }

  if (lessonComplete) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <Confetti active={true} />
        <div className="text-center max-w-md">
          <Mascot size="lg" expression="celebrate" className="mb-4" />
          <h1 className="text-2xl font-bold mb-2">Pelajaran Selesai! 🎉</h1>
          <p className="text-[var(--color-text-muted)] mb-2">Kamu dapat <span className="text-[var(--color-primary)] font-bold">{xp} XP</span></p>
          <button onClick={onBack} className="btn-back mt-4">KEMBALI KE LEARNING PATH</button>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--color-text-muted)] mb-4">Tidak ada soal untuk pelajaran ini</p>
        <button onClick={onBack} className="btn-back">KEMBALI</button>
      </div>
    );
  }

  const content = question.content as any;
  const currentAnswer = answers[question.id];
  const hasAnswer = currentAnswer !== undefined && currentAnswer !== null;
  const total = questions.length;
  const progress = ((currentQ + (showResult ? 1 : 0)) / total) * 100;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      <Confetti active={showConfetti} />
      <div className="px-4 py-3 flex items-center gap-4 border-b border-[var(--color-border)]">
        <button onClick={onBack} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <ProgressBar value={progress} max={100} className="flex-1" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--color-primary)] font-bold">{xp}</span>
          <span className="text-[var(--color-text-muted)]">XP</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Heart className="w-4 h-4 text-[var(--color-accent-red)]" />
          <span className="font-bold">{hearts}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full">
        <p className="text-xs text-[var(--color-text-muted)] font-medium mb-4">Soal {currentQ + 1} dari {total}</p>
        <h2 className="text-lg font-bold text-center mb-6">{question.prompt}</h2>
        <div className="w-full mb-4">
          {question.type === "mcq" && (
            <MultipleChoice
              options={content.options || []}
              selected={currentAnswer}
              onSelect={handleAnswer}
              disabled={showResult}
            />
          )}
          {question.type === "fill_blank" && (
            <FillBlank
              starterCode={content.starterCode || ""}
              blanks={content.blanks || []}
              answers={currentAnswer || {}}
              onAnswer={handleAnswer}
              disabled={showResult}
            />
          )}
          {question.type === "predict_output" && (
            <PredictOutput
              code={content.code || ""}
              options={content.options || []}
              selected={currentAnswer}
              onSelect={handleAnswer}
              disabled={showResult}
            />
          )}
        </div>
        {!showResult && (
          <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-yellow)] transition-colors mb-4">
            <Lightbulb className="w-4 h-4" />
            {showHint ? "Sembunyikan hint" : "Butuh hint?"}
          </button>
        )}
        {showHint && content.hints?.[0] && (
          <div className="w-full bg-[var(--color-accent-yellow)]/10 border border-[var(--color-accent-yellow)]/30 rounded-xl p-4 mb-4 animate-fade-in">
            <p className="text-sm text-[var(--color-accent-yellow)]">💡 {content.hints[0]}</p>
          </div>
        )}
        {showResult && (
          <div className={`w-full rounded-xl p-4 mb-4 animate-slide-up ${correct ? "bg-[var(--color-primary-light)] border border-[var(--color-primary)]" : "bg-[var(--color-accent-red)]/10 border border-[var(--color-accent-red)]"}`}>
            <p className={`font-bold text-center ${correct ? "text-[var(--color-primary)]" : "text-[var(--color-accent-red)]"}`}>
              {correct ? "✅ Benar!" : "❌ Salah, coba lagi!"}
            </p>
            {correct && <p className="text-xs text-center text-[var(--color-text-muted)] mt-1">+{question.xpReward || 10} XP</p>}
          </div>
        )}
        <div className="flex gap-3 w-full">
          {!showResult ? (
            <Button fullWidth disabled={!hasAnswer} onClick={handleCheck}>CEK JAWABAN</Button>
          ) : correct ? (
            <Button fullWidth onClick={handleNext}>{isLast ? "SELESAIKAN" : "LANJUTKAN"}</Button>
          ) : (
            <Button fullWidth variant="secondary" onClick={() => { setShowResult(false); setAnswers((prev) => { const n = { ...prev }; delete n[question.id]; return n; }); }}>
              COBA LAGI
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
