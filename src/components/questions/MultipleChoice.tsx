import { Card } from "../ui/Card";
import "./Questions.css";

interface MultipleChoiceProps {
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export function MultipleChoice({ options, selected, onSelect, disabled }: MultipleChoiceProps) {
  return (
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
  );
}
