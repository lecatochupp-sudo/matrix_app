"use client";

import React from 'react';
import { motion } from "framer-motion";

export function MatrixCircle() {
  const totalPoints = 22;
  const radius = 160;
  const centerX = 200;
  const centerY = 200;

  // Numbers from the image (some are 2?, 1, 2, 3...)
  const displayNumbers = [1, 2, 3, 4, 5, 6, 9, 8, 13, 13, 10, 11, 14, 18, 18, 18, 17, 17, "2?", 21, 1, 2];

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center scale-110">
      {/* Background Deep Glow - Massive Indigo Bloom */}
      <div className="absolute inset-0 bg-indigo-600/20 blur-[150px] rounded-full animate-pulse" />
      
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 overflow-visible drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#6366f1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Orbit Lines (Thin circles) */}
        {[140, 150, 160, 175, 190].map((r, i) => (
          <circle 
            key={i} 
            cx={centerX} cy={centerY} r={r} 
            fill="none" 
            stroke="rgba(99, 102, 241, 0.1)" 
            strokeWidth="0.5" 
          />
        ))}

        {/* The Main Connecting Lines (Rays) */}
        {Array.from({ length: totalPoints }).map((_, i) => {
          const angle = (i * 360) / totalPoints - 90;
          const x2 = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin((angle * Math.PI) / 180);
          return (
            <line 
              key={`ray-${i}`} 
              x1={centerX} y1={centerY} x2={x2} y2={y2} 
              stroke="rgba(99, 102, 241, 0.2)" 
              strokeWidth="0.8"
            />
          );
        })}

        {/* Connecting Curves (Spirograph) */}
        <circle 
            cx={centerX} cy={centerY} r={radius} 
            fill="none" 
            stroke="rgba(99, 102, 241, 0.4)" 
            strokeWidth="1"
            className="opacity-50"
        />

        {/* Nodes with Numbers */}
        {Array.from({ length: totalPoints }).map((_, i) => {
          const angle = (i * 360) / totalPoints - 90;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          const num = displayNumbers[i % displayNumbers.length];

          return (
            <motion.g 
              key={`node-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="cursor-pointer"
            >
              {/* Node Circle */}
              <circle 
                cx={x} cy={y} r="14" 
                fill="#070b14" 
                stroke="#6366f1" 
                strokeWidth="2" 
                filter="url(#strongGlow)"
              />
              {/* Number Text */}
              <text 
                x={x} y={y + 5} 
                textAnchor="middle" 
                className="text-[12px] font-black fill-white select-none pointer-events-none tracking-tighter"
              >
                {num}
              </text>
            </motion.g>
          );
        })}

        {/* Center Glowing Hub */}
        <circle cx={centerX} cy={centerY} r="50" fill="url(#centerGlow)" className="animate-pulse" />
        <motion.g 
            animate={{ scale: [1, 1.02, 1] }} 
            transition={{ duration: 3, repeat: Infinity }}
            className="drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            <text x={centerX} y={centerY + 15} textAnchor="middle" className="text-6xl font-black fill-white italic tracking-tighter uppercase">22</text>
        </motion.g>
      </svg>
    </div>
  );
}
