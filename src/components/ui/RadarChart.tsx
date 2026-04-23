"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function RadarChart() {
  const axes = ["Личность", "Финансы", "Отношения", "Здоровье", "Реализация"];
  const data = [0.85, 0.72, 0.9, 0.78, 0.82]; // Demo values
  const radius = 140;
  const centerX = 200;
  const centerY = 200;

  const points = axes.map((_, i) => {
    const angle = (i * 360) / axes.length - 90;
    const r = radius * data[i];
    const x = centerX + r * Math.cos((angle * Math.PI) / 180);
    const y = centerY + r * Math.sin((angle * Math.PI) / 180);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-violet-600/5 blur-[120px] rounded-full" />
      
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 overflow-visible">
        {/* Grid Circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((lvl) => (
          <circle 
            key={lvl} 
            cx={centerX} cy={centerY} 
            r={radius * lvl} 
            fill="none" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
          />
        ))}

        {/* Axes */}
        {axes.map((axis, i) => {
          const angle = (i * 360) / axes.length - 90;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          const lx = centerX + (radius + 35) * Math.cos((angle * Math.PI) / 180);
          const ly = centerY + (radius + 35) * Math.sin((angle * Math.PI) / 180);

          return (
            <g key={axis}>
              <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text 
                x={lx} y={ly} 
                textAnchor="middle" 
                className="text-[9px] font-black uppercase tracking-widest fill-slate-500"
              >
                {axis}
              </text>
            </g>
          );
        })}

        {/* Data Polygon */}
        <motion.polygon 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          points={points}
          fill="rgba(99, 102, 241, 0.15)"
          stroke="#6366f1"
          strokeWidth="3"
          filter="drop-shadow(0 0 10px rgba(99,102,241,0.5))"
        />

        {/* Dots */}
        {axes.map((_, i) => {
          const angle = (i * 360) / axes.length - 90;
          const r = radius * data[i];
          const x = centerX + r * Math.cos((angle * Math.PI) / 180);
          const y = centerY + r * Math.sin((angle * Math.PI) / 180);
          return (
            <circle key={i} cx={x} cy={y} r="4" fill="white" className="shadow-2xl" />
          );
        })}
      </svg>
    </div>
  );
}
