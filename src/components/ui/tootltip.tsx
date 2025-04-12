"use client";
import React, { useState } from "react";
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";

export const AnimatedTooltip = ({ children, text }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);

  return (
    <div className="group relative" onMouseEnter={() => setHoveredIndex(1)} onMouseLeave={() => setHoveredIndex(null)}>
      <AnimatePresence mode="popLayout">
        {hoveredIndex === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              rotate: rotate,
            }}
            className="absolute z-50 bottom-full mb-2 flex flex-col items-center rounded-md bg-black px-4 py-2 text-xs shadow-xl pointer-events-none"
          >
            <div className="absolute -bottom-px h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="relative z-10 text-sm font-semibold text-white whitespace-nowrap">{text}</div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
