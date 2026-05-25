"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

/* ── animation variants ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] } }),
};

/* ── Magnetic button ── */
function MagneticButton({ children, onClick, primary = true }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-8 py-4 text-base transition-all duration-300 cursor-pointer select-none";
  const style = primary
    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
    : "bg-theme-text-title/5 hover:bg-theme-text-title/10 text-theme-text-title border border-theme-text-title/10 hover:border-theme-text-title/20";

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`${base} ${style}`}
    >
      {children}
    </motion.button>
  );
}

/* ── AnimatedWord helper ── */
function WordReveal({ text, className, gradient }) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={`inline-flex flex-wrap gap-x-3 ${className}`}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          className={gradient ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" : ""}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

const clients = [
  { initials: "A", color: "bg-indigo-500" },
  { initials: "M", color: "bg-purple-500" },
  { initials: "S", color: "bg-pink-500" },
  { initials: "J", color: "bg-violet-500" },
];

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-theme-bg transition-colors duration-300">
      {/* ── Aurora background ── */}
      <div className="absolute inset-0 bg-theme-bg">
        {/* Hero illustration */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[var(--hero-bg-opacity,0.2)] transition-opacity duration-300"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />

        {/* Aurora blobs */}
        <div className="aurora-blob-1 absolute -top-40 -left-40 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="aurora-blob-2 absolute top-1/3 right-0 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[100px]" />
        <div className="aurora-blob-3 absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[90px]" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.035] light:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(120,120,120,0.8) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Left-to-right dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-theme-bg/95 via-theme-bg/70 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-theme-bg to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-0 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div className="flex flex-col items-start">

          {/* Badge */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300 tracking-wide uppercase">Award-Winning Design Agency</span>
          </motion.div>

          {/* Heading — word-by-word reveal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-theme-text-title leading-[1.12] tracking-tight mb-6">
            <WordReveal text="We Build Digital" className="block mb-1" />
            <WordReveal text="Experiences That" className="block mb-1" gradient />
            <WordReveal text="Grow Brands" className="block" />
          </h1>

          {/* Tagline */}
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-theme-text-secondary text-base md:text-lg leading-relaxed max-w-lg mb-10 font-normal"
          >
            Creative design and development solutions for startups, businesses, and modern brands that want to stand out.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton primary onClick={() => handleScroll("#portfolio")}>
              View Our Work <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton primary={false} onClick={() => handleScroll("#contact")}>
              Contact Us
            </MagneticButton>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="flex items-center gap-5 mt-12 pt-8 border-t border-theme-card-border w-full"
          >
            <div className="flex -space-x-2.5">
              {clients.map((c) => (
                <div key={c.initials} className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-xs font-medium text-white border-2 border-theme-avatar-border`}>
                  {c.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-theme-text-secondary font-normal">Trusted by <span className="text-theme-text-title font-medium">50+ happy clients</span></p>
            </div>
          </motion.div>
        </div>

        {/* Right — Stat cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="hidden lg:grid grid-cols-2 gap-4"
        >
          {[
            { value: "120+", label: "Projects Delivered", sub: "Across 15+ countries",  gradient: "from-indigo-500/10 to-indigo-500/5",  border: "border-indigo-500/20 dark:border-indigo-500/30",  valueColor: "text-indigo-600 dark:text-indigo-400" },
            { value: "50+",  label: "Happy Clients",      sub: "Startups to enterprises", gradient: "from-purple-500/10 to-purple-500/5",  border: "border-purple-500/20 dark:border-purple-500/30",  valueColor: "text-purple-600 dark:text-purple-400" },
            { value: "8+",   label: "Years Experience",   sub: "Design & development",    gradient: "from-pink-500/10 to-pink-500/5",     border: "border-pink-500/20 dark:border-pink-500/30",    valueColor: "text-pink-600 dark:text-pink-400"   },
            { value: "24/7", label: "Client Support",     sub: "Always available",        gradient: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/20 dark:border-emerald-500/30", valueColor: "text-emerald-600 dark:text-emerald-400"},
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -4 }}
              className={`bg-theme-card-bg bg-gradient-to-br ${stat.gradient} border ${stat.border} shadow-theme-card hover:shadow-theme-card-hover rounded-2xl p-6 flex flex-col gap-2 transition-all duration-300 backdrop-blur-sm`}
            >
              <span className={`text-3xl font-semibold ${stat.valueColor} tabular-nums`}>{stat.value}</span>
              <span className="text-sm font-medium text-theme-text-title">{stat.label}</span>
              <span className="text-xs text-theme-text-secondary font-normal">{stat.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-theme-text-title/20 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-indigo-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
