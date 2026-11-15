import { HelpCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How much does the program cost?",
    a: "Fees depend on the domain, track and batch you pick. Instead of a one-size-fits-all number, your counselor walks you through the exact fee, EMI options and scholarship eligibility on a quick 10-minute call — so you only pay for what actually fits your goal.",
  },
  {
    q: "Is the internship real, or just a certificate?",
    a: "Real. You work on a live project brief with weekly deliverables, mentor code reviews and a final demo. The certificate you receive is QR-verifiable and backed by a Letter of Recommendation from your mentor.",
  },
  {
    q: "What does '100% placement assurance' actually mean?",
    a: "On the Placement track we stay with you until you have an offer letter in hand — unlimited mock interviews, resume and LinkedIn makeover, referral drives with our hiring partners and 1:1 guidance through every round.",
  },
  {
    q: "Who can apply?",
    a: "College students (any year), fresh graduates and early-career professionals who want hands-on, industry-ready skills. No prior experience is required for most domains — we start from fundamentals and build up to production-grade work.",
  },
  {
    q: "How are the classes conducted?",
    a: "Every session is live and interactive — online, in small cohorts, with recordings available for life. You'll code along, break things, fix them, and get doubts cleared on the spot.",
  },
  {
    q: "What do I walk away with?",
    a: "A verified internship certificate, a Letter of Recommendation, a GitHub portfolio with real projects, an interview-ready resume — and for the Placement track, a job offer.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-white py-20 lg:py-28" data-testid="faq-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              <HelpCircle className="h-3.5 w-3.5" /> FAQ
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Questions students ask before they apply.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Straight answers, no sales talk. Still curious? Your counselor is one tap away.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3" data-testid="faq-accordion">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFF] px-6 data-[state=open]:border-blue-200 data-[state=open]:bg-white data-[state=open]:shadow-lg data-[state=open]:shadow-blue-900/5"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-slate-950 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
