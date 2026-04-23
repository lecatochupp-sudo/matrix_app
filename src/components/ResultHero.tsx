"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ResultHeroProps {
  name: string;
  date: string;
  age: number;
  gender: string;
}

export function ResultHero({ name, date, age, gender }: ResultHeroProps) {
  return (
    <header className="mb-32 text-center relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block px-4 py-1.5 mb-8 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Personal Analysis</span>
        </div>
        
        <h1 className="text-7xl md:text-[120px] font-black italic tracking-tighter text-white mb-8 bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent leading-[0.85] drop-shadow-2xl">
          {name}
        </h1>
        
        <div className="flex justify-center items-center gap-12 text-[11px] font-black uppercase tracking-[0.5em] text-slate-500">
          <div className="flex flex-col gap-1">
            <span className="text-slate-700 text-[8px]">Birth Date</span>
            <span>{date}</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-slate-700 text-[8px]">Current Age</span>
            <span>{age} Years</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-slate-700 text-[8px]">Gender</span>
            <span>{gender}</span>
          </div>
        </div>
      </motion.div>

      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] -z-10 pointer-events-none" />
    </header>
  );
}
