import { ReactNode } from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  spacing?: "tight" | "compact" | "default" | "loose";
  divider?: boolean;
}

const SPACING = {
  tight: "py-10 md:py-14",
  compact: "py-12 md:py-16",
  default: "py-16 md:py-20",
  loose: "py-20 md:py-28",
} as const;

export function Section({
  id,
  className = "",
  children,
  spacing = "default",
  divider = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${SPACING[spacing]} w-full ${divider ? "border-t border-foreground/8" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
