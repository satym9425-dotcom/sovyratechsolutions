import { Phone, Clock, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { COUNSELORS, HOURS, SUPPORT_EMAIL, waLink } from "@/lib/contacts";

export default function CounselorCard() {
  return (
    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5"
      data-testid="counselor-contacts-card"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-extrabold text-slate-950">Talk to a counselor</h3>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available now
        </span>
      </div>
      <p className="mt-1.5 text-sm text-slate-500">
        Prefer a human? Call or WhatsApp directly — no bots, no waiting.
      </p>

      <ul className="mt-5 divide-y divide-slate-100">
        {COUNSELORS.map((c) => {
          const slug = c.name.split(" ")[0].toLowerCase();
          return (
            <li key={c.tel} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between" data-testid={`counselor-${slug}`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 font-display text-sm font-extrabold text-white">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <div className="font-display text-sm font-bold text-slate-950">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.role}</div>
                  <div className="text-xs font-semibold text-slate-700">{c.phone}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${c.tel}`}
                  className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors duration-200 hover:border-blue-600 hover:text-blue-700"
                  data-testid={`counselor-${slug}-call-button`}
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
                <a
                  href={waLink(c.wa)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white transition-colors duration-200 hover:bg-[#1ebe5b]"
                  data-testid={`counselor-${slug}-whatsapp-button`}
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-blue-600" /> {HOURS}</span>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-1.5 hover:text-blue-700">
          <Mail className="h-3.5 w-3.5 text-blue-600" /> {SUPPORT_EMAIL}
        </a>
      </div>
    </div>
  );
}
