"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { RadarChart } from "@/components/ui/RadarChart";

export function ExampleSection() {
  return (
    <section className="py-40 px-6 bg-indigo-600/[0.02] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-center">
        <div className="flex-1 order-2 lg:order-1 relative">
            <RadarChart />
            
            <div className="absolute top-0 right-0 p-6 glow-card rounded-3xl hidden md:block">
                <p className="text-[9px] font-black uppercase text-indigo-400 mb-1">Balance Index</p>
                <p className="text-xl font-black italic text-white leading-none">82.4%</p>
            </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-12 order-1 lg:order-2"
        >
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none glow-text">Глубокая<br/>Интерпретация</h2>
            <p className="text-xl text-slate-400 font-serif italic leading-relaxed">
                Ваш отчет — это не просто числа, а визуальная карта баланса всех сфер вашей жизни. Мы анализируем пересечения энергий, чтобы дать вам точный план действий.
            </p>
            
            <div className="space-y-6">
                {[
                    "Визуализация баланса 5 ключевых сфер",
                    "Персональный расчет до 12-го колена",
                    "Конкретные инструкции по выводу энергий в плюс",
                    "Прогноз по годам и месяцам в формате таймлайна"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-300 group">
                        <div className="p-1 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors">
                            <CheckCircle2 size={18} className="text-indigo-400 group-hover:text-white" />
                        </div>
                        <span className="text-lg font-medium italic font-serif opacity-80 group-hover:opacity-100 transition-opacity">{item}</span>
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
}
