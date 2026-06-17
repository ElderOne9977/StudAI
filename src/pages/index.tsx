import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useApp } from '../store/AppContext';
import { chapters, lessons } from '../utils/db';
import { Flame, Compass, HeartPulse, Sparkles, BookOpen, Layers } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import Mindmap dynamically (Lazy Loading) to optimize bundle size and prevent SSR hydration errors
const Mindmap = dynamic(() => import('../components/diagrams/Mindmap').then(mod => mod.Mindmap), {
  loading: () => <div className="h-[650px] w-full bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl animate-pulse flex items-center justify-center text-slate-500 text-sm font-mono">Đang tải sơ đồ tư duy tương tác...</div>,
  ssr: false
});

export default function Home() {
  const { completedLessons } = useApp();

  const totalLessons = Object.keys(lessons).length;
  const totalCompleted = completedLessons.length;

  const subjectStats = {
    chemistry: {
      title: 'Hóa Học',
      icon: Layers,
      color: 'text-chemistry-500',
      bg: 'bg-chemistry-50 dark:bg-chemistry-950/20',
      border: 'border-chemistry-100 dark:border-chemistry-900/30',
      shadow: 'hover:shadow-chemistry-500/10',
      lessons: Object.values(lessons).filter(l => l.subject === 'chemistry'),
    },
    physics: {
      title: 'Vật Lý',
      icon: Compass,
      color: 'text-physics-500',
      bg: 'bg-physics-50 dark:bg-physics-950/20',
      border: 'border-physics-100 dark:border-physics-900/30',
      shadow: 'hover:shadow-physics-500/10',
      lessons: Object.values(lessons).filter(l => l.subject === 'physics'),
    },
    biology: {
      title: 'Sinh Học',
      icon: HeartPulse,
      color: 'text-biology-500',
      bg: 'bg-biology-50 dark:bg-biology-950/20',
      border: 'border-biology-100 dark:border-biology-900/30',
      shadow: 'hover:shadow-biology-500/10',
      lessons: Object.values(lessons).filter(l => l.subject === 'biology'),
    }
  };

  return (
    <>
      <Head>
        <title>StudAI - Bản đồ Kiến thức Khoa học Tự nhiên 8</title>
        <meta name="description" content="Học tập tương tác Khoa học tự nhiên lớp 8 với sơ đồ tư duy rễ cây và mô phỏng 2D/3D sinh động." />
      </Head>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-physics-950/70 via-chemistry-950/50 to-biology-950/50 z-0" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-physics-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-biology-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-physics-500/15 border border-physics-500/35 text-physics-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Học Tập Kỷ Nguyên Số
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bản Đồ Kiến Thức <br />
              <span className="bg-gradient-to-r from-physics-400 to-indigo-300 bg-clip-text text-transparent">
                Khoa học tự nhiên 8
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Không còn học thuộc lòng khô khan! Bắt đầu hành trình khám phá thế giới Hóa học, Vật lý và Sinh học trực quan bằng sơ đồ tư duy kéo thả và các thí nghiệm mô phỏng tương tác.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#mindmap-section"
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:scale-[1.03]"
              >
                Khám phá sơ đồ tư duy
              </a>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-extrabold text-white text-base font-mono">{totalCompleted}/{totalLessons}</span> bài đã hoàn thành
              </div>
            </div>
          </div>
        </section>

        {/* Subject Navigation Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(subjectStats).map(([key, stat]) => {
            const IconComponent = stat.icon;
            const completedCount = stat.lessons.filter(l => completedLessons.includes(l.id)).length;
            const percent = stat.lessons.length > 0 ? Math.round((completedCount / stat.lessons.length) * 100) : 0;

            return (
              <Link 
                href="#mindmap-section"
                key={key} 
                className={`glow-card rounded-3xl border cursor-pointer select-none active:scale-[0.98] transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 ${stat.border} ${stat.bg} p-6 flex flex-col justify-between shadow-sm ${stat.shadow} ${
                  key === 'chemistry' ? 'md:col-span-2' : key === 'physics' ? 'md:col-span-1 md:row-span-2 h-full' : 'md:col-span-2'
                }`}
                style={{
                  boxShadow: percent > 0 
                    ? `0 0 ${8 + percent * 0.12}px rgba(${
                        key === 'chemistry' ? '16, 185, 129' : key === 'physics' ? '14, 165, 233' : '249, 115, 22'
                      }, ${0.1 + (percent / 100) * 0.2})` 
                    : 'none'
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-slate-700`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {stat.lessons.length} Bài học
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{stat.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {key === 'chemistry' && 'Học thuyết nguyên tử, phản ứng hóa học, định luật bảo toàn khối lượng và dung dịch.'}
                      {key === 'physics' && 'Tìm hiểu khối lượng riêng, áp suất chất lỏng/khí quyển, lực đẩy Archimedes và đòn bẩy.'}
                      {key === 'biology' && 'Khám phá các hệ cơ quan cơ thể người (tiêu hóa, hô hấp) và cân bằng hệ sinh thái.'}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>Đã học: {completedCount}/{stat.lessons.length} bài</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full`}
                      style={{ 
                        width: `${percent}%`,
                        background: key === 'chemistry' 
                          ? 'linear-gradient(to right, #10b981, #059669)' 
                          : key === 'physics' 
                            ? 'linear-gradient(to right, #0ea5e9, #0284c7)' 
                            : 'linear-gradient(to right, #f97316, #ea580c)'
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {/* The Giant Mindmap Workspace */}
        <section id="mindmap-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-physics-500" />
                Sơ đồ tư duy kiến thức tổng quan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Toàn bộ chương trình được kết nối dưới dạng cây rễ giúp hình dung mối liên hệ bài học. Click để học ngay.
              </p>
            </div>
          </div>

          <Mindmap />
        </section>
      </div>
    </>
  );
}
