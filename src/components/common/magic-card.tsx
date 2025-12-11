"use client";

import { motion, useMotionValue } from "framer-motion";
import React, { useCallback, useEffect } from "react";

const cn = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ");

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  enableTilt?: boolean;
}

export function MagicCard({
  children,
  className,
  maxTiltDeg = 10,
  enableTilt = true,
}: MagicCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enableTilt) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pctX = (x / rect.width) * 2 - 1;
      const pctY = (y / rect.height) * 2 - 1;
      rotateY.set(pctX * maxTiltDeg);
      rotateX.set(-pctY * maxTiltDeg);
    },
    [enableTilt, maxTiltDeg, rotateX, rotateY]
  );

  useEffect(() => reset(), [reset]);

  return (
    <div
      className={cn("group relative rounded-[inherit]", className)}
      style={{ perspective: enableTilt ? 1000 : undefined }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={handlePointerMove}
    >
      <motion.div
        className="relative rounded-[inherit] will-change-transform"
        style={{
          transformStyle: enableTilt ? "preserve-3d" : undefined,
          transformOrigin: "center",
          rotateX,
          rotateY,
          transformPerspective: enableTilt ? 1000 : undefined,
        }}
      >
        <div className="relative rounded-[inherit]">{children}</div>
      </motion.div>
    </div>
  );
}
