"use client";
import { motion } from "framer-motion";

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = true,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${centered ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-theme-text-title leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-theme-text-secondary text-sm md:text-base max-w-2xl leading-relaxed mx-auto font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
}
