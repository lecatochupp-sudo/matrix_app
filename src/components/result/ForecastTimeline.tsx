"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronRight, Zap } from "lucide-react";

interface ForecastYear {
    year: number;
    age: number;
    energy: number;
    description: string;
}

export function ForecastTimeline({ items }: { items: ForecastYear[] }) {
  return (
    <div className="relative pl-8 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-indigo-500/50 before:via-white/10 before:to-transparent">
      {items.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative group"
        >
          {/* Dot */}
          <div className="absolute -left-[37px] top-1.5 w-[11px] h-[11px] rounded-full bg-[#070b14] border-2 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10 group-hover:scale-125 transition-transform" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
            <div className="flex items-center gap-3">
                <span className="text-2xl font-black italic text-white tracking-tighter">{item.year}</span>
                <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{item.age} лет</span>
            </div>
            <div className="h-px flex-grow bg-white/5 hidden md:block" />
            <div className="px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2">
                <Zap size={10} className="text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Энергия года: {item.energy}</span>
            </div>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] group-hover:bg-white/[0.04] group-hover:border-white/10 transition-all">
            <p className="text-slate-400 leading-relaxed font-serif italic text-lg">
                {item.description}
            </p>
            <button className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase text-indigo-500/60 hover:text-indigo-400 transition-colors tracking-widest">
                Читать полный прогноз <ChevronRight size={12} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
