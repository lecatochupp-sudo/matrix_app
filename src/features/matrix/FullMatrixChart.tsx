"use client";

import { motion } from "framer-motion";
import { Heart, DollarSign, Sparkles } from "lucide-react";

export function FullMatrixChart({ data, onPointClick }: any) {
  const size = 600;
  const center = size / 2;
  const rMain = 200; 
  const rAncestral = 200; 

  const { diagonal, ancestral, health, money, love } = data;

  const Point = ({ x, y, val, color = "#6366f1", size = 16, label, isMain = false, subLabel }: any) => (
    <motion.g 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.15 }}
      className="cursor-pointer"
      onClick={() => onPointClick?.(label, val)}
    >
      <defs>
        <filter id={`glow-${label}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Glow effect for main points */}
      {isMain && (
        <circle cx={x} cy={y} r={size + 4} fill={color} opacity="0.2" filter={`url(#glow-${label})`} />
      )}
      
      <circle 
        cx={x} cy={y} r={size} 
        fill={isMain ? color : "#1e293b"} 
        stroke={color} 
        strokeWidth="2" 
      />
      <text 
        x={x} y={y + (size/3)} 
        textAnchor="middle" 
        className={`text-[10px] font-black select-none ${isMain ? 'fill-white' : 'fill-slate-300'}`}
      >
        {val}
      </text>
      
      {subLabel && (
        <text 
          x={x} y={y - size - 8} 
          textAnchor="middle" 
          className="text-[8px] font-black uppercase tracking-widest fill-slate-500"
        >
          {subLabel}
        </text>
      )}
    </motion.g>
  );

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto overflow-visible">
      {/* Глубокое фоновое свечение */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-3xl" />
      
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible relative z-10 drop-shadow-[0_0_30px_rgba(99,102,241,0.1)]">
        {/* Декоративные внешние кольца */}
        <circle cx={center} cy={center} r={rMain + 40} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <circle cx={center} cy={center} r={rMain + 60} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 8" />

        {/* Сетка линий с градиентом */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
            <line x1={center-rMain} y1={center} x2={center+rMain} y2={center} />
            <line x1={center} y1={center-rMain} x2={center} y2={center+rMain} />
            <line x1={center-rAncestral*0.707} y1={center-rAncestral*0.707} x2={center+rAncestral*0.707} y2={center+rAncestral*0.707} strokeOpacity="0.5" />
            <line x1={center+rAncestral*0.707} y1={center-rAncestral*0.707} x2={center-rAncestral*0.707} y2={center+rAncestral*0.707} strokeOpacity="0.5" />
        </g>

        {/* Ромб (Личный) */}
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M ${center} ${center - rMain} L ${center + rMain} ${center} L ${center} ${center + rMain} L ${center - rMain} ${center} Z`}
          fill="rgba(99, 102, 241, 0.02)" stroke="#6366f1" strokeWidth="3"
        />

        {/* Квадрат (Родовой) */}
        <motion.rect 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          x={center - rAncestral*0.707} y={center - rAncestral*0.707} 
          width={rAncestral * 1.414} height={rAncestral * 1.414} 
          fill="none" stroke="#f43f5e" strokeWidth="2"
        />

        {/* ЧАКРОВЫЙ СТОЛБ */}
        <Point x={center} y={center - rMain*0.75} val={health.chakra6} color="#8b5cf6" label="Аджна" />
        <Point x={center} y={center - rMain*0.4} val={health.chakra5} color="#3b82f6" label="Вишудха" />
        <Point x={center} y={center + rMain*0.4} val={health.chakra3} color="#eab308" label="Манипура" />
        <Point x={center} y={center + rMain*0.75} val={health.chakra2} color="#f97316" label="Свадхистана" />

        {/* ТРИАДА ДЕНЕГ */}
        <Point x={center + rMain*0.5} y={center} val={money.entrance} color="#fbbf24" label="Вход в деньги" />
        <g transform={`translate(${center + rMain*0.65}, ${center - 10}) scale(0.7)`} className="opacity-40">
            <DollarSign color="#fbbf24" />
        </g>

        {/* ТРИАДА ЛЮБВИ */}
        <Point x={center + rMain*0.35} y={center + rMain*0.35} val={love.entrance} color="#f43f5e" label="Вход в отношения" />
        <g transform={`translate(${center + rMain*0.45}, ${center + rMain*0.45}) scale(0.7)`} className="opacity-40">
            <Heart color="#f43f5e" />
        </g>

        {/* Основные вершины */}
        <Point x={center} y={center - rMain} val={diagonal.top} color="#6366f1" isMain={true} label="Месяц" subLabel="Талант" />
        <Point x={center} y={center + rMain} val={diagonal.bottom} color="#f43f5e" isMain={true} label="Карма" subLabel="Карма" />
        <Point x={center - rMain} y={center} val={diagonal.left} color="#6366f1" isMain={true} label="День" subLabel="Личность" />
        <Point x={center + rMain} y={center} val={diagonal.right} color="#6366f1" isMain={true} label="Год" subLabel="Деньги" />

        {/* Родовые вершины (мелкие) */}
        <Point x={center - rAncestral*0.707} y={center - rAncestral*0.707} val={ancestral.topLeft} color="#f43f5e" size={12} label="Род П" />
        <Point x={center + rAncestral*0.707} y={center - rAncestral*0.707} val={ancestral.topRight} color="#f43f5e" size={12} label="Род М" />
        <Point x={center + rAncestral*0.707} y={center + rAncestral*0.707} val={ancestral.bottomRight} color="#f43f5e" size={12} label="Род МК" />
        <Point x={center - rAncestral*0.707} y={center + rAncestral*0.707} val={ancestral.bottomLeft} color="#f43f5e" size={12} label="Род ПК" />

        {/* Центр */}
        <motion.g 
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer"
        >
            <defs>
              <radialGradient id="centerGradient">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </radialGradient>
            </defs>
            <circle cx={center} cy={center} r="36" fill="url(#centerGradient)" className="drop-shadow-lg" />
            <circle cx={center} cy={center} r="42" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <text x={center} y={center + 10} textAnchor="middle" className="text-2xl font-black fill-white select-none">{diagonal.center}</text>
            <text x={center} y={center - 45} textAnchor="middle" className="text-[8px] font-black uppercase tracking-[0.3em] fill-indigo-400">Сила</text>
        </motion.g>
      </svg>
    </div>
  );
}
