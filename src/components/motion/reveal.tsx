"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Parent that staggers its <RevealItem> children once, when it enters the viewport. */
export function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "header" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} variants={group} initial={reduce ? "show" : "hidden"} whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "p" | "h2" | "h3" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

/**
 * Section heading line: a quiet fade and small rise, once. The big mask reveal is kept for the hero only.
 * Reduced motion keeps the fade and drops the movement.
 */
export function MaskLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  );
}
