import { Mail, Phone, Clock, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { scrollToId } from "@/lib/api";

export default function Footer() {
  return (
    <footer className="grain relative bg-[#0B132B] text-slate-300" data-testid="footer-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
            Online training and internship programs that turn students into industry-ready
            professionals — practical skills, real projects, and career support.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3.5 py-1.5 text-xs font-semibold text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> ISO 9001:2015 aligned curriculum
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Programs</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <button onClick={() => scrollToId("programs")} className="transition-colors duration-200 hover:text-white" data-testid="footer-link-training-internship">
                Training + Internship
              </button>
            </li>
            <li>
              <button onClick={() => scrollToId("programs")} className="transition-colors duration-200 hover:text-white" data-testid="footer-link-placement-support">
                Training + Internship + Placement (100% assurance)
              </button>
            </li>
            <li>
              <button onClick={() => scrollToId("faq")} className="transition-colors duration-200 hover:text-white" data-testid="footer-link-faq">
                FAQ
              </button>
            </li>
            <li>
              <button onClick={() => scrollToId("apply")} className="transition-colors duration-200 hover:text-white" data-testid="footer-link-apply">
                Apply for Upcoming Batch
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Company</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <button onClick={() => scrollToId("about")} className="transition-colors duration-200 hover:text-white">About Us</button>
            </li>
            <li>
              <button onClick={() => scrollToId("why-us")} className="transition-colors duration-200 hover:text-white">Why Sovyra tech solutions</button>
            </li>
            <li>
              <a href="/admin" className="transition-colors duration-200 hover:text-white" data-testid="footer-link-admin">
                Admin Portal
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Contact</h4>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li className="flex items-center gap-2.5" data-testid="footer-contact-email">
              <Mail className="h-4 w-4 shrink-0 text-blue-400" />
              <a href="mailto:sovyra.tech@gmail.com" className="transition-colors duration-200 hover:text-white">
                sovyra.tech@gmail.com
              </a>
            </li>
          
            <li className="flex items-start gap-2.5" data-testid="footer-contact-phone-satyam">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <span>
                <a href="tel:+919425151892" className="transition-colors duration-200 hover:text-white">
                  +91 94251 51892
                </a>
                <span className="block text-xs text-slate-500">Satyam Singh</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5" data-testid="footer-contact-hours">
              <Clock className="h-4 w-4 shrink-0 text-blue-400" /> Mon–Sat, 10am–8pm IST
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row lg:px-8">
          <span>© 2026 Sovyra tech solutions. All rights reserved.</span>
          <span>Privacy-first admissions · No spam, ever.</span>
        </div>
      </div>
    </footer>
  );
}
