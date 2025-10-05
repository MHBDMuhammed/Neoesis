'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface QuizFeedbackProps {
  isOpen: boolean;
  correct: boolean;
  explanation: string;
  attemptsUsed: number;
  attemptsRemaining: number;
  onTryAgain: () => void;
  onContinue: () => void;
}

export function QuizFeedback({
  isOpen,
  correct,
  explanation,
  attemptsUsed,
  attemptsRemaining,
  onTryAgain,
  onContinue,
}: QuizFeedbackProps) {
  const canRetry = !correct && attemptsRemaining > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onContinue()}>
      <DialogContent
        data-testid="quiz-feedback"
        className="max-w-lg"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={correct ? 'correct' : 'incorrect'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                  className={`flex size-20 items-center justify-center rounded-full ${
                    correct
                      ? 'bg-green-100 dark:bg-green-950'
                      : 'bg-red-100 dark:bg-red-950'
                  }`}
                >
                  {correct ? (
                    <CheckCircle2 className="size-12 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="size-12 text-red-600 dark:text-red-400" />
                  )}
                </motion.div>
              </div>

              <DialogTitle className="text-center text-2xl">
                {correct ? 'Correct!' : 'Not Quite'}
              </DialogTitle>

              <DialogDescription className="text-center text-base">
                {correct
                  ? 'Great job! You got it right.'
                  : canRetry
                    ? `You have ${attemptsRemaining} ${
                        attemptsRemaining === 1 ? 'attempt' : 'attempts'
                      } remaining.`
                    : 'No attempts remaining for this quiz.'}
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-2 font-semibold text-foreground">
                Explanation
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {explanation}
              </p>
            </div>

            {!correct && attemptsUsed < 3 && (
              <div className="mb-4 text-center text-sm text-muted-foreground">
                Attempts used: {attemptsUsed} of 3
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-2">
              {canRetry ? (
                <>
                  <Button
                    variant="outline"
                    onClick={onContinue}
                    className="gap-2"
                  >
                    Continue Anyway
                  </Button>
                  <Button onClick={onTryAgain} className="gap-2">
                    <RotateCcw className="size-4" />
                    Try Again
                  </Button>
                </>
              ) : (
                <Button onClick={onContinue} className="w-full gap-2">
                  {correct ? (
                    <>
                      Continue
                      <ArrowRight className="size-4" />
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              )}
            </DialogFooter>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
