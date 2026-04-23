"use client";

interface MatrixChartProps {
  diagonal: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    center: number;
  };
}

export function MatrixChart({ diagonal }: MatrixChartProps) {
  // Координаты точек для SVG (квадрат и ромб)
  const size = 400;
  const center = size / 2;
  const radius = 150;

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full drop-shadow-xl">
        {/* Квадрат прямой */}
        <rect 
          x={center - radius} 
          y={center - radius} 
          width={radius * 2} 
          height={radius * 2} 
          fill="none" 
          stroke="#e2e8f0" 
          strokeWidth="2" 
        />
        
        {/* Ромб (повернутый квадрат) */}
        <path 
          d={`M ${center} ${center - radius} L ${center + radius} ${center} L ${center} ${center + radius} L ${center - radius} ${center} Z`}
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
        />

        {/* Линии к центру */}
        <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="#e2e8f0" strokeWidth="1" />
        <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="#e2e8f0" strokeWidth="1" />

        {/* Точки (Арканы) */}
        {/* Топ (Месяц) */}
        <circle cx={center} cy={center - radius} r="18" fill="white" stroke="#6366f1" strokeWidth="2" />
        <text x={center} y={center - radius + 5} textAnchor="middle" className="text-sm font-bold fill-slate-800">{diagonal.top}</text>
        
        {/* Низ (Карма) */}
        <circle cx={center} cy={center + radius} r="18" fill="white" stroke="#6366f1" strokeWidth="2" />
        <text x={center} y={center + radius + 5} textAnchor="middle" className="text-sm font-bold fill-slate-800">{diagonal.bottom}</text>

        {/* Лево (День) */}
        <circle cx={center - radius} cy={center} r="18" fill="white" stroke="#6366f1" strokeWidth="2" />
        <text x={center - radius} y={center + 5} textAnchor="middle" className="text-sm font-bold fill-slate-800">{diagonal.left}</text>

        {/* Право (Год) */}
        <circle cx={center + radius} cy={center} r="18" fill="white" stroke="#6366f1" strokeWidth="2" />
        <text x={center + radius} y={center + 5} textAnchor="middle" className="text-sm font-bold fill-slate-800">{diagonal.right}</text>

        {/* Центр (Комфорт) */}
        <circle cx={center} cy={center} r="22" fill="#6366f1" />
        <text x={center} y={center + 6} textAnchor="middle" className="text-lg font-black fill-white">{diagonal.center}</text>
      </svg>
    </div>
  );
}
