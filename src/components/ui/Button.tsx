import { cn } from "../../lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-100 select-none",
          variant === "primary" &&
            "bg-[var(--color-primary)] text-white border-b-[4px] border-[#3a8a01] hover:bg-[var(--color-primary-hover)] active:translate-y-[2px] active:border-b-[2px] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:border-b-[4px]",
          variant === "secondary" &&
            "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border-2 border-[var(--color-border)] border-b-[4px] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-light)] active:translate-y-[2px] active:border-b-[2px]",
          variant === "ghost" &&
            "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]",
          size === "sm" && "px-3 py-2 text-sm",
          size === "md" && "px-5 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
