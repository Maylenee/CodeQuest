import { Card } from "../ui/Card";
import "./Questions.css";

interface PredictOutputProps {
  code: string;
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export function PredictOutput({ code, options, selected, onSelect, disabled }: PredictOutputProps) {
  return (
    <div>
      <div className="qc-code-display">
        <code className="qc-code-text">{code}</code>
      </div>
      <div className="qc-grid">
        {options.map((opt, i) => (
          <Card
            key={i}
            hover={!disabled}
            selected={selected === i}
            onClick={() => !disabled && onSelect(i)}
            className="qc-option"
          >
            <div className={`qc-radio ${selected === i ? "qc-radio--selected" : ""}`}>
              {selected === i && <div className="qc-radio-dot" />}
            </div>
            <span className="qc-option-text">{opt}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
