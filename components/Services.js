"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Palette, Code2, Gem, BarChart3, Smartphone, Video, ShoppingCart, Search } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Human-centered design that delights users and drives conversion. From wireframes to pixel-perfect interfaces.",
    spotlightColor: "99,102,241",
    iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400",
    border: "border-indigo-500/20", tag: "Strategy · Prototyping",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Performant, scalable, and accessible web applications built with modern tech stacks and best practices.",
    spotlightColor: "168,85,247",
    iconBg: "bg-purple-500/10", iconColor: "text-purple-400",
    border: "border-purple-500/20", tag: "React · Next.js",
  },
  {
    icon: Gem,
    title: "Branding",
    description: "Bold, memorable brand identities that communicate your vision and resonate with your target audience.",
    spotlightColor: "236,72,153",
    iconBg: "bg-pink-500/10", iconColor: "text-pink-400",
    border: "border-pink-500/20", tag: "Identity · Logo",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that amplify your reach, engagement, and revenue across all channels.",
    spotlightColor: "16,185,129",
    iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400",
    border: "border-emerald-500/20", tag: "SEO · Growth",
  },
  {
    icon: Smartphone,
    title: "Mobile App Dev",
    description: "Native and cross-platform mobile applications for iOS and Android, built for performance and delight.",
    spotlightColor: "59,130,246",
    iconBg: "bg-blue-500/10", iconColor: "text-blue-400",
    border: "border-blue-500/20", tag: "iOS · Android",
  },
  {
    icon: Video,
    title: "Motion Design",
    description: "Cinematic animations, explainer videos, and micro-interactions that bring your brand story to life.",
    spotlightColor: "245,158,11",
    iconBg: "bg-amber-500/10", iconColor: "text-amber-400",
    border: "border-amber-500/20", tag: "Animation · Video",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "End-to-end online store experiences — from UX strategy and design to Shopify or custom storefronts.",
    spotlightColor: "239,68,68",
    iconBg: "bg-red-500/10", iconColor: "text-red-400",
    border: "border-red-500/20", tag: "Shopify · Headless",
  },
  {
    icon: Search,
    title: "SEO & Content",
    description: "Technical SEO audits, content strategy, and long-form writing that drive organic growth and authority.",
    spotlightColor: "20,184,166",
    iconBg: "bg-teal-500/10", iconColor: "text-teal-400",
    border: "border-teal-500/20", tag: "Content · Rankings",
  },
];

/* ── Spotlight card ── */
function SpotlightCard({ service, index }) {
  const cardRef = useRef(null);
  const [spot, setSpot] = useState({ x: -999, y: -999, opacity: 0 });
  const Icon = service.icon;

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };
  const handleLeave = () => setSpot((s) => ({ ...s, opacity: 0 }));

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative bg-theme-card-bg border border-theme-card-border hover:border-theme-card-border-hover shadow-theme-card hover:shadow-theme-card-hover rounded-2xl p-6 overflow-hidden cursor-default transition-all duration-300"
    >
      {/* Spotlight radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: spot.opacity,
          background: `radial-gradient(350px circle at ${spot.x}px ${spot.y}px, rgba(${service.spotlightColor},0.12), transparent 70%)`,
        }}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 8, scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-5`}
      >
        <Icon className={`w-6 h-6 ${service.iconColor}`} />
      </motion.div>

      <h3 className="text-lg font-semibold text-theme-text-title mb-3">{service.title}</h3>
      <p className="text-theme-text-secondary text-sm leading-relaxed mb-6">{service.description}</p>
      <span className="text-xs text-theme-text-secondary/70 font-medium tracking-wide">{service.tag}</span>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          eyebrow="What We Do"
          title={<>Services That Drive <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Real Results</span></>}
          description="A comprehensive suite of digital services designed to help your brand grow, convert, and lead."
        />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => <SpotlightCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
