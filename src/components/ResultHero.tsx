"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ResultHeroProps {
  name: string;
  date: string;
  age: number;
  gender: string;
  data: any;
}

export function ResultHero({ name, date, age, gender, data }: ResultHeroProps) {
  return (
    <header className="mb-40 text-center relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="inline-block px-6 py-2 mb-12 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3">
               <Sparkles size={14} className="animate-pulse" /> Personal Destiny Profile
            </span>
        </div>
        
        <h1 className="text-8xl md:text-[140px] font-black italic tracking-tighter text-white mb-12 bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent leading-[0.8] drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
          {name}
        </h1>

        {/* Core Essence Summary - Emotional Hook */}
        <div className="max-w-3xl mx-auto mb-16 relative">
            <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] -z-10" />
            <div className="p-8 md:p-12 border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[48px] shadow-2xl">
                <p className="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                    "Ваш профиль показывает сильную внутреннюю энергию <span className="text-indigo-400 font-bold">({data.diagonal.center})</span>, выраженную линию судьбы и потенциал, который сейчас раскрыт не полностью. Вы находитесь в точке перехода, где старые модели уже не работают, а новые требуют активации вашего природного кода."
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <div className="h-1 w-12 bg-indigo-500/30 rounded-full" />
                    <div className="h-1 w-1 bg-indigo-500/30 rounded-full" />
                    <div className="h-1 w-1 bg-indigo-500/30 rounded-full" />
                </div>
            </div>
        </div>
        
        <div className="flex justify-center items-center gap-16 text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 opacity-60">
          <div className="flex flex-col gap-2">
            <span className="text-slate-800 text-[9px] tracking-widest">Born</span>
            <span>{date}</span>
          </div>
          <div className="w-px h-12 bg-white/5" />
          <div className="flex flex-col gap-2">
            <span className="text-slate-800 text-[9px] tracking-widest">Cycle</span>
            <span>{age} Years</span>
          </div>
          <div className="w-px h-12 bg-white/5" />
          <div className="flex flex-col gap-2">
            <span className="text-slate-800 text-[9px] tracking-widest">Vector</span>
            <span>{gender}</span>
          </div>
        </div>
      </motion.div>

      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 blur-[150px] -z-10 pointer-events-none" />
    </header>
  );
}
