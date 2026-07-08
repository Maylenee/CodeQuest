import { Card } from "../ui/Card";

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
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre overflow-x-auto">
        <code className="text-[var(--color-text-primary)]">{code}</code>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, i) => (
          <Card
            key={i}
            hover={!disabled}
            selected={selected === i}
            onClick={() => !disabled && onSelect(i)}
            className="flex items-center gap-3 p-4"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === i ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--color-border)]"}`}>
              {selected === i && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span className="text-sm font-mono">{opt}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
