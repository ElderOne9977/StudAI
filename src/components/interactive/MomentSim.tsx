import React, { useState } from 'react';
import { Scale, Wrench, HelpCircle, Play, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const MomentSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'seesaw' | 'wrench'>('seesaw');

  // Seesaw Simulation States
  const [f1, setF1] = useState<number>(20); // Left force (N)
  const [d1, setD1] = useState<number>(2); // Left distance (holes, 1 to 4)
  const [f2, setF2] = useState<number>(10); // Right force (N)
  const [d2, setD2] = useState<number>(3); // Right distance (holes, 1 to 4)
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [tiltAngle, setTiltAngle] = useState<number>(0);

  // Wrench Simulation States
  const [handDistance, setHandDistance] = useState<number>(12); // cm, from 5 to 30
  const [isWrenching, setIsWrenching] = useState<boolean>(false);
  const [wrenchAngle, setWrenchAngle] = useState<number>(0);
  const [wrenchStatus, setWrenchStatus] = useState<'idle' | 'failed' | 'success'>('idle');

  const wrenchForce = 35; // Constant force of 35 N
  const requiredTorque = 7.0; // Required moment in N·m to turn the rusty nut
  // Calculate wrench moment: M = F * d (d in meters)
  const currentWrenchMoment = wrenchForce * (handDistance / 100);

  // Seesaw calculations
  const leftMoment = f1 * d1;
  const rightMoment = f2 * d2;

  const handleStartSeesaw = () => {
    setIsStarted(true);
    const diff = leftMoment - rightMoment;
    if (Math.abs(diff) < 0.1) {
      setTiltAngle(0); // Balanced
    } else {
      // Tilt left (negative angle in CSS rotate) or right (positive angle)
      const angle = Math.min(Math.max((diff / 80) * 15, -15), 15);
      setTiltAngle(-angle); // Left moment heavy -> tilts counter-clockwise (negative)
    }
  };

  const handleResetSeesaw = () => {
    setIsStarted(false);
    setTiltAngle(0);
  };

  const handleWrenchAction = () => {
    setIsWrenching(true);
    setWrenchStatus('idle');
    
    // Animate pressing down
    setTimeout(() => {
      if (currentWrenchMoment >= requiredTorque) {
        // Success
        setWrenchStatus('success');
        setWrenchAngle(35); // Rotates by 35 degrees
      } else {
        // Failed
        setWrenchStatus('failed');
        setWrenchAngle(3); // Shakes slightly
        setTimeout(() => setWrenchAngle(0), 150);
      }
      setIsWrenching(false);
    }, 1000);
  };

  const handleResetWrench = () => {
    setWrenchAngle(0);
    setWrenchStatus('idle');
    setIsWrenching(false);
  };

  return (    <div className="flex flex-col bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 shadow-xl gap-4">
      
      {/* Simulation Selector Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1.5 mb-3">
        <button
          onClick={() => setActiveTab('seesaw')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'seesaw'
              ? 'bg-physics-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="h-3.5 w-3.5" /> Thanh Ngang Bập Bênh
        </button>
        <button
          onClick={() => setActiveTab('wrench')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'wrench'
              ? 'bg-physics-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wrench className="h-3.5 w-3.5" /> Cờ Lê Vặn Ốc
        </button>
      </div>

      {activeTab === 'seesaw' ? (
        // ==================== SEESAW BALANCE SIMULATION ====================
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-physics-400">
              <Scale className="h-4.5 w-4.5 text-physics-400" />
              Thanh Ngang Bập Bênh Ảo
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Treo các quả nặng ở các khoảng cách khác nhau. Bấm <strong>"Bắt đầu"</strong> để kích hoạt trọng lực và so sánh Moment lực M = F · d ở hai bên.
            </p>
          </div>

          {/* Canvas */}
          <div className="relative w-full bg-slate-900/40 rounded-xl my-3 border border-slate-800/80 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Sky background */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 to-transparent" />

            {/* Live Values HUD */}
            <div className="absolute top-2.5 left-3 right-3 flex justify-between z-20">
              <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 text-[9px] font-bold">
                <span className="text-rose-400">M₁ (Trái):</span>{' '}
                <span className="font-mono text-white">{f1}N × {d1}m = {leftMoment} N·m</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 text-[9px] font-bold">
                <span className="text-sky-400">M₂ (Phải):</span>{' '}
                <span className="font-mono text-white">{f2}N × {d2}m = {rightMoment} N·m</span>
              </div>
            </div>

            {/* Seesaw Graphic */}
            <svg width="280" height="150" className="mt-6">
              {/* Fulcrum Point O (Fixed Triangle) */}
              <polygon points="140,80 128,115 152,115" className="fill-slate-400 stroke-slate-500 stroke-2" />
              <circle cx="140" cy="80" r="3.5" className="fill-slate-950 stroke-slate-400 stroke-2" />
              <text x="137" y="127" className="fill-slate-500 font-mono text-[9px] font-bold">Trục O</text>

              {/* Rotating Seesaw Beam */}
              <g
                style={{
                  transform: `rotate(${tiltAngle}deg)`,
                  transformOrigin: '140px 80px',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
              >
                {/* The Main Beam */}
                <rect x="20" y="77" width="240" height="6" className="fill-slate-300 stroke-slate-400 stroke-1" rx="2" />
                
                {/* Hole markings */}
                {[-4, -3, -2, -1, 1, 2, 3, 4].map(hole => {
                  const xPos = 140 + hole * 27;
                  return (
                    <g key={hole}>
                      <circle cx={xPos} cy="80" r="2" className="fill-slate-900 stroke-slate-500 stroke-[0.5]" />
                      <text x={xPos} y={72} textAnchor="middle" className="fill-slate-500 text-[7px] font-bold">
                        {Math.abs(hole)}
                      </text>
                    </g>
                  );
                })}

                {/* Left Weight F1 */}
                {(() => {
                  const xPos = 140 - d1 * 27;
                  const size = 12 + f1 * 0.25; // size based on force magnitude
                  return (
                    <g className="transition-all duration-300">
                      {/* String hanging */}
                      <line x1={xPos} y1="80" x2={xPos} y2="105" className="stroke-slate-500 stroke-[1] stroke-dashed" />
                      {/* Block weight */}
                      <rect
                        x={xPos - size/2}
                        y="105"
                        width={size}
                        height={size}
                        className="fill-rose-500 stroke-rose-700 stroke-[1.5]"
                        rx="2"
                      />
                      <text x={xPos} y={105 + size/2 + 3} textAnchor="middle" className="fill-white font-mono text-[8px] font-bold">
                        {f1}N
                      </text>
                    </g>
                  );
                })()}

                {/* Right Weight F2 */}
                {(() => {
                  const xPos = 140 + d2 * 27;
                  const size = 12 + f2 * 0.25;
                  return (
                    <g className="transition-all duration-300">
                      {/* String hanging */}
                      <line x1={xPos} y1="80" x2={xPos} y2="105" className="stroke-slate-500 stroke-[1] stroke-dashed" />
                      {/* Block weight */}
                      <rect
                        x={xPos - size/2}
                        y="105"
                        width={size}
                        height={size}
                        className="fill-sky-500 stroke-sky-700 stroke-[1.5]"
                        rx="2"
                      />
                      <text x={xPos} y={105 + size/2 + 3} textAnchor="middle" className="fill-white font-mono text-[8px] font-bold">
                        {f2}N
                      </text>
                    </g>
                  );
                })()}
              </g>
            </svg>

            {/* Physics Explanation */}
            <div className="w-full mt-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2 text-[10px] text-slate-400 z-10">
              <HelpCircle className="h-4 w-4 text-physics-400 flex-shrink-0 mt-0.5" />
              <div>
                {!isStarted ? (
                  <span>Chọn lực và vị trí cho mỗi bên. Trạng thái cân bằng khi F₁ · d₁ = F₂ · d₂. Bấm "Bắt đầu" để kiểm tra kết quả!</span>
                ) : (
                  <span>
                    {Math.abs(leftMoment - rightMoment) < 0.1 ? (
                      <strong className="text-green-400">Cân bằng hoàn hảo! Hai moment bằng nhau nên thanh không bị xoay.</strong>
                    ) : (
                      <span>
                        Thanh quay về phía <strong className="text-white">{leftMoment > rightMoment ? 'Trái' : 'Phải'}</strong> vì moment lực bên đó lớn hơn ({Math.max(leftMoment, rightMoment)} N·m &gt; {Math.min(leftMoment, rightMoment)} N·m).
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Left Weight Controls */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Vật trái (F₁)</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Trọng lượng:</span>
                  <div className="relative inline-block">
                    <select 
                      value={f1} 
                      onChange={(e) => setF1(Number(e.target.value))}
                      className="appearance-none bg-slate-950 border border-slate-700 hover:border-slate-600 text-rose-300 text-[10px] rounded pl-2 pr-6 py-0.5 outline-none cursor-pointer transition-colors"
                      disabled={isStarted}
                    >
                      <option value={10}>10 N</option>
                      <option value={20}>20 N</option>
                      <option value={30}>30 N</option>
                      <option value={40}>40 N</option>
                    </select>
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-rose-400 text-[8px]">▼</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Lỗ treo d₁:</span>
                  <div className="relative inline-block">
                    <select 
                      value={d1} 
                      onChange={(e) => setD1(Number(e.target.value))}
                      className="appearance-none bg-slate-950 border border-slate-700 hover:border-slate-600 text-rose-300 text-[10px] rounded pl-2 pr-6 py-0.5 outline-none cursor-pointer transition-colors"
                      disabled={isStarted}
                    >
                      <option value={1}>Lỗ 1 (1m)</option>
                      <option value={2}>Lỗ 2 (2m)</option>
                      <option value={3}>Lỗ 3 (3m)</option>
                      <option value={4}>Lỗ 4 (4m)</option>
                    </select>
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-rose-400 text-[8px]">▼</span>
                  </div>
                </div>
              </div>

              {/* Right Weight Controls */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Vật phải (F₂)</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Trọng lượng:</span>
                  <div className="relative inline-block">
                    <select 
                      value={f2} 
                      onChange={(e) => setF2(Number(e.target.value))}
                      className="appearance-none bg-slate-950 border border-slate-700 hover:border-slate-600 text-sky-300 text-[10px] rounded pl-2 pr-6 py-0.5 outline-none cursor-pointer transition-colors"
                      disabled={isStarted}
                    >
                      <option value={10}>10 N</option>
                      <option value={20}>20 N</option>
                      <option value={30}>30 N</option>
                      <option value={40}>40 N</option>
                    </select>
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-sky-400 text-[8px]">▼</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Lỗ treo d₂:</span>
                  <div className="relative inline-block">
                    <select 
                      value={d2} 
                      onChange={(e) => setD2(Number(e.target.value))}
                      className="appearance-none bg-slate-950 border border-slate-700 hover:border-slate-600 text-sky-300 text-[10px] rounded pl-2 pr-6 py-0.5 outline-none cursor-pointer transition-colors"
                      disabled={isStarted}
                    >
                      <option value={1}>Lỗ 1 (1m)</option>
                      <option value={2}>Lỗ 2 (2m)</option>
                      <option value={3}>Lỗ 3 (3m)</option>
                      <option value={4}>Lỗ 4 (4m)</option>
                    </select>
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-sky-400 text-[8px]">▼</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Run / Reset Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleStartSeesaw}
                disabled={isStarted}
                className="flex-1 py-2.5 bg-physics-600 hover:bg-physics-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Play className="h-4 w-4" /> Bắt đầu thả tay
              </button>
              <button
                onClick={handleResetSeesaw}
                disabled={!isStarted}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-350 border border-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-transform flex items-center gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Đặt lại
              </button>
            </div>

          </div>
        </div>
      ) : (
        // ==================== WRENCH TORQUE SIMULATION ====================
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-physics-400">
              <Wrench className="h-4.5 w-4.5 text-physics-400" />
              Cờ Lê Vặn Đai Ốc Kẹt
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Thay đổi cánh tay đòn d (vị trí đặt tay) để thay đổi moment lực. Đai ốc kẹt cần moment lớn hơn để quay.
            </p>
          </div>
          {/* Canvas */}
          <div className="relative w-full bg-slate-900/40 rounded-xl my-3 border border-slate-800/80 flex flex-col items-center justify-center p-4 overflow-hidden">
            
            {/* The Wrench SVG and Nut */}
            <svg width="240" height="150" className="mx-auto">
              <g 
                style={{ 
                  transform: `rotate(${wrenchAngle}deg)`, 
                  transformOrigin: '40px 75px', // centered on the nut
                  transition: isWrenching ? 'transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'transform 0.3s ease-out'
                }}
              >
                {/* Wrench Handle */}
                <rect x="40" y="70" width="160" height="10" className="fill-slate-400 stroke-slate-500 stroke-1" rx="3" />
                {/* Wrench Head */}
                <circle cx="40" cy="75" r="15" className="fill-slate-400 stroke-slate-500 stroke-1" />
                {/* Inner cutout of wrench head */}
                <polygon points="34,70 46,70 51,75 46,80 34,80 29,75" className="fill-slate-950" />
                
                {/* Hand Position Indicator */}
                {/* Wrench length represents 30cm in space. 40px to 200px (span of 160px) represents 5cm to 30cm */}
                {/* Formula: xPos = 40 + (d - 5) * (160 / 25) */}
                {(() => {
                  const handX = 40 + (handDistance - 5) * (140 / 25);
                  return (
                    <g className="transition-all duration-350">
                      {/* Downward force arrow */}
                      <line x1={handX} y1="40" x2={handX} y2="65" className="stroke-rose-500 stroke-2" />
                      <polygon points={`${handX},66 ${handX-3},60 ${handX+3},60`} className="fill-rose-500" />
                      {/* Hand icon wrapper */}
                      <circle cx={handX} cy="75" r="7" className="fill-rose-500/30 stroke-rose-500 stroke-1 animate-pulse" />
                      <text x={handX} y="33" textAnchor="middle" className="fill-rose-400 font-mono text-[8px] font-bold">F={wrenchForce}N</text>
                      <text x={handX} y="88" textAnchor="middle" className="fill-amber-400 font-mono text-[8px] font-bold">{handDistance}cm</text>
                    </g>
                  );
                })()}
              </g>
 
              {/* The Rusty Nut in center of wrench head */}
              <g 
                style={{ 
                  transform: `rotate(${wrenchAngle}deg)`, 
                  transformOrigin: '40px 75px',
                  transition: isWrenching ? 'transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'transform 0.3s ease-out'
                }}
              >
                {/* Hexagonal Nut */}
                <polygon points="32,67 48,67 56,75 48,83 32,83 24,75" className="fill-amber-800 stroke-amber-950 stroke-2" />
                <circle cx="40" cy="75" r="5" className="fill-slate-950 stroke-amber-950 stroke-1" />
                {/* Rust patches */}
                <circle cx="34" cy="71" r="1.5" className="fill-amber-600" />
                <circle cx="46" cy="80" r="1.2" className="fill-amber-600" />
              </g>
            </svg>
 
            {/* Error HUD Message */}
            {wrenchStatus === 'failed' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-950/95 border border-rose-800 text-rose-200 text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl flex items-center gap-1.5 animate-bounce z-30">
                <AlertCircle className="h-4.5 w-4.5 text-rose-400 flex-shrink-0" />
                Lực yếu - Moment nhỏ không thể làm quay!
              </div>
            )}
 
            {/* Success HUD Message */}
            {wrenchStatus === 'success' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-950/95 border border-green-800 text-green-200 text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl flex items-center gap-1.5 animate-pulse z-30">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-400 flex-shrink-0" />
                Thành công! Đai ốc đã xoay!
              </div>
            )}
 
            {/* Explanation */}
            <div className="w-full mt-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2 text-[10px] text-slate-400 z-10">
              <HelpCircle className="h-4 w-4 text-physics-400 flex-shrink-0 mt-0.5" />
              <div>
                <span>
                  Moment lực vặn M = F · d. Trải nghiệm thực tế: Khi cầm cờ lê ở <strong className="text-white">đầu xa nhất (30cm)</strong>, moment lớn nhất ({ (wrenchForce * 0.3).toFixed(1) } N·m) nên mở ốc dễ nhất. Cầm <strong className="text-white">gần sát đai ốc</strong>, moment quá nhỏ không đủ thắng lực cản của rỉ sét!
                </span>
              </div>
            </div>
          </div>
 
          {/* Controls */}
          <div className="space-y-3">
            {/* Hand position slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-350 font-medium">Vị trí đặt tay (Cánh tay đòn d)</span>
                <span className="font-mono text-amber-400 font-bold">{handDistance} cm ({handDistance/100} m)</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={handDistance}
                onChange={(e) => {
                  setHandDistance(Number(e.target.value));
                  if (wrenchStatus !== 'idle') handleResetWrench();
                }}
                className="premium-slider text-physics-500 bg-slate-800 rounded-lg cursor-pointer"
                disabled={isWrenching}
              />
            </div>
 
            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleWrenchAction}
                disabled={isWrenching || wrenchStatus === 'success'}
                className="flex-1 py-2.5 bg-physics-600 hover:bg-physics-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5"
              >
                <Wrench className="h-4 w-4" /> Vặn ốc
              </button>
              <button
                onClick={handleResetWrench}
                disabled={wrenchStatus === 'idle'}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-350 border border-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-transform"
              >
                Đặt lại
              </button>
            </div>
 
          </div>
        </div>
      )}
    </div>
  );
};
export default MomentSim;
