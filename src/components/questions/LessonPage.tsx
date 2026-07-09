import { useEffect, useState } from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Confetti } from "../ui/Confetti";
import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";
import { PredictOutput } from "./PredictOutput";
import { SpotBug } from "./SpotBug";
import { WriteCode } from "./WriteCode";
import { DragDrop } from "./DragDrop";
import { Refactor } from "./Refactor";
import { useGameStore } from "../../lib/store";
import { questionsGet, questionVerify, progressUpdate, submissionCreate, userStreak } from "../../api";
import { Lightbulb, Heart, X } from "lucide-react";
import type { Question } from "../../lib/types";
import "./Questions.css";

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
        const track = useGameStore.getState().selectedTrack;
        const data = await questionsGet(lessonId, track);
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
      } else if (question.type === "spot_bug") {
        const bugLines = (content as any).bugLines || [];
        const selected = (answer as number[]) || [];
        isCorrect = bugLines.length === selected.length && bugLines.every((b: number) => selected.includes(b));
      } else if (question.type === "drag_drop") {
        const order = (answer as number[]) || [];
        isCorrect = order.every((idx: number, pos: number) => idx === pos);
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
      try {
        await progressUpdate({ userId: uid, lessonId, status: "completed", score: 30, xpReward: 20 });
      } catch {}
      const stored = JSON.parse(localStorage.getItem(`codequest_progress_${uid}`) || "[]");
      if (!stored.find((p: any) => p.lessonId === lessonId)) {
        stored.push({ lessonId, status: "completed" });
        localStorage.setItem(`codequest_progress_${uid}`, JSON.stringify(stored));
      }
    } else {
      setCurrentQ((p) => p + 1);
    }
  };

  if (loading) {
    return <div className="lp-loading">Memuat soal...</div>;
  }

  if (lessonComplete) {
    return (
      <div className="lesson-modal-overlay">
        <div className="lesson-modal-backdrop" />
        <div className="lesson-modal-content">
          <div className="lp-complete">
            <Confetti active={true} />
            <div className="lp-complete-inner">
              <h1 className="lp-complete-title">Pelajaran Selesai! 🎉</h1>
              <p className="lp-complete-desc">Kamu dapat <span className="lp-complete-xp">{xp} XP</span></p>
              <button onClick={onBack} className="btn-back lp-complete-btn">KEMBALI KE LEARNING PATH</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="lp-empty">
        <p className="lp-empty-text">Tidak ada soal untuk pelajaran ini</p>
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
    <div className="lesson-modal-overlay">
      <div className="lesson-modal-backdrop" />
      <div className="lesson-modal-content">
        <Confetti active={showConfetti} />
        <div className="lp-body">
        {/* Compact top bar: X, progress, XP, hearts */}
        <div className="lp-top-bar">
          <button onClick={onBack} className="lp-close-btn" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <ProgressBar value={progress} max={100} className="lp-progress" />
          <div className="lp-stat">
            <span className="lp-stat--xp">{xp}</span>
            <span className="lp-stat-label">XP</span>
          </div>
          <div className="lp-stat--hearts">
            <Heart className="lp-heart-icon" />
            <span className="lp-heart-value">{hearts}</span>
          </div>
        </div>

        <p className="lp-question-num">Soal {currentQ + 1} dari {total}</p>
        <h2 className="lp-question-title">{question.prompt}</h2>
        <div className="lp-question-area">
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
          {question.type === "spot_bug" && (
            <SpotBug
              code={content.code || ""}
              bugLines={content.bugLines || []}
              selectedLines={currentAnswer || []}
              onSelect={(lines) => handleAnswer(lines)}
              disabled={showResult}
            />
          )}
          {question.type === "write_code" && (
            <WriteCode
              starterCode={content.starterCode}
              value={currentAnswer || ""}
              onChange={(code) => handleAnswer(code)}
              disabled={showResult}
            />
          )}
          {question.type === "drag_drop" && (
            <DragDrop
              codeLines={content.codeLines || []}
              order={currentAnswer || (content.codeLines || []).map((_: string, i: number) => i)}
              onChange={(order) => handleAnswer(order)}
              disabled={showResult}
            />
          )}
          {question.type === "refactor" && (
            <Refactor
              code={content.code || ""}
              value={currentAnswer || ""}
              onChange={(code) => handleAnswer(code)}
              disabled={showResult}
            />
          )}
        </div>
        {!showResult && (
          <button onClick={() => setShowHint(!showHint)} className="lp-hint-btn">
            <Lightbulb className="w-4 h-4" />
            {showHint ? "Sembunyikan hint" : "Butuh hint?"}
          </button>
        )}
        {showHint && content.hints?.[0] && (
          <div className="lp-hint-box">
            <p className="lp-hint-text">💡 {content.hints[0]}</p>
          </div>
        )}
        {showResult && (
          <div className={`lp-result-box ${correct ? "lp-result-box--correct" : "lp-result-box--wrong"}`}>
            <p className={`lp-result-text ${correct ? "lp-result-text--correct" : "lp-result-text--wrong"}`}>
              {correct ? "✅ Benar!" : "❌ Salah, coba lagi!"}
            </p>
            {correct && <p className="lp-result-xp">+{question.xpReward || 10} XP</p>}
          </div>
        )}
        <div className="lp-btn-row">
          {!showResult ? (
            <button className="lp-btn-flat" style={{ width: "100%" }} disabled={!hasAnswer} onClick={handleCheck}>CEK JAWABAN</button>
          ) : correct ? (
            <button className="lp-btn-flat" style={{ width: "100%" }} onClick={handleNext}>{isLast ? "SELESAIKAN" : "LANJUTKAN"}</button>
          ) : (
            <button className="lp-btn-flat lp-btn-flat--secondary" style={{ width: "100%" }} onClick={() => { setShowResult(false); setAnswers((prev) => { const n = { ...prev }; delete n[question.id]; return n; }); }}>
              COBA LAGI
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

