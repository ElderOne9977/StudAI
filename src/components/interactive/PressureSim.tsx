import React, { useState } from 'react';
import { ArrowDown, HelpCircle, Square } from 'lucide-react';

export const PressureSim: React.FC = () => {
  const [force, setForce] = useState(150); // in Newtons
  const [area, setArea] = useState(2.0); // in m2
  
  // Calculate pressure: p = F / S (Pa)
  const pressure = force / area;

  // Visual compression depth based on pressure
  // Max compression is 40px at 150 Pa/N/m2 (or scale max pressure)
  // Max pressure is 150 / 0.5 = 300 Pa. Min pressure is 10 / 4 = 2.5 Pa.
  const maxPressure = 300;
  const compressionPercent = Math.min((pressure / maxPressure) * 100, 100);
  const compressionDepth = (compressionPercent / 100) * 45; // max 45px depth

  // Scale piston size based on Area (0.5 to 4.0 m2)
  // Map 0.5 - 4.0 m2 to pixel width 40px - 160px
  const pistonWidth = 40 + (area - 0.5) * (120 / 3.5);

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl justify-between">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2 text-physics-400">
          <ArrowDown className="h-5 w-5 animate-bounce" />
          Mô phỏng Áp suất (*p = F/S*)
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Thay đổi Áp lực (*F*) và Diện tích bị ép (*S*) để theo dõi độ lún của bề mặt đệm mút ảo.
        </p>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-52 bg-slate-950 rounded-xl my-4 border border-slate-800 flex flex-col items-center justify-end overflow-hidden p-4">
        {/* Force Arrows - visual indicator of force magnitude */}
        <div 
          className="absolute top-4 flex justify-center gap-1.5 transition-all duration-300"
          style={{ width: `${pistonWidth}px` }}
        >
          {Array.from({ length: Math.min(Math.ceil(force / 50), 5) }).map((_, i) => (
            <ArrowDown 
              key={i} 
              className="text-rose-500 animate-pulse" 
              style={{ 
                height: `${12 + (force / 10)}px`, 
                width: `${12 + (force / 10)}px` 
              }} 
            />
          ))}
        </div>

        {/* Pressure Gauge dial */}
        <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-[10px] font-bold text-center">
          <div className="text-slate-400">Áp kế (Pressure)</div>
          <div className="text-rose-400 text-sm font-black font-mono mt-0.5">{pressure.toFixed(1)} Pa</div>
        </div>

        {/* Piston block */}
        <div 
          className="bg-gradient-to-b from-slate-600 to-slate-400 border border-slate-700 rounded-t-md transition-all duration-500 ease-out z-10 flex items-center justify-center font-bold text-xs shadow-md"
          style={{
            width: `${pistonWidth}px`,
            height: '24px',
            transform: `translateY(${compressionDepth - 35}px)`
          }}
        >
          <span className="text-slate-900 font-extrabold text-[10px]">DIỆN TÍCH S</span>
        </div>

        {/* Cushion / Soft sponge to compress */}
        <div className="w-full relative">
          {/* Top surface of sponge (shows sinking indentation) */}
          <div 
            className="w-full h-20 bg-gradient-to-b from-amber-500/80 to-amber-700/95 border-t-2 border-amber-300 relative transition-all duration-500 ease-out"
            style={{
              borderRadius: '8px 8px 0 0',
            }}
          >
            {/* Sinking curve matching piston size */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 bg-slate-950 transition-all duration-500 ease-out"
              style={{
                top: '-2px',
                width: `${pistonWidth + 4}px`,
                height: `${compressionDepth}px`,
                borderRadius: '0 0 10px 10px',
                borderLeft: '2px solid rgba(251, 191, 36, 0.6)',
                borderRight: '2px solid rgba(251, 191, 36, 0.6)',
                borderBottom: '2px solid rgba(251, 191, 36, 0.9)',
              }}
            />
          </div>
        </div>

        {/* Compression percentage indicator */}
        <div className="absolute bottom-2 left-2 text-[9px] font-bold text-amber-300/80">
          Độ lún bề mặt: {Math.round(compressionPercent)}%
        </div>
      </div>

      {/* Control sliders */}
      <div className="space-y-4">
        {/* Force Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <ArrowDown className="h-3.5 w-3.5 text-physics-400" />
              Áp lực (F)
            </span>
            <span className="font-mono text-physics-400 font-bold">{force} N</span>
          </div>
          <input
            type="range"
            min="10"
            max="300"
            step="10"
            value={force}
            onChange={(e) => setForce(Number(e.target.value))}
            className="premium-slider text-physics-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Area Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Square className="h-3.5 w-3.5 text-physics-400" />
              Diện tích bị ép (S)
            </span>
            <span className="font-mono text-physics-400 font-bold">{area.toFixed(1)} m²</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="4.0"
            step="0.1"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="premium-slider text-physics-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Explanation */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
          <HelpCircle className="h-4 w-4 text-physics-400 flex-shrink-0 mt-0.5" />
          <div>
            Để tăng áp suất lên cao nhất, hãy <strong className="text-white">tăng lực F</strong> lên tối đa và <strong className="text-white">giảm diện tích S</strong> xuống tối thiểu. Khi đó lực ép tập trung trên diện tích nhỏ sẽ gây lún sâu nhất!
          </div>
        </div>
      </div>
    </div>
  );
};
export default PressureSim;
