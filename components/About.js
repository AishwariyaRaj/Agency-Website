"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Users, Clock, Headphones } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    value: 120,
    suffix: "+",
    label: "Projects Completed",
    description: "Across 15 countries and growing",
    color: "text-indigo-500 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Happy Clients",
    description: "From startups to enterprises",
    color: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Clock,
    value: 8,
    suffix: "+",
    label: "Years Experience",
    description: "In digital design & development",
    color: "text-pink-500 dark:text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: Headphones,
    value: 24,
    suffix: "/7",
    label: "Support Available",
    description: "Always here when you need us",
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden bg-theme-bg transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/10 via-transparent to-purple-950/10 pointer-events-none" />
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-4">
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-theme-text-title leading-tight">
            Trusted by Teams{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="mt-4 text-theme-text-secondary max-w-xl mx-auto text-base md:text-lg">
            Our track record speaks for itself. Here&apos;s what we&apos;ve built and who
            we&apos;ve helped.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25,0.4,0.25,1] }}
                className="group relative bg-theme-card-bg border border-theme-card-border hover:border-theme-card-border-hover shadow-theme-card hover:shadow-theme-card-hover rounded-2xl p-7 text-center transition-all duration-300 overflow-hidden"
              >
                {/* Pulse glow behind card */}
                <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl rounded-2xl`} />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`relative w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-5`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </motion.div>

                {/* Number */}
                <div className={`relative text-4xl md:text-5xl font-semibold ${stat.color} mb-2 tabular-nums`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isInView} />
                </div>

                <div className="relative text-sm font-medium text-theme-text-title mb-1">{stat.label}</div>
                <div className="relative text-xs text-theme-text-secondary/70">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-theme-card-border shadow-theme-card rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm transition-all duration-300"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-theme-text-title mb-3">
            Ready to elevate your brand?
          </h3>
          <p className="text-theme-text-secondary text-sm md:text-base mb-6 max-w-md mx-auto">
            Let&apos;s collaborate and create something remarkable together.
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 cursor-pointer"
          >
            Start a Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
