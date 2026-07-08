import { useState } from "react";
import "./Questions.css";

interface SpotBugProps {
  code: string;
  bugLines: number[];
  selectedLines: number[];
  onSelect: (lines: number[]) => void;
  disabled?: boolean;
}

export function SpotBug({ code, bugLines, selectedLines, onSelect, disabled }: SpotBugProps) {
  const lines = code.split("\n");

  const toggleLine = (idx: number) => {
    if (disabled) return;
    const exists = selectedLines.includes(idx);
    onSelect(exists ? selectedLines.filter((l) => l !== idx) : [...selectedLines, idx]);
  };

  return (
    <div>
      <p className="qc-hint-label">Klik baris yang mengandung bug:</p>
      <div className="qc-code-lines">
        {lines.map((line, i) => (
          <div
            key={i}
            onClick={() => toggleLine(i)}
            className={`qc-line-row ${selectedLines.includes(i) ? "qc-line-row--selected" : ""} ${!disabled ? "qc-line-row--hoverable" : ""}`}
          >
            <span className="qc-line-num">{i + 1}</span>
            <span className={`qc-line-content ${selectedLines.includes(i) ? "qc-line-content--selected" : "qc-line-content--normal"}`}>
              {line || " "}
            </span>
          </div>
        ))}
      </div>
      {selectedLines.length > 0 && (
        <p className="qc-selected-info">
          Terpilih: baris {selectedLines.map((l) => l + 1).join(", ")}
        </p>
      )}
    </div>
  );
}
