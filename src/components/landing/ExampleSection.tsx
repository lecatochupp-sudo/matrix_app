"use client";

import { motion } from "framer-motion";
import { CheckCircle2, User, Zap, History, Sparkles } from "lucide-react";
import { RadarChart } from "@/components/ui/RadarChart";

export function ExampleSection() {
  return (
    <section className="py-40 px-6 bg-indigo-600/[0.01] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left: Professional Card UI */}
        <div className="lg:col-span-6 w-full order-2 lg:order-1">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-[#121826]/60 border border-white/5 p-8 md:p-12 rounded-[64px] shadow-2xl relative overflow-hidden group"
            >
                {/* Header of the card */}
                <div className="flex justify-between items-center mb-16">
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Ваш психологический профиль</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    {/* User Stats Column */}
                    <div className="md:col-span-3 space-y-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                                <User size={48} className="text-slate-700" />
                            </div>
                            <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest mb-1">Ваш потенциал</p>
                            <p className="text-4xl font-black italic text-white leading-none mb-2">85%</p>
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Высокий потенциал</p>
                        </div>
                    </div>

                    {/* Chart Center */}
                    <div className="md:col-span-6">
                        <RadarChart />
                    </div>

                    {/* Detail Column */}
                    <div className="md:col-span-3 space-y-8">
                        <div className="space-y-2">
                            <p className="text-[8px] font-black uppercase text-indigo-400 tracking-widest">Ваша сила</p>
                            <div className="flex items-center gap-3">
                                <Zap size={14} className="text-indigo-400" />
                                <p className="text-[10px] text-white font-bold leading-tight italic">Интуиция и аналитика</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[8px] font-black uppercase text-rose-400 tracking-widest">Ваш урок</p>
                            <div className="flex items-center gap-3">
                                <History size={14} className="text-rose-400" />
                                <p className="text-[10px] text-white font-bold leading-tight italic">Доверие и принятие</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[8px] font-black uppercase text-emerald-400 tracking-widest">Ваш ресурс</p>
                            <div className="flex items-center gap-3">
                                <Sparkles size={14} className="text-emerald-400" />
                                <p className="text-[10px] text-white font-bold leading-tight italic">Творчество и вдохновение</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer of the card: Key Energies */}
                <div className="mt-16 pt-12 border-t border-white/5">
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-6">Ключевые энергии</p>
                    <div className="flex flex-wrap gap-4">
                        {[3, 7, 11, 17, 22].map((n) => (
                            <div key={n} className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/20 ${n === 22 ? 'border-indigo-500 bg-indigo-500/10' : ''}`}>
                                <span className={`text-xs font-black italic ${n === 22 ? 'text-indigo-400' : 'text-slate-400'}`}>{n}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Right Content */}
        <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-6 space-y-10 order-1 lg:order-2"
        >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.85] glow-text pr-10 overflow-visible">
                ЭКСПЕРТНЫЙ <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">РАЗБОР</span>
            </h2>
            
            <p className="text-xl text-slate-400 font-serif italic leading-relaxed">
                Наши отчеты — это не сухой набор цифр. Это полноценный психологический разбор, созданный экспертами и реализованный через умные алгоритмы.
            </p>
            
            <div className="space-y-6">
                {[
                    "Персональный расчет до 12-го колена",
                    "Верифицированные психологические профили",
                    "Конкретные инструкции по выводу энергий в плюс",
                    "Прогноз по годам и месяцам"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group">
                        <div className="p-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-500">
                            <CheckCircle2 size={20} className="text-indigo-500 group-hover:text-white" />
                        </div>
                        <span className="text-lg font-medium text-slate-300 italic font-serif opacity-80 group-hover:opacity-100 transition-opacity">{item}</span>
                    </div>
                ))}
            </div>
        </motion.div>

      </div>
    </section>
  );
}
