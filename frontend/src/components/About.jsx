import { motion } from "framer-motion";
import { FolderGit2, UserCheck, Award } from "lucide-react";
import Reveal from "@/components/Reveal";

const IMG_A =
  "https://images.unsplash.com/photo-1758874573423-063d49bf2456?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBzdHVkZW50JTIwbGFwdG9wJTIwc3R1ZHlpbmclMjBvbmxpbmV8ZW58MHx8fHwxNzkxNzAzMTc0fDA&ixlib=rb-4.1.0&q=85";
const IMG_B =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29kaW5nJTIwaW50ZXJuJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MHx8fHwxNzkxNzAzMTc0fDA&ixlib=rb-4.1.0&q=85";

const FEATURES = [
  {
    icon: FolderGit2,
    title: "Industry-Engineered Projects",
    desc: "No toy projects. Build production-grade full-stack architectures, automated data pipelines, and security-tested code.",
  },
  {
    icon: UserCheck,
    title: "Direct Mentor Pairing",
    desc: "Dedicated software engineers & tech leads give line-by-line GitHub reviews and weekly doubt clearing.",
  },
  {
    icon: Award,
    title: "Recognized Internship Credential",
    desc: "Receive a verifiable internship certificate, project portfolio URL, and a personalized Letter of Recommendation.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white py-20 lg:py-28" data-testid="about-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <div className="relative lg:col-span-6">
          <Reveal>
            <div className="grid grid-cols-12 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="col-span-7 overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5"
              >
                <img src={IMG_A} alt="Student working on coding project on laptop" className="aspect-[3/4] w-full object-cover" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="col-span-5 mt-12 overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5"
              >
                <img src={IMG_B} alt="Tech interns collaborating on a coding sprint" className="aspect-[3/4] w-full object-cover" />
              </motion.div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-blue-100 bg-white px-6 py-4 shadow-xl shadow-blue-900/10">
              <div className="font-display text-3xl font-black text-blue-700">2026</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Career-first curriculum
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              About Sovyra tech solutions
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Bridging the gap between academic learning and a corporate job offer.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              We offer online training and internship programs designed to help students develop
              practical skills, work on real projects, and prepare for future career opportunities.
              Choose the program that suits your goals — our team will walk you through the
              curriculum, batch schedule, and enrollment process.
            </p>
          </Reveal>

          <div className="mt-9 space-y-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.08}>
                <div className="group flex gap-5 rounded-2xl border border-transparent p-4 transition-colors duration-200 hover:border-blue-100 hover:bg-blue-50/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/25 transition-transform duration-200 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-950">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
