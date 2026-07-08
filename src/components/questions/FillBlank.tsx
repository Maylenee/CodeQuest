import "./Questions.css";

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
    <div className="qc-code-block">
      {parts.map((part, i) => (
        <span key={i}>
          <span className="qc-code-text">{part}</span>
          {i < blanks.length && (
            <input
              type="text"
              value={answers[blanks[i].id] || ""}
              onChange={(e) => handleChange(blanks[i].id, e.target.value)}
              disabled={disabled}
              className="qc-blank-input"
              placeholder="..."
            />
          )}
        </span>
      ))}
    </div>
  );
}
