"use client";

import { motion } from "framer-motion";
import { User, ShieldCheck, Cpu, ArrowRight, Star } from "lucide-react";

export function StatsBar() {
  const stats = [
    { label: "Пользователей", value: "12,000+", icon: User },
    { label: "Точность анализа", value: "98%", icon: ShieldCheck },
    { label: "Время расчета", value: "5 Минут", icon: Cpu },
    { label: "Средняя оценка", value: "4.9/5", icon: Star },
    { label: "Безопасность данных", value: "100%", icon: ShieldCheck }
  ];

  return (
    <div className="w-full bg-[#121826]/40 backdrop-blur-xl border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-8 mt-10 md:mt-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center gap-2 md:gap-3 mb-1">
                <s.icon size={14} className="text-indigo-500 opacity-50" />
                <span className="text-xl md:text-2xl font-black text-white italic tracking-tighter">{s.value}</span>
            </div>
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-600">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
