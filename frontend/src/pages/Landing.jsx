import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Programs from "@/components/Programs";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { COUNSELORS, waLink } from "@/lib/contacts";

export default function Landing() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [presetProgram, setPresetProgram] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("Sovyra tech solutions_inquiry_seen")) return;
    const t = setTimeout(() => setInquiryOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  const closeInquiry = useCallback(() => {
    sessionStorage.setItem("Sovyra tech solutions_inquiry_seen", "1");
    setInquiryOpen(false);
  }, []);

  const openInquiry = useCallback(() => setInquiryOpen(true), []);

  const unlockProgram = useCallback((program) => {
    setPresetProgram(program);
    setInquiryOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFCFF]">
      <Navbar onCounselor={openInquiry} />
      <main>
        <Hero onCounselor={openInquiry} />
        <Marquee />
        <About />
        <Domains />
        <Programs onEnroll={unlockProgram} />
        <WhyUs />
        <FAQ />
        <ApplicationForm presetProgram={presetProgram} />
      </main>
      <Footer />

      <a
        href={waLink(COUNSELORS[0].wa)}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 font-display text-sm font-bold text-white shadow-2xl shadow-emerald-900/30 transition-transform duration-200 hover:scale-105"
        data-testid="floating-whatsapp-button"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Chat on WhatsApp
      </a>

      <InquiryModal open={inquiryOpen} onClose={closeInquiry} presetProgram={presetProgram} />
    </div>
  );
}
