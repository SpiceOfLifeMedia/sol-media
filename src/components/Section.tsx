import { ReactNode } from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  spacing?: "tight" | "compact" | "default" | "loose";
  divider?: boolean;
}

const SPACING = {
  tight: "py-8 md:py-12",
  compact: "py-14 md:py-20",
  default: "py-20 md:py-28",
  loose: "py-24 md:py-36",
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
