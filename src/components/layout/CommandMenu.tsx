import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Search, Compass, X, AlertCircle } from 'lucide-react';
import { lessons, Lesson } from '../../utils/db';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Lesson[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle outside click to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Auto focus input
      setTimeout(() => inputRef.current?.focus(), 100);
      // Disable background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle hotkeys (Ctrl+K, Esc, Arrow keys, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateToLesson(results[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Simple search engine
  useEffect(() => {
    if (!query.trim()) {
      // Show default/recent/some lessons
      setResults(Object.values(lessons).slice(0, 5));
      setSelectedIndex(0);
      return;
    }

    const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const filtered = Object.values(lessons).filter((lesson) => {
      const titleClean = lesson.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const summaryClean = lesson.summary.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const markdownClean = lesson.contentMarkdown.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      return (
        titleClean.includes(cleanQuery) ||
        summaryClean.includes(cleanQuery) ||
        markdownClean.includes(cleanQuery)
      );
    });

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const navigateToLesson = (id: string) => {
    router.push(`/lesson?id=${id}`);
    onClose();
  };

  if (!isOpen) return null;

  const subjectBadges = {
    chemistry: 'bg-chemistry-100 text-chemistry-700 dark:bg-chemistry-950/40 dark:text-chemistry-400 border border-chemistry-200/50 dark:border-chemistry-800/40',
    physics: 'bg-physics-100 text-physics-700 dark:bg-physics-950/40 dark:text-physics-400 border border-physics-200/50 dark:border-physics-800/40',
    biology: 'bg-biology-100 text-biology-700 dark:bg-biology-950/40 dark:text-biology-400 border border-biology-200/50 dark:border-biology-800/40'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm transition-opacity">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[500px] transform scale-100 transition-transform"
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm"
            placeholder="Tìm kiếm định nghĩa, công thức hoặc bài học... (Ví dụ: Đòn bẩy)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                {query.trim() ? `Kết quả tìm thấy (${results.length})` : 'Gợi ý bài học tiêu biểu'}
              </div>
              {results.map((lesson, idx) => {
                const isSelected = idx === selectedIndex;
                const badgeStyle = subjectBadges[lesson.subject];
                
                let activeItemStyle = 'bg-slate-50 dark:bg-slate-800/30';
                if (isSelected) {
                  if (lesson.subject === 'chemistry') activeItemStyle = 'bg-chemistry-50 dark:bg-chemistry-950/20 border border-chemistry-100 dark:border-chemistry-900/40';
                  else if (lesson.subject === 'physics') activeItemStyle = 'bg-physics-50 dark:bg-physics-950/20 border border-physics-100 dark:border-physics-900/40';
                  else if (lesson.subject === 'biology') activeItemStyle = 'bg-biology-50 dark:bg-biology-950/20 border border-biology-100 dark:border-biology-900/40';
                } else {
                  activeItemStyle = 'border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/20';
                }

                return (
                  <div
                    key={lesson.id}
                    className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all ${activeItemStyle}`}
                    onClick={() => navigateToLesson(lesson.id)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                          {lesson.title}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${badgeStyle}`}>
                          {lesson.subject === 'chemistry' ? 'Hóa học' : lesson.subject === 'physics' ? 'Vật lý' : 'Sinh học'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {lesson.summary}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hidden sm:inline flex-shrink-0 self-center">
                        Nhấn Enter ↵
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-slate-400">
              <AlertCircle className="h-8 w-8 text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Không tìm thấy kết quả nào</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Hãy thử gõ từ khóa khác như "Mol", "Áp suất", "Cơ thể người"</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex gap-3">
            <span><kbd className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[10px]">↑↓</kbd> để di chuyển</span>
            <span><kbd className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[10px]">Enter</kbd> để chọn</span>
          </div>
          <span><kbd className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[10px]">Esc</kbd> để đóng</span>
        </div>
      </div>
    </div>
  );
};
