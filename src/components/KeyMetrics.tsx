"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Star, LucideIcon } from 'lucide-react';
import { getArcanaBrief } from '@/lib/contentProvider';

interface Metric {
  label: string;
  value: number;
  colorClass: string;
  icon: LucideIcon;
}

interface KeyMetricsProps {
  metrics: Omit<Metric, 'icon'>[];
}

const iconMap: Record<string, LucideIcon> = {
  "Энергия": Zap,
  "Карма": Shield,
  "Род": Star
};

export function KeyMetrics({ metrics }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {metrics.map((m, i) => {
        const Icon = iconMap[m.label] || Zap;
        const brief = getArcanaBrief(m.value);
        
        return (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-[#121826]/40 backdrop-blur-xl border border-white/5 p-10 rounded-[48px] relative overflow-hidden transition-all hover:bg-[#121826]/80 hover:border-indigo-500/30 shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Icon size={120} className={m.colorClass} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${m.colorClass} shadow-inner`}>
                  <Icon size={20} />
                </div>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">{m.label}</p>
              </div>
              
              <div className="flex items-baseline gap-4 mb-4">
                <p className={`text-6xl font-black italic tracking-tighter ${m.colorClass} drop-shadow-2xl`}>{m.value}</p>
                <div className="h-px flex-grow bg-white/5 self-center" />
              </div>
              
              <p className="text-sm font-serif italic text-slate-400 leading-relaxed">
                {brief}
              </p>
            </div>

            {/* Premium accent line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        );
      })}
    </div>
  );
}
