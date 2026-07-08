import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  expression?: "normal" | "happy" | "thinking" | "celebrate";
  className?: string;
}

export function Mascot({ size = "md", expression = "normal", className }: MascotProps) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const sizes = { sm: 48, md: 80, lg: 120 };
  const dim = sizes[size];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("mascot-idle", expression === "celebrate" && "animate-bounce-in")}
      >
        <rect x="30" y="45" width="60" height="55" rx="12" fill="#58CC02" />
        <rect x="25" y="15" width="70" height="40" rx="16" fill="#1CB0F6" />
        <rect x="55" y="2" width="10" height="18" rx="5" fill="#FFC800" />
        <circle cx="60" cy="6" r="6" fill="#FF4B4B" />
        <rect x="38" y="26" width="14" height={blink ? 2 : 12} rx="3" fill="white" className="transition-all duration-100" />
        <rect x="68" y="26" width="14" height={blink ? 2 : 12} rx="3" fill="white" className="transition-all duration-100" />
        <circle cx="45" cy="32" r="3" fill="#131F24" />
        <circle cx="75" cy="32" r="3" fill="#131F24" />
        {expression === "happy" && (
          <path d="M45 47 Q60 58 75 47" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {expression === "normal" && (
          <rect x="48" y="47" width="24" height="4" rx="2" fill="white" />
        )}
        {expression === "thinking" && (
          <circle cx="60" cy="49" r="6" fill="white" />
        )}
        {expression === "celebrate" && (
          <path d="M42 48 Q60 60 78 48" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        <rect x="18" y="52" width="14" height="8" rx="4" fill="#58CC02" />
        <rect x="88" y="52" width="14" height="8" rx="4" fill="#58CC02" />
        <rect x="35" y="95" width="18" height="12" rx="5" fill="#58CC02" />
        <rect x="67" y="95" width="18" height="12" rx="5" fill="#58CC02" />
        <rect x="45" y="62" width="30" height="20" rx="4" fill="#131F24" />
        <text x="60" y="76" textAnchor="middle" fill="#58CC02" fontSize="10" fontWeight="bold">
          {expression === "happy" ? ":)" : expression === "thinking" ? "?." : "&gt;_"}
        </text>
      </svg>
    </div>
  );
}
