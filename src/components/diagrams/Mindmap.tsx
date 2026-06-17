import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '../../store/AppContext';
import { chapters, lessons, Chapter, Lesson } from '../../utils/db';
import { ZoomIn, ZoomOut, Maximize2, Check, ArrowRight } from 'lucide-react';
import { motion, useMotionValue } from 'framer-motion';

interface NodeData {
  id: string;
  label: string;
  type: 'root' | 'subject' | 'chapter' | 'lesson';
  subject?: 'chemistry' | 'physics' | 'biology';
  x: number;
  y: number;
  parentId?: string;
  lessonId?: string;
}

export const Mindmap: React.FC = () => {
  const router = useRouter();
  const { completedLessons } = useApp();

  // Motion values for smooth pan & zoom (GPU-bound, zero state-re-renders during drag)
  const x = useMotionValue(400);
  const y = useMotionValue(250);
  const scale = useMotionValue(0.85);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // States for visible branch expansions
  // Default: Show root and subjects. Chapters can be expanded.
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(['chemistry', 'physics', 'biology']);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Toggle subject expansion
  const toggleSubject = (subj: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subj) ? prev.filter(s => s !== subj) : [...prev, subj]
    );
  };

  // Toggle chapter expansion
  const toggleChapter = (chapId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapId) ? prev.filter(c => c !== chapId) : [...prev, chapId]
    );
  };

  // Mouse drag handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.interactive-node')) {
      return; // don't drag if clicking buttons/nodes
    }
    isDragging.current = true;
    dragStart.current = { x: e.clientX - x.get(), y: e.clientY - y.get() };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    x.set(e.clientX - dragStart.current.x);
    y.set(e.clientY - dragStart.current.y);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Zoom helpers
  const handleZoomIn = () => scale.set(Math.min(scale.get() + 0.1, 1.8));
  const handleZoomOut = () => scale.set(Math.max(scale.get() - 0.1, 0.4));
  const handleZoomReset = () => {
    scale.set(0.85);
    x.set(400);
    y.set(250);
  };

  // Wheel zoom with active listener to prevent passive scroll issues
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 0.05;
      if (e.deltaY < 0) {
        scale.set(Math.min(scale.get() + zoomFactor, 1.8));
      } else {
        scale.set(Math.max(scale.get() - zoomFactor, 0.4));
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [scale]);

  // Generate dynamic nodes based on expansion state
  const nodes: NodeData[] = [];
  const connections: { from: NodeData; to: NodeData }[] = [];

  // 1. Root Node
  const rootNode: NodeData = { id: 'root', label: 'Khoa học tự nhiên 8', type: 'root', x: 0, y: 0 };
  nodes.push(rootNode);

  // 2. Subject Nodes
  const subjectNodes: Record<string, NodeData> = {
    chemistry: { id: 'subj-chemistry', label: 'HÓA HỌC', type: 'subject', subject: 'chemistry', x: -260, y: -100, parentId: 'root' },
    physics: { id: 'subj-physics', label: 'VẬT LÝ', type: 'subject', subject: 'physics', x: 260, y: -100, parentId: 'root' },
    biology: { id: 'subj-biology', label: 'SINH HỌC', type: 'subject', subject: 'biology', x: 0, y: 150, parentId: 'root' }
  };

  Object.values(subjectNodes).forEach(node => {
    nodes.push(node);
    connections.push({ from: rootNode, to: node });
  });

  // 3. Chapter Nodes (depending on expanded subjects)
  expandedSubjects.forEach(subj => {
    const subjNode = subjectNodes[subj];
    const subjectChapters = Object.values(chapters).filter(c => c.subject === subj);
    
    subjectChapters.forEach((chap, idx) => {
      // Position calculation based on index and subject to spread nodes nicely
      let cx = 0;
      let cy = 0;

      if (subj === 'chemistry') {
        cx = -420 + (idx * 220);
        cy = -230;
      } else if (subj === 'physics') {
        cx = 190 + (idx * 210);
        cy = -230;
      } else if (subj === 'biology') {
        cx = -160 + (idx * 320);
        cy = 280;
      }

      const chapNode: NodeData = {
        id: `chap-${chap.id}`,
        label: chap.title,
        type: 'chapter',
        subject: subj as 'chemistry' | 'physics' | 'biology',
        x: cx,
        y: cy,
        parentId: subjNode.id
      };

      nodes.push(chapNode);
      connections.push({ from: subjNode, to: chapNode });

      // 4. Lesson Nodes (depending on expanded chapters)
      if (expandedChapters.includes(chap.id)) {
        chap.lessons.forEach((lessId, lIdx) => {
          const lesson = lessons[lessId];
          if (!lesson) return;

          let lx = cx;
          let ly = cy;

          // Spread lessons out from the chapter parent node
          if (subj === 'chemistry') {
            lx = cx - 90 + (lIdx * 90);
            ly = cy - 110;
          } else if (subj === 'physics') {
            lx = cx - 80 + (lIdx * 80);
            ly = cy - 110;
          } else if (subj === 'biology') {
            lx = cx - 70 + (lIdx * 140);
            ly = cy + 110;
          }

          const lessNode: NodeData = {
            id: `less-${lesson.id}`,
            label: lesson.title,
            type: 'lesson',
            subject: subj as 'chemistry' | 'physics' | 'biology',
            x: lx,
            y: ly,
            parentId: chapNode.id,
            lessonId: lesson.id
          };

          nodes.push(lessNode);
          connections.push({ from: chapNode, to: lessNode });
        });
      }
    });
  });

  // Render style helpers for subject color coding
  const getSubjectColorClasses = (subject?: string, type?: string, isCompleted: boolean = false) => {
    if (type === 'root') {
      return {
        bg: 'bg-slate-900 border-slate-700 text-white',
        line: 'stroke-slate-350 dark:stroke-slate-700'
      };
    }

    if (subject === 'chemistry') {
      return {
        border: 'border-chemistry-500',
        text: 'text-chemistry-600 dark:text-chemistry-400',
        bg: isCompleted 
          ? 'bg-chemistry-500 border-chemistry-600 text-white shadow-[0_0_15px_rgba(22,179,85,0.5)]' 
          : 'bg-white dark:bg-slate-900 border-chemistry-500/50 hover:border-chemistry-500 text-slate-800 dark:text-slate-200',
        line: 'stroke-chemistry-500/40 dark:stroke-chemistry-800/40'
      };
    }
    if (subject === 'physics') {
      return {
        border: 'border-physics-500',
        text: 'text-physics-600 dark:text-physics-400',
        bg: isCompleted 
          ? 'bg-physics-500 border-physics-600 text-white shadow-[0_0_15px_rgba(14,149,233,0.5)]' 
          : 'bg-white dark:bg-slate-900 border-physics-500/50 hover:border-physics-500 text-slate-800 dark:text-slate-200',
        line: 'stroke-physics-500/40 dark:stroke-physics-800/40'
      };
    }
    if (subject === 'biology') {
      return {
        border: 'border-biology-500',
        text: 'text-biology-600 dark:text-biology-400',
        bg: isCompleted 
          ? 'bg-biology-500 border-biology-600 text-white shadow-[0_0_15px_rgba(242,124,19,0.5)]' 
          : 'bg-white dark:bg-slate-900 border-biology-500/50 hover:border-biology-500 text-slate-800 dark:text-slate-200',
        line: 'stroke-biology-500/40 dark:stroke-biology-800/40'
      };
    }

    return {
      border: 'border-slate-300',
      text: 'text-slate-600',
      bg: 'bg-white dark:bg-slate-900 border-slate-300 text-slate-800',
      line: 'stroke-slate-300'
    };
  };

  const handleNodeClick = (node: NodeData) => {
    if (node.type === 'subject' && node.subject) {
      toggleSubject(node.subject);
    } else if (node.type === 'chapter') {
      const chapId = node.id.replace('chap-', '');
      toggleChapter(chapId);
    } else if (node.type === 'lesson' && node.lessonId) {
      setSelectedLesson(lessons[node.lessonId]);
    }
  };

  return (
    <div className="relative w-full h-[650px] bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-inner flex flex-col justify-between">
      {/* HUD Control Panels */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <button 
          onClick={handleZoomIn} 
          className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md transition-colors"
          title="Phóng to"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button 
          onClick={handleZoomOut} 
          className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md transition-colors"
          title="Thu nhỏ"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button 
          onClick={handleZoomReset} 
          className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md transition-colors"
          title="Căn giữa sơ đồ"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute top-4 right-4 z-20 bg-slate-900/90 dark:bg-slate-950/85 border border-slate-800 px-3.5 py-2.5 rounded-xl shadow-lg text-[10px] space-y-1.5 pointer-events-none text-slate-300">
        <div className="font-bold text-white mb-1">HƯỚNG DẪN TƯƠNG TÁC</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> Kéo thả nền để di chuyển (Pan)</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> Cuộn chuột để phóng to / thu nhỏ</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-chemistry-500" /> Click Môn học / Chương để mở rộng</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-physics-500" /> Click bài học để mở nhanh bài đọc</div>
      </div>

      {/* SVG Canvas Area */}
      <div 
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing select-none relative`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Main transformation group */}
          <motion.g 
            style={{ 
              x,
              y,
              scale,
              transformOrigin: '0px 0px'
            }}
          >
            {/* 1. Draw Connection Lines */}
            {connections.map((conn, idx) => {
              const startX = conn.from.x;
              const startY = conn.from.y;
              const endX = conn.to.x;
              const endY = conn.to.y;
              
              // Draw smooth bezier curves
              const dx = endX - startX;
              const dy = endY - startY;
              const pathD = `M ${startX},${startY} C ${startX + dx/2},${startY} ${startX + dx/2},${endY} ${endX},${endY}`;

              const colors = getSubjectColorClasses(conn.to.subject, conn.to.type);

              return (
                <path
                  key={idx}
                  d={pathD}
                  fill="none"
                  className={`${colors.line || 'stroke-slate-300'} stroke-[2.5]`}
                />
              );
            })}

            {/* 2. Draw Interactive Nodes */}
            {nodes.map(node => {
              const isLessonCompleted = node.lessonId ? completedLessons.includes(node.lessonId) : false;
              const colors = getSubjectColorClasses(node.subject, node.type, isLessonCompleted);
              
              // Define node dimension and styles depending on type
              let nodeStyle = '';
              let padding = '';
              let labelText = node.label;

              if (node.type === 'root') {
                nodeStyle = 'rounded-2xl border-2 px-6 py-3.5 font-extrabold text-sm tracking-wide bg-slate-950 border-slate-700 text-white shadow-xl';
              } else if (node.type === 'subject') {
                nodeStyle = `rounded-xl border-2 px-5 py-2.5 font-black text-xs tracking-wider border-slate-400 dark:border-slate-800 ${colors.bg} ${colors.text}`;
              } else if (node.type === 'chapter') {
                const isExpanded = expandedChapters.includes(node.id.replace('chap-', ''));
                nodeStyle = `rounded-lg border px-4 py-2 font-bold text-[11px] max-w-[170px] text-center border-slate-300 dark:border-slate-800 ${colors.bg} ${isExpanded ? 'ring-2 ring-offset-2 ring-physics-500' : ''}`;
              } else if (node.type === 'lesson') {
                nodeStyle = `rounded-full border px-4 py-1.5 font-medium text-[10px] border-slate-200 dark:border-slate-800 ${colors.bg}`;
              }

              return (
                <foreignObject
                  key={node.id}
                  x={node.x - 90}
                  y={node.y - 25}
                  width="180"
                  height="75"
                  className="overflow-visible pointer-events-auto"
                >
                  <div className="flex justify-center items-center w-full h-full">
                    <button
                      onClick={() => handleNodeClick(node)}
                      className={`interactive-node transition-all active:scale-95 duration-200 ${nodeStyle} flex items-center justify-center gap-1.5 select-none`}
                    >
                      {node.type === 'lesson' && isLessonCompleted && (
                        <Check className="h-3.5 w-3.5 text-white bg-green-500 rounded-full p-0.5" />
                      )}
                      <span>{labelText}</span>
                    </button>
                  </div>
                </foreignObject>
              );
            })}
          </motion.g>
        </svg>
      </div>

      {/* Slide-up detailed lesson popup at bottom of mindmap */}
      {selectedLesson && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-md z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-float-in">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                selectedLesson.subject === 'chemistry' ? 'bg-chemistry-100 text-chemistry-700 dark:bg-chemistry-950/40 dark:text-chemistry-400' :
                selectedLesson.subject === 'physics' ? 'bg-physics-100 text-physics-700 dark:bg-physics-950/40 dark:text-physics-400' :
                'bg-biology-100 text-biology-700 dark:bg-biology-950/40 dark:text-biology-400'
              }`}>
                {selectedLesson.subject === 'chemistry' ? 'Hóa học' : selectedLesson.subject === 'physics' ? 'Vật lý' : 'Sinh học'}
              </span>
              {completedLessons.includes(selectedLesson.id) && (
                <span className="text-[9px] text-green-500 font-bold flex items-center gap-0.5">
                  <Check className="h-3 w-3" /> Đã hoàn thành
                </span>
              )}
            </div>
            <h4 className="font-extrabold text-sm text-slate-800 dark:text-white mt-1.5">{selectedLesson.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{selectedLesson.summary}</p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedLesson(null)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold"
            >
              Đóng
            </button>
            <button
              onClick={() => router.push(`/lesson?id=${selectedLesson.id}`)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors ${
                selectedLesson.subject === 'chemistry' ? 'bg-chemistry-600 hover:bg-chemistry-700' :
                selectedLesson.subject === 'physics' ? 'bg-physics-600 hover:bg-physics-700' :
                'bg-biology-600 hover:bg-biology-700'
              }`}
            >
              Vào học bài này <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Mindmap;
