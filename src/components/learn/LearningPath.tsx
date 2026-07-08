import { useState } from "react";
import { LessonPage } from "../questions/LessonPage";
import { Code2, Monitor, Cog, Terminal, BrainCircuit, Plug, Wifi, Database } from "lucide-react";
import "./LearningPath.css";

type NodeData = {
  id: string;
  title: string;
  order: number;
  type: "lesson" | "chest" | "milestone";
};

type Node_ = NodeData & {
  status: "completed" | "in_progress" | "locked";
  progress: number;
};

const nodeMeta: NodeData[] = [
  { id: "l1", title: "Apa itu Python?", order: 1, type: "lesson" },
  { id: "l2", title: "Variabel & Tipe Data", order: 2, type: "lesson" },
  { id: "l3", title: "Bonus Challenge", order: 3, type: "chest" },
  { id: "l4", title: "Strings & Manipulasi", order: 4, type: "lesson" },
  { id: "l5", title: "Unit 1 Selesai!", order: 5, type: "milestone" },
];

function getNodes() {
  const uid = localStorage.getItem("codequest_userId") || "user-default";
  let stored: { lessonId: string; status: string }[] = [];
  try {
    stored = JSON.parse(localStorage.getItem(`codequest_progress_${uid}`) || "[]");
  } catch {}
  const completedIds = new Set(stored.filter((p) => p.status === "completed").map((p) => p.lessonId));
  let foundActive = false;
  return nodeMeta.map((m) => {
    if (completedIds.has(m.id)) {
      return { ...m, status: "completed" as const, progress: 100 };
    }
    if (!foundActive) {
      foundActive = true;
      return { ...m, status: "in_progress" as const, progress: 0 };
    }
    return { ...m, status: "locked" as const, progress: 0 };
  });
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

const techIcons = [
  { icon: Code2, label: "code", x: 5, y: 3, delay: 0 },
  { icon: Monitor, label: "monitor", x: 85, y: 8, delay: 0.5 },
  { icon: Cog, label: "settings", x: 10, y: 42, delay: 1 },
  { icon: Terminal, label: "terminal", x: 78, y: 55, delay: 1.5 },
  { icon: BrainCircuit, label: "AI", x: 50, y: 2, delay: 2 },
  { icon: Plug, label: "plugin", x: 8, y: 68, delay: 0.3 },
  { icon: Wifi, label: "signal", x: 85, y: 32, delay: 0.8 },
  { icon: Database, label: "database", x: 88, y: 75, delay: 1.2 },
];

function TechFloatingIcons() {
  return (
    <>
      {techIcons.map((t, i) => {
        const Icon = t.icon;
        return (
          <div
            key={i}
            className="tech-float"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              animationDelay: `${t.delay}s`,
            }}
            title={t.label}
          >
            <Icon size={28} />
          </div>
        );
      })}
    </>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * Math.min(progress, 100)) / 100;
  return (
    <svg className="skillpath-ring" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#3a4750" strokeWidth="6" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="#58cc02"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
    </svg>
  );
}

function NodeIcon({ node }: { node: Node_ }) {
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
        <ProgressRing progress={node.progress} />
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
  const [nodes, setNodes] = useState<Node_[]>(() => getNodes());

  if (activeLesson) {
    return (
      <LessonPage
        lessonId={activeLesson}
        onBack={() => {
          setActiveLesson(null);
          setNodes(getNodes());
        }}
      />
    );
  }

  return (
    <div className="skillpath">
      {/* Zigzag SVG connector path */}
      <svg className="path-connector" viewBox="0 0 200 600" preserveAspectRatio="none">
        <path
          d="M100,0 C130,20 130,50 100,70 C70,90 70,120 100,140 C130,160 130,190 100,210 C70,230 70,260 100,280 C130,300 130,330 100,350 C70,370 70,400 100,420 C130,440 130,470 100,490 C70,510 70,540 100,560"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
          opacity="0.12"
          strokeLinecap="round"
        />
      </svg>

      {/* Tech floating icons */}
      <TechFloatingIcons />

      {/* Path nodes */}
      {nodes.map((node, i) => {
        const posClass = `skillpath-node--pos${i}`;
        const isActive = node.status === "in_progress";
        const isLocked = node.status === "locked";
        const isLast = i === nodes.length - 1;

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

            {/* Clickable node area */}
            <div
              className="skillpath-clickable"
              role="button"
              tabIndex={0}
              onClick={isLocked ? undefined : () => setActiveLesson(node.id)}
            >
              <NodeIcon node={node} />
            </div>

            {/* Node label */}
            {!isLast && (
              <span className="skillpath-label">{node.title}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
