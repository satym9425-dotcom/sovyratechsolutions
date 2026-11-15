import {
  Globe, Brain, Bot, Users, Megaphone, Cpu, Landmark, ShieldCheck, Palette,
  DraftingCompass, BarChart3, Layers, TrendingUp, Atom, CircuitBoard, PieChart,
  Frame, Dna, Cloud, Stethoscope, Car, Microchip,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const DOMAIN_ICONS = [
  ["Web Development", Globe],
  ["Artificial Intelligence", Bot],
  ["Machine Learning", Cpu],
  ["Data Science", BarChart3],
  ["Full Stack", Layers],
  ["Cloud Computing", Cloud],
  ["Cyber Security", ShieldCheck],
  ["Digital Marketing", Megaphone],
  ["UI/UX", Frame],
  ["Graphic Design", Palette],
  ["Business Analytics", PieChart],
  ["Finance", Landmark],
  ["Stock Market", TrendingUp],
  ["Human Resource", Users],
  ["Psychology", Brain],
  ["Auto CAD", DraftingCompass],
  ["Nano Technology", Atom],
  ["IoT & Robotics", CircuitBoard],
  ["Genetic Engineering", Dna],
  ["Medical Coding", Stethoscope],
  ["Hybrid Electrical Vehicle", Car],
  ["Embedded System", Microchip],
];

export default function Domains() {
  return (
    <section id="domains" className="relative bg-[#FAFCFF] py-20 lg:py-24" data-testid="domains-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              22 Career Domains
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Pick your domain. We build your career in it.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Every program is available across all these domains — choose yours in the application
              form below.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3" data-testid="domains-chips">
            {DOMAIN_ICONS.map(([name, Icon]) => (
              <span
                key={name}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-display text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-700 hover:shadow-md"
                data-testid={`domain-chip-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <Icon className="h-4 w-4 text-blue-600" />
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
