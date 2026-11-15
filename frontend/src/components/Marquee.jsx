import { Sparkle } from "lucide-react";

const ITEMS = [
  "Full Stack Development",
  "AI & Data Science",
  "Cloud & DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Python Programming",
  "Digital Marketing",
  "Machine Learning",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-slate-800 bg-[#0B132B] py-4" data-testid="skills-marquee">
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/85">
              {item}
            </span>
            <Sparkle className="h-3.5 w-3.5 text-amber-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
