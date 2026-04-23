"use client";

import { motion } from "framer-motion";
import { Heart, DollarSign } from "lucide-react";

export function FullMatrixChart({ data, onPointClick }: any) {
  const size = 600;
  const center = size / 2;
  const rMain = 220; 
  const rAncestral = 220; 

  const { diagonal, ancestral, health, money, love } = data;

  // Вспомогательная функция для координат на окружности
  const getCoords = (angle: number, radius: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad)
    };
  };

  const Point = ({ x, y, val, color = "#6366f1", size = 14, label, isMain = false }: any) => (
    <motion.g 
      whileHover={{ scale: 1.2 }}
      className="cursor-pointer"
      onClick={() => onPointClick?.(label, val)}
    >
      <circle cx={x} cy={y} r={size} fill={isMain ? color : "white"} stroke={color} strokeWidth="2" />
      <text x={x} y={y + (size/3)} textAnchor="middle" className={`text-[9px] font-bold select-none ${isMain ? 'fill-white' : 'fill-slate-800'}`}>{val}</text>
    </motion.g>
  );

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto bg-[#020617] rounded-[60px] p-4 shadow-2xl border border-white/5 overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent" />

      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible relative z-10">
        {/* Внешний круг возраста */}
        <circle cx={center} cy={center} r={rMain + 30} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 4" />

        {/* Сетка линий */}
        <g stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none">
            <line x1={center-rMain} y1={center} x2={center+rMain} y2={center} />
            <line x1={center} y1={center-rMain} x2={center} y2={center+rMain} />
            <line x1={center-rAncestral*0.707} y1={center-rAncestral*0.707} x2={center+rAncestral*0.707} y2={center+rAncestral*0.707} />
            <line x1={center+rAncestral*0.707} y1={center-rAncestral*0.707} x2={center-rAncestral*0.707} y2={center+rAncestral*0.707} />
        </g>

        {/* Ромб (Личный) */}
        <path 
          d={`M ${center} ${center - rMain} L ${center + rMain} ${center} L ${center} ${center + rMain} L ${center - rMain} ${center} Z`}
          fill="none" stroke="#6366f1" strokeWidth="2"
        />

        {/* Квадрат (Родовой) */}
        <rect 
          x={center - rAncestral*0.707} y={center - rAncestral*0.707} 
          width={rAncestral * 1.414} height={rAncestral * 1.414} 
          fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.3"
        />

        {/* ЧАКРОВЫЙ СТОЛБ */}
        <Point x={center} y={center - rMain*0.75} val={health.chakra6} color="#8b5cf6" label="Аджна" />
        <Point x={center} y={center - rMain*0.4} val={health.chakra5} color="#3b82f6" label="Вишудха" />
        <Point x={center} y={center + rMain*0.4} val={health.chakra3} color="#eab308" label="Манипура" />
        <Point x={center} y={center + rMain*0.75} val={health.chakra2} color="#f97316" label="Свадхистана" />

        {/* ТРИАДА ДЕНЕГ */}
        <Point x={center + rMain*0.4} y={center} val={money.entrance} color="#fbbf24" label="Вход в деньги" />
        <g transform={`translate(${center + rMain*0.55}, ${center + 15}) scale(0.6)`}>
            <DollarSign color="#fbbf24" />
        </g>

        {/* ТРИАДА ЛЮБВИ */}
        <Point x={center + rMain*0.3} y={center + rMain*0.3} val={love.entrance} color="#f43f5e" label="Вход в отношения" />
        <g transform={`translate(${center + rMain*0.4}, ${center + rMain*0.4 + 5}) scale(0.6)`}>
            <Heart color="#f43f5e" />
        </g>

        {/* Основные вершины */}
        <Point x={center} y={center - rMain} val={diagonal.top} color="#6366f1" isMain={true} label="Месяц" />
        <Point x={center} y={center + rMain} val={diagonal.bottom} color="#f43f5e" isMain={true} label="Карма" />
        <Point x={center - rMain} y={center} val={diagonal.left} color="#6366f1" isMain={true} label="День" />
        <Point x={center + rMain} y={center} val={diagonal.right} color="#6366f1" isMain={true} label="Год" />

        {/* Центр */}
        <motion.g whileHover={{ scale: 1.1 }}>
            <circle cx={center} cy={center} r="32" fill="#6366f1" />
            <text x={center} y={center + 10} textAnchor="middle" className="text-2xl font-black fill-white select-none">{diagonal.center}</text>
        </motion.g>
      </svg>
    </div>
  );
}
