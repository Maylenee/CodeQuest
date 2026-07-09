import { useState, useMemo } from "react";
import { LessonPage } from "../questions/LessonPage";
import { Code2, Monitor, Cog, Terminal, BrainCircuit, Plug, Wifi, Database } from "lucide-react";
import { useGameStore } from "../../lib/store";
import { getTrackContent } from "../../lib/trackContent";
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

// ── Layout constants: single source of truth for both nodes AND the SVG curve ──
const ROW_SPACING = 138;   // vertical distance between two consecutive node centers (px)
const TOP_PADDING = 90;    // space above the first node (room for MULAI badge / floating icons)
const BOTTOM_PADDING = 60; // space below the last node
const X_LEFT = 34;         // left node x position, in % of container width
const X_RIGHT = 66;        // right node x position, in % of container width

function getNodes(track: string, skillLevel: number) {
  const meta = getTrackContent(track).nodes;
  const uid = localStorage.getItem("codequest_userId") || "user-default";
  let stored: { lessonId: string; status: string }[] = [];
  try {
    stored = JSON.parse(localStorage.getItem(`codequest_progress_${uid}`) || "[]");
  } catch {}
  const completedIds = new Set(stored.filter((p) => p.status === "completed").map((p) => p.lessonId));
  const autoCompleteCount = skillLevel >= 4 ? 3 : skillLevel >= 3 ? 2 : skillLevel >= 2 ? 1 : 0;
  let foundActive = false;
  return meta.map((m, i) => {
    if (completedIds.has(m.id)) return { ...m, status: "completed" as const, progress: 100 };
    if (i < autoCompleteCount) return { ...m, status: "completed" as const, progress: 100 };
    if (!foundActive) {
      foundActive = true;
      return { ...m, status: "in_progress" as const, progress: 0 };
    }
    return { ...m, status: "locked" as const, progress: 0 };
  });
}

// ── Compute node center coordinates (%, px) — this is the ONLY place positions come from ──
function getNodeCoords(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: i % 2 === 0 ? X_LEFT : X_RIGHT,
    y: TOP_PADDING + i * ROW_SPACING,
  }));
}

// ── Build a smooth S-curve path that passes exactly through each node coordinate ──
function buildPathD(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
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

function Checkmark() {
  return (
    <svg className="skillpath-checkmark" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#58cc02" />
      <path d="M7 12.5 L10.5 16 L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NodeIcon({ node }: { node: Node_ }) {
  const isActive = node.status === "in_progress";
  const isCompleted = node.status === "completed";
  const isChest = node.type === "chest";
  const isMilestone = node.type === "milestone";

  if (isChest) {
    if (isCompleted) {
      return (
        <div className="skillpath-icon-wrap skillpath-icon-wrap--chest-done">
          <img draggable={false} src="https://d35aaqx5ub95lt.cloudfront.net/images/path/0ae912c0b7a66354a850e6733ef653cb.svg" alt="" />
          <Checkmark />
        </div>
      );
    }
    return (
      <div className="skillpath-icon-wrap skillpath-icon-wrap--chest">
        <img draggable={false} src="https://d35aaqx5ub95lt.cloudfront.net/images/path/0ae912c0b7a66354a850e6733ef653cb.svg" alt="" />
      </div>
    );
  }

  if (isMilestone) {
    if (isCompleted) {
      return (
        <div className="skillpath-icon-wrap skillpath-icon-wrap--milestone-done">
          <TrophySvg />
          <Checkmark />
        </div>
      );
    }
    return (
      <div className="skillpath-icon-wrap skillpath-icon-wrap--milestone">
        <TrophySvg />
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="skillpath-icon-wrap skillpath-icon-wrap--active">
        <button className="skillpath-active-btn" aria-label="Lesson">
          <img draggable={false} src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg" alt="" />
        </button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="skillpath-icon-wrap skillpath-icon-wrap--completed">
        <div className="skillpath-completed-btn">
          <img draggable={false} src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg" alt="" />
        </div>
        <Checkmark />
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
  const selectedTrack = useGameStore((s) => s.selectedTrack);
  const skillLevel = useGameStore((s) => s.skillLevel);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node_[]>(() => getNodes(selectedTrack, skillLevel));

  // Single source of truth: coordinates for nodes AND the curve are derived from the same array
  const coords = useMemo(() => getNodeCoords(nodes.length), [nodes.length]);
  const totalHeight = TOP_PADDING + (nodes.length - 1) * ROW_SPACING + BOTTOM_PADDING;
  const pathD = useMemo(() => buildPathD(coords), [coords]);

  if (activeLesson) {
    return (
      <LessonPage
        lessonId={activeLesson}
        onBack={() => {
          setActiveLesson(null);
          setNodes(getNodes(selectedTrack, skillLevel));
        }}
      />
    );
  }

  return (
    <div className="skillpath" style={{ height: totalHeight }}>
      {/* Curve connector — generated from the exact same coordinates as the nodes below */}
      <svg
        className="path-connector"
        viewBox={`0 0 100 ${totalHeight}`}
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Tech floating icons */}
      <TechFloatingIcons />

      {/* Path nodes — absolutely positioned on the exact same coordinates as the curve */}
      {nodes.map((node, i) => {
        const isActive = node.status === "in_progress";
        const isLocked = node.status === "locked";
        const isLast = i === nodes.length - 1;
        const { x, y } = coords[i];

        return (
          <div
            key={node.id}
            className="skillpath-node"
            style={{ left: `${x}%`, top: y }}
          >
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
            {!isLast && <span className="skillpath-label">{node.title}</span>}
          </div>
        );
      })}
    </div>
  );
}