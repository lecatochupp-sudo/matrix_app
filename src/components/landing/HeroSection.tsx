"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollToCalc = () => {
    document.getElementById("calc")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-5xl"
      >
        <div className="inline-block px-6 py-2 mb-10 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3">
               <Sparkles size={14} className="animate-pulse" /> Advanced Numerology System
            </span>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-white mb-10 leading-[0.85] uppercase">
          Раскрой свой<br/>персональный код
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 font-serif italic max-w-3xl mx-auto mb-16 leading-relaxed">
          Самый глубокий психологический анализ вашей личности на основе Матрицы Судьбы. Узнайте всё о своих талантах, деньгах и предназначении.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
                onClick={scrollToCalc}
                className="group relative px-16 py-8 bg-white text-indigo-950 font-black uppercase text-xs tracking-[0.4em] rounded-[32px] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-2xl"
            >
                Рассчитать бесплатно <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                Верифицировано 12,000+ пользователями
            </p>
        </div>
      </motion.div>
    </section>
  );
}
