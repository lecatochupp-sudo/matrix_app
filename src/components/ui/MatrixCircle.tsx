"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function MatrixCircle() {
  const points = Array.from({ length: 22 }, (_, i) => i + 1);
  const radius = 160;
  const centerX = 200;
  const centerY = 200;

  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
      
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 overflow-visible">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circle */}
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx={centerX} cy={centerY} r={radius + 20} fill="none" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" />

        {/* Connections to Center */}
        {points.map((p, i) => {
          const angle = (i * 360) / 22 - 90;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          return (
            <line 
              key={`line-${p}`} 
              x1={centerX} y1={centerY} x2={x} y2={y} 
              stroke="rgba(99, 102, 241, 0.08)" 
              strokeWidth="1"
            />
          );
        })}

        {/* Nodes */}
        {points.map((p, i) => {
          const angle = (i * 360) / 22 - 90;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.g 
              key={`node-${p}`}
              whileHover={{ scale: 1.3 }}
              className="cursor-pointer group"
            >
              <circle 
                cx={x} cy={y} r="8" 
                fill="#070b14" 
                stroke="#6366f1" 
                strokeWidth="2" 
                className="group-hover:fill-indigo-500 transition-colors"
                filter="url(#nodeGlow)"
              />
              <text 
                x={x} y={y + 4} 
                textAnchor="middle" 
                className="text-[6px] font-black fill-slate-500 group-hover:fill-white pointer-events-none select-none transition-colors"
              >
                {p}
              </text>
            </motion.g>
          );
        })}

        {/* Center Node */}
        <motion.g whileHover={{ scale: 1.1 }}>
          <circle cx={centerX} cy={centerY} r="28" fill="#6366f1" className="shadow-2xl" />
          <circle cx={centerX} cy={centerY} r="34" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <text x={centerX} y={centerY + 8} textAnchor="middle" className="text-xl font-black fill-white select-none italic">22</text>
        </motion.g>
      </svg>
    </div>
  );
}
