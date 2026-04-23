"use client";

import { motion } from "framer-motion";
import { MatrixCircle } from "@/components/ui/MatrixCircle";
import { User, Zap, Heart, History } from "lucide-react";

const sectors = [
    { title: "Личность", icon: User, desc: "Ваш врожденный потенциал" },
    { title: "Реализация", icon: Zap, desc: "Точки роста и успеха" },
    { title: "Отношения", icon: Heart, desc: "Сценарии взаимодействия" },
    { title: "Карма", icon: History, desc: "Уроки и задачи души" }
];

export function IntroSection() {
  return (
    <section className="py-40 px-6 bg-white/[0.01] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none glow-text">Что такое<br/>Матрица?</h2>
            <p className="text-xl text-slate-400 font-serif italic leading-relaxed max-w-xl">
                Это глубокая система самопознания, которая объединяет древнюю мудрость чисел и современный психоанализ.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                {sectors.map((s, i) => (
                    <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all">
                        <s.icon size={20} className="text-indigo-400 mb-4" />
                        <h4 className="text-sm font-black uppercase text-white tracking-widest mb-1">{s.title}</h4>
                        <p className="text-xs text-slate-500 italic">{s.desc}</p>
                    </div>
                ))}
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
        >
            <MatrixCircle />
            
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[300px] p-6 glow-card rounded-[32px] text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">Verified Protocol</p>
                <p className="text-xs text-slate-400 italic">Анализ 22 ключевых энергий вашего воплощения</p>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
