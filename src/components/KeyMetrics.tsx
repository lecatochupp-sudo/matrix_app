"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Star, LucideIcon } from 'lucide-react';

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
        return (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-[#121826]/40 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] relative overflow-hidden transition-all hover:bg-[#121826]/60 hover:border-white/10"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={80} className={m.colorClass} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${m.colorClass}`}>
                  <Icon size={16} />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{m.label}</p>
              </div>
              <p className={`text-5xl font-black italic tracking-tighter ${m.colorClass}`}>{m.value}</p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-10" />
          </motion.div>
        );
      })}
    </div>
  );
}
