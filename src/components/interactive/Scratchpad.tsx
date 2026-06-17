import React, { useRef, useState, useEffect } from 'react';
import { Edit3, Trash2, Palette } from 'lucide-react';

export const Scratchpad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0ea5e9'); // Default physics blue
  const [brushSize, setBrushSize] = useState(4);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Refs to avoid stale closures in window resize event listeners
  const colorRef = useRef(color);
  const brushSizeRef = useRef(brushSize);

  useEffect(() => {
    colorRef.current = color;
    brushSizeRef.current = brushSize;
  }, [color, brushSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial canvas dimensions based on display offset to prevent coordinate stretching
    canvas.width = canvas.offsetWidth || canvas.parentElement?.clientWidth || 400;
    canvas.height = canvas.offsetHeight || 280;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = colorRef.current;
    context.lineWidth = brushSizeRef.current;
    contextRef.current = context;

    // Fill dark slate background
    context.fillStyle = '#0f172a';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Resizing preserves previous canvas data using an offscreen canvas
    const handleResize = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const newWidth = currentCanvas.offsetWidth || 400;
      const newHeight = currentCanvas.offsetHeight || 280;

      // 1. Save current state
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = currentCanvas.width;
      tempCanvas.height = currentCanvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(currentCanvas, 0, 0);
      }

      // 2. Resize
      currentCanvas.width = newWidth;
      currentCanvas.height = newHeight;

      // 3. Reset context configurations
      const ctx = currentCanvas.getContext('2d');
      if (!ctx) return;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth = brushSizeRef.current;
      contextRef.current = ctx;

      // Fill background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, newWidth, newHeight);

      // 4. Restore state
      ctx.drawImage(tempCanvas, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current?.lineTo(x, y);
    contextRef.current?.stroke();
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const colors = [
    { value: '#0ea5e9', label: 'Vật lý (Sky)' },
    { value: '#10b981', label: 'Hóa học (Green)' },
    { value: '#ef4444', label: 'Đỏ' },
    { value: '#ffffff', label: 'Trắng' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl justify-between">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-350">
          <Edit3 className="h-5 w-5" />
          Bảng Nháp Giải Toán & Vẽ Hình
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Dùng chuột hoặc bút vẽ để nháp nhanh các phép tính toán, ghi chú công thức khi đang học lý thuyết.
        </p>
      </div>

      {/* Canvas Painting Box */}
      <div className="relative w-full h-[280px] bg-slate-950 rounded-xl my-4 border border-slate-800 overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block"
        />
      </div>

      {/* Controls row */}
      <div className="space-y-4">
        {/* Unified Tool controls */}
        <div className="flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-850 gap-4">
          {/* Row 1: Colors */}
          <div className="flex flex-row items-center justify-between gap-3 w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap shrink-0">
              <Palette className="h-3.5 w-3.5" /> Màu nét:
            </span>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    // Restore drawing mode by selecting color
                    setColor(c.value);
                  }}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    color === c.value
                      ? 'scale-125 ring-2 ring-white border-transparent'
                      : 'border-slate-700 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Brush / Eraser toggles */}
          <div className="flex flex-row items-center justify-between gap-3 pt-3 border-t border-slate-900 w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap shrink-0">Công cụ:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (color === '#0f172a') setColor('#0ea5e9');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  color !== '#0f172a'
                    ? 'bg-physics-500 border-physics-600 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Bút vẽ
              </button>
              <button
                type="button"
                onClick={() => setColor('#0f172a')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  color === '#0f172a'
                    ? 'bg-amber-500 border-amber-600 text-slate-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Cục tẩy
              </button>
            </div>
          </div>

          {/* Row 3: Brush Size */}
          <div className="flex flex-row items-center justify-between gap-3 pt-3 border-t border-slate-900 w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap shrink-0">Cỡ cọ:</span>
            <div className="flex items-center gap-3 flex-1 max-w-[200px] justify-end">
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="premium-slider text-physics-500 bg-slate-800 rounded-lg cursor-pointer flex-1"
              />
              <span className="text-[10px] font-mono text-slate-400 w-6 text-right shrink-0">{brushSize}px</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={clearCanvas}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-950/20 hover:bg-rose-900/30 border border-rose-900/40 text-rose-400 font-bold text-xs transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Xóa toàn bộ bảng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scratchpad;
