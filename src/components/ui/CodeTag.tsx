import { cn } from "../../lib/utils";

export function CodeTag({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 6 22 12 16 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CodeTagMascot({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = { sm: 48, md: 80, lg: 120 };
  const dim = sizes[size];
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={dim} height={dim} viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="56" fill="#1CB0F6" opacity="0.15" />
        <circle cx="60" cy="60" r="44" fill="#58CC02" opacity="0.15" />
        <polyline points="50 45 35 60 50 75" stroke="#58CC02" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="70 45 85 60 70 75" stroke="#58CC02" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}