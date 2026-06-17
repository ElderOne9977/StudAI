import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApp } from '../../store/AppContext';
import { lessons, chapters, Lesson } from '../../utils/db';
import { renderMarkdown, BlockMath } from '../../utils/markdown';
import { CheckCircle2, Circle, ChevronRight, Home, ArrowLeft, ArrowRight, Award } from 'lucide-react';

import dynamic from 'next/dynamic';

// Import simulations dynamically (Lazy Loading) to optimize bundle size and prevent SSR hydration errors
const DensitySim = dynamic(() => import('../../components/interactive/DensitySim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const PressureSim = dynamic(() => import('../../components/interactive/PressureSim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const LiquidAtmosphericPressureSim = dynamic(() => import('../../components/interactive/LiquidAtmosphericPressureSim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const LeverSim = dynamic(() => import('../../components/interactive/LeverSim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const MomentSim = dynamic(() => import('../../components/interactive/MomentSim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const ElectrificationSim = dynamic(() => import('../../components/interactive/ElectrificationSim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const ParticlesSim = dynamic(() => import('../../components/interactive/ParticlesSim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-805 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const DigestionSim = dynamic(() => import('../../components/interactive/DigestionSim'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải mô phỏng...</div>,
  ssr: false
});
const Scratchpad = dynamic(() => import('../../components/interactive/Scratchpad'), {
  loading: () => <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải bảng vẽ...</div>,
  ssr: false
});

// Import exercise widgets dynamically
const SmartCalculator = dynamic(() => import('../../components/exercises/SmartCalculator'), {
  loading: () => <div className="h-32 bg-slate-900 rounded-2xl border border-slate-850 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải máy tính thông minh...</div>,
  ssr: false
});
const FlashcardWidget = dynamic(() => import('../../components/exercises/FlashcardWidget'), {
  loading: () => <div className="h-32 bg-slate-900 rounded-2xl border border-slate-850 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">Đang tải thẻ ghi nhớ...</div>,
  ssr: false
});

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const { completedLessons, toggleComplete } = useApp();

  // Find current lesson
  const lessonId = id as string;
  const lesson = lessons[lessonId];

  // Scroll to top of lesson description when ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId]);

  if (!router.isReady) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-physics-500 border-t-transparent" />
      </div>
    );
  }

  // Fallback: If no lesson or invalid ID, show beautiful directory of all lessons
  if (!lesson) {
    const subjects = {
      chemistry: { name: 'Hóa Học', color: 'text-chemistry-500', bg: 'bg-chemistry-50 dark:bg-chemistry-950/20' },
      physics: { name: 'Vật Lý', color: 'text-physics-500', bg: 'bg-physics-50 dark:bg-physics-950/20' },
      biology: { name: 'Sinh Học', color: 'text-biology-500', bg: 'bg-biology-50 dark:bg-biology-950/20' }
    };

    return (
      <>
        <Head>
          <title>Mục lục Bài học - StudAI</title>
        </Head>
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black">Danh Sách Bài Học</h1>
            <p className="text-sm text-slate-500">Vui lòng chọn một bài học từ danh sách hoặc quay lại trang chủ.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(subjects).map(([subjKey, subj]) => {
              const subjLessons = Object.values(lessons).filter(l => l.subject === subjKey);
              return (
                <div key={subjKey} className={`p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4`}>
                  <h2 className={`font-black text-sm uppercase tracking-wider ${subj.color}`}>{subj.name}</h2>
                  <ul className="space-y-2">
                    {subjLessons.map((l) => (
                      <li key={l.id}>
                        <Link 
                          href={`/lesson?id=${l.id}`}
                          className="text-xs font-semibold text-slate-755 dark:text-slate-300 hover:text-physics-500 dark:hover:text-physics-400 flex items-center justify-between"
                        >
                          <span>{l.title}</span>
                          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              <Home className="h-4 w-4" /> Quay về Trang chủ
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Find chapter information
  const chapter = chapters[lesson.chapterId];
  const isCompleted = completedLessons.includes(lesson.id);

  // Subject theme styling
  const subjectThemes = {
    chemistry: {
      color: 'text-chemistry-500',
      activeText: 'text-chemistry-600 dark:text-chemistry-400',
      btnComplete: 'bg-chemistry-500 hover:bg-chemistry-600 text-white shadow-lg shadow-chemistry-500/20',
      btnIncomplete: 'border-chemistry-200 hover:border-chemistry-500 hover:bg-chemistry-50/30 text-chemistry-600 dark:text-chemistry-400 dark:border-chemistry-900/50 dark:hover:bg-chemistry-950/20',
      badge: 'bg-chemistry-50 dark:bg-chemistry-950/40 text-chemistry-600 dark:text-chemistry-400 border border-chemistry-100 dark:border-chemistry-900/50',
      progressDot: 'bg-chemistry-500'
    },
    physics: {
      color: 'text-physics-500',
      activeText: 'text-physics-600 dark:text-physics-400',
      btnComplete: 'bg-physics-500 hover:bg-physics-600 text-white shadow-lg shadow-physics-500/20',
      btnIncomplete: 'border-physics-200 hover:border-physics-500 hover:bg-physics-50/30 text-physics-600 dark:text-physics-400 dark:border-physics-900/50 dark:hover:bg-physics-950/20',
      badge: 'bg-physics-50 dark:bg-physics-950/40 text-physics-600 dark:text-physics-400 border border-physics-100 dark:border-physics-900/50',
      progressDot: 'bg-physics-500'
    },
    biology: {
      color: 'text-biology-500',
      activeText: 'text-biology-600 dark:text-biology-400',
      btnComplete: 'bg-biology-500 hover:bg-biology-600 text-white shadow-lg shadow-biology-500/20',
      btnIncomplete: 'border-biology-200 hover:border-biology-500 hover:bg-biology-50/30 text-biology-600 dark:text-biology-400 dark:border-biology-900/50 dark:hover:bg-biology-950/20',
      badge: 'bg-biology-50 dark:bg-biology-950/40 text-biology-600 dark:text-biology-400 border border-biology-100 dark:border-biology-900/50',
      progressDot: 'bg-biology-500'
    }
  }[lesson.subject];

  // Render correct simulation widget
  const renderSimulation = () => {
    switch (lesson.simulationId) {
      case 'density-sim':
        return <DensitySim />;
      case 'pressure-sim':
        return <PressureSim />;
      case 'liquid-pressure-sim':
        return <LiquidAtmosphericPressureSim />;
      case 'lever-sim':
        return <LeverSim />;
      case 'moment-sim':
        return <MomentSim />;
      case 'electrification-sim':
        return <ElectrificationSim />;
      case 'particles-sim':
        return <ParticlesSim />;
      case 'digestion-sim':
        return <DigestionSim />;
      default:
        // Scratchpad drawing board is loaded as a fallback
        return <Scratchpad />;
    }
  };

  // Find next/prev lessons in subject
  const subjectLessons = Object.values(lessons).filter(l => l.subject === lesson.subject);
  const currentIdx = subjectLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? subjectLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < subjectLessons.length - 1 ? subjectLessons[currentIdx + 1] : null;

  return (
    <>
      <Head>
        <title>{lesson.title} - StudAI</title>
        <meta name="description" content={lesson.summary} />
      </Head>

      {/* Split Screen Container */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        
        {/* LEFT PANEL: Scrollable theory, equations, and exercises (60%) */}
        <div className="flex-1 lg:w-3/5 p-6 sm:p-8 overflow-y-auto space-y-8 border-r border-slate-200/50 dark:border-slate-800/50">
          
          {/* Breadcrumbs navigation */}
          <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-physics-500 flex items-center gap-1">
              <Home className="h-3 w-3" /> Tổng quan
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate max-w-[80px] sm:max-w-none">{chapter?.title}</span>
            <ChevronRight className="h-3 w-3" />
            <span className={subjectThemes.activeText + ' truncate'}>{lesson.title}</span>
          </nav>

          {/* Heading and Completion controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-6">
            <div className="space-y-1">
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${subjectThemes.badge}`}>
                {lesson.subject === 'chemistry' ? 'Hóa Học' : lesson.subject === 'physics' ? 'Vật Lý' : 'Sinh Học'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                {lesson.title}
              </h1>
            </div>

            {/* Complete status Toggle */}
            <button
              onClick={() => toggleComplete(lesson.id)}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isCompleted ? subjectThemes.btnComplete : subjectThemes.btnIncomplete
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-4.5 w-4.5 fill-white text-green-600" />
                  <span>Đã Hoàn Thành</span>
                </>
              ) : (
                <>
                  <Circle className="h-4.5 w-4.5" />
                  <span>Đánh Dấu Hoàn Thành</span>
                </>
              )}
            </button>
          </div>

          {/* Lesson summary box */}
          <div className="bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            <strong className="text-slate-800 dark:text-white block mb-1">Tóm tắt lý thuyết:</strong>
            {lesson.summary}
          </div>

          {/* Formula spotlight section if formula exists */}
          {lesson.formula && (
            <div className={`p-5 rounded-2xl border-2 ${
              lesson.subject === 'chemistry' ? 'border-chemistry-500/20 bg-chemistry-50/10' :
              lesson.subject === 'physics' ? 'border-physics-500/20 bg-physics-50/10' :
              'border-biology-500/20 bg-biology-50/10'
            } space-y-2`}>
              <h3 className={`text-xs font-extrabold uppercase tracking-widest ${subjectThemes.color} flex items-center gap-1.5`}>
                <Award className="h-4.5 w-4.5" /> Trọng tâm công thức cần ghi nhớ
              </h3>
              {(lesson.formulaLatex || lesson.formula).includes('\\') ? (
                <BlockMath math={lesson.formulaLatex || lesson.formula} />
              ) : (
                <div className="text-center font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 my-3 bg-slate-100/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
                  {lesson.formula}
                </div>
              )}
            </div>
          )}

          {/* Main Markdown Body Content */}
          <article className="space-y-4">
            {renderMarkdown(lesson.contentMarkdown)}
          </article>

          {/* Smart Solver calculation panel */}
          {lesson.calculator && (
            <section className="pt-4">
              <SmartCalculator type={lesson.calculator.type} subjectColor={lesson.subject} />
            </section>
          )}

          {/* Flashcard review widget */}
          {lesson.flashcards && lesson.flashcards.length > 0 && (
            <section className="pt-4">
              <FlashcardWidget cards={lesson.flashcards} subjectColor={lesson.subject} />
            </section>
          )}

          {/* Navigation to adjacent lessons */}
          <div className="flex gap-4 border-t border-slate-100 dark:border-slate-850 pt-8 mt-4">
            {prevLesson ? (
              <Link
                href={`/lesson?id=${prevLesson.id}`}
                className="flex-1 flex flex-col p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-physics-500/50 transition-colors text-left gap-1"
              >
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                  <ArrowLeft className="h-3 w-3" /> Bài trước
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{prevLesson.title}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextLesson ? (
              <Link
                href={`/lesson?id=${nextLesson.id}`}
                className="flex-1 flex flex-col p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-physics-500/50 transition-colors text-right gap-1"
              >
                <span className="text-[10px] font-bold text-slate-400 flex items-center justify-end gap-1 uppercase">
                  Bài sau <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{nextLesson.title}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

        </div>

        {/* RIGHT PANEL: Sticky interactive simulator widget / drawing pad (40%) */}
        <div className="lg:w-2/5 p-6 sm:p-8 bg-slate-100/30 dark:bg-slate-950/20 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] overflow-y-auto flex flex-col justify-start gap-4 border-t lg:border-t-0 border-slate-200/50 dark:border-slate-800/50">
          <div className="w-full flex flex-col justify-start">
            {renderSimulation()}
          </div>
        </div>

      </div>
    </>
  );
}
