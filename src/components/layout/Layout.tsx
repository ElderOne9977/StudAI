import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { CommandMenu } from './CommandMenu';
import { useApp } from '../../store/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { completedLessons, totalLessonsCount, isSearchOpen, setIsSearchOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Header 
        onSearchClick={() => setIsSearchOpen(true)} 
        completedCount={completedLessons.length}
        totalCount={totalLessonsCount}
      />
      
      <div className="flex-1 flex relative">
        <Sidebar completedLessons={completedLessons} />
        
        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>

      <CommandMenu isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
export default Layout;
