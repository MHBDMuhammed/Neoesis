'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { TrueFalseQuiz } from './TrueFalseQuiz';
import { FillBlanksQuiz } from './FillBlanksQuiz';
import { MatchingQuiz } from './MatchingQuiz';
import { OrderingQuiz } from './OrderingQuiz';
import { CodeQuizComponent } from './CodeQuizComponent';
import { QuizFeedback } from './QuizFeedback';
import { useProgressStore } from '@/lib/progress-store';
import { useLessonProgress } from '@/hooks/use-progress';
import type { Quiz } from '@/types/quiz';
import type { LessonMeta } from '@/types/lesson';

interface UnifiedQuizProps {
  quiz: Quiz;
  lessonSlug: string;
  lessonMeta: LessonMeta;
}

const MAX_ATTEMPTS = 3;

/**
 * UnifiedQuiz - Tüm quiz tiplerini destekleyen unified component
 *
 * Desteklenen tipler:
 * - Multiple Choice (existing, will be migrated)
 * - True/False
 * - Fill in the Blanks
 * - Code Quiz
 * - Matching
 * - Ordering
 */
export function UnifiedQuiz({ quiz, lessonSlug }: UnifiedQuizProps) {
  const recordQuizScore = useProgressStore((state) => state.recordQuizScore);
  const lessonProgress = useLessonProgress(lessonSlug);

  const [showFeedback, setShowFeedback] = React.useState(false);
  const [lastResult, setLastResult] = React.useState<{
    correct: boolean;
    score: number;
    attemptsUsed: number;
  } | null>(null);
  const [hintShown, setHintShown] = React.useState(false);

  // Get current quiz progress
  const quizScore = lessonProgress?.quizScores[quiz.id];
  const attemptsUsed = quizScore?.attemptsUsed ?? 0;
  const attemptsRemaining = MAX_ATTEMPTS - attemptsUsed;
  const hasCompletedQuiz = quizScore?.correct === true;
  const hasExhaustedAttempts = attemptsUsed >= MAX_ATTEMPTS && !hasCompletedQuiz;

  // Generic submit handler for all quiz types
  const handleSubmit = React.useCallback(
    (isCorrect: boolean, customScore?: number) => {
      if (hasCompletedQuiz || hasExhaustedAttempts) return;

      const newAttemptsUsed = attemptsUsed + 1;
      let finalScore = customScore ?? (isCorrect ? 100 : 0);

      // Deduct points if hint was used
      if (hintShown && isCorrect) {
        finalScore = Math.max(finalScore - 20, 0);
      }

      // Record the quiz score
      recordQuizScore(lessonSlug, quiz.id, isCorrect, newAttemptsUsed);

      setLastResult({
        correct: isCorrect,
        score: finalScore,
        attemptsUsed: newAttemptsUsed,
      });

      setShowFeedback(true);
    },
    [
      attemptsUsed,
      hasCompletedQuiz,
      hasExhaustedAttempts,
      hintShown,
      lessonSlug,
      quiz.id,
      recordQuizScore,
    ]
  );

  // Type-specific submit handlers
  const handleTrueFalseSubmit = React.useCallback(
    (answer: boolean) => {
      const isCorrect =
        quiz.type === 'true-false' && answer === quiz.correctAnswer;
      handleSubmit(isCorrect);
    },
    [quiz, handleSubmit]
  );

  const handleFillBlanksSubmit = React.useCallback(
    (answers: Record<string, string>) => {
      if (quiz.type !== 'fill-blanks') return;

      // Check each blank
      let correctCount = 0;
      quiz.blanks.forEach((blank) => {
        const userAnswer = answers[blank.id]?.trim();
        const isCorrect = blank.correctAnswers.some((correct) => {
          if (blank.caseSensitive) {
            return userAnswer === correct;
          }
          return userAnswer?.toLowerCase() === correct.toLowerCase();
        });

        if (isCorrect) correctCount++;
      });

      const score = (correctCount / quiz.blanks.length) * 100;
      const allCorrect = correctCount === quiz.blanks.length;
      handleSubmit(allCorrect, score);
    },
    [quiz, handleSubmit]
  );

  const handleMatchingSubmit = React.useCallback(
    (matches: Record<string, string>) => {
      if (quiz.type !== 'matching') return;

      // Check if all matches are correct
      let correctCount = 0;
      quiz.pairs.forEach((pair) => {
        if (matches[pair.id] === pair.id) correctCount++;
      });

      const score = (correctCount / quiz.pairs.length) * 100;
      const allCorrect = correctCount === quiz.pairs.length;
      handleSubmit(allCorrect, score);
    },
    [quiz, handleSubmit]
  );

  const handleOrderingSubmit = React.useCallback(
    (order: string[]) => {
      if (quiz.type !== 'ordering') return;

      // Check if order matches correct order
      const isCorrect =
        JSON.stringify(order) === JSON.stringify(quiz.correctOrder);
      handleSubmit(isCorrect);
    },
    [quiz, handleSubmit]
  );

  const handleCodeQuizSubmit = React.useCallback(
    (code: string, passed: boolean, score: number) => {
      handleSubmit(passed, score);
    },
    [handleSubmit]
  );

  const handleTryAgain = React.useCallback(() => {
    setShowFeedback(false);
    setLastResult(null);
  }, []);

  const handleContinue = React.useCallback(() => {
    setShowFeedback(false);
  }, []);

  const handleShowHint = React.useCallback(() => {
    setHintShown(true);
    setShowFeedback(false);
  }, []);

  const isDisabled = hasCompletedQuiz || hasExhaustedAttempts;

  return (
    <>
      <Card
        data-testid="unified-quiz"
        className="border-2 border-primary/20 bg-muted/30"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HelpCircle className="size-5" />
            </div>
            Anlayışınızı Kontrol Edin
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quiz Type Badge */}
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {quiz.type === 'true-false' && 'Doğru/Yanlış'}
              {quiz.type === 'fill-blanks' && 'Boşluk Doldurma'}
              {quiz.type === 'matching' && 'Eşleştirme'}
              {quiz.type === 'ordering' && 'Sıralama'}
              {quiz.type === 'code' && 'Kod Yazma'}
            </span>

            {/* Attempts indicator */}
            <span className="text-sm text-muted-foreground">
              {hasCompletedQuiz ? (
                <span className="font-medium text-primary">✓ Tamamlandı</span>
              ) : hasExhaustedAttempts ? (
                <span className="font-medium text-destructive">
                  Deneme hakkı kalmadı
                </span>
              ) : (
                <>
                  Kalan deneme:{' '}
                  <span className="font-semibold text-foreground">
                    {attemptsRemaining} / {MAX_ATTEMPTS}
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Hint (if shown) */}
          {hintShown && quiz.hint && (
            <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                💡 İpucu: {quiz.hint}
              </p>
              <p className="mt-1 text-xs text-yellow-600/70 dark:text-yellow-400/70">
                Not: İpucu kullandığınız için skorunuzdan puan kesilecek
              </p>
            </div>
          )}

          {/* Render appropriate quiz type */}
          {quiz.type === 'true-false' && (
            <TrueFalseQuiz
              quiz={quiz}
              onSubmit={handleTrueFalseSubmit}
              disabled={isDisabled}
            />
          )}

          {quiz.type === 'fill-blanks' && (
            <FillBlanksQuiz
              quiz={quiz}
              onSubmit={handleFillBlanksSubmit}
              disabled={isDisabled}
            />
          )}

          {quiz.type === 'matching' && (
            <MatchingQuiz
              quiz={quiz}
              onSubmit={handleMatchingSubmit}
              disabled={isDisabled}
            />
          )}

          {quiz.type === 'ordering' && (
            <OrderingQuiz
              quiz={quiz}
              onSubmit={handleOrderingSubmit}
              disabled={isDisabled}
            />
          )}

          {quiz.type === 'code' && (
            <CodeQuizComponent
              quiz={quiz}
              onSubmit={handleCodeQuizSubmit}
              disabled={isDisabled}
            />
          )}
        </CardContent>
      </Card>

      {/* Enhanced Feedback */}
      {showFeedback && lastResult && (
        <QuizFeedback
          isOpen={showFeedback}
          correct={lastResult.correct}
          explanation={quiz.explanation}
          attemptsUsed={lastResult.attemptsUsed}
          attemptsRemaining={MAX_ATTEMPTS - lastResult.attemptsUsed}
          score={lastResult.score}
          hintUsed={hintShown}
          relatedSections={quiz.relatedSections}
          onTryAgain={attemptsRemaining > 1 ? handleTryAgain : undefined}
          onContinue={handleContinue}
          onShowHint={
            !lastResult.correct && !hintShown && quiz.hint ? handleShowHint : undefined
          }
        />
      )}
    </>
  );
}
