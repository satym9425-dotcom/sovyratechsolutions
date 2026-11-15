import { Check, ArrowRight, ShieldCheck, Sparkles, Lock, Gift } from "lucide-react";
import Reveal from "@/components/Reveal";
import { scrollToId } from "@/lib/api";

export const PROGRAM_OPTIONS = ["Training + Internship", "Training + Internship + Placement"];

const PLANS = [
  {
    name: PROGRAM_OPTIONS[0],
    tagline: "Learn the skill, earn the experience.",
    duration: "8–12 weeks · Live online",
    badge: "Career Starter",
    popular: false,
    features: [
      "Live expert-led training sessions",
      "Real internship with verified certificate",
      "Capstone project with GitHub review",
      "Letter of Recommendation",
      "Lifetime recorded access + community",
      "Mentor support on WhatsApp",
    ],
    cta: "Unlock Fee & Curriculum",
    testId: "program-card-training-internship",
  },
  {
    name: PROGRAM_OPTIONS[1],
    tagline: "We stay with you until the offer letter.",
    duration: "12–16 weeks · Live online",
    badge: "100% Placement Assurance",
    popular: true,
    features: [
      "Everything in Training + Internship",
      "1:1 career mentor & unlimited mock interviews",
      "3+ enterprise-grade portfolio projects",
      "ATS resume + LinkedIn makeover",
      "Referral drives with hiring partners",
      "Salary negotiation & offer evaluation",
    ],
    cta: "Unlock Placement Plan Details",
    testId: "program-card-placement-support",
  },
];

export default function Programs({ onEnroll }) {
  return (
    <section id="programs" className="relative bg-[#F1F5F9] py-20 lg:py-28" data-testid="programs-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              Programs
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Two paths. One goal — your offer letter.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Pick the track that matches your ambition. Your counselor shares the exact fee,
              EMI options and scholarship eligibility on a quick 10-minute call.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={0.1 + i * 0.12} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                  plan.popular
                    ? "border-2 border-blue-600 bg-slate-950 shadow-2xl shadow-blue-900/25"
                    : "border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
                }`}
                data-testid={plan.testId}
              >
                {plan.popular ? (
                  <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-400 px-5 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-lg">
                    <ShieldCheck className="h-3.5 w-3.5" /> {plan.badge}
                  </div>
                ) : (
                  <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-blue-700">
                    <Sparkles className="h-3.5 w-3.5" /> {plan.badge}
                  </div>
                )}

                <h3
                  className={`font-display text-xl font-extrabold leading-snug lg:text-2xl ${
                    plan.popular ? "mt-4 text-white" : "text-slate-950"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className={`mt-1.5 text-sm ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>{plan.tagline}</p>
                <div className={`mt-1 text-xs font-semibold uppercase tracking-wider ${plan.popular ? "text-slate-500" : "text-slate-400"}`}>
                  {plan.duration}
                </div>

                <div
                  className={`mt-6 flex items-center gap-3 rounded-2xl border border-dashed px-4 py-3.5 ${
                    plan.popular ? "border-slate-600 bg-white/5" : "border-slate-300 bg-slate-50"
                  }`}
                  data-testid={`${plan.testId}-fee-locked`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      plan.popular ? "bg-amber-400/15 text-amber-300" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <Lock className="h-4.5 w-4.5 h-5 w-5" />
                  </span>
                  <div>
                    <div className={`font-mono-alt text-[10px] font-semibold uppercase tracking-[0.18em] ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                      Program fee
                    </div>
                    <div className={`font-display text-sm font-extrabold ${plan.popular ? "text-white" : "text-slate-950"}`}>
                      Shared on your counseling call
                    </div>
                  </div>
                </div>

                <div className={`mt-3 flex items-center gap-2 text-xs font-semibold ${plan.popular ? "text-amber-300" : "text-emerald-700"}`}>
                  <Gift className="h-3.5 w-3.5" /> Scholarship & early-bird slots open for this batch
                </div>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.popular ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={`text-sm leading-relaxed ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onEnroll(plan.name)}
                  className={`group mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-base font-bold transition-all duration-200 ${
                    plan.popular
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500"
                      : "bg-slate-950 text-white hover:bg-blue-700"
                  }`}
                  data-testid={`${plan.testId}-enroll-button`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Both tracks include a verified internship certificate, Letter of Recommendation and lifetime
            LMS access.{" "}
            <button
              onClick={() => scrollToId("apply")}
              className="font-semibold text-blue-700 underline-offset-4 hover:underline"
              data-testid="programs-apply-directly-link"
            >
              Already decided? Apply directly →
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
