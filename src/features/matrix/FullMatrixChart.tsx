"use client";

import { motion } from "framer-motion";
import { Heart, DollarSign, Sparkles, Zap, Sun, Shield, Target, User } from "lucide-react";

export function FullMatrixChart({ data, onPointClick }: any) {
  const size = 650;
  const center = size / 2;
  const rMain = 230; 
  const rAncestral = 230; 

  const { diagonal, ancestral, health, money, love } = data;

  const Point = ({ x, y, val, color = "#6366f1", size = 18, label, isMain = false, subLabel }: any) => (
    <motion.g 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.25 }}
      className="cursor-pointer"
      onClick={() => onPointClick?.(label, val)}
    >
      {isMain && (
        <circle cx={x} cy={y} r={size + 12} fill={color} opacity="0.1" className="animate-pulse" />
      )}
      <circle 
        cx={x} cy={y} r={size} 
        fill={isMain ? color : "#0a0f1d"} 
        stroke={isMain ? "white" : color} 
        strokeWidth={isMain ? "4" : "2"} 
        className="shadow-2xl"
      />
      <text 
        x={x} y={y + (size/3)} 
        textAnchor="middle" 
        className={`text-[12px] font-black select-none ${isMain ? 'fill-white' : 'fill-slate-200'}`}
      >
        {val}
      </text>
      
      {subLabel && (
        <text 
          x={x} y={y - size - 14} 
          textAnchor="middle" 
          className={`text-[10px] font-black uppercase tracking-[0.2em] ${isMain ? 'fill-indigo-400' : 'fill-slate-600'}`}
        >
          {subLabel}
        </text>
      )}
    </motion.g>
  );

  return (
    <div className="relative w-full aspect-square max-w-[650px] mx-auto overflow-visible group">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-indigo-500/10 blur-[150px] rounded-full scale-90 group-hover:scale-105 transition-transform duration-1000" />
      
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible relative z-10 drop-shadow-[0_0_60px_rgba(99,102,241,0.25)]">
        <defs>
            <radialGradient id="matrixGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="loveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
        </defs>

        {/* Sacred Geometry Zones Labels */}
        <g className="opacity-20 pointer-events-none font-black uppercase tracking-[0.5em] text-[10px] fill-white">
            <text x={center} y={center - rMain - 60} textAnchor="middle">Духовный Потенциал</text>
            <text x={center} y={center + rMain + 80} textAnchor="middle">Кармический Опыт</text>
            <text x={center - rMain - 80} y={center} textAnchor="middle" transform={`rotate(-90, ${center - rMain - 80}, ${center})`}>Личная Сила</text>
            <text x={center + rMain + 80} y={center} textAnchor="middle" transform={`rotate(90, ${center + rMain + 80}, ${center})`}>Социальный Выход</text>
        </g>

        <circle cx={center} cy={center} r={rMain} fill="url(#matrixGlow)" />

        {/* Lines */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
            <line x1={center-rMain} y1={center} x2={center+rMain} y2={center} />
            <line x1={center} y1={center-rMain} x2={center} y2={center+rMain} />
            <line x1={center-rAncestral*0.707} y1={center-rAncestral*0.707} x2={center+rAncestral*0.707} y2={center+rAncestral*0.707} />
            <line x1={center+rAncestral*0.707} y1={center-rAncestral*0.707} x2={center-rAncestral*0.707} y2={center+rAncestral*0.707} />
        </g>

        {/* Shapes */}
        <motion.path 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          d={`M ${center} ${center - rMain} L ${center + rMain} ${center} L ${center} ${center + rMain} L ${center - rMain} ${center} Z`}
          fill="none" stroke="#6366f1" strokeWidth="4"
        />
        <motion.rect 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          x={center - rAncestral*0.707} y={center - rAncestral*0.707} 
          width={rAncestral * 1.414} height={rAncestral * 1.414} 
          fill="none" stroke="#f43f5e" strokeWidth="2" strokeOpacity="0.4"
        />

        {/* Icons for Zones */}
        <g className="opacity-40">
            <g transform={`translate(${center + rMain*0.5}, ${center - 40}) scale(1.2)`}><DollarSign color="#fbbf24" /></g>
            <g transform={`translate(${center + rMain*0.3}, ${center + rMain*0.3}) scale(1.2)`}><Heart color="#f43f5e" /></g>
            <g transform={`translate(${center - 40}, ${center - rMain*0.6}) scale(1.2)`}><Sun color="#8b5cf6" /></g>
            <g transform={`translate(${center - 20}, ${center + rMain*0.6}) scale(1.2)`}><Shield color="#f43f5e" /></g>
        </g>

        {/* Main Nodes */}
        <Point x={center} y={center - rMain} val={diagonal.top} color="#6366f1" isMain={true} label="Дух" subLabel="Талант" />
        <Point x={center} y={center + rMain} val={diagonal.bottom} color="#f43f5e" isMain={true} label="Карма" subLabel="Урок" />
        <Point x={center - rMain} y={center} val={diagonal.left} color="#6366f1" isMain={true} label="Я" subLabel="Личность" />
        <Point x={center + rMain} y={center} val={diagonal.right} color="#6366f1" isMain={true} label="Мир" subLabel="Материя" />

        {/* Chakra points */}
        {[
            { y: center - rMain*0.75, v: health.chakra6, c: "#8b5cf6" },
            { y: center - rMain*0.4, v: health.chakra5, c: "#3b82f6" },
            { y: center + rMain*0.4, v: health.chakra3, c: "#eab308" },
            { y: center + rMain*0.75, v: health.chakra2, c: "#f97316" }
        ].map((p, i) => (
            <Point key={i} x={center} y={p.y} val={p.v} color={p.c} size={15} label={`chakra_${i}`} />
        ))}

        {/* Central Force */}
        <motion.g whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <circle cx={center} cy={center} r="45" fill="#6366f1" className="drop-shadow-2xl" />
            <circle cx={center} cy={center} r="52" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" opacity="0.2" />
            <text x={center} y={center + 12} textAnchor="middle" className="text-4xl font-black fill-white select-none">{diagonal.center}</text>
            <text x={center} y={center - 60} textAnchor="middle" className="text-[10px] font-black uppercase tracking-[0.4em] fill-indigo-400">Сила</text>
        </motion.g>
      </svg>
    </div>
  );
}
