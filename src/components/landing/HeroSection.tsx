"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowRight, User, ShieldCheck, Cpu, Star, Lock } from "lucide-react";
import { MatrixCircle } from "@/components/ui/MatrixCircle";
import { StatsBar } from "./StatsBar";

export function HeroSection() {
  const scrollToCalc = () => {
    document.getElementById("calc")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { title: "ГЛУБОКИЙ АНАЛИЗ", desc: "22 энергии и 4 ключевых сферы жизни", icon: User },
    { title: "НАУЧНЫЙ ПОДХОД", desc: "Психология, нумерология и система архетипов", icon: ShieldCheck },
    { title: "ПОЛНАЯ КОНФИДЕНЦИАЛЬНОСТЬ", desc: "Ваши данные надежно защищены", icon: Lock }
  ];

  return (
    <section className="relative min-h-screen pt-40 pb-20 px-6 overflow-hidden bg-[#070b14]">
      {/* Background ambient light */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="inline-block px-5 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3">
                   <Sparkles size={12} className="animate-pulse" /> Advanced Numerology System
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black italic tracking-tighter text-white leading-[0.9] md:leading-[0.85] uppercase">
              Раскрой свой<br/>персональный<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">код</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 font-serif italic max-w-2xl leading-relaxed">
              Самый глубокий психологический анализ вашей личности на основе Матрицы Судьбы. 
              Узнайте всё о своих талантах, деньгах и предназначении.
            </p>

            {/* Feature small blocks (Row layout) */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-6 md:gap-10 pt-4">
                {features.map((f, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 text-indigo-500 flex items-center justify-center flex-shrink-0">
                            <f.icon size={18} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{f.title}</h4>
                            <p className="text-[9px] text-slate-600 italic leading-snug">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions + Social */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 pt-8">
                <button 
                    onClick={scrollToCalc}
                    className="w-full md:w-auto group relative px-12 md:px-16 py-6 md:py-8 bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.4em] rounded-[32px] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
                >
                    Рассчитать <span className="hidden sm:inline">бесплатно</span> <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
                
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Верифицировано 12,000+ пользователей</p>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#070b14] bg-slate-800 overflow-hidden shadow-xl">
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500/40 to-violet-500/40 flex items-center justify-center text-[8px] font-bold text-white">U{i}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#facc15" className="text-amber-400" />)}
                            <span className="text-xs font-black text-white ml-2">4.9</span>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Right Column: Large Diagram */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 relative flex justify-center items-center overflow-hidden py-10"
          >
            <div className="scale-75 md:scale-100 lg:scale-110">
                <MatrixCircle />
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <StatsBar />
      </div>
    </section>
  );
}
