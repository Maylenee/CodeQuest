import React from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiPhp,
  SiC,
  SiCplusplus,
  SiSharp,
  SiBootstrap,
  SiReact,
  SiMysql,
  SiJquery,
  SiDjango,
  SiNumpy,
  SiPandas,
  SiNodedotjs,
  SiR,
  SiTypescript,
  SiAngular,
  SiGit,
  SiPostgresql,
  SiMongodb,
  SiDotnet,
  SiGo,
  SiKotlin,
  SiSass,
  SiVuedotjs,
  SiScipy,
  SiXml,
  SiGnubash,
  SiRust,
} from "react-icons/si";
import {
  Database,
  FileSpreadsheet,
  Cloud,
  Network,
  ShieldCheck,
  BarChart3,
  LineChart,
  Accessibility,
  Code,
} from "lucide-react";

export function DashboardIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

export function ProgressIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l5-5 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LeagueIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6H4a1 1 0 00-1 1c0 3 2 4 4 4M17 6h3a1 1 0 011 1c0 3-2 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookmarkIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h12v18l-6-4-6 4V3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CertificateIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M9 20l3-2 3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProfileIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0116 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LANG_META = {
  HTML: { abbr: "5", color: "#E34F26" },
  CSS: { abbr: "CSS", color: "#1572B6" },
  JavaScript: { abbr: "JS", color: "#F7DF1E" },
  SQL: { abbr: "SQL", color: "#336791" },
  Python: { abbr: "Py", color: "#3776AB" },
  Java: { abbr: "JV", color: "#E76F00" },
  PHP: { abbr: "PH", color: "#777BB4" },
  C: { abbr: "C", color: "#5C6BC0" },
  "C++": { abbr: "C+", color: "#00599C" },
  "C#": { abbr: "C#", color: "#68217A" },
  "Bootstrap 4": { abbr: "B4", color: "#7952B3" },
  "Bootstrap 5": { abbr: "B5", color: "#7952B3" },
  "Bootstrap 3": { abbr: "B3", color: "#7952B3" },
  React: { abbr: "Rx", color: "#61DAFB" },
  MySQL: { abbr: "My", color: "#00758F" },
  jQuery: { abbr: "JQ", color: "#0769AD" },
  Django: { abbr: "Dj", color: "#092E20" },
  NumPy: { abbr: "Np", color: "#013243" },
  Pandas: { abbr: "Pd", color: "#150458" },
  "Node.js": { abbr: "No", color: "#339933" },
  R: { abbr: "R", color: "#276DC3" },
  TypeScript: { abbr: "TS", color: "#3178C6" },
  AngularJS: { abbr: "NG", color: "#DD0031" },
  Git: { abbr: "Gt", color: "#F05032" },
  PostgreSQL: { abbr: "Pg", color: "#336791" },
  MongoDB: { abbr: "Mo", color: "#47A248" },
  ASP: { abbr: "AS", color: "#512BD4" },
  Go: { abbr: "Go", color: "#00ADD8" },
  Kotlin: { abbr: "Kt", color: "#7F52FF" },
  "AWS ML": { abbr: "ML", color: "#FF9900" },
  SASS: { abbr: "Ss", color: "#CC6699" },
  "Vue.js": { abbr: "Vu", color: "#42B883" },
  DSA: { abbr: "DS", color: "#5C6BC0" },
  SciPy: { abbr: "Sp", color: "#8CAAE6" },
  "Cyber Security": { abbr: "Cy", color: "#0EA5E9" },
  "Data Science": { abbr: "Da", color: "#F50057" },
  "AWS Cloud": { abbr: "AW", color: "#FF9900" },
  "AWS Serverless": { abbr: "SL", color: "#FF9900" },
  Accessibility: { abbr: "Ac", color: "#6D28D9" },
  Excel: { abbr: "Xl", color: "#217346" },
  XML: { abbr: "XM", color: "#005A9C" },
  Bash: { abbr: "Ba", color: "#4EAA25" },
  Rust: { abbr: "Rs", color: "#CE422B" },
  Statistics: { abbr: "St", color: "#8E44AD" },
  "W3.CSS": { abbr: "W3", color: "#4CAF50" },
};

function isLightColor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export function LangIcon({ name, className }) {
  const meta =
    LANG_META[name] || { abbr: (name || "?").slice(0, 2).toUpperCase(), color: "#64748b" };
  const text = isLightColor(meta.color) ? "#1f2937" : "#ffffff";
  const fontSize = meta.abbr.length >= 4 ? 7 : meta.abbr.length === 3 ? 9 : 11;
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" fill={meta.color} />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight="700"
        fill={text}
      >
        {meta.abbr}
      </text>
    </svg>
  );
}

const LANG_LOGO = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: SiOpenjdk,
  PHP: SiPhp,
  C: SiC,
  "C++": SiCplusplus,
  "C#": SiSharp,
  "Bootstrap 4": SiBootstrap,
  "Bootstrap 5": SiBootstrap,
  "Bootstrap 3": SiBootstrap,
  React: SiReact,
  MySQL: SiMysql,
  jQuery: SiJquery,
  Django: SiDjango,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  "Node.js": SiNodedotjs,
  R: SiR,
  TypeScript: SiTypescript,
  AngularJS: SiAngular,
  Git: SiGit,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  ASP: SiDotnet,
  Go: SiGo,
  Kotlin: SiKotlin,
  SASS: SiSass,
  "Vue.js": SiVuedotjs,
  SciPy: SiScipy,
  XML: SiXml,
  Bash: SiGnubash,
  Rust: SiRust,
  SQL: Database,
  Excel: FileSpreadsheet,
  "AWS ML": Cloud,
  "AWS Cloud": Cloud,
  "AWS Serverless": Cloud,
  DSA: Network,
  "Cyber Security": ShieldCheck,
  "Data Science": BarChart3,
  Statistics: LineChart,
  Accessibility: Accessibility,
  "W3.CSS": Code,
};

export function LangLogo({ name, size = 28, className = "shrink-0" }) {
  const Logo = LANG_LOGO[name];
  const color = LANG_META[name]?.color;
  if (Logo) return <Logo size={size} className={className} color={color} />;
  return <LangIcon name={name} className={className} />;
}
