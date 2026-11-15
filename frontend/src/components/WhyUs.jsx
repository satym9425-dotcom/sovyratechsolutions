import { Radio, QrCode, GitPullRequest, Target } from "lucide-react";
import Reveal from "@/components/Reveal";

const IMG_LABS =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29kaW5nJTIwaW50ZXJuJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MHx8fHwxNzkxNzAzMTc0fDA&ixlib=rb-4.1.0&q=85";
const IMG_MENTOR =
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHx0ZWNoJTIwY29kaW5nJTIwaW50ZXJuJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MHx8fHwxNzkxNzAzMTc0fDA&ixlib=rb-4.1.0&q=85";

const BLOCKS = [
  {
    span: "md:col-span-8",
    icon: Radio,
    badge: "Active Learning",
    title: "Live interactive labs — zero boring pre-recorded monologues",
    desc: "Every module is delivered live with interactive coding, live bug-squashing, and direct vocal Q&A.",
    img: IMG_LABS,
  },
  {
    span: "md:col-span-4",
    icon: QrCode,
    badge: "Recognized Proof",
    title: "Dual ISO & partner credential",
    desc: "Certificates employers verify instantly via QR code and the official LMS ledger.",
  },
  {
    span: "md:col-span-4",
    icon: GitPullRequest,
    badge: "Production Grade",
    title: "1:1 code reviews on GitHub",
    desc: "Learn clean architecture, Git workflows, and CI/CD pipelines expected in high-growth startups.",
  },
  {
    span: "md:col-span-8",
    icon: Target,
    badge: "Placement Edge",
    title: "Mock interview engine & hiring partner referrals",
    desc: "Trained by senior tech leads from top tech firms to ace DSA, system design, and behavioral rounds.",
    img: IMG_MENTOR,
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="grain relative bg-white py-20 lg:py-28" data-testid="why-us-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              Why Choose Sovyra tech solutions
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Engineered for outcomes, not attendance.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={0.06 * i} className={b.span}>
              <div
                className={`group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${
                  b.img
                    ? "border-slate-800 bg-slate-950"
                    : "border-slate-200 bg-[#F8FAFF] hover:border-blue-200"
                }`}
              >
                {b.img && (
                  <>
                    <img
                      src={b.img}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-35 transition-opacity duration-500 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  </>
                )}
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        b.img ? "bg-white/10 text-amber-400 backdrop-blur" : "bg-blue-700 text-white"
                      }`}
                    >
                      <b.icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`font-mono-alt text-[10px] font-semibold uppercase tracking-[0.2em] ${
                        b.img ? "text-amber-300" : "text-blue-600"
                      }`}
                    >
                      {b.badge}
                    </span>
                  </div>
                  <h3
                    className={`font-display text-lg font-extrabold leading-snug lg:text-xl ${
                      b.img ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {b.title}
                  </h3>
                  <p className={`mt-2 max-w-lg text-sm leading-relaxed ${b.img ? "text-slate-300" : "text-slate-600"}`}>
                    {b.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
