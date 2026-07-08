import { useState, useCallback } from "react";
import { GripVertical } from "lucide-react";
import "./Questions.css";

interface DragDropProps {
  codeLines: string[];
  order: number[];
  onChange: (order: number[]) => void;
  disabled?: boolean;
}

export function DragDrop({ codeLines, order, onChange, disabled }: DragDropProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    if (disabled) return;
    setDragIdx(idx);
  };

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx || disabled) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(dragIdx, 1);
    newOrder.splice(idx, 0, moved);
    onChange(newOrder);
    setDragIdx(idx);
  }, [dragIdx, order, onChange, disabled]);

  const handleDragEnd = () => {
    setDragIdx(null);
  };

  return (
    <div>
      <p className="qc-drag-label">Seret dan urutkan baris kode berikut:</p>
      <div className="qc-drag-list">
        {order.map((lineIdx, i) => (
          <div
            key={`${lineIdx}-${i}`}
            draggable={!disabled}
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDragEnd={handleDragEnd}
            className={`qc-drag-item ${dragIdx === i ? "qc-drag-item--dragging" : ""} ${!disabled ? "qc-drag-item--active" : ""}`}
          >
            <GripVertical className="qc-drag-grip" />
            <span className="qc-drag-num">{i + 1}</span>
            <span className="qc-drag-text">{codeLines[lineIdx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
