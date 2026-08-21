import React, { useState } from "react";
import { Search, MoreVertical, ChevronDown, RefreshCw, Check } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Step data                                                          */
/* NOTE: only steps 1, 2 and 3 (index) were visible in the reference  */
/* screenshots. Steps 0, 4 and 5 are placeholders — swap in real copy */
/* once you have designs/content for them.                            */
/* ------------------------------------------------------------------ */

const AVATAR_STYLES = [
  { id: "creative", label: "Creative", emoji: "🦊", accent: "bg-orange-100" },
  { id: "casual", label: "Casual", emoji: "🦊", accent: "bg-green-100" },
  { id: "professional", label: "Professional", emoji: "🦊", accent: "bg-slate-800" },
];

const TOPICS = [
  { id: "web", title: "Web Development", desc: "HTML, CSS, JavaScript and modern frameworks" },
  { id: "data", title: "Data Science", desc: "Python, SQL, analytics and machine learning" },
  { id: "mobile", title: "Mobile Development", desc: "iOS, Android and cross-platform apps" },
  { id: "backend", title: "Backend Development", desc: "Servers, databases and APIs" },
];

const TOTAL_STEPS = 6;

/* ------------------------------------------------------------------ */
/* Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function TopNav() {
  return (
    <nav className="flex items-center gap-8 px-8 h-16 border-b border-slate-100">
      <div className="font-extrabold text-xl">
        <span className="text-green-600">Code</span>
        <span className="text-slate-900">Learn</span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-[15px] text-slate-700 font-medium">
        <span className="flex items-center gap-1 cursor-pointer">Tutorials <ChevronDown className="w-4 h-4" /></span>
        <span className="flex items-center gap-1 cursor-pointer">References <ChevronDown className="w-4 h-4" /></span>
        <span className="flex items-center gap-1 cursor-pointer">Exercises <ChevronDown className="w-4 h-4" /></span>
        <span className="flex items-center gap-1 cursor-pointer">Certificates <ChevronDown className="w-4 h-4" /></span>
      </div>
      <div className="flex-1 max-w-xs ml-auto relative">
        <input
          className="w-full bg-slate-50 rounded-full pl-4 pr-9 py-2 text-[14px] text-slate-500 outline-none"
          placeholder="Search..."
          readOnly
        />
        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
      <MoreVertical className="w-5 h-5 text-slate-500" />
      <div className="flex items-center gap-1">
        <span className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg">🦊</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>
    </nav>
  );
}

function StepDots({ step, total }) {
  return (
    <div className="flex justify-center gap-1.5 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i <= step ? "bg-green-500" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function NavButtons({ onBack, onContinue, onSkip, showSkip, continueLabel = "Continue" }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <button
        onClick={onBack}
        className="border border-slate-200 text-slate-700 text-[14px] font-semibold px-6 py-2.5 rounded-md hover:bg-slate-50"
      >
        Back
      </button>
      {showSkip && (
        <button
          onClick={onSkip}
          className="text-slate-700 text-[14px] font-semibold px-6 py-2.5 rounded-md hover:bg-slate-50"
        >
          Skip for now
        </button>
      )}
      <button
        onClick={onContinue}
        className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-6 py-2.5 rounded-md"
      >
        {continueLabel}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Individual steps                                                   */
/* ------------------------------------------------------------------ */

function WelcomeStep() {
  // Placeholder — no reference screenshot for this step.
  return (
    <div className="text-center max-w-md mx-auto">
        <h1 className="text-[28px] font-bold text-slate-900 mb-3">Welcome to CodeLearn! 👋</h1>
      <p className="text-[15px] text-slate-600">
        Let's set up your profile in a few quick steps so we can personalize your learning journey.
      </p>
    </div>
  );
}

