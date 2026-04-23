"use client";

import { motion } from "framer-motion";
import { MatrixCircle } from "@/components/ui/MatrixCircle";
import { User, Target, Heart, History, Sparkles, Infinity as InfinityIcon, Fingerprint } from "lucide-react";

const mainSectors = [
    { title: "ЛИЧНОСТЬ", icon: User, desc: "Кто вы, ваши таланты и характер", color: "text-emerald-400" },
    { title: "РЕАЛИЗАЦИЯ", icon: Target, desc: "Предназначение, карьера и самореализация", color: "text-amber-400" },
    { title: "ОТНОШЕНИЯ", icon: Heart, desc: "Любовь, семья и окружение", color: "text-rose-400" },
    { title: "КАРМА", icon: History, desc: "Родовые программы и уроки души", color: "text-purple-400" }
];

const bottomFeatures = [
    { title: "22 ЭНЕРГИИ", desc: "каждая несёт уникальный смысл", icon: Sparkles },
    { title: "БЕСКОНЕЧНЫЕ КОМБИНАЦИИ", desc: "ваша матрица уникальна", icon: InfinityIcon },
    { title: "100% ПЕРСОНАЛЬНО", desc: "расчет по вашей дате рождения", icon: Fingerprint }
];

export function IntroSection() {
  return (
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden bg-[#070b14]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Основы матрицы</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none glow-text">
                Что такое<br/>Матрица Судьбы?
            </h2>
            
            <div className="h-1 w-16 bg-indigo-500 rounded-full" />
            
            <p className="text-lg text-slate-400 leading-relaxed font-medium italic">
                Это система самопознания на стыке психологии и нумерологии. 
                В её основе лежит 22 энергии, которые зашифрованы в вашей дате рождения.
            </p>
            
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] flex gap-6 items-start group hover:bg-white/[0.04] transition-all">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                    <Sparkles size={20} />
                </div>
                <div className="space-y-2">
                    <p className="text-white font-bold text-sm">Матрица — это не гадание.</p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                        Это карта вашего потенциала. Она объясняет, почему в вашей жизни происходят те или иные события, 
                        и дает четкие инструкции, как изменить свою реальность через работу над собой.
                    </p>
                </div>
            </div>
          </motion.div>

          {/* Right Diagram Block */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
             <div className="bg-[#121826]/40 border border-white/5 p-12 rounded-[56px] shadow-2xl flex flex-col md:flex-row items-center gap-12 w-full">
                <div className="flex-1">
                    <MatrixCircle />
                </div>
                
                <div className="flex-shrink-0 space-y-8 w-full md:w-[240px]">
                    {mainSectors.map((s, i) => (
                        <div key={i} className="flex gap-4 items-start group">
                            <div className={`p-2 rounded-lg bg-white/5 border border-white/5 transition-transform group-hover:scale-110 ${s.color}`}>
                                <s.icon size={16} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{s.title}</h4>
                                <p className="text-[9px] text-slate-500 italic leading-snug">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottomFeatures.map((f, i) => (
                <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] flex items-center gap-6 hover:bg-white/[0.04] transition-all group">
                    <div className="p-4 bg-white/5 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                        <f.icon size={20} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{f.title}</h4>
                        <p className="text-[10px] text-slate-500 italic uppercase tracking-wider">{f.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
