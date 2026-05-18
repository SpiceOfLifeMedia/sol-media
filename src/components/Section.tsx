import { ReactNode } from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  spacing?: "compact" | "default" | "loose";
  divider?: boolean;
}

const SPACING = {
  compact: "py-20 md:py-24",
  default: "py-28 md:py-36",
  loose: "py-32 md:py-44",
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
