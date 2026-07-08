import { Card } from "../ui/Card";

interface MultipleChoiceProps {
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export function MultipleChoice({ options, selected, onSelect, disabled }: MultipleChoiceProps) {
  return (
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
          <span className="text-sm font-semibold">{opt}</span>
        </Card>
      ))}
    </div>
  );
}
