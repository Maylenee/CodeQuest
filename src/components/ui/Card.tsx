import { cn } from "../../lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  selected?: boolean;
}

export function Card({ className, hover, selected, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card",
        hover && "card-hover cursor-pointer",
        selected && "card-selected",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
