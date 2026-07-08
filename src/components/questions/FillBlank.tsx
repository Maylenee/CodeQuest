interface FillBlankProps {
  starterCode: string;
  blanks: { id: string; answer: string }[];
  answers: Record<string, string>;
  onAnswer: (answers: Record<string, string>) => void;
  disabled?: boolean;
}

export function FillBlank({ starterCode, blanks, answers, onAnswer, disabled }: FillBlankProps) {
  const handleChange = (id: string, value: string) => {
    onAnswer({ ...answers, [id]: value });
  };

  const parts = starterCode.split("____");
  return (
    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-4 font-mono text-sm leading-relaxed">
      {parts.map((part, i) => (
        <span key={i}>
          <span className="text-[var(--color-text-primary)]">{part}</span>
          {i < blanks.length && (
            <input
              type="text"
              value={answers[blanks[i].id] || ""}
              onChange={(e) => handleChange(blanks[i].id, e.target.value)}
              disabled={disabled}
              className="inline-block w-24 mx-1 px-2 py-0.5 bg-[var(--color-bg-primary)] border-2 border-[var(--color-border)] rounded-lg text-center font-mono text-sm text-[var(--color-primary)] focus:border-[var(--color-primary)] focus:outline-none disabled:opacity-60"
              placeholder="..."
            />
          )}
        </span>
      ))}
    </div>
  );
}
