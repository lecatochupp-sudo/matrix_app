"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function ExampleSection() {
  return (
    <section className="py-40 px-6 bg-indigo-600/[0.02]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-center">
        <div className="flex-1 order-2 lg:order-1">
            <div className="relative">
                <div className="absolute -inset-10 bg-indigo-500/10 blur-[80px] rounded-full" />
                <div className="relative bg-[#0a0f1d] border border-white/5 p-4 rounded-[48px] shadow-2xl scale-95 lg:scale-100 origin-center lg:origin-left transition-transform duration-700 hover:scale-[1.02]">
                    <div className="bg-[#121826] rounded-[40px] p-10 aspect-[3/4] flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center mb-12">
                            <div className="w-12 h-12 bg-white/5 rounded-full" />
                            <div className="flex gap-2">
                                <div className="w-8 h-2 bg-indigo-500/30 rounded-full" />
                                <div className="w-4 h-2 bg-white/5 rounded-full" />
                            </div>
                        </div>
                        
                        <div className="space-y-4 mb-12">
                            <div className="h-10 w-2/3 bg-white/5 rounded-2xl" />
                            <div className="h-6 w-1/2 bg-indigo-500/20 rounded-xl" />
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-12">
                            <div className="h-24 bg-white/5 rounded-3xl" />
                            <div className="h-24 bg-white/5 rounded-3xl" />
                            <div className="h-24 bg-white/5 rounded-3xl" />
                        </div>

                        <div className="space-y-3 flex-grow">
                            <div className="h-3 w-full bg-white/5 rounded-full" />
                            <div className="h-3 w-full bg-white/5 rounded-full" />
                            <div className="h-3 w-4/5 bg-white/5 rounded-full" />
                            <div className="h-3 w-5/6 bg-white/5 rounded-full" />
                        </div>

                        <div className="mt-8 p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-[28px] text-center">
                            <div className="w-12 h-1 bg-white/20 mx-auto rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-12 order-1 lg:order-2"
        >
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Профессиональная<br/>Интерпретация</h2>
            <p className="text-xl text-slate-400 font-serif italic leading-relaxed">
                Наши отчеты — это не сухой набор цифр. Это полноценный психологический разбор, созданный экспертами и реализованный через умные алгоритмы.
            </p>
            <ul className="space-y-6">
                {[
                    "Персональный расчет до 12-го колена",
                    "Верифицированные психологические профили",
                    "Конкретные инструкции по выводу энергий в плюс",
                    "Прогноз по годам и месяцам"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300">
                        <CheckCircle2 size={24} className="text-indigo-500 flex-shrink-0" />
                        <span className="text-lg font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
      </div>
    </section>
  );
}
