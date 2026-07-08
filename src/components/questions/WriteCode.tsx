import "./Questions.css";

interface WriteCodeProps {
  starterCode?: string;
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}

export function WriteCode({ starterCode, value, onChange, disabled }: WriteCodeProps) {
  return (
    <div>
      {starterCode && (
        <div className="qc-starter-block">
          <code className="qc-starter-text">{starterCode}</code>
        </div>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Tulis kode di sini..."
        className="qc-textarea"
        spellCheck={false}
      />
    </div>
  );
}
