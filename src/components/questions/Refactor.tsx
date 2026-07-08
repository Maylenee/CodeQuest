import "./Questions.css";

interface RefactorProps {
  code: string;
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}

export function Refactor({ code, value, onChange, disabled }: RefactorProps) {
  return (
    <div>
      <div className="qc-refactor-block">
        <p className="qc-refactor-label">Kode asli (perlu di-refactor):</p>
        <pre className="qc-refactor-code">{code}</pre>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Tulis hasil refactor di sini..."
        className="qc-textarea"
        spellCheck={false}
      />
    </div>
  );
}
