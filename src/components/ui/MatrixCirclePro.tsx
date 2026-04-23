export default function MatrixCirclePro() {
  const numbers = Array.from({ length: 22 }, (_, i) => i + 1);

  const center = 160;
  const radius = 120;

  return (
    <div className="flex justify-center items-center relative z-10">
      <svg width="320" height="320" viewBox="0 0 320 320">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#5a5aff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0b0b12" stopOpacity="0" />
          </radialGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={center} cy={center} r="90" fill="url(#glow)" />

        {numbers.map((_, i) => {
          const angle = (i / 22) * 2 * Math.PI - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          return (
            <line
              key={`line-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#5a5aff"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          );
        })}

        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#5a5aff"
          strokeOpacity="0.22"
          strokeWidth="1"
          fill="none"
        />

        {numbers.map((num, i) => {
          const angle = (i / 22) * 2 * Math.PI - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          return (
            <g key={num} className="cursor-pointer">
              <circle
                cx={x}
                cy={y}
                r="11"
                fill="#5a5aff"
                opacity="0.13"
                filter="url(#softGlow)"
              />

              <circle
                cx={x}
                cy={y}
                r="8"
                fill="#0d1020"
                stroke="#6c6cff"
                strokeWidth="1.5"
                filter="url(#softGlow)"
              />

              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="8"
                fill="#ffffff"
                fontWeight="600"
              >
                {num}
              </text>
            </g>
          );
        })}

        <circle
          cx={center}
          cy={center}
          r="28"
          fill="#6c6cff"
          filter="url(#softGlow)"
        />
        <text
          x={center}
          y={center + 5}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="18"
          fontWeight="700"
        >
          22
        </text>
      </svg>
    </div>
  );
}