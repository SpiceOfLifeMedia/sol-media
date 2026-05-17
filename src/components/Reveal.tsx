import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  width?: "w-fit" | "w-full";
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  width = "w-full",
}: RevealProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <div className={`relative overflow-hidden ${width} ${className}`}>
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
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // easeOutExpo
              delay: delay,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
