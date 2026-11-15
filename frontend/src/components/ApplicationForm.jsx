import { useEffect, useState } from "react";
import { ChevronDown, Send, CheckCircle2, Loader2, PhoneCall, FileCheck2, Rocket } from "lucide-react";
import { toast } from "sonner";
import Reveal from "@/components/Reveal";
import CounselorCard from "@/components/CounselorCard";
import { api, formatApiErrorDetail } from "@/lib/api";
import { DOMAINS } from "@/lib/domains";

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const EMPTY = { full_name: "", email: "", phone: "", college: "", program: "", domain: "", message: "" };

const STEPS = [
  { icon: FileCheck2, title: "Application reviewed", desc: "Our admissions team screens your profile within 24 hours." },
  { icon: PhoneCall, title: "Counselor call", desc: "A 10-minute call to map your goal, batch, fee & scholarship eligibility." },
  { icon: Rocket, title: "Seat confirmed", desc: "Onboard to the cohort, meet your mentor and start building." },
];

export default function ApplicationForm({ presetProgram }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (presetProgram) setForm((f) => ({ ...f, program: presetProgram }));
  }, [presetProgram]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/applications", form);
      setSuccess(true);
      toast.success("Application received! Our team will contact you shortly.");
      setForm({ ...EMPTY, program: presetProgram || "" });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="relative bg-[#F1F5F9] py-20 lg:py-28" data-testid="apply-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              Apply Now
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Reserve your seat in the upcoming batch.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Seats are limited and allocated on merit and a first-come basis. It takes under two
              minutes — and there's no commitment until you've spoken to a counselor.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <ol className="mt-8 space-y-4" data-testid="apply-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/25">
                      <s.icon className="h-4.5 w-4.5 h-5 w-5" />
                    </span>
                    {i < STEPS.length - 1 && <span className="mt-2 w-px flex-1 bg-slate-300" />}
                  </div>
                  <div className="pb-2">
                    <div className="font-display text-sm font-bold text-slate-950">
                      <span className="mr-2 font-mono-alt text-xs text-blue-600">0{i + 1}</span>
                      {s.title}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8">
              <CounselorCard />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            {success && (
              <div
                className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
                data-testid="application-form-success-alert"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-display font-bold text-emerald-900">Application submitted successfully.</p>
                  <p className="mt-1 text-sm text-emerald-700">
                    Our team will contact you within 24–48 hours with the curriculum guide and batch
                    schedule.
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={submit}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 lg:p-9"
              data-testid="application-form"
            >
              {form.program && (
                <div
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700"
                  data-testid="application-form-program-interest"
                >
                  Interested in: {form.program}
                </div>
              )}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.full_name}
                    onChange={set("full_name")}
                    placeholder="e.g., Aarav Sharma"
                    className={inputCls}
                    data-testid="application-form-name-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="e.g., aarav@example.com"
                    className={inputCls}
                    data-testid="application-form-email-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    WhatsApp / Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="e.g., +91 98765 43210"
                    className={inputCls}
                    data-testid="application-form-phone-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    College / University & Degree
                  </label>
                  <input
                    value={form.college}
                    onChange={set("college")}
                    placeholder="e.g., DTU, B.Tech CSE"
                    className={inputCls}
                    data-testid="application-form-college-input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Preferred Domain *
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={form.domain}
                      onChange={set("domain")}
                      className={`${inputCls} appearance-none pr-10 ${form.domain ? "" : "text-slate-400"}`}
                      data-testid="application-form-domain-select"
                    >
                      <option value="" disabled>
                        Choose the domain you want to master
                      </option>
                      {DOMAINS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Career Goals or Questions (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about your learning background and career goals..."
                    className={`${inputCls} resize-none`}
                    data-testid="application-form-message-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-blue-700 py-4 font-display text-base font-bold text-white shadow-lg shadow-blue-700/25 transition-colors duration-200 hover:bg-blue-800 disabled:opacity-60"
                data-testid="application-form-submit-button"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Submit Application <Send className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Your details stay private and are used only for admissions communication.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
