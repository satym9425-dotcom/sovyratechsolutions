import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { scrollToId } from "@/lib/api";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Programs", id: "programs" },
  { label: "Why Us", id: "why-us" },
  { label: "Apply", id: "apply" },
];

export default function Navbar({ onCounselor }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Sovyra tech solutions home"
          className="transition-transform duration-200"
          data-testid="nav-logo-home-button"
        >
          <Logo />
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="font-display text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-blue-700"
              data-testid={`nav-link-${l.id}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors duration-200 hover:border-blue-600 hover:text-blue-700"
            data-testid="admin-portal-nav-link"
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Admin
          </Link>
          <button
            onClick={() => scrollToId("apply")}
            className="group flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-800"
            data-testid="nav-apply-now-button"
          >
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden" data-testid="mobile-menu">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setOpen(false);
                  scrollToId(l.id);
                }}
                className="rounded-lg px-3 py-2.5 text-left font-display text-sm font-semibold text-slate-700 hover:bg-blue-50"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onCounselor?.();
              }}
              className="rounded-lg px-3 py-2.5 text-left font-display text-sm font-semibold text-blue-700 hover:bg-blue-50"
              data-testid="mobile-counselor-button"
            >
              Talk to Counselor
            </button>
            <Link
              to="/admin"
              className="rounded-lg px-3 py-2.5 font-display text-sm font-semibold text-slate-500 hover:bg-blue-50"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
