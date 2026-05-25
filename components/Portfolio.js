"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, X, ExternalLink, Calendar } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

const projects = [
  {
    title: "NovaDash Analytics",
    category: "SaaS Dashboard",
    categoryColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    image: "/portfolio-saas.png",
    year: "2024",
    description:
      "A real-time analytics dashboard with AI-powered insights for enterprise SaaS companies. Built with Next.js, D3.js, and a WebSocket-powered data layer for live metric updates.",
    tags: ["Next.js", "D3.js", "TypeScript", "WebSockets"],
    accentColor: "indigo",
  },
  {
    title: "Pulse Mobile",
    category: "Mobile App",
    categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    image: "/portfolio-mobile.png",
    year: "2024",
    description:
      "A fitness tracking mobile app with social features, circular progress rings, and AI workout recommendations. Achieved 4.9★ on the App Store within 3 months of launch.",
    tags: ["React Native", "AI/ML", "Firebase", "Expo"],
    accentColor: "emerald",
  },
  {
    title: "Arc Brand System",
    category: "Branding Design",
    categoryColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    image: "/portfolio-branding.png",
    year: "2023",
    description:
      "A complete visual identity system for a Series A tech startup — logo, typography, color palette, motion guidelines, and a full brand book delivered in 6 weeks.",
    tags: ["Figma", "After Effects", "Brand Strategy", "Typography"],
    accentColor: "pink",
  },
  {
    title: "Nexus Commerce",
    category: "E-commerce",
    categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    image: "/portfolio-ecommerce.png",
    year: "2024",
    description:
      "A luxury e-commerce platform with 3D product previews, AR try-on, and a headless Shopify backend. Conversion rate improved by 38% post-launch.",
    tags: ["Next.js", "Shopify", "Three.js", "Stripe"],
    accentColor: "amber",
  },
  {
    title: "Cerebra AI Platform",
    category: "AI Platform",
    categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    image: "/portfolio-ai.png",
    year: "2024",
    description:
      "An LLM-powered content generation platform with a code editor, chat interface, and neural visualization. Processing 2M+ requests per day at launch.",
    tags: ["Python", "OpenAI", "React", "FastAPI"],
    accentColor: "purple",
  },
  {
    title: "Launchpad Studio",
    category: "Startup Website",
    categoryColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    image: "/portfolio-startup.png",
    year: "2023",
    description:
      "A conversion-optimised startup landing page built for a YC-backed founder. Achieved a 12% sign-up conversion rate and raised $2M within weeks of launch.",
    tags: ["Next.js", "Framer Motion", "Tailwind", "Analytics"],
    accentColor: "cyan",
  },
  {
    title: "Kinetic Motion Reel",
    category: "Motion Design",
    categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    image: "/portfolio-motion.png",
    year: "2024",
    description:
      "A full motion design package for a global tech brand — title sequences, animated explainers, and UI micro-interactions. Delivered across broadcast and digital.",
    tags: ["After Effects", "Cinema 4D", "Lottie", "Figma"],
    accentColor: "amber",
  },
  {
    title: "Vaultex Fintech",
    category: "Mobile App",
    categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    image: "/portfolio-fintech.png",
    year: "2024",
    description:
      "A premium digital banking and crypto wallet app for iOS and Android. Features biometric auth, real-time portfolio tracking, and instant peer-to-peer transfers.",
    tags: ["React Native", "Plaid API", "Node.js", "Expo"],
    accentColor: "emerald",
  },
];

/* ─── Project Modal ─── */
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-theme-card-bg border border-theme-card-border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-theme-text-title/10 hover:bg-theme-text-title/20 rounded-full flex items-center justify-center text-theme-text-title transition-colors duration-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Image */}
          <div className="relative h-56 bg-gray-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="672px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/85 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border ${project.categoryColor} mb-2`}>
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-theme-text-title">{project.title}</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-theme-text-secondary/70 shrink-0 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </div>
            </div>

            <p className="text-theme-text-secondary text-sm leading-relaxed mb-5">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-theme-text-primary bg-theme-text-title/5 border border-theme-card-border px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-theme-card-border">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-theme-text-secondary hover:text-theme-text-title border border-theme-card-border hover:border-theme-card-border-hover transition-colors duration-200 cursor-pointer"
              >
                Close
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 cursor-pointer">
                Live Preview <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ project, index, onOpen }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 25 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 25 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    rotX.set(-((e.clientY - rect.top)  / rect.height - 0.5) * 10);
    rotY.set( ((e.clientX - rect.left) / rect.width  - 0.5) * 10);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative bg-theme-card-bg border border-theme-card-border hover:border-theme-card-border-hover shadow-theme-card hover:shadow-theme-card-hover rounded-2xl overflow-hidden transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-800">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gray-950/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 rounded-full px-5 py-2.5 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer"
          >
            View Case Study <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5">
        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border ${project.categoryColor} mb-3`}>
          {project.category}
        </span>
        <h3 className="text-base font-semibold text-theme-text-title group-hover:text-indigo-500 transition-colors duration-200">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function Portfolio() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 px-4 md:px-8 relative bg-theme-bg transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-bg/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          eyebrow="Our Work"
          title={<>Projects We&apos;re <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Proud Of</span></>}
          description="A curated showcase of our finest work across industries, from early-stage startups to established enterprises."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} onOpen={setSelected} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl px-6 py-3 transition-all duration-200 hover:bg-indigo-500/5 cursor-pointer">
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
