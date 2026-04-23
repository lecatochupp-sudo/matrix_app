import { HeroSection } from "@/components/landing/HeroSection";
import { IntroSection } from "@/components/landing/IntroSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { ExampleSection } from "@/components/landing/ExampleSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { CTASection } from "@/components/landing/CTASection";
import { CalculatorSection } from "@/components/landing/CalculatorSection";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 selection:bg-indigo-500/30 overflow-x-hidden">
      <Header />
      
      <main>
        <HeroSection />
        <IntroSection />
        <BenefitsSection />
        <ExampleSection />
        <WhyUsSection />
        <CTASection />
        <CalculatorSection />
      </main>

      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
          © 2026 Matrix Destiny Pro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