function NicknameStep({ nickname }) {
  return (
    <div className="text-center max-w-md mx-auto">
      <h1 className="text-[26px] font-bold text-slate-900 mb-6">
        Choose your CodeLearn nickname <span className="align-middle">💚</span>
      </h1>
      <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-3 max-w-sm mx-auto">
        <span className="flex-1 text-left text-[15px] text-slate-800">{nickname}</span>
        <RefreshCw className="w-4 h-4 text-slate-400 cursor-pointer" />
        <Check className="w-4 h-4 text-green-500" />
      </div>
    </div>
  );
}

function AvatarStyleStep({ nickname, selected, onSelect }) {
  return (
    <div className="text-center">
      <h1 className="text-[26px] font-bold text-slate-900 mb-2">
        Pick your style, {nickname}
      </h1>
      <p className="text-[14px] text-slate-500 mb-8">Choose an avatar style that represents you</p>
      <div className="flex justify-center gap-6">
        {AVATAR_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`w-36 rounded-xl border-2 pt-6 pb-4 flex flex-col items-center gap-3 transition-colors ${
              selected === style.id
                ? "border-green-500 bg-green-50"
                : "border-slate-100 hover:border-slate-200"
            }`}
          >
            <span className={`w-16 h-16 rounded-full ${style.accent} flex items-center justify-center text-3xl`}>
              {style.emoji}
            </span>
            <span className="text-[14px] font-medium text-slate-800">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TopicsStep({ selected, onToggle }) {
  return (
    <div className="text-center">
      <h1 className="text-[26px] font-bold text-slate-900 mb-8">
        What you would like to learn? <span className="text-slate-400 font-medium text-[16px]">(optional)</span>
      </h1>
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onToggle(topic.id)}
            className={`text-left rounded-xl border px-5 py-4 transition-colors ${
              selected.includes(topic.id)
                ? "border-green-500 bg-green-50"
                : "border-slate-100 hover:border-slate-200"
            }`}
          >
            <p className="text-[15px] font-semibold text-slate-900 mb-1">{topic.title}</p>
            <p className="text-[13px] text-slate-500">{topic.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function FinishStep() {
  // Placeholder — no reference screenshot for this step.
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-[26px] font-bold text-slate-900 mb-3">You're all set!</h1>
      <p className="text-[15px] text-slate-600">
        Your profile is ready. Time to jump in and start earning XP.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel shell                                                     */
/* ------------------------------------------------------------------ */

export default function OnboardingCarousel({ onFinish, embedded = false }) {
  const [step, setStep] = useState(1); // start on the nickname step, like the screenshots
  const [nickname, setNickname] = useState("PixelTiger0021");
  const [avatarStyle, setAvatarStyle] = useState("creative");
  const [topics, setTopics] = useState([]);

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => {
    if (step === TOTAL_STEPS - 1) {
      onFinish?.({ nickname, avatarStyle, topics });
      return;
    }
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  };

  const toggleTopic = (id) =>
    setTopics((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const card = (
    <div className="relative bg-white rounded-2xl border border-slate-100 px-10 py-14">
      <StepDots step={step} total={TOTAL_STEPS} />

      {step === 0 && <WelcomeStep />}
      {step === 1 && <NicknameStep nickname={nickname} />}
      {step === 2 && (
        <AvatarStyleStep nickname={nickname} selected={avatarStyle} onSelect={setAvatarStyle} />
      )}
      {step === 3 && <TopicsStep selected={topics} onToggle={toggleTopic} />}
      {step >= 4 && <FinishStep />}

      <NavButtons
        onBack={goBack}
        onContinue={goNext}
        onSkip={goNext}
        showSkip={step === 3}
        continueLabel={step === TOTAL_STEPS - 1 ? "Get started" : "Continue"}
      />
    </div>
  );

  if (embedded) {
    return <div className="relative">{card}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNav />

      <div className="relative max-w-3xl mx-auto pt-16 px-6">
        {/* decorative blurred circles */}
        <div className="absolute -top-4 left-16 w-40 h-40 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -top-8 right-24 w-40 h-40 rounded-full bg-sky-200/30 blur-3xl" />

        {card}
      </div>
    </div>
  );
}
