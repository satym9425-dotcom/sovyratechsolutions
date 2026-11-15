import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, CalendarCheck, BadgeCheck, ShieldCheck, Star, Zap } from "lucide-react";
import { scrollToId } from "@/lib/api";

const HERO_IMG =
  "https://images.unsplash.com/photo-1758612214848-04e700d192ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHVkZW50JTIwbGFwdG9wJTIwc3R1ZHlpbmclMjBvbmxpbmV8ZW58MHx8fHwxNzkxNzAzMTc0fDA&ixlib=rb-4.1.0&q=85";

const LINES = [
  { text: "Learn Skills.", cls: "text-slate-950" },
  { text: "Build Projects.", cls: "text-blue-700" },
  { text: "Launch Your Career.", cls: "text-slate-950" },
];

const STATS = [
  { value: "5,000+", label: "Students Trained" },
  { value: "94%", label: "Placement Rate" },
  { value: "4.9/5", label: "Learner Rating" },
];

export default function Hero({ onCounselor }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      className="blueprint-grid relative overflow-hidden bg-[#FAFCFF] pt-[72px]"
      data-testid="hero-section"
    >
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-blue-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-8%] h-[360px] w-[360px] rounded-full bg-amber-100/60 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-12 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-50 px-4 py-1.5"
            data-testid="hero-batch-badge"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-mono-alt text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
              Admissions Open — 2026 Batch · Limited Seats
            </span>
          </motion.div>

          <h1 className="font-display text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl" data-testid="hero-headline">
            {LINES.map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${line.cls}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            data-testid="hero-subheadline"
          >
            Sovyra tech solutions's online training and internship programs turn students into industry-ready
            professionals — practical skills, real projects, verified certification, and career
            support that stays with you until the offer letter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <ShieldCheck className="h-4 w-4 text-blue-700" /> ISO 9001:2015 aligned curriculum
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <BadgeCheck className="h-4 w-4 text-blue-700" /> 100% verifiable internship certificate
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("programs")}
              className="group flex items-center gap-2.5 rounded-full bg-blue-700 px-7 py-3.5 font-display text-base font-bold text-white shadow-lg shadow-blue-700/25 transition-all duration-200 hover:bg-blue-800 hover:shadow-blue-800/30"
              data-testid="hero-explore-programs-button"
            >
              Explore Programs
              <ArrowRight className="h-4.5 w-4.5 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              onClick={onCounselor}
              className="flex items-center gap-2.5 rounded-full border-2 border-slate-900 bg-white px-7 py-3 font-display text-base font-bold text-slate-900 transition-colors duration-200 hover:bg-slate-900 hover:text-white"
              data-testid="hero-counseling-button"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Free Counseling
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 flex items-center gap-8 border-t border-slate-200 pt-7 sm:gap-12"
            data-testid="hero-stats"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-extrabold text-slate-950 sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ rotateX, rotateY, y: imgY }}
            className="relative"
            data-testid="hero-media-card"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
              <img
                src={HERO_IMG}
                alt="Young Indian student learning online on laptop with headphones"
                className="aspect-[4/4.6] w-full object-cover"
                loading="eager"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="absolute -left-4 top-8 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl shadow-blue-900/10 backdrop-blur-xl sm:-left-8"
            >
              <div className="font-mono-alt text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Next Batch
              </div>
              <div className="font-display text-xl font-extrabold text-blue-700">Enrolling Now</div>
              <div className="mt-0.5 text-[11px] font-semibold text-emerald-700">Scholarship slots open</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="absolute -right-3 bottom-24 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl shadow-blue-900/10 backdrop-blur-xl sm:-right-6"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-slate-800">Live Mentorship + Real Projects</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35 }}
              className="absolute -bottom-5 left-8 flex items-center gap-2 rounded-2xl border border-white/60 bg-slate-950/90 px-4 py-2.5 shadow-xl backdrop-blur-xl"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-white">Rated 4.9 by 5,000+ learners</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
