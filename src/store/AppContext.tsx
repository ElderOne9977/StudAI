import React, { createContext, useContext, useState, useEffect } from 'react';
import { lessons } from '../utils/db';
import confetti from 'canvas-confetti';

interface AppContextType {
  completedLessons: string[];
  toggleComplete: (id: string) => void;
  isCompleted: (id: string) => boolean;
  totalLessonsCount: number;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const totalLessonsCount = Object.keys(lessons).length;

  useEffect(() => {
    const saved = localStorage.getItem('completed-lessons');
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse completed lessons', e);
      }
    }
  }, []);

  const toggleComplete = (id: string) => {
    setCompletedLessons((prev) => {
      let updated;
      const isAlreadyCompleted = prev.includes(id);
      if (isAlreadyCompleted) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
        // Celebrate completion!
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#0ea5e9', '#f97316']
        });
      }
      localStorage.setItem('completed-lessons', JSON.stringify(updated));
      return updated;
    });
  };

  const isCompleted = (id: string) => completedLessons.includes(id);

  // Command Menu Ctrl+K / Cmd+K keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        completedLessons,
        toggleComplete,
        isCompleted,
        totalLessonsCount,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
