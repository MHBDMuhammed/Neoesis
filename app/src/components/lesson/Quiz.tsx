'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { HelpCircle, Loader2 } from 'lucide-react';
import { QuizFeedback } from './QuizFeedback';
import { useProgressStore } from '@/lib/progress-store';
import { useLessonProgress } from '@/hooks/use-progress';
import { logEvent } from '@/lib/telemetry';
import type { LessonMeta } from '@/types/lesson';

interface QuizProps {
  lesson: {
    meta: LessonMeta;
    prev?: { meta: LessonMeta } | null;
    next?: { meta: LessonMeta } | null;
  };
}

const MAX_ATTEMPTS = 3;

export function Quiz({ lesson }: QuizProps) {
  const { quiz } = lesson.meta;
  const recordQuizScore = useProgressStore((state) => state.recordQuizScore);
  const lessonProgress = useLessonProgress(lesson.meta.slug);

  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [lastResult, setLastResult] = React.useState<{
    correct: boolean;
    attemptsUsed: number;
  } | null>(null);

  // Get current quiz progress
  const quizScore = lessonProgress?.quizScores[quiz?.id ?? ''];
  const attemptsUsed = quizScore?.attemptsUsed ?? 0;
  const attemptsRemaining = MAX_ATTEMPTS - attemptsUsed;
  const hasCompletedQuiz = quizScore?.correct === true;
  const hasExhaustedAttempts = attemptsUsed >= MAX_ATTEMPTS && !hasCompletedQuiz;

  const handleSubmit = React.useCallback(async () => {
    if (selectedAnswer === null || hasCompletedQuiz || hasExhaustedAttempts) {
      return;
    }

    setIsSubmitting(true);

    // Simulate brief loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const isCorrect = selectedAnswer === quiz?.correctAnswer;
    const newAttemptsUsed = attemptsUsed + 1;

    // Record the quiz score
    if (quiz) {
      recordQuizScore(
        lesson.meta.slug,
        quiz.id,
        isCorrect,
        newAttemptsUsed
      );

      // Log telemetry event
      logEvent('quiz_attempt', {
        lessonSlug: lesson.meta.slug,
        quizId: quiz.id,
        correct: isCorrect,
        attemptsUsed: newAttemptsUsed,
        attemptsRemaining: MAX_ATTEMPTS - newAttemptsUsed
      });
    }

    setLastResult({
      correct: isCorrect,
      attemptsUsed: newAttemptsUsed,
    });

    setShowFeedback(true);
    setIsSubmitting(false);
  }, [
    selectedAnswer,
    hasCompletedQuiz,
    hasExhaustedAttempts,
    quiz,
    lesson.meta.slug,
    attemptsUsed,
    recordQuizScore,
  ]);

  const handleTryAgain = React.useCallback(() => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setLastResult(null);
  }, []);

  const handleContinue = React.useCallback(() => {
    setShowFeedback(false);
  }, []);

  if (!quiz) return null;

  return (
    <>
      <Card
        data-testid="quiz"
        className="border-2 border-primary/20 bg-muted/30"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HelpCircle className="size-5" />
            </div>
            Check Your Understanding
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              {quiz.prompt}
            </h3>

            {/* Options */}
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(parseInt(value, 10))}
              disabled={hasCompletedQuiz || hasExhaustedAttempts || isSubmitting}
              className="space-y-3"
            >
              {quiz.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-all ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  } ${
                    hasCompletedQuiz || hasExhaustedAttempts
                      ? 'opacity-60'
                      : ''
                  }`}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className="shrink-0"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-sm font-medium leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Status and Submit */}
          <div className="space-y-3">
            {/* Attempts indicator */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {hasCompletedQuiz ? (
                  <span className="font-medium text-primary">
                    ✓ Completed
                  </span>
                ) : hasExhaustedAttempts ? (
                  <span className="font-medium text-destructive">
                    No attempts remaining
                  </span>
                ) : (
                  <>
                    Attempts remaining:{' '}
                    <span className="font-semibold text-foreground">
                      {attemptsRemaining} of {MAX_ATTEMPTS}
                    </span>
                  </>
                )}
              </span>
            </div>

            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              disabled={
                selectedAnswer === null ||
                hasCompletedQuiz ||
                hasExhaustedAttempts ||
                isSubmitting
              }
              className="w-full gap-2"
              size="lg"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {hasCompletedQuiz
                ? 'Already Completed'
                : hasExhaustedAttempts
                  ? 'No Attempts Left'
                  : 'Submit Answer'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Dialog */}
      {showFeedback && lastResult && (
        <QuizFeedback
          isOpen={showFeedback}
          correct={lastResult.correct}
          explanation={quiz.explanation}
          attemptsUsed={lastResult.attemptsUsed}
          attemptsRemaining={MAX_ATTEMPTS - lastResult.attemptsUsed}
          onTryAgain={handleTryAgain}
          onContinue={handleContinue}
        />
      )}
    </>
  );
}
