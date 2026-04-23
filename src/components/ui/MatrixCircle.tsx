"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function MatrixCircle() {
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 10, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22]; // Based on image
  const totalPoints = 22;
  const radius = 140;
  const centerX = 200;
  const centerY = 200;

  // Colors based on the image arcs
  const getPointColor = (p: number) => {
    if (p <= 2 || p >= 21) return "#fbbf24"; // Yellow top
    if (p <= 8) return "#f43f5e"; // Rose right
    if (p <= 14) return "#8b5cf6"; // Purple bottom
    return "#3b82f6"; // Blue left
  };

  return (
    <div className="relative w-full max-w-[450px] aspect-square mx-auto flex items-center justify-center">
      {/* Background Deep Glow */}
      <div className="absolute inset-0 bg-indigo-500/10 blur-[120px] rounded-full" />
      
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 overflow-visible">
        <defs>
          <radialGradient id="centerPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Decorative Concentric Rings */}
        {[100, 120, 140, 160].map((r, i) => (
          <circle 
            key={i} 
            cx={centerX} cy={centerY} r={r} 
            fill="none" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
          />
        ))}

        {/* Spirograph-like background pattern */}
        <path 
            d="M200,60 A140,140 0 0,1 340,200 A140,140 0 0,1 200,340 A140,140 0 0,1 60,200 A140,140 0 0,1 200,60" 
            fill="none" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="0.5"
        />

        {/* Connections to Center */}
        {Array.from({ length: 22 }).map((_, i) => {
          const angle = (i * 360) / totalPoints - 90;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          return (
            <line 
              key={`line-${i}`} 
              x1={centerX} y1={centerY} x2={x} y2={y} 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="0.5"
            />
          );
        })}

        {/* Points with Numbers */}
        {Array.from({ length: totalPoints }).map((_, i) => {
          const p = [1,2,3,4,5,6,7,8,10,10,12,13,14,15,16,17,18,19,20,22][i] || (i+1);
          const angle = (i * 360) / totalPoints - 90;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          const color = getPointColor(p);

          return (
            <motion.g 
              key={`node-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer group"
            >
              <circle 
                cx={x} cy={y} r="10" 
                fill="#070b14" 
                stroke={color} 
                strokeWidth="1.5" 
                filter="url(#glow)"
              />
              <text 
                x={x} y={y + 3} 
                textAnchor="middle" 
                className="text-[7px] font-black fill-white pointer-events-none select-none"
              >
                {p}
              </text>
            </motion.g>
          );
        })}

        {/* Center Text Block */}
        <circle cx={centerX} cy={centerY} r="60" fill="url(#centerPulse)" />
        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <text x={centerX} y={centerY - 10} textAnchor="middle" className="text-5xl font-black fill-white italic tracking-tighter">22</text>
            <text x={centerX} y={centerY + 15} textAnchor="middle" className="text-[8px] font-black uppercase tracking-[0.3em] fill-indigo-400">Энергии</text>
            <text x={centerX} y={centerY + 30} textAnchor="middle" className="text-[5px] font-bold uppercase tracking-[0.2em] fill-slate-500">Код вашей жизни</text>
        </motion.g>
      </svg>
    </div>
  );
}
