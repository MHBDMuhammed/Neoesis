'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TrueFalseQuiz as TrueFalseQuizType } from '@/types/quiz';

interface TrueFalseQuizProps {
  quiz: TrueFalseQuizType;
  onSubmit: (answer: boolean) => void;
  disabled?: boolean;
}

/**
 * TrueFalseQuiz - Doğru/Yanlış soruları
 *
 * Özellikler:
 * - Büyük True/False butonları
 * - Görsel geri bildirim (yeşil/kırmızı)
 * - Hover efektleri
 * - Keyboard shortcuts (T/F veya 1/2)
 */
export function TrueFalseQuiz({ quiz, onSubmit, disabled }: TrueFalseQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<boolean | null>(null);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      if (e.key.toLowerCase() === 't' || e.key === '1') {
        setSelectedAnswer(true);
      } else if (e.key.toLowerCase() === 'f' || e.key === '2') {
        setSelectedAnswer(false);
      } else if (e.key === 'Enter' && selectedAnswer !== null) {
        onSubmit(selectedAnswer);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, disabled, onSubmit]);

  const handleSubmit = React.useCallback(() => {
    if (selectedAnswer !== null) {
      onSubmit(selectedAnswer);
    }
  }, [selectedAnswer, onSubmit]);

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-semibold text-foreground">
        {quiz.prompt}
      </div>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* True Button */}
        <motion.button
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          onClick={() => !disabled && setSelectedAnswer(true)}
          disabled={disabled}
          className={cn(
            'group relative flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all',
            selectedAnswer === true
              ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
              : 'border-border bg-card hover:border-green-500/50 hover:bg-green-500/5',
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          <div
            className={cn(
              'flex size-16 items-center justify-center rounded-full transition-all',
              selectedAnswer === true
                ? 'bg-green-500 text-white'
                : 'bg-green-500/10 text-green-500 group-hover:bg-green-500/20'
            )}
          >
            <Check className="size-8" strokeWidth={3} />
          </div>
          <span className="text-xl font-bold">DOĞRU</span>
          <kbd className="absolute bottom-2 right-2 rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
            T / 1
          </kbd>
        </motion.button>

        {/* False Button */}
        <motion.button
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          onClick={() => !disabled && setSelectedAnswer(false)}
          disabled={disabled}
          className={cn(
            'group relative flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all',
            selectedAnswer === false
              ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
              : 'border-border bg-card hover:border-red-500/50 hover:bg-red-500/5',
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          <div
            className={cn(
              'flex size-16 items-center justify-center rounded-full transition-all',
              selectedAnswer === false
                ? 'bg-red-500 text-white'
                : 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20'
            )}
          >
            <X className="size-8" strokeWidth={3} />
          </div>
          <span className="text-xl font-bold">YANLIŞ</span>
          <kbd className="absolute bottom-2 right-2 rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
            F / 2
          </kbd>
        </motion.button>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={selectedAnswer === null || disabled}
        className="w-full"
        size="lg"
      >
        Cevabı Gönder
        {selectedAnswer !== null && (
          <kbd className="ms-2 rounded bg-white/20 px-2 py-0.5 text-xs">
            Enter
          </kbd>
        )}
      </Button>
    </div>
  );
}
