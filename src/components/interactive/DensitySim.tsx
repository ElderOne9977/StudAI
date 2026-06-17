import React, { useState } from 'react';
import { Ruler, Scale, Info } from 'lucide-react';

export const DensitySim: React.FC = () => {
  const [mass, setMass] = useState(200); // in grams
  const [volume, setVolume] = useState(250); // in cm3
  
  // Calculate Density (g/cm3)
  const density = mass / volume;
  const waterDensity = 1.0; // g/cm3

  // Determine float height or sunk state
  const isFloating = density < waterDensity;
  
  // Floating depth percentage (how much is submerged)
  // Max is 100%, min is 0%. If it floats, it sinks by ratio.
  const submergedRatio = Math.min(density / waterDensity, 1);
  const blockSubmergedPercent = submergedRatio * 100;
  
  // SVG position calculations
  // Water level is at Y = 120 (total height of beaker is 200, so water is 130px deep, Y goes 70 to 200)
  const waterY = 90; // water top line
  const beakerBottomY = 190;
  const maxWaterDepth = beakerBottomY - waterY; // 100px
  
  // Block size based on volume
  // Scale volume 100-500 cm3 to block size 40-70px
  const blockSize = 40 + (volume - 100) * (30 / 400);
  
  // Block Y coordinate:
  // If floating: center of block aligns with water level, offset by how much is submerged
  // If sunk: resting on the beaker bottom (beakerBottomY - blockSize)
  let blockY = 0;
  if (isFloating) {
    // Water level is at waterY. We want blockSubmergedPercent of the block to be below waterY.
    // e.g., if 40% is submerged, the bottom of the block is 0.40 * blockSize below waterY.
    // So top of the block is waterY - (1 - submergedRatio) * blockSize
    blockY = waterY - (1 - submergedRatio) * blockSize;
  } else {
    blockY = beakerBottomY - blockSize;
  }

  // Material type label
  let materialType = 'Gỗ nhẹ';
  let materialColor = 'fill-amber-600 stroke-amber-800';
  if (density > 2.5) {
    materialType = 'Sắt / Kim loại';
    materialColor = 'fill-slate-400 stroke-slate-600';
  } else if (density > 1.2) {
    materialType = 'Nhựa đặc';
    materialColor = 'fill-blue-300 stroke-blue-500';
  } else if (density >= 0.9 && density <= 1.1) {
    materialType = 'Nhựa PE / Cao su';
    materialColor = 'fill-yellow-500 stroke-yellow-700';
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl justify-between">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2 text-physics-400">
          <Info className="h-5 w-5" />
          Mô phỏng Khối lượng riêng & Sự nổi
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Thay đổi khối lượng và thể tích của khối hộp để xem tỉ lệ chìm/nổi trong nước cất (D = 1 g/cm³).
        </p>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-52 bg-slate-950 rounded-xl my-4 border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Sky/Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent" />

        {/* Beaker & Water SVG */}
        <svg width="240" height="200" className="z-10">
          {/* Water inside beaker */}
          <rect 
            x="60" 
            y={waterY} 
            width="120" 
            height={maxWaterDepth} 
            className="fill-sky-500/40 stroke-none"
          />
          {/* Water surface line */}
          <line 
            x1="60" 
            y1={waterY} 
            x2="180" 
            y2={waterY} 
            className="stroke-sky-400 stroke-2"
          />

          {/* Draggable/Animated Block */}
          <rect
            x={120 - blockSize / 2}
            y={blockY}
            width={blockSize}
            height={blockSize}
            className={`${materialColor} stroke-2 transition-all duration-500 ease-out`}
            rx="4"
          />

          {/* Beaker Outline */}
          <path 
            d="M 55,40 L 55,192 A 4,4 0 0,0 59,196 L 181,196 A 4,4 0 0,0 185,192 L 185,40"
            className="fill-none stroke-slate-300 dark:stroke-slate-700 stroke-[3]"
          />

          {/* Measurement marks on beaker */}
          <line x1="55" y1="60" x2="70" y2="60" className="stroke-slate-500 stroke-[1.5]" />
          <line x1="55" y1="90" x2="80" y2="90" className="stroke-sky-400 stroke-2" />
          <line x1="55" y1="120" x2="70" y2="120" className="stroke-slate-500 stroke-[1.5]" />
          <line x1="55" y1="150" x2="70" y2="150" className="stroke-slate-500 stroke-[1.5]" />

          <text x="85" y="94" className="fill-sky-300 font-mono text-[9px] font-bold">Mặt nước</text>
        </svg>

        {/* Float / Sunk Badge */}
        <div className="absolute bottom-3 left-3 bg-slate-900/95 border border-slate-800 rounded-lg px-2 py-1 text-[10px] font-bold flex flex-col">
          <span className="text-slate-400">Trạng thái:</span>
          <span className={isFloating ? "text-green-400" : "text-rose-400"}>
            {isFloating ? `NỔI (${Math.round(blockSubmergedPercent)}% chìm)` : 'CHÌM HOÀN TOÀN'}
          </span>
        </div>

        {/* Material Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-bold text-center">
          <div className="text-slate-400">Vật liệu mô phỏng</div>
          <div className="text-white mt-0.5">{materialType}</div>
        </div>
      </div>

      {/* Control sliders */}
      <div className="space-y-4">
        {/* Mass Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Scale className="h-3.5 w-3.5 text-physics-400" />
              Khối lượng (m)
            </span>
            <span className="font-mono text-physics-400 font-bold">{mass} g</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-physics-500"
          />
        </div>

        {/* Volume Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Ruler className="h-3.5 w-3.5 text-physics-400" />
              Thể tích (V)
            </span>
            <span className="font-mono text-physics-400 font-bold">{volume} cm³</span>
          </div>
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-physics-500"
          />
        </div>

        {/* Output values */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">KLR của Vật (D_vật)</div>
            <div className="text-sm font-bold font-mono text-physics-400 mt-0.5">{density.toFixed(2)} g/cm³</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">So sánh với Nước</div>
            <div className={`text-sm font-bold font-mono mt-0.5 ${isFloating ? 'text-green-400' : 'text-rose-500'}`}>
              {density < 1.0 ? 'D_vật < D_nước' : 'D_vật > D_nước'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DensitySim;
