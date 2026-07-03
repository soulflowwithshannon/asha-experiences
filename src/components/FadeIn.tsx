"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FadeIn({ children, delay = 0, className, style }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
