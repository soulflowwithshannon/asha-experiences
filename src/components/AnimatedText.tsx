"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: "easeInOut" as const },
  }),
};

export function SplitHeadline({
  text,
  style,
  as: Tag = "h2",
}: {
  text: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3";
}) {
  const words = text.split(" ");
  return (
    <Tag style={{ ...style, overflow: "visible" }}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{ display: "inline" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariants}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

const blockVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" as const } },
};

export function StaggerBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={blockVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div variants={childVariants} style={style}>
      {children}
    </motion.div>
  );
}
