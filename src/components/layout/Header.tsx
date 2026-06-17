import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sun, Moon, Search, BookOpen, Compass, Award } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, completedCount, totalCount }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-chemistry-500 via-physics-500 to-biology-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-slate-900 via-physics-600 to-biology-600 dark:from-white dark:via-physics-400 dark:to-biology-400 bg-clip-text text-transparent tracking-tight">
            Stud<span className="text-chemistry-500">AI</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Trigger */}
        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-2 px-4 py-2 w-64 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-400 text-sm hover:border-physics-400 dark:hover:border-physics-500 hover:bg-white dark:hover:bg-slate-950 transition-all shadow-inner"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Tìm kiếm bài học...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Small screen search button */}
        <button
          onClick={onSearchClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-xs font-semibold">
          <Award className="h-4 w-4 text-amber-500" />
          <span className="hidden sm:inline text-slate-600 dark:text-slate-300">Tiến độ:</span>
          <span className="text-physics-600 dark:text-physics-400">{completedCount}/{totalCount}</span>
          <div className="w-16 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ml-1">
            <div 
              className="h-full bg-gradient-to-r from-physics-500 to-chemistry-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all hover:scale-105 active:scale-95"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-indigo-500" />}
        </button>
      </div>
    </header>
  );
};
