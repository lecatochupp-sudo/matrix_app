"use client";

import { motion } from "framer-motion";

export function CTASection() {
  const scrollToCalc = () => {
    document.getElementById("calc")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-40 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-7xl mx-auto bg-gradient-to-br from-indigo-700 to-violet-800 p-20 md:p-32 rounded-[72px] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-250 -mt-250 blur-[120px] animate-pulse" />
        <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-12 leading-[0.85]">Ваша судьба —<br/>в ваших руках</h2>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto mb-16 font-serif italic">Хватит искать ответы вслепую. Получите точную карту своей личности и начните управлять реальностью.</p>
            <button 
                onClick={scrollToCalc}
                className="px-20 py-8 bg-white text-indigo-950 font-black uppercase text-xs tracking-[0.5em] rounded-[32px] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
                Начать расчет
            </button>
        </div>
      </motion.div>
    </section>
  );
}
