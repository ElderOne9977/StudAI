import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardWidgetProps {
  cards: Flashcard[];
  subjectColor: 'chemistry' | 'physics' | 'biology';
}

export const FlashcardWidget: React.FC<FlashcardWidgetProps> = ({ cards, subjectColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Reset index and flip status when cards change to prevent index out of bounds
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const colorStyles = {
    chemistry: {
      btn: 'bg-chemistry-600 hover:bg-chemistry-700 text-white',
      accent: 'text-chemistry-500',
      border: 'border-chemistry-100 dark:border-chemistry-900/50',
      badge: 'bg-chemistry-50 dark:bg-chemistry-950/40 text-chemistry-600 dark:text-chemistry-400'
    },
    physics: {
      btn: 'bg-physics-600 hover:bg-physics-700 text-white',
      accent: 'text-physics-500',
      border: 'border-physics-100 dark:border-physics-900/50',
      badge: 'bg-physics-50 dark:bg-physics-950/40 text-physics-600 dark:text-physics-400'
    },
    biology: {
      btn: 'bg-biology-600 hover:bg-biology-700 text-white',
      accent: 'text-biology-500',
      border: 'border-biology-100 dark:border-biology-900/50',
      badge: 'bg-biology-50 dark:bg-biology-950/40 text-biology-600 dark:text-biology-400'
    }
  }[subjectColor];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
          <HelpCircle className={`h-4 w-4 ${colorStyles.accent}`} />
          Thẻ ghi nhớ (Flashcards ôn tập)
        </h4>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colorStyles.badge}`}>
          Thẻ {currentIndex + 1} / {cards.length}
        </span>
      </div>

      {/* Card 3D Flip Container wrapper */}
      <div className="w-full h-44 overflow-hidden relative rounded-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div 
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="w-full h-full cursor-pointer select-none perspective"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div 
              className={`relative w-full h-full duration-550 transform-style transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
            >
              {/* Front Side */}
              <div className={`absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-slate-900 rounded-2xl border ${colorStyles.border} p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow`}>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  Câu hỏi
                </div>
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 text-center my-auto px-4">
                  {currentCard.question}
                </p>
                <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <RefreshCw className="h-3 w-3" /> Click để xem đáp án
                </div>
              </div>

              {/* Back Side */}
              <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed ${colorStyles.border} p-6 flex flex-col justify-between shadow-inner`}>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Đáp án lý thuyết
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-350 text-center my-auto px-2 leading-relaxed">
                  {currentCard.answer}
                </p>
                <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <RefreshCw className="h-3 w-3" /> Click để xem lại câu hỏi
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav Controls */}
      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          className="flex-1 flex items-center justify-center py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-xs font-semibold"
        >
          <ChevronLeft className="h-4 w-4 mr-0.5" /> Trước
        </button>
        <button
          onClick={handleNext}
          className={`flex-1 flex items-center justify-center py-2 rounded-xl transition-all text-xs font-semibold ${colorStyles.btn}`}
        >
          Tiếp theo <ChevronRight className="h-4 w-4 ml-0.5" />
        </button>
      </div>

      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
export default FlashcardWidget;
