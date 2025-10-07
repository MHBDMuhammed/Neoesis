'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FillBlanksQuiz as FillBlanksQuizType } from '@/types/quiz';

interface FillBlanksQuizProps {
  quiz: FillBlanksQuizType;
  onSubmit: (answers: Record<string, string>) => void;
  disabled?: boolean;
}

/**
 * FillBlanksQuiz - Boşluk doldurma soruları
 *
 * Özellikler:
 * - {{blank}} placeholder'ları input'lara dönüştürülür
 * - Her blank için ayrı input
 * - Multiple acceptable answers
 * - Case sensitive/insensitive support
 * - Inline display
 */
export function FillBlanksQuiz({ quiz, onSubmit, disabled }: FillBlanksQuizProps) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  // Parse template and create segments
  const segments = React.useMemo(() => {
    const parts: Array<{ type: 'text' | 'blank'; content: string; blankIndex?: number }> =
      [];
    const regex = /\{\{blank\}\}/g;
    let lastIndex = 0;
    let match;
    let blankIndex = 0;

    while ((match = regex.exec(quiz.template)) !== null) {
      // Add text before blank
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: quiz.template.substring(lastIndex, match.index),
        });
      }

      // Add blank
      parts.push({
        type: 'blank',
        content: quiz.blanks[blankIndex]?.id || `blank-${blankIndex}`,
        blankIndex,
      });

      lastIndex = regex.lastIndex;
      blankIndex++;
    }

    // Add remaining text
    if (lastIndex < quiz.template.length) {
      parts.push({
        type: 'text',
        content: quiz.template.substring(lastIndex),
      });
    }

    return parts;
  }, [quiz.template, quiz.blanks]);

  const handleAnswerChange = React.useCallback((blankId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [blankId]: value }));
  }, []);

  const handleSubmit = React.useCallback(() => {
    // Check if all blanks are filled
    const allFilled = quiz.blanks.every((blank) => answers[blank.id]?.trim());
    if (allFilled) {
      onSubmit(answers);
    }
  }, [answers, quiz.blanks, onSubmit]);

  // Check if all blanks filled
  const allFilled = quiz.blanks.every((blank) => answers[blank.id]?.trim());

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-semibold text-foreground">
        {quiz.prompt}
      </div>

      {/* Template with inline inputs */}
      <div className="rounded-lg border bg-muted/30 p-6 text-base leading-relaxed">
        <div className="flex flex-wrap items-center gap-2">
          {segments.map((segment, index) => {
            if (segment.type === 'text') {
              return (
                <span key={index} className="text-foreground">
                  {segment.content}
                </span>
              );
            }

            const blankId = segment.content;

            return (
              <Input
                key={index}
                value={answers[blankId] || ''}
                onChange={(e) => handleAnswerChange(blankId, e.target.value)}
                disabled={disabled}
                placeholder={`Boşluk ${(segment.blankIndex || 0) + 1}`}
                className={cn(
                  'inline-block w-32 border-b-2 border-t-0 border-e-0 border-s-0 rounded-none bg-transparent px-2 py-1 text-center focus-visible:ring-0',
                  answers[blankId]
                    ? 'border-primary font-medium text-primary'
                    : 'border-dashed border-muted-foreground/50'
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Hints */}
      <div className="rounded-md bg-blue-500/10 p-4 text-sm text-blue-600 dark:text-blue-400">
        <p className="font-medium">💡 İpucu:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Her boşluğa uygun kelimeyi yazın</li>
          <li>Büyük/küçük harf duyarlılığına dikkat edin</li>
          <li>Virgül veya nokta gibi noktalama işaretlerini unutmayın</li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!allFilled || disabled}
        className="w-full"
        size="lg"
      >
        Cevabı Gönder ({Object.keys(answers).filter((k) => answers[k]?.trim()).length} /{' '}
        {quiz.blanks.length} boşluk dolduruldu)
      </Button>
    </div>
  );
}
