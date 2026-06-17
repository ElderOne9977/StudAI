import React, { useState } from 'react';
import { RotateCw, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export const LeverSim: React.FC = () => {
  const [f1, setF1] = useState(60); // Left force (N)
  const [d1, setD1] = useState(1.5); // Left distance (m)
  const [f2, setF2] = useState(45); // Right force (N)
  const [d2, setD2] = useState(2.0); // Right distance (m)

  // Calculate torque (Moments)
  const leftTorque = f1 * d1;
  const rightTorque = f2 * d2;
  const diff = leftTorque - rightTorque;

  // Determine tilt angle (degrees)
  let tiltAngle = 0;
  if (Math.abs(diff) < 1) {
    tiltAngle = 0; // Balanced
  } else {
    // Limit angle to max 12 deg
    tiltAngle = Math.min(Math.max((diff / 100) * 12, -12), 12);
    // Left torque makes it tilt counter-clockwise (negative angle in SVG/CSS transform)
    tiltAngle = -tiltAngle; 
  }

  const isBalanced = Math.abs(diff) < 1;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl justify-between">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2 text-physics-400">
          <Scale className="h-5 w-5" />
          Mô phỏng Đòn Bẩy & Cân bằng lực
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Điều chỉnh lực tác dụng và khoảng cách của mỗi bên để đạt trạng thái cân bằng.
        </p>

        {/* Sanitized Equilibrium Formula */}
        <div className="flex items-center justify-center my-3.5 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
          <span className="font-mono text-xs text-slate-200">
            F₁ · d₁ = F₂ · d₂ ⟹ F₁/F₂ = d₂/d₁
          </span>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-52 bg-slate-950 rounded-xl my-4 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 to-transparent" />

        {/* Header Badges: Stacked to prevent overlap and place weight status below balance status */}
        <div className="absolute top-2.5 left-3 right-3 flex flex-col gap-1.5 z-20">
          <div className="flex justify-start">
            {isBalanced ? (
              <span className="bg-green-500/25 border border-green-500 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1 whitespace-nowrap">
                <Scale className="h-2.5 w-2.5" /> Cân bằng
              </span>
            ) : (
              <span className="bg-rose-500/25 border border-rose-500 text-rose-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                Không cân bằng
              </span>
            )}
          </div>

          <div className="flex gap-1.5 justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[8px] font-bold whitespace-nowrap">
              <span className="text-slate-400">M1 (Trái):</span> <span className="text-physics-400 font-mono">{leftTorque.toFixed(1)} N·m</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[8px] font-bold whitespace-nowrap">
              <span className="text-slate-400">M2 (Phải):</span> <span className="text-physics-400 font-mono">{rightTorque.toFixed(1)} N·m</span>
            </div>
          </div>
        </div>

        {/* Lever SVG: Centered vertically and raised up */}
        <svg width="280" height="180">
          {/* Fulcrum (Point O) - Fixed Base Triangle */}
          <polygon 
            points="140,90 130,120 150,120" 
            className="fill-slate-400 stroke-slate-500 stroke-2" 
          />
          <circle cx="140" cy="90" r="3.5" className="fill-slate-950 stroke-slate-400 stroke-2" />
          <text x="136" y="132" className="fill-slate-500 font-mono text-[9px] font-extrabold">O</text>

          {/* Rotating Group (Beam and Weights) */}
          <motion.g 
            animate={{ rotate: tiltAngle }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, mass: 0.8 }}
            style={{ 
              transformOrigin: '140px 90px',
            }}
          >
            {/* The Beam */}
            <rect 
              x="20" 
              y="87" 
              width="240" 
              height="6" 
              className="fill-slate-300 stroke-slate-400 stroke-1" 
              rx="2"
            />
            {/* Scale markings */}
            {[-4, -3, -2, -1, 1, 2, 3, 4].map(mark => {
              const xPos = 140 + mark * 27;
              return (
                <line 
                  key={mark} 
                  x1={xPos} 
                  y1="87" 
                  x2={xPos} 
                  y2="93" 
                  className="stroke-slate-600 stroke-[1.5]" 
                />
              );
            })}

            {/* Left Weight (F1) */}
            {/* Compute left position: 140 - (d1 in units) where 1m = 48px */}
            {(() => {
              const leftX = 140 - (d1 * 44);
              const leftSize = 14 + (f1 * 0.16); // scale size based on force
              return (
                <g className="transition-all duration-500">
                  {/* String hanging */}
                  <line x1={leftX} y1="90" x2={leftX} y2="115" className="stroke-slate-500 stroke-dashed" />
                  {/* Weight Box */}
                  <rect 
                    x={leftX - leftSize/2} 
                    y="115" 
                    width={leftSize} 
                    height={leftSize} 
                    className="fill-rose-500 stroke-rose-700 stroke-[1.5]"
                    rx="3" 
                  />
                  <text 
                    x={leftX} 
                    y={115 + leftSize/2 + 4} 
                    textAnchor="middle" 
                    className="fill-white font-mono text-[8px] font-bold"
                  >
                    {f1}N
                  </text>
                  <text 
                    x={leftX} 
                    y="82" 
                    textAnchor="middle" 
                    className="fill-rose-400 font-mono text-[8px] font-bold"
                  >
                    {d1.toFixed(1)}m
                  </text>
                </g>
              );
            })()}

            {/* Right Weight (F2) */}
            {/* Compute right position: 140 + (d2 in units) */}
            {(() => {
              const rightX = 140 + (d2 * 44);
              const rightSize = 14 + (f2 * 0.16);
              return (
                <g className="transition-all duration-500">
                  {/* String hanging */}
                  <line x1={rightX} y1="90" x2={rightX} y2="115" className="stroke-slate-500 stroke-dashed" />
                  {/* Weight Box */}
                  <rect 
                    x={rightX - rightSize/2} 
                    y="115" 
                    width={rightSize} 
                    height={rightSize} 
                    className="fill-sky-500 stroke-sky-700 stroke-[1.5]"
                    rx="3" 
                  />
                  <text 
                    x={rightX} 
                    y={115 + rightSize/2 + 4} 
                    textAnchor="middle" 
                    className="fill-white font-mono text-[8px] font-bold"
                  >
                    {f2}N
                  </text>
                  <text 
                    x={rightX} 
                    y="82" 
                    textAnchor="middle" 
                    className="fill-sky-400 font-mono text-[8px] font-bold"
                  >
                    {d2.toFixed(1)}m
                  </text>
                </g>
              );
            })()}
          </motion.g>
        </svg>

        {/* Pivot marker: Lowered slightly to bottom-1 */}
        <div className="absolute bottom-1 font-semibold text-[10px] text-slate-400">
          Cánh tay đòn tỷ lệ nghịch với lực tác dụng
        </div>
      </div>

      {/* Control sliders */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Controls */}
        <div className="space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
            <span className="border-l-2 border-rose-500 pl-2">VẬT 1 (Bên Trái)</span>
          </div>
          {/* F1 Force */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Lực F1:</span>
              <span className="font-mono text-rose-400 font-bold">{f1} N</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={f1}
              onChange={(e) => setF1(Number(e.target.value))}
              className="premium-slider text-rose-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
          {/* d1 distance */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Khoảng cách d1:</span>
              <span className="font-mono text-rose-400 font-bold">{d1.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={d1}
              onChange={(e) => setD1(Number(e.target.value))}
              className="premium-slider text-rose-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
            <span className="border-l-2 border-sky-500 pl-2">LỰC KÉO 2 (Bên Phải)</span>
          </div>
          {/* F2 Force */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Lực F2:</span>
              <span className="font-mono text-sky-400 font-bold">{f2} N</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={f2}
              onChange={(e) => setF2(Number(e.target.value))}
              className="premium-slider text-sky-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
          {/* d2 distance */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Khoảng cách d2:</span>
              <span className="font-mono text-sky-400 font-bold">{d2.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={d2}
              onChange={(e) => setD2(Number(e.target.value))}
              className="premium-slider text-sky-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeverSim;
