import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Flame, Users } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'A' | 'B' | 'AB'; // A (red), B (blue), AB (green, reacted)
}

export const ParticlesSim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(50); // 20 - 100
  const [concentration, setConcentration] = useState(40); // 10 - 100 particles
  const [isPlaying, setIsPlaying] = useState(true);
  const [collisionsCount, setCollisionsCount] = useState(0);
  const [reactedCount, setReactedCount] = useState(0);

  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  // Initialize particles
  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newParticles: Particle[] = [];
    const count = Math.floor(concentration);
    
    // Half reactants A, half B
    for (let i = 0; i < count; i++) {
      const type = i < count / 2 ? 'A' : 'B';
      const radius = 6;
      newParticles.push({
        x: radius + Math.random() * (canvas.width - radius * 2),
        y: radius + Math.random() * (canvas.height - radius * 2),
        // Speed proportional to temperature
        vx: (Math.random() - 0.5) * (temperature / 15),
        vy: (Math.random() - 0.5) * (temperature / 15),
        radius,
        type
      });
    }

    particlesRef.current = newParticles;
    setCollisionsCount(0);
    setReactedCount(0);
  };

  // Run initialization on mount or parameter reset
  useEffect(() => {
    initParticles();
  }, [concentration]);

  // Handle speed updates when temperature changes
  useEffect(() => {
    particlesRef.current.forEach(p => {
      // Normalize current velocity and rescale based on temperature
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 0.1;
      const targetSpeed = (0.5 + Math.random() * 0.5) * (temperature / 12);
      p.vx = (p.vx / speed) * targetSpeed;
      p.vy = (p.vy / speed) * targetSpeed;
    });
  }, [temperature]);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateAndDraw = () => {
      if (!isPlaying) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const speedFactor = temperature / 20;

      // 1. Move and check wall collisions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = -p.vx;
        } else if (p.x + p.radius > canvas.width) {
          p.x = canvas.width - p.radius;
          p.vx = -p.vx;
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = -p.vy;
        } else if (p.y + p.radius > canvas.height) {
          p.y = canvas.height - p.radius;
          p.vy = -p.vy;
        }
      });

      // 2. Check particle-particle collisions
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist) {
            // Collision detected! Resolve overlap
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            p1.x -= nx * overlap * 0.5;
            p1.y -= ny * overlap * 0.5;
            p2.x += nx * overlap * 0.5;
            p2.y += ny * overlap * 0.5;

            // Bounce velocities (elastic collision simplification)
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            p1.vx -= p * nx;
            p1.vy -= p * ny;
            p2.vx += p * nx;
            p2.vy += p * ny;

            // Check if reaction occurs: A + B -> AB
            // Reaction conditions: must be A and B, and temperature (kinetic energy) must be sufficient
            const canReact = (p1.type === 'A' && p2.type === 'B') || (p1.type === 'B' && p2.type === 'A');
            if (canReact) {
              setCollisionsCount(c => c + 1);

              // Probability of reaction increases with temperature (activation energy)
              const reactionProbability = temperature / 120; // 0.16 to 0.83
              if (Math.random() < reactionProbability) {
                p1.type = 'AB';
                p2.type = 'AB';
                setReactedCount(r => r + 2);
              }
            }
          }
        }
      }

      // 3. Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        if (p.type === 'A') {
          ctx.fillStyle = '#ef4444'; // Red reactant
          ctx.strokeStyle = '#991b1b';
        } else if (p.type === 'B') {
          ctx.fillStyle = '#3b82f6'; // Blue reactant
          ctx.strokeStyle = '#1e40af';
        } else {
          ctx.fillStyle = '#10b981'; // Green product AB
          ctx.strokeStyle = '#065f46';
        }
        
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
      });

      requestRef.current = requestAnimationFrame(updateAndDraw);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateAndDraw);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, temperature]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const reactionProgress = particlesRef.current.length > 0 
    ? Math.round((reactedCount / particlesRef.current.length) * 100) 
    : 0;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl justify-between">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2 text-chemistry-400">
          <Zap className="h-5 w-5 text-chemistry-400" />
          Mô phỏng Động học & Tốc độ phản ứng
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Nhiệt độ càng cao hạt di chuyển càng nhanh, va chạm càng mạnh dẫn đến tốc độ phản ứng tạo liên kết mới sản phẩm càng lớn.
        </p>
      </div>

      {/* Canvas view */}
      <div className="relative w-full h-52 bg-slate-950 rounded-xl my-4 border border-slate-800 overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width="320" 
          height="200" 
          className="w-full h-full block"
        />

        {/* Reaction Progress Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-[10px] font-bold">
          <div className="text-slate-400">Tiến trình Phản ứng (A + B → AB)</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-chemistry-500" style={{ width: `${reactionProgress}%` }} />
            </div>
            <span className="text-chemistry-400 font-mono">{reactionProgress}%</span>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 text-[9px] font-bold text-slate-400 bg-slate-900/90 border border-slate-800 rounded p-1.5">
          <div>Va chạm: <span className="text-white font-mono">{collisionsCount}</span></div>
          <div>Đã phản ứng: <span className="text-chemistry-400 font-mono">{reactedCount} hạt</span></div>
        </div>
      </div>

      {/* Control sliders */}
      <div className="space-y-4">
        {/* Play/Pause control row */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-bold text-xs transition-colors ${isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-chemistry-600 hover:bg-chemistry-700'}`}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Tạm dừng
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Chạy tiếp
              </>
            )}
          </button>
          <button
            onClick={initParticles}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
            title="Làm mới phản ứng"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Flame className="h-3.5 w-3.5 text-chemistry-400" />
              Nhiệt độ (Tốc độ hạt)
            </span>
            <span className="font-mono text-chemistry-400 font-bold">{temperature}°C</span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="premium-slider text-chemistry-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Concentration Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Users className="h-3.5 w-3.5 text-chemistry-400" />
              Nồng độ chất (Mật độ hạt)
            </span>
            <span className="font-mono text-chemistry-400 font-bold">{concentration} hạt</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={concentration}
            onChange={(e) => setConcentration(Number(e.target.value))}
            className="premium-slider text-chemistry-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default ParticlesSim;
