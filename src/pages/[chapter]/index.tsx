import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApp } from '../../store/AppContext';
import { chapters, lessons } from '../../utils/db';
import { ChevronRight, Home, CheckCircle2, Circle, ArrowLeft, BookOpen } from 'lucide-react';

export default function ChapterPage() {
  const router = useRouter();
  const { chapter: chapterQuery } = router.query;
  const { completedLessons } = useApp();

  const chapterId = chapterQuery as string;
  const chapter = chapters[chapterId];

  if (!router.isReady) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-physics-500 border-t-transparent" />
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Không tìm thấy chương này</h1>
        <p className="text-xs text-slate-400">Chương bạn đang tìm kiếm không tồn tại hoặc đã bị thay đổi.</p>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-physics-500 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const subjectMeta = {
    chemistry: { title: 'Hóa Học', badge: 'bg-chemistry-50 dark:bg-chemistry-950/40 text-chemistry-600 dark:text-chemistry-400 border-chemistry-100 dark:border-chemistry-900/50', border: 'border-chemistry-500/20', color: 'text-chemistry-500' },
    physics: { title: 'Vật Lý', badge: 'bg-physics-50 dark:bg-physics-950/40 text-physics-600 dark:text-physics-400 border-physics-100 dark:border-physics-900/50', border: 'border-physics-500/20', color: 'text-physics-500' },
    biology: { title: 'Sinh Học', badge: 'bg-biology-50 dark:bg-biology-950/40 text-biology-600 dark:text-biology-400 border-biology-100 dark:border-biology-900/50', border: 'border-biology-500/20', color: 'text-biology-500' }
  }[chapter.subject];

  const chapterLessons = chapter.lessons.map(id => lessons[id]).filter(Boolean);
  const completedCount = chapterLessons.filter(l => completedLessons.includes(l.id)).length;
  const percent = chapterLessons.length > 0 ? Math.round((completedCount / chapterLessons.length) * 100) : 0;

  return (
    <>
      <Head>
        <title>{chapter.title} - StudAI</title>
      </Head>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-physics-500 flex items-center gap-1">
            <Home className="h-3 w-3" /> Tổng quan
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-500">{subjectMeta.title}</span>
          <ChevronRight className="h-3 w-3" />
          <span className={subjectMeta.color}>{chapter.title}</span>
        </nav>

        {/* Header Header */}
        <div className={`p-8 rounded-3xl border bg-slate-900 text-white relative overflow-hidden shadow-xl`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${subjectMeta.badge}`}>
              {subjectMeta.title}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">{chapter.title}</h1>
            
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-medium">
                Tiến độ học tập chương: {completedCount}/{chapterLessons.length} bài đã học
              </span>
              <div className="flex items-center gap-3 w-full sm:w-48">
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-physics-500 transition-all duration-500" style={{ width: `${percent}%`, backgroundColor: chapter.subject === 'chemistry' ? '#16b355' : chapter.subject === 'physics' ? '#0e95e9' : '#f27c13' }} />
                </div>
                <span className="text-xs font-mono font-bold text-slate-300">{percent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Danh sách bài học trong chương</h2>
          
          <div className="grid grid-cols-1 gap-3">
            {chapterLessons.map((l) => {
              const isCompleted = completedLessons.includes(l.id);
              return (
                <Link
                  key={l.id}
                  href={`/lesson?id=${l.id}`}
                  className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-physics-500/50 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className={`h-5 w-5 ${chapter.subject === 'chemistry' ? 'text-chemistry-500' : chapter.subject === 'physics' ? 'text-physics-500' : 'text-biology-500'}`} />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300 dark:text-slate-700" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-physics-500 dark:group-hover:text-physics-400 transition-colors">
                        {l.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{l.summary}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 font-bold text-xs"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại trang chủ
          </Link>
        </div>

      </div>
    </>
  );
}
