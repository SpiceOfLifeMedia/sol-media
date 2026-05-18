import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  width?: "w-fit" | "w-full";
  overflow?: "hidden" | "visible";
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  width = "w-full",
  overflow = "hidden",
}: RevealProps) {
  const directions = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <div className={`relative ${overflow === "visible" ? "overflow-visible" : "overflow-hidden"} ${width} ${className}`}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            ...directions[direction],
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: delay,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
