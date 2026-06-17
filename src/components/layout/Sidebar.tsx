import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { chapters, lessons, Chapter, Lesson } from '../../utils/db';
import { CheckCircle2, ChevronRight, BookOpen, Layers, HeartPulse, Compass } from 'lucide-react';

interface SidebarProps {
  completedLessons: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ completedLessons }) => {
  const router = useRouter();
  const currentLessonId = router.query.id as string;

  const subjectMeta = {
    chemistry: { title: 'Hóa Học', color: 'text-chemistry-600 dark:text-chemistry-400', bg: 'bg-chemistry-50 dark:bg-chemistry-950/20', border: 'border-chemistry-200 dark:border-chemistry-800/50', icon: Layers },
    physics: { title: 'Vật Lý', color: 'text-physics-600 dark:text-physics-400', bg: 'bg-physics-50 dark:bg-physics-950/20', border: 'border-physics-200 dark:border-physics-800/50', icon: Compass },
    biology: { title: 'Sinh Học', color: 'text-biology-600 dark:text-biology-400', bg: 'bg-biology-50 dark:bg-biology-950/20', border: 'border-biology-200 dark:border-biology-800/50', icon: HeartPulse }
  };

  // Group chapters by subject
  const subjects: ('chemistry' | 'physics' | 'biology')[] = ['chemistry', 'physics', 'biology'];

  return (
    <aside className="w-80 border-r border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/20 overflow-y-auto hidden lg:block h-[calc(100vh-73px)] sticky top-[73px]">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Chương trình KHTN 8</h2>
          <Link href="/" className="text-xs font-medium text-physics-600 dark:text-physics-400 hover:underline">Sơ đồ tổng quan</Link>
        </div>

        {subjects.map(subject => {
          const meta = subjectMeta[subject];
          const SubjectIcon = meta.icon;
          const subjectChapters = Object.values(chapters).filter(c => c.subject === subject);

          return (
            <div key={subject} className="space-y-3">
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${meta.border} ${meta.bg}`}>
                <SubjectIcon className={`h-5 w-5 ${meta.color}`} />
                <span className={`font-bold text-sm ${meta.color}`}>{meta.title}</span>
              </div>

              <div className="pl-2 space-y-4">
                {subjectChapters.map((chap: Chapter) => (
                  <div key={chap.id} className="space-y-1.5">
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 pl-2 pr-1 truncate" title={chap.title}>
                      {chap.title}
                    </h3>
                    <ul className="space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 pl-3">
                      {chap.lessons.map(lessonId => {
                        const lesson = lessons[lessonId];
                        if (!lesson) return null;
                        const isCompleted = completedLessons.includes(lessonId);
                        const isActive = currentLessonId === lessonId;

                        let activeTextClass = '';
                        let hoverBgClass = 'hover:bg-slate-200/50 dark:hover:bg-slate-800/30';

                        if (isActive) {
                          if (subject === 'chemistry') activeTextClass = 'text-chemistry-600 dark:text-chemistry-400 bg-chemistry-50 dark:bg-chemistry-950/30 font-semibold';
                          else if (subject === 'physics') activeTextClass = 'text-physics-600 dark:text-physics-400 bg-physics-50 dark:bg-physics-950/30 font-semibold';
                          else if (subject === 'biology') activeTextClass = 'text-biology-600 dark:text-biology-400 bg-biology-50 dark:bg-biology-950/30 font-semibold';
                        }

                        return (
                          <li key={lessonId}>
                            <Link
                              href={`/lesson?id=${lessonId}`}
                              className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-all ${isActive ? activeTextClass : `text-slate-600 dark:text-slate-300 ${hoverBgClass}`}`}
                            >
                              <span className="truncate pr-2">{lesson.title}</span>
                              <div className="flex-shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 className={`h-4 w-4 ${
                                    subject === 'chemistry' ? 'text-chemistry-500' :
                                    subject === 'physics' ? 'text-physics-500' : 'text-biology-500'
                                  }`} />
                                ) : (
                                  <ChevronRight className="h-3 w-3 opacity-40" />
                                )}
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
