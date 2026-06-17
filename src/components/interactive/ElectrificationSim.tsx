import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, HelpCircle, RotateCcw } from 'lucide-react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface ChargeParticle {
  id: number;
  type: '+' | '-';
  x: number;
  y: number;
}

export const ElectrificationSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friction' | 'interaction'>('friction');

  // Friction mode states
  const [rubCount, setRubCount] = useState<number>(0);
  const [isRubbing, setIsRubbing] = useState<boolean>(false);
  
  // Motion value for Glass Rod position (GPU-bound drag and animate)
  const rodPosition = useMotionValue(0);
  const crossedThreshold = useRef(false);
  const [electronsTransferring, setElectronsTransferring] = useState<{ id: number; x: number; y: number }[]>([]);

  // Interaction mode states
  const [rod1Charge, setRod1Charge] = useState<'neutral' | 'positive' | 'negative'>('negative');
  const [rod2Charge, setRod2Charge] = useState<'neutral' | 'positive' | 'negative'>('negative');
  const [isReleased, setIsReleased] = useState<boolean>(false);
  const [interactionResult, setInteractionResult] = useState<string>('Chọn điện tích và bấm "Thả"');

  // Charge distribution on Glass Rod & Silk Cloth
  const totalSteps = 6;
  const rodPositives = 6;
  const rodNegatives = Math.max(6 - rubCount, 0);
  const clothPositives = 6;
  const clothNegatives = 6 + rubCount;

  // Track physical rubbing drags
  const handleDrag = (event: any, info: any) => {
    const currentX = rodPosition.get();
    
    // Check if we crossed the threshold moving right towards the cloth
    if (currentX > 60 && !crossedThreshold.current) {
      crossedThreshold.current = true;
    }
    
    // Check if we returned back to the left
    if (currentX < 20 && crossedThreshold.current) {
      crossedThreshold.current = false;
      
      // Complete 1 rub cycle: trigger electron transfer
      if (rubCount < totalSteps) {
        const newElectronId = Date.now();
        setElectronsTransferring(prev => [
          ...prev,
          { id: newElectronId, x: 130, y: 70 + (rubCount * 8) }
        ]);

        // Animate the electron flying to cloth
        setTimeout(() => {
          setElectronsTransferring(prev => prev.filter(e => e.id !== newElectronId));
          setRubCount(r => Math.min(r + 1, totalSteps));
        }, 600);
      }
    }
  };

  // Rubbing action trigger (via button)
  const triggerRub = () => {
    if (rubCount >= totalSteps || isRubbing) return;
    setIsRubbing(true);

    // Smooth physics-based animate back and forth
    animate(rodPosition, 60, {
      duration: 0.22,
      onComplete: () => {
        const newElectronId = Date.now();
        setElectronsTransferring(prev => [
          ...prev,
          { id: newElectronId, x: 130, y: 70 + (rubCount * 8) }
        ]);

        setTimeout(() => {
          setElectronsTransferring(prev => prev.filter(e => e.id !== newElectronId));
          setRubCount(r => Math.min(r + 1, totalSteps));
        }, 600);

        animate(rodPosition, 0, {
          duration: 0.22,
          delay: 0.1,
          onComplete: () => {
            setIsRubbing(false);
          }
        });
      }
    });
  };

  const handleResetFriction = () => {
    setRubCount(0);
    rodPosition.set(0);
    crossedThreshold.current = false;
    setElectronsTransferring([]);
    setIsRubbing(false);
  };

  // Charge Interaction simulation logic
  const handleRelease = () => {
    setIsReleased(true);
  };

  const handleResetInteraction = () => {
    setIsReleased(false);
  };

  // Determine swings
  let leftAngle = 0;
  let rightAngle = 0;
  let statusText = 'Chọn điện tích và bấm "Thả"';

  if (isReleased) {
    if (rod1Charge === 'neutral' || rod2Charge === 'neutral') {
      leftAngle = 0;
      rightAngle = 0;
      statusText = 'Không có tương tác (Một hoặc hai vật trung hòa)';
    } else if (rod1Charge === rod2Charge) {
      // Repel
      leftAngle = -15;
      rightAngle = 15;
      statusText = 'Đẩy nhau (Hai điện tích cùng loại)';
    } else {
      // Attract
      leftAngle = 12;
      rightAngle = -12;
      statusText = 'Hút nhau (Hai điện tích khác loại)';
    }
  }

  return (
    <div className="flex flex-col bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl gap-4">
      
      {/* Simulation Selector Tabs */}
      <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1.5 mb-3">
        <button
          onClick={() => setActiveTab('friction')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'friction'
              ? 'bg-physics-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="h-3.5 w-3.5" /> Cọ Xát Tạo Điện
        </button>
        <button
          onClick={() => setActiveTab('interaction')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'interaction'
              ? 'bg-physics-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" /> Tương Tác Hút Đẩy
        </button>
      </div>

      {activeTab === 'friction' ? (
        // ==================== ELECTRIFICATION BY FRICTION ====================
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-physics-400">
              <Zap className="h-4.5 w-4.5 text-physics-400 animate-pulse" />
              Cọ Xát Tạo Điện Tích
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Bình thường các vật trung hòa về điện. Hãy <strong>kéo đũa cọ xát vào mảnh vải lụa</strong> (hoặc nhấn nút "Cọ xát") để bứt electron (-) từ đũa thủy tinh sang vải lụa.
            </p>
          </div>

          {/* Canvas */}
          <div className="relative w-full bg-slate-900/40 rounded-xl my-3 border border-slate-800/80 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="w-full flex items-center justify-between p-2">
              {/* Glass Rod (Left) */}
              <motion.div 
                drag="x"
                dragConstraints={{ left: 0, right: 120 }}
                dragElastic={0.05}
                dragMomentum={false}
                onDrag={handleDrag}
                className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
                style={{
                  x: rodPosition,
                  width: '150px'
                }}
              >
                <span className="text-[8px] text-slate-400 font-bold mb-1.5 uppercase">Đũa Thủy Tinh</span>
                {/* Rod body (double width: w-14) */}
                <div 
                  className={`w-14 h-32 rounded-md border border-slate-500 flex flex-col p-2 justify-between transition-all duration-500 ${
                    rubCount >= totalSteps 
                      ? 'bg-red-500/25 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                      : 'bg-slate-350/20'
                  }`}
                >
                  {/* Positives and Negatives standing in parallel rows */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-around items-center w-full">
                      {/* Positive (Proton) */}
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 text-white font-mono text-[7px] font-black flex items-center justify-center">+</span >
                      {/* Negative (Electron - only if not rubbed off yet) */}
                      {i < rodNegatives ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-600 text-white font-mono text-[7px] font-black flex items-center justify-center">-</span>
                      ) : (
                        <span className="w-2.5 h-2.5" />
                      )}
                    </div>
                  ))}
                </div>
                <span className={`text-[9px] font-bold mt-1.5 ${rubCount >= totalSteps ? 'text-red-400' : 'text-slate-400'}`}>
                  {rubCount === 0 ? 'Trung hòa' : `Thiếu e (+${rubCount})`}
                </span>
              </motion.div>

              {/* Flying Electron Particles */}
              {electronsTransferring.map(e => (
                <div
                  key={e.id}
                  className="absolute bg-sky-500 text-white font-black font-mono text-[8px] w-3 h-3 rounded-full flex items-center justify-center z-30 shadow-md shadow-sky-500/40 animate-[fly_0.6s_ease-in-out_forwards]"
                  style={{
                    left: `${e.x}px`,
                    top: `${e.y}px`,
                    '--target-x': '170px',
                    '--target-y': `${e.y}px`
                  } as React.CSSProperties}
                >
                  -
                </div>
              ))}

              {/* CSS style hook for keyframe animation */}
              <style>{`
                @keyframes fly {
                  0% { transform: translateX(0) scale(1); }
                  100% { transform: translateX(70px) scale(0.8); opacity: 0.8; }
                }
              `}</style>

              {/* Silk Cloth (Right) */}
              <div className="flex flex-col items-center w-24">
                <span className="text-[8px] text-slate-400 font-bold mb-1.5 uppercase">Mảnh Vải Lụa</span>
                {/* Cloth shape */}
                <div 
                  className={`w-18 h-28 border border-purple-800 rounded-2xl flex flex-wrap content-start p-1.5 justify-center gap-1.5 transition-all duration-500 ${
                    rubCount > 0 
                      ? 'bg-purple-900/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                      : 'bg-purple-900/20'
                  }`}
                >
                  {/* Positives */}
                  {Array.from({ length: clothPositives }).map((_, i) => (
                    <span key={`cp-${i}`} className="w-2.5 h-2.5 rounded-full bg-red-600 text-white font-mono text-[7px] font-black flex items-center justify-center">+</span >
                  ))}
                  {/* Negatives (increases with rubbing) */}
                  {Array.from({ length: clothNegatives }).map((_, i) => (
                    <span key={`cn-${i}`} className="w-2.5 h-2.5 rounded-full bg-sky-600 text-white font-mono text-[7px] font-black flex items-center justify-center">-</span>
                  ))}
                </div>
                <span className={`text-[9px] font-bold mt-1.5 ${rubCount > 0 ? 'text-purple-400' : 'text-slate-400'}`}>
                  {rubCount === 0 ? 'Trung hòa' : `Thừa e (-${rubCount})`}
                </span>
              </div>
            </div>

            {/* Explanation */}
            <div className="w-full mt-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2 text-[10px] text-slate-400 z-10">
              <HelpCircle className="h-4 w-4 text-physics-400 flex-shrink-0 mt-0.5" />
              <div>
                {rubCount === 0 ? (
                  <span>Đũa thủy tinh và lụa đều chứa các hạt điện tích dương (+) và âm (-) cân bằng nhau (trung hòa). Hãy bắt đầu cọ xát.</span>
                ) : rubCount < totalSteps ? (
                  <span>Cọ xát cung cấp năng lượng bứt các electron (-) khỏi đũa lọt vào lụa. Đũa mất bớt electron nên nhiễm điện dương, lụa nhận thêm nên nhiễm điện âm.</span>
                ) : (
                  <span className="text-amber-400 font-medium">Hoàn thành! Đũa thủy tinh thiếu electron trầm trọng nên mang điện tích dương rực đỏ (+). Mảnh lụa thừa electron nên mang điện tích âm (-).</span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3 w-full">
              <div className="flex gap-2">
                <button
                  onClick={triggerRub}
                  disabled={rubCount >= totalSteps || isRubbing}
                  className="flex-1 py-2.5 bg-physics-600 hover:bg-physics-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform"
                >
                  {rubCount >= totalSteps ? 'Đã sạc đầy điện!' : 'Cọ xát liên tục (Chà xát)'}
                </button>
                <button
                  onClick={handleResetFriction}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-350 border border-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-transform"
                >
                  Đặt lại
                </button>
              </div>

            </div>
          </div>
        ) : (
        // ==================== INTERACTION repelling/attracting ====================
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-physics-400">
              <Sparkles className="h-4.5 w-4.5 text-physics-400" />
              Tương tác hút đẩy
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Quy luật: Cùng dấu thì đẩy nhau, trái dấu thì hút nhau. Chọn điện tích cho hai chiếc đũa treo và nhấn nút <strong>"Thả tay"</strong> để kiểm chứng.
            </p>
          </div>

          {/* Canvas */}
          <div className="relative w-full bg-slate-900/40 rounded-xl my-3 border border-slate-800/80 flex flex-col items-center justify-center p-4 overflow-hidden">
              
              {/* The Ceiling Line */}
              <line x1="20" y1="20" x2="220" y2="20" className="stroke-slate-700 stroke-[3] w-full" />
              
              {/* Hanging Setup SVG */}
              <svg width="240" height="130" className="overflow-visible">
                {/* Rod 1 (Left) */}
                <g
                  style={{
                    transform: `rotate(${leftAngle}deg)`,
                    transformOrigin: '70px 20px',
                    transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  {/* Thread line */}
                  <line x1="70" y1="20" x2="70" y2="70" className="stroke-slate-500 stroke-1" />
                  {/* Rod 1 */}
                  <rect 
                    x="63" 
                    y="70" 
                    width="14" 
                    height="50" 
                    rx="2"
                    className={`stroke-[1.5] ${
                      rod1Charge === 'positive' 
                        ? 'fill-red-500/35 stroke-red-500' 
                        : rod1Charge === 'negative' 
                        ? 'fill-sky-500/35 stroke-sky-500' 
                        : 'fill-slate-700 stroke-slate-600'
                    }`} 
                  />
                  {/* Charge symbol markers */}
                  <text x="70" y="98" textAnchor="middle" className="font-mono text-[9px] font-black fill-white select-none">
                    {rod1Charge === 'positive' ? '++' : rod1Charge === 'negative' ? '--' : '0'}
                  </text>
                  <text x="70" y="62" textAnchor="middle" className="text-[7px] font-bold fill-slate-450 uppercase">Đũa 1</text>
                </g>

                {/* Rod 2 (Right) */}
                <g
                  style={{
                    transform: `rotate(${rightAngle}deg)`,
                    transformOrigin: '170px 20px',
                    transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  {/* Thread line */}
                  <line x1="170" y1="20" x2="170" y2="70" className="stroke-slate-500 stroke-1" />
                  {/* Rod 2 */}
                  <rect 
                    x="163" 
                    y="70" 
                    width="14" 
                    height="50" 
                    rx="2"
                    className={`stroke-[1.5] ${
                      rod2Charge === 'positive' 
                        ? 'fill-red-500/35 stroke-red-500' 
                        : rod2Charge === 'negative' 
                        ? 'fill-sky-500/35 stroke-sky-500' 
                        : 'fill-slate-700 stroke-slate-600'
                    }`} 
                  />
                  {/* Charge symbol markers */}
                  <text x="170" y="98" textAnchor="middle" className="font-mono text-[9px] font-black fill-white select-none">
                    {rod2Charge === 'positive' ? '++' : rod2Charge === 'negative' ? '--' : '0'}
                  </text>
                  <text x="170" y="62" textAnchor="middle" className="text-[7px] font-bold fill-slate-450 uppercase">Đũa 2</text>
                </g>
              </svg>

              {/* Results text box overlay */}
              {isReleased && (
                <div className={`absolute top-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase border tracking-wider z-20 ${
                  leftAngle !== 0 
                    ? leftAngle > 0 
                      ? 'bg-green-955/80 border-green-800 text-green-400' 
                      : 'bg-amber-955/80 border-amber-800 text-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  {statusText}
                </div>
              )}

              {/* Explanation info */}
              <div className="w-full mt-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2 text-[10px] text-slate-400 z-10">
                <HelpCircle className="h-4 w-4 text-physics-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span>
                    Đũa 1 ({rod1Charge === 'positive' ? 'Đã nhiễm điện +' : rod1Charge === 'negative' ? 'Đã nhiễm điện -' : 'Trung hòa'}) và Đũa 2 ({rod2Charge === 'positive' ? 'Đã nhiễm điện +' : rod2Charge === 'negative' ? 'Đã nhiễm điện -' : 'Trung hòa'}). Quy ước lực tương tác tĩnh điện: Dương hút Âm, Dương đẩy Dương, Âm đẩy Âm.
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-3 w-full">
              <div className="grid grid-cols-2 gap-3">
                {/* Rod 1 Settings */}
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Điện tích đũa 1:</div>
                  <div className="flex flex-col gap-1">
                    {['positive', 'negative', 'neutral'].map(charge => (
                      <button
                        key={charge}
                        onClick={() => {
                          setRod1Charge(charge as any);
                          setIsReleased(false);
                        }}
                        className={`py-1 px-2 text-[9px] font-bold rounded transition-all ${
                          rod1Charge === charge 
                            ? charge === 'positive' 
                              ? 'bg-rose-600 text-white' 
                              : charge === 'negative' 
                              ? 'bg-sky-600 text-white' 
                              : 'bg-slate-700 text-white'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        {charge === 'positive' ? 'Dương (+)' : charge === 'negative' ? 'Âm (-)' : 'Trung hòa (0)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rod 2 Settings */}
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Điện tích đũa 2:</div>
                  <div className="flex flex-col gap-1">
                    {['positive', 'negative', 'neutral'].map(charge => (
                      <button
                        key={charge}
                        onClick={() => {
                          setRod2Charge(charge as any);
                          setIsReleased(false);
                        }}
                        className={`py-1 px-2 text-[9px] font-bold rounded transition-all ${
                          rod2Charge === charge 
                            ? charge === 'positive' 
                              ? 'bg-rose-600 text-white' 
                              : charge === 'negative' 
                              ? 'bg-sky-600 text-white' 
                              : 'bg-slate-700 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {charge === 'positive' ? 'Dương (+)' : charge === 'negative' ? 'Âm (-)' : 'Trung hòa (0)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Play controls */}
              <div className="flex gap-2">
                <button
                  onClick={handleRelease}
                  disabled={isReleased}
                  className="flex-1 py-2.5 bg-physics-600 hover:bg-physics-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform"
                >
                  Thả tay (Kiểm tra tương tác)
                </button>
                <button
                  onClick={handleResetInteraction}
                  disabled={!isReleased}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 border border-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-transform"
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
export default ElectrificationSim;
