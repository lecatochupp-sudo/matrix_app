"use client";

import { motion } from "framer-motion";
import { User, Sparkles, Zap, DollarSign, Heart, Target, Shield, Activity, Calendar } from "lucide-react";

const navItems = [
    { id: 'personality', label: 'Личность', icon: User },
    { id: 'talents', label: 'Таланты', icon: Sparkles },
    { id: 'money', label: 'Деньги', icon: DollarSign },
    { id: 'love', label: 'Любовь', icon: Heart },
    { id: 'mission', label: 'Миссия', icon: Target },
    { id: 'karma', label: 'Карма', icon: Shield },
    { id: 'health', label: 'Здоровье', icon: Activity },
    { id: 'forecast', label: 'Прогноз', icon: Calendar },
];

export function ReportNavigation() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <nav className="flex flex-wrap gap-3 mb-16">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className="group flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all"
        >
          <item.icon size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
