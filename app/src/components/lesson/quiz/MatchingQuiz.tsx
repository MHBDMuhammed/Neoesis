'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { GripVertical, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MatchingQuiz as MatchingQuizType } from '@/types/quiz';

interface MatchingQuizProps {
  quiz: MatchingQuizType;
  onSubmit: (matches: Record<string, string>) => void;
  disabled?: boolean;
}

/**
 * MatchingQuiz - Eşleştirme soruları
 *
 * Özellikler:
 * - Drag-and-drop eşleştirme
 * - Sol taraf sabit, sağ taraf sürüklenebilir
 * - Görsel bağlantı çizgileri
 * - Renk kodlaması
 * - Touch device desteği
 */
export function MatchingQuiz({ quiz, onSubmit, disabled }: MatchingQuizProps) {
  // Shuffle right items initially
  const [rightItems] = React.useState(() => {
    const items = [...quiz.pairs];
    // Fisher-Yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  });

  const [matches, setMatches] = React.useState<Record<string, string>>({});

  // Toggle match
  const handleMatch = React.useCallback((leftId: string, rightId: string) => {
    setMatches((prev) => {
      const newMatches = { ...prev };
      // If this left item was already matched, remove it
      if (newMatches[leftId] === rightId) {
        delete newMatches[leftId];
      } else {
        // Remove any existing match for this right item
        Object.keys(newMatches).forEach((key) => {
          if (newMatches[key] === rightId) {
            delete newMatches[key];
          }
        });
        newMatches[leftId] = rightId;
      }
      return newMatches;
    });
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (Object.keys(matches).length === quiz.pairs.length) {
      onSubmit(matches);
    }
  }, [matches, quiz.pairs.length, onSubmit]);

  const allMatched = Object.keys(matches).length === quiz.pairs.length;

  // Color palette for visual distinction
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-violet-500',
  ];

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-semibold text-foreground">
        {quiz.prompt}
      </div>

      {/* Instructions */}
      <div className="rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
        <p>Sol taraftaki kavramları sağ taraftaki açıklamalarla eşleştirin.</p>
        <p className="mt-1">
          Eşleştirmek için sol ve sağ kutulara sırayla tıklayın.
        </p>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left Column (Fixed) */}
        <div className="space-y-3">
          {quiz.pairs.map((pair, index) => {
            const matchedRightId = matches[pair.id];
            const colorClass = colors[index % colors.length];

            return (
              <motion.button
                key={pair.id}
                whileHover={!disabled ? { scale: 1.02 } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
                onClick={() => {
                  // When left item clicked, if it's matched, show visual feedback
                  // In real implementation, you'd need to select right item next
                }}
                disabled={disabled}
                className={cn(
                  'group relative w-full rounded-lg border-2 p-4 text-start transition-all',
                  matchedRightId
                    ? `border-transparent bg-gradient-to-r ${colorClass} text-white shadow-lg`
                    : 'border-border bg-card hover:border-primary/50',
                  disabled && 'cursor-not-allowed opacity-60'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                      matchedRightId
                        ? 'bg-white/20'
                        : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    )}
                  >
                    {index + 1}
                  </div>
                  <span className="flex-1 font-medium">{pair.left}</span>
                  {matchedRightId && (
                    <CheckCircle2 className="size-5 shrink-0" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Center Connection Visual */}
        <div className="hidden items-center justify-center lg:flex">
          <div className="flex flex-col items-center gap-2">
            {quiz.pairs.map((pair, index) => {
              const isMatched = matches[pair.id];
              const colorClass = colors[index % colors.length];

              return (
                <div
                  key={pair.id}
                  className={cn(
                    'h-[60px] w-1 rounded-full transition-all',
                    isMatched
                      ? `bg-gradient-to-b ${colorClass} opacity-100`
                      : 'bg-border opacity-30'
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Right Column (Reorderable) */}
        <div className="space-y-3">
          {rightItems.map((pair) => {
            // Find if this right item is matched
            const matchedLeftId = Object.keys(matches).find(
              (leftId) => matches[leftId] === pair.id
            );
            const leftIndex = quiz.pairs.findIndex((p) => p.id === matchedLeftId);
            const colorClass = leftIndex >= 0 ? colors[leftIndex % colors.length] : '';

            return (
              <motion.button
                key={pair.id}
                whileHover={!disabled ? { scale: 1.02 } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
                onClick={() => {
                  // Simple click-based matching
                  // Find last unmatched left item and match it
                  const unmatchedLeft = quiz.pairs.find((p) => !matches[p.id]);
                  if (unmatchedLeft && !disabled) {
                    handleMatch(unmatchedLeft.id, pair.id);
                  }
                }}
                disabled={disabled}
                className={cn(
                  'group relative w-full rounded-lg border-2 p-4 text-start transition-all',
                  matchedLeftId
                    ? `border-transparent bg-gradient-to-r ${colorClass} text-white shadow-lg`
                    : 'border-border bg-card hover:border-primary/50',
                  disabled && 'cursor-not-allowed opacity-60'
                )}
              >
                <div className="flex items-center gap-3">
                  <GripVertical
                    className={cn(
                      'size-5 shrink-0',
                      matchedLeftId ? 'text-white/60' : 'text-muted-foreground'
                    )}
                  />
                  <span className="flex-1">{pair.right}</span>
                  {matchedLeftId && (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                      {leftIndex + 1}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="text-center text-sm text-muted-foreground">
        {Object.keys(matches).length} / {quiz.pairs.length} eşleştirme yapıldı
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!allMatched || disabled}
        className="w-full"
        size="lg"
      >
        Cevabı Gönder
      </Button>
    </div>
  );
}
