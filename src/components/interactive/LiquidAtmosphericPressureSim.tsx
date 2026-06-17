import React, { useState } from 'react';
import { ArrowDown, HelpCircle, Layers, Wind, RotateCcw, Check, Sparkles } from 'lucide-react';

export const LiquidAtmosphericPressureSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hydraulic' | 'suction'>('hydraulic');

  // Hydraulic Press States
  const [weights, setWeights] = useState<number[]>([]); // list of weight masses on small piston (kg)
  const [s2, setS2] = useState<number>(5); // S2 area, from 2 to 10. S1 is fixed at 1.
  
  // Suction Cup States
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [pullForce, setPullForce] = useState<number>(0);
  const [suctionState, setSuctionState] = useState<'neutral' | 'pressing' | 'stuck' | 'failed'>('neutral');

  const s1 = 1; // S1 is fixed at 1 cm²
  const carMass = 150; // Car mass in kg (weight = 1500 N)
  const carWeight = carMass * 10;

  // Calculate F1 (Force on small piston)
  const totalWeightMass = weights.reduce((sum, w) => sum + w, 0);
  const f1 = totalWeightMass * 10; // F = m * 10 (N)
  
  // Calculate F2 (Lifting force on large piston)
  // F2 = F1 * (S2 / S1)
  const f2 = f1 * (s2 / s1);

  // Piston movement calculations
  // Conservation of volume: A1 * dy1 = A2 * dy2 => dy2 = dy1 * (S1 / S2)
  // Let's map dy1 based on f1. Max displacement of small piston is 50px at f1 = 400N.
  const maxF1 = 400;
  const dy1 = Math.min((f1 / maxF1) * 60, 60); // small piston moves down by up to 60px
  const dy2 = dy1 * (s1 / s2); // large piston moves up by dy1 / ratio

  // Lift success status
  const isLifted = f2 >= carWeight;

  const addWeight = (mass: number) => {
    if (totalWeightMass + mass <= 400) {
      setWeights([...weights, mass]);
    }
  };

  const clearWeights = () => {
    setWeights([]);
  };

  // Suction cup handlers
  const handlePress = () => {
    setSuctionState('pressing');
    setTimeout(() => {
      setSuctionState('stuck');
      setIsPressed(true);
      setPullForce(0);
    }, 1200);
  };

  const handlePull = (forceValue: number) => {
    setPullForce(forceValue);
    if (forceValue >= 100) {
      // atmospheric pressure holding force exceeded (say 100 N is the limit)
      setSuctionState('neutral');
      setIsPressed(false);
      setPullForce(0);
    }
  };

  const resetSuction = () => {
    setSuctionState('neutral');
    setIsPressed(false);
    setPullForce(0);
  };

  return (
    <div className="flex flex-col bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl gap-4">
      {/* Simulation Selector Tabs */}
      <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1.5 mb-3">
        <button
          onClick={() => setActiveTab('hydraulic')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'hydraulic'
              ? 'bg-physics-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" /> Máy Nén Thủy Lực
        </button>
        <button
          onClick={() => setActiveTab('suction')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'suction'
              ? 'bg-physics-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wind className="h-3.5 w-3.5" /> Giác Mút Cao Su
        </button>
      </div>

      {activeTab === 'hydraulic' ? (
        // ==================== HYDRAULIC PRESS SIMULATION ====================
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-physics-400">
              <Sparkles className="h-4.5 w-4.5 text-physics-400" />
              Máy Nén Thủy Lực Nâng Ô Tô
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Nguyên lý Pascal: Áp suất chất lỏng truyền nguyên vẹn. Thêm các quả nặng lên pít-tông nhỏ để nâng chiếc ô tô {carMass}kg (Trọng lượng {carWeight}N).
            </p>
          </div>

          {/* Canvas */}
          <div className="relative w-full h-56 bg-slate-950 rounded-xl my-3 border border-slate-800 flex flex-col items-center justify-end overflow-hidden p-4">
            {/* Reset button at top-left corner of canvas */}
            <button
              onClick={clearWeights}
              className="absolute top-2 left-2 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold z-20 flex items-center gap-1.5 active:scale-95 transition-all shadow-md"
            >
              <RotateCcw className="h-3.5 w-3.5 text-rose-500" /> Đặt lại
            </button>
            {/* Visual Fluid System */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* U-Tube Outline (transparent inside, slate borders) */}
              {/* We draw the fluid inside first */}
              {/* Left column fluid: x=35 to x=75, top fluid level changes with dy1 */}
              <rect x="35" y={90 + dy1} width="40" height={100 - dy1} className="fill-sky-500/30 transition-all duration-500" />
              {/* Right column fluid: x=145 to x=245 (width 100), top level changes with dy2 */}
              <rect x="145" y={90 - dy2} width="100" height={100 + dy2} className="fill-sky-500/30 transition-all duration-500" />
              {/* Bottom connecting tube fluid */}
              <rect x="75" y="150" width="70" height="40" className="fill-sky-500/30" />

              {/* Borders of the tube */}
              <path 
                d="M 35,60 L 35,190 L 245,190 L 245,60" 
                fill="none" 
                className="stroke-slate-700 stroke-[3]" 
              />
              <path 
                d="M 75,60 L 75,150 L 145,150 L 145,60" 
                fill="none" 
                className="stroke-slate-700 stroke-[3]" 
              />

              {/* Labels for Areas */}
              <text x="55" y="180" textAnchor="middle" className="fill-slate-500 font-mono text-[9px] font-bold">S₁ = 1</text>
              <text x="195" y="180" textAnchor="middle" className="fill-slate-500 font-mono text-[9px] font-bold">S₂ = {s2}</text>
            </svg>

            {/* Left Piston (Small) */}
            <div 
              className="absolute bg-gradient-to-b from-slate-500 to-slate-400 border border-slate-600 rounded-t-sm transition-all duration-500 z-10 flex flex-col items-center justify-end"
              style={{
                left: '35px',
                width: '40px',
                height: '12px',
                bottom: `${106 - dy1}px` // base is 106px
              }}
            >
              {/* Visual weight stack on top of the small piston */}
              <div className="absolute bottom-3 flex flex-col-reverse items-center gap-0.5 w-full">
                {weights.map((w, idx) => (
                  <div 
                    key={idx} 
                    className="bg-amber-500 border border-amber-600 rounded-sm text-[8px] font-extrabold text-slate-950 text-center flex items-center justify-center shadow-sm"
                    style={{
                      width: `${Math.min(20 + w * 0.3, 36)}px`,
                      height: '10px',
                    }}
                  >
                    {w}k
                  </div>
                ))}
              </div>
            </div>

            {/* Right Piston (Large) with Car */}
            <div 
              className="absolute transition-all duration-500 z-10 flex flex-col items-center justify-end"
              style={{
                left: '145px',
                width: '100px',
                bottom: `${106 + dy2}px`
              }}
            >
              {/* The Car */}
              <div className="relative w-20 h-12 mb-0.5 flex flex-col items-center justify-end transition-transform duration-500">
                {/* SVG Car representation */}
                <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-md">
                  <path d="M15 35 L20 20 L55 18 L75 18 L95 32 L110 35 L110 50 L10 50 Z" className="fill-rose-600 stroke-rose-800 stroke-1" />
                  <rect x="25" y="22" width="22" height="10" className="fill-slate-900" rx="1" />
                  <rect x="52" y="22" width="22" height="10" className="fill-slate-900" rx="1" />
                  <circle cx="30" cy="48" r="8" className="fill-slate-800 stroke-slate-600 stroke-2" />
                  <circle cx="30" cy="48" r="3" className="fill-slate-400" />
                  <circle cx="90" cy="48" r="8" className="fill-slate-800 stroke-slate-600 stroke-2" />
                  <circle cx="90" cy="48" r="3" className="fill-slate-400" />
                </svg>
                <div className="absolute bg-slate-950/80 px-1 py-0.5 rounded border border-slate-800 text-[8px] font-mono text-rose-300 top-1">
                  Ô tô ({carMass}kg)
                </div>
              </div>

              {/* Large Piston Plate */}
              <div className="bg-gradient-to-b from-slate-500 to-slate-400 border border-slate-600 rounded-t-sm w-full h-12" />
            </div>

          </div>

          {/* Stats & Formula Dashboard */}
          <div className="grid grid-cols-2 gap-2.5 my-2">
            {/* Formula Box */}
            <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl flex flex-col justify-center items-center">
              <div className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-1">Công thức nguyên lý</div>
              <div className="text-xs font-mono text-physics-400 font-bold bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                F₂/F₁ = S₂/S₁
              </div>
            </div>

            {/* Live Stats Box */}
            <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl text-[10px] space-y-1.5 flex flex-col justify-between">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider">Thông số động</span>
                {isLifted ? (
                  <span className="text-green-400 font-bold flex items-center gap-0.5 text-[9px]">ĐÃ NÂNG <Check className="h-3 w-3" /></span>
                ) : (
                  <span className="text-rose-400 font-bold text-[9px]">CHƯA ĐỦ LỰC</span>
                )}
              </div>
              <div className="space-y-1 font-medium text-[9px]">
                <div className="flex justify-between items-center bg-slate-950/40 px-2 py-1 rounded border border-slate-800/60">
                  <span className="text-slate-400">Lực ép F₁:</span>
                  <span className="text-amber-400 font-mono font-bold">{f1} N</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950/40 px-2 py-1 rounded border border-slate-800/60">
                  <span className="text-slate-400">Tỉ lệ S₂/S₁:</span>
                  <span className="text-sky-400 font-mono font-bold">{s2} lần</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950/40 px-2 py-1 rounded border border-slate-800/60">
                  <span className="text-slate-400">Lực nâng F₂:</span>
                  <span className="text-green-400 font-mono font-bold">{f2} N</span>
                </div>
              </div>

            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {/* S2 Area Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-350 font-medium">Diện tích pít-tông lớn (S₂)</span>
                <span className="font-mono text-physics-400 font-bold">{s2} cm² (Gấp {s2} lần S₁)</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={s2}
                onChange={(e) => setS2(Number(e.target.value))}
                className="premium-slider text-physics-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Interactive Buttons to add weights */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đặt quả nặng lên pít-tông nhỏ:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addWeight(10)}
                  disabled={totalWeightMass + 10 > 400}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 disabled:opacity-50 text-[10px] font-bold rounded-lg border border-slate-750 text-amber-400 active:scale-95 transition-transform"
                >
                  +10 kg (+100N)
                </button>
                <button
                  onClick={() => addWeight(20)}
                  disabled={totalWeightMass + 20 > 400}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 disabled:opacity-50 text-[10px] font-bold rounded-lg border border-slate-750 text-amber-400 active:scale-95 transition-transform"
                >
                  +20 kg (+200N)
                </button>
                <button
                  onClick={() => addWeight(50)}
                  disabled={totalWeightMass + 50 > 400}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 disabled:opacity-50 text-[10px] font-bold rounded-lg border border-slate-750 text-amber-400 active:scale-95 transition-transform"
                >
                  +50 kg (+500N)
                </button>
                <button
                  onClick={() => addWeight(100)}
                  disabled={totalWeightMass + 100 > 400}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 disabled:opacity-50 text-[10px] font-bold rounded-lg border border-slate-750 text-amber-400 active:scale-95 transition-transform"
                >
                  +100 kg (+1000N)
                </button>
              </div>
            </div>

            {/* Explanation box */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850/80 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
              <HelpCircle className="h-4 w-4 text-physics-400 flex-shrink-0 mt-0.5" />
              <div>
                {isLifted ? (
                  <span className="text-green-400 font-medium">Thành công! Lực nâng F₂ = {f2} N lớn hơn trọng lượng ô tô {carWeight} N. Pít-tông lớn đã đẩy ô tô lên cao.</span>
                ) : (
                  <span>Để nâng được ô tô cần lực nâng F₂ &ge; {carWeight} N. Hiện tại lực nâng mới đạt <strong className="text-white">{f2} N</strong>. Hãy tăng diện tích S₂ hoặc thêm quả nặng lên pít-tông nhỏ!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ==================== SUCTION CUP SIMULATION ====================
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-physics-400">
              <Wind className="h-4.5 w-4.5 text-physics-400" />
              Giác Mút Cao Su Ảo
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Khi ấn mạnh giác mút cao su vào mặt kính phẳng, không khí bên trong bị đẩy ra ngoài. Áp suất khí quyển bên ngoài lớn hơn ép chặt giác mút lại.
            </p>
          </div>

          {/* Canvas */}
          <div className="relative w-full h-56 bg-slate-950 rounded-xl my-3 border border-slate-850 flex flex-col items-center justify-center overflow-hidden p-4">
            
            {/* The Glass Wall */}
            <div className="absolute right-10 top-5 bottom-5 w-3 bg-gradient-to-r from-cyan-400/40 to-cyan-200/20 border-l border-r border-cyan-300/40 rounded-sm shadow-md flex items-center justify-center">
              <span className="text-[8px] rotate-90 text-cyan-200/50 uppercase tracking-widest font-bold font-mono">BỀ MẶT KÍNH</span>
            </div>

            {/* Suction Cup & Hand Assembly */}
            <div 
              className="absolute flex items-center transition-all duration-700 ease-out"
              style={{
                // position changes depending on if pressed
                right: isPressed ? '50px' : '120px',
              }}
            >
              {/* Hand pushing (visible only when pressing) */}
              {suctionState === 'pressing' && (
                <div className="text-yellow-400 animate-pulse mr-4 text-xs font-black uppercase flex items-center gap-1">
                  ĐANG ẤN... <ArrowDown className="h-4 w-4 -rotate-90" />
                </div>
              )}

              {/* Suction Cup Shape */}
              <div className="relative flex items-center">
                {/* Rubber Cup Cup Body */}
                <div 
                  className={`bg-slate-600 border border-slate-500 rounded-l-full shadow-lg transition-all duration-700 ${
                    isPressed ? 'w-4 h-24 rounded-l-[15%]' : 'w-16 h-20'
                  }`}
                  style={{
                    boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.5)'
                  }}
                />
                
                {/* Pull Ring Hook */}
                <div className="w-6 h-6 border-4 border-slate-400 rounded-full -ml-8 flex items-center justify-center z-10">
                  <div className="w-2 h-6 bg-slate-400 -mr-6" />
                </div>

                {/* Air Molecules inside the cup */}
                {/* Before pressing, there are molecules inside. After pressing, they disappear or get pushed out */}
                {!isPressed && suctionState === 'neutral' && (
                  <>
                    <div className="absolute right-4 top-5 w-2 h-2 bg-sky-400 rounded-full opacity-70 animate-ping" />
                    <div className="absolute right-6 top-10 w-1.5 h-1.5 bg-sky-400 rounded-full opacity-60" />
                    <div className="absolute right-2 top-12 w-2 h-2 bg-sky-400 rounded-full opacity-80" />
                    <div className="absolute right-8 top-14 w-1.5 h-1.5 bg-sky-400 rounded-full opacity-50" />
                    <div className="absolute right-4 top-16 w-2 h-2 bg-sky-400 rounded-full opacity-70" />
                    <div className="absolute right-4 top-10 text-[8px] font-mono text-sky-400 font-bold uppercase select-none">P_trong</div>
                  </>
                )}

                {/* Air escape effects when pressing */}
                {suctionState === 'pressing' && (
                  <g className="absolute -right-4 flex flex-col justify-between h-16 w-12 z-20">
                    <div className="text-sky-300 text-[8px] font-extrabold uppercase animate-bounce -translate-y-4">KHÔNG KHÍ THOÁT RA!</div>
                    <div className="w-2 h-2 bg-sky-300 rounded-full absolute top-2 right-2 animate-ping" />
                    <div className="w-1.5 h-1.5 bg-sky-300 rounded-full absolute bottom-2 right-4 animate-ping" />
                  </g>
                )}
              </div>
            </div>

            {/* Atmospheric pressure force arrows (pointing from outside onto the cup) */}
            {isPressed && suctionState === 'stuck' && (
              <>
                {/* Outside force arrows pushing right */}
                <div className="absolute flex flex-col gap-6" style={{ right: '62px' }}>
                  <ArrowDown className="h-5 w-5 text-rose-500 fill-rose-500/20 rotate-90 animate-pulse" />
                  <ArrowDown className="h-5 w-5 text-rose-500 fill-rose-500/20 rotate-90 animate-pulse" />
                  <ArrowDown className="h-5 w-5 text-rose-500 fill-rose-500/20 rotate-90 animate-pulse" />
                </div>
                
                {/* Status text label box */}
                <div className="absolute left-6 top-6 bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-[10px] space-y-1 shadow-md z-20 max-w-[160px]">
                  <div className="text-rose-400 font-extrabold text-[9px] uppercase tracking-wider">Lực giữ áp suất khí quyển</div>
                  <div>P_khí quyển &gt; P_bên trong</div>
                  <div className="text-green-400 font-bold text-[9px] mt-1 border-t border-slate-800 pt-1">
                    Giác mút bám chắc lên kính!
                  </div>
                </div>
              </>
            )}

            {/* Pull force indicator */}
            {isPressed && pullForce > 0 && (
              <div className="absolute left-6 bottom-4 bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[9px] font-bold text-amber-400">
                Lực kéo gỡ ra: <span className="font-mono text-white text-xs">{pullForce} N</span> (Cần 100 N)
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={handlePress}
                disabled={isPressed || suctionState === 'pressing'}
                className="flex-1 py-2.5 bg-physics-600 hover:bg-physics-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform"
              >
                Ấn mạnh giác mút vào tường kính
              </button>
              
              <button
                onClick={resetSuction}
                disabled={!isPressed}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 active:scale-95 transition-transform flex items-center gap-1.5"
              >
                <RotateCcw className="h-4 w-4" /> Cạy gỡ
              </button>
            </div>

            {/* Pull Force Slider (visible only when pressed to test suction strength) */}
            {isPressed && (
              <div className="space-y-1 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <ArrowDown className="h-3.5 w-3.5 text-amber-500 rotate-90" />
                    Kéo ngược ra để tháo gỡ (Lực kéo F)
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{pullForce} N</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="110"
                  step="5"
                  value={pullForce}
                  onChange={(e) => handlePull(Number(e.target.value))}
                  className="premium-slider text-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[9px] text-slate-500 mt-1">
                  Kéo với lực lớn hơn lực giữ của khí quyển (100 N) để bứt giác mút ra.
                </p>
              </div>
            )}

            {/* Explanation box */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
              <HelpCircle className="h-4 w-4 text-physics-400 flex-shrink-0 mt-0.5" />
              <div>
                {!isPressed ? (
                  <span>Hãy click nút <strong className="text-white">"Ấn mạnh"</strong> để xem khí thoát ra ngoài và áp suất khí quyển ép chặt giác mút như thế nào.</span>
                ) : (
                  <span>Giác mút bám cực kỳ chắc vì áp suất không khí bên ngoài (P_khí quyển) đè mạnh vào, trong khi bên trong hầu như là chân không. Thử <strong className="text-white">kéo thanh trượt</strong> hoặc bấm <strong className="text-white">"Cạy gỡ"</strong> để cho không khí lọt vào lại.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LiquidAtmosphericPressureSim;
