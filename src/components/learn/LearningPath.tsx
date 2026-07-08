import { useState } from "react";
import { LessonPage } from "../questions/LessonPage";
import "./LearningPath.css";

const nodes = [
  { id: "l1", title: "Apa itu Python?", order: 1, status: "in_progress" as const, type: "lesson" as const },
  { id: "l2", title: "Variabel & Tipe Data", order: 2, status: "locked" as const, type: "lesson" as const },
  { id: "l3", title: "Bonus Challenge", order: 3, status: "locked" as const, type: "chest" as const },
  { id: "l4", title: "Strings & Manipulasi", order: 4, status: "locked" as const, type: "lesson" as const },
  { id: "l5", title: "Unit 1 Selesai!", order: 5, status: "locked" as const, type: "milestone" as const },
];

function CapybaraSvg() {
  return (
    <svg viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="24" rx="13" ry="11" fill="#8B6914" />
      <circle cx="20" cy="17" r="10" fill="#8B6914" />
      <circle cx="14" cy="15" r="2.5" fill="#131f24" />
      <circle cx="26" cy="15" r="2.5" fill="#131f24" />
      <circle cx="15" cy="14" r="1" fill="#fff" />
      <circle cx="27" cy="14" r="1" fill="#fff" />
      <ellipse cx="20" cy="21" rx="4" ry="2.5" fill="#6B4F0A" />
      <ellipse cx="20" cy="21.5" rx="1.5" ry="0.8" fill="#131f24" />
      <circle cx="10" cy="12" r="2.5" fill="#7A5D10" />
      <circle cx="30" cy="12" r="2.5" fill="#7A5D10" />
      <circle cx="10" cy="12" r="1" fill="#5A3D08" />
      <circle cx="30" cy="12" r="1" fill="#5A3D08" />
      <path d="M14 26 Q20 30 26 26" stroke="#6B4F0A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function TrophySvg() {
  return (
    <svg viewBox="0 0 28 32" fill="none">
      <path d="M8 4 H20 V12 C20 16.4 16 20 14 20 C12 20 8 16.4 8 12 V4 Z" fill="#6a7f8c" />
      <rect x="10" y="20" width="8" height="4" rx="1" fill="#5a6a75" />
      <rect x="6" y="2" width="4" height="6" rx="1" fill="#5e7080" />
      <rect x="18" y="2" width="4" height="6" rx="1" fill="#5e7080" />
      <rect x="12" y="24" width="4" height="4" rx="1" fill="#5a6a75" />
      <path d="M14 4 L15 7 L18 7 L15.5 9 L16.5 12 L14 10 L11.5 12 L12.5 9 L10 7 L13 7 Z" fill="#8ba0ad" />
    </svg>
  );
}

function NodeIcon({ node }: { node: typeof nodes[0] }) {
  const isActive = node.status === "in_progress";
  const isLocked = node.status === "locked";
  const isChest = node.type === "chest";
  const isMilestone = node.type === "milestone";

  if (isChest) {
    return (
      <div className="skillpath-icon-wrap skillpath-icon-wrap--chest">
        <img draggable={false} src="https://d35aaqx5ub95lt.cloudfront.net/images/path/0ae912c0b7a66354a850e6733ef653cb.svg" alt="" />
      </div>
    );
  }

  if (isMilestone) {
    return (
      <div className="skillpath-icon-wrap skillpath-icon-wrap--milestone">
        <TrophySvg />
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="skillpath-icon-wrap skillpath-icon-wrap--active">
        <svg className="skillpath-ring" viewBox="0 0 100 100">
          <g transform="translate(50, 50)">
            <path
              d="M3.06e-15,-50 A50,50 0 1,1 -3.06e-15,50 A50,50 0 1,1 3.06e-15,-50 M-7.72e-15,-42 A42,42 0 1,0 7.72e-15,42 A42,42 0 1,0 -7.72e-15,-42"
              fill="#3a4750"
            />
            <path
              d="M3.06e-15,-50 A50,50 0 0,1 49.39,-7.80 L41.49,-6.56 A42,42 0 0,0 3.06e-15,-42 Z"
              fill="#58cc02"
            />
          </g>
        </svg>
        <button className="skillpath-active-btn" aria-label="Lesson">
          <img draggable={false} src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg" alt="" />
        </button>
      </div>
    );
  }

  return (
    <div className="skillpath-icon-wrap skillpath-icon-wrap--locked">
      <img className="skillpath-locked-icon" draggable={false} src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/cbb0e971ac10030a120848c71c419892.svg" alt="" />
    </div>
  );
}

export function LearningPath() {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  if (activeLesson) {
    return <LessonPage lessonId={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <div className="skillpath">
      {nodes.map((node, i) => {
        const posClass = `skillpath-node--pos${i}`;
        const isActive = node.status === "in_progress";
        const isLocked = node.status === "locked";

        return (
          <div key={node.id} className={`skillpath-node ${posClass}`}>
            {/* Badge above active node */}
            {isActive && (
              <div className="skillpath-badge-outer">
                <div className="skillpath-badge">
                  <div className="skillpath-badge-inner">MULAI</div>
                  <div className="skillpath-badge-arrow" />
                </div>
              </div>
            )}

            {/* Capybara beside node 4 (index 3) */}
            {i === 3 && (
              <div className="skillpath-capybara skillpath-capybara--right">
                <div className="mascot-bob skillpath-capybara-body">
                  <CapybaraSvg />
                  <div className="skillpath-capybara-base" />
                </div>
              </div>
            )}

            {/* Clickable node area */}
            <div
              className="skillpath-clickable"
              role="button"
              tabIndex={0}
              onClick={isLocked ? undefined : () => setActiveLesson(node.id)}
            >
              <NodeIcon node={node} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
