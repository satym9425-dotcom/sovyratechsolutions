import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Loader2, Rocket } from "lucide-react";
import { toast } from "sonner";
import { api, formatApiErrorDetail } from "@/lib/api";
import { DOMAINS } from "@/lib/domains";

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const EMPTY = { name: "", email: "", phone: "", program: "", domain: "", college: "" };

export default function InquiryModal({ open, onClose, presetProgram = "" }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setForm((f) => ({ ...f, program: presetProgram }));
  }, [open, presetProgram]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/inquiries", form);
      toast.success("Inquiry received! A counselor will reach out within 24 hours.");
      setForm(EMPTY);
      onClose();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={onClose}
          data-testid="inquiry-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="bg-slate-950 px-7 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-600/20 px-3 py-1 font-mono-alt text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                    <Rocket className="h-3 w-3" /> Free Career Counseling
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-white">
                    Accelerate your career in 2026
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400">
                    Get your personalised roadmap, batch schedule & internship eligibility in a
                    2-minute call.
                  </p>
                  {form.program && (
                    <span
                      className="mt-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300"
                      data-testid="inquiry-modal-program-interest"
                    >
                      Interested in: {form.program}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-slate-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  aria-label="Close inquiry form"
                  data-testid="inquiry-modal-close-button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4 px-7 py-6">
              <input
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Full Name *"
                className={inputCls}
                data-testid="inquiry-modal-name-input"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="Email Address *"
                  className={inputCls}
                  data-testid="inquiry-modal-email-input"
                />
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="WhatsApp Number *"
                  className={inputCls}
                  data-testid="inquiry-modal-phone-input"
                />
              </div>
              <div className="relative">
                <select
                  required
                  value={form.domain}
                  onChange={set("domain")}
                  className={`${inputCls} appearance-none pr-10 ${form.domain ? "" : "text-slate-400"}`}
                  data-testid="inquiry-modal-domain-select"
                >
                  <option value="" disabled>
                    Preferred Domain *
                  </option>
                  {DOMAINS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <input
                value={form.college}
                onChange={set("college")}
                placeholder="College / Current Year (optional)"
                className={inputCls}
                data-testid="inquiry-modal-college-input"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 py-3.5 font-display text-base font-bold text-white shadow-lg shadow-blue-700/25 transition-colors duration-200 hover:bg-blue-800 disabled:opacity-60"
                data-testid="inquiry-modal-submit-button"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Get Free Counseling"}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-slate-400">
                By submitting, you agree to be contacted about Sovyra tech solutions programs. No spam — ever.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
