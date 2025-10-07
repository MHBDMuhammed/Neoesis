'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  TrendingUp,
  RotateCcw,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface EnhancedQuizFeedbackProps {
  isOpen: boolean;
  correct: boolean;
  explanation: string;
  attemptsUsed: number;
  attemptsRemaining: number;
  score: number; // 0-100
  hintUsed?: boolean;
  relatedSections?: string[];
  onTryAgain?: () => void;
  onContinue: () => void;
  onShowHint?: () => void;
}

/**
 * EnhancedQuizFeedback - Gelişmiş quiz geri bildirimi
 *
 * Özellikler:
 * - Confetti animasyonu (doğru cevap)
 * - Shake animasyonu (yanlış cevap)
 * - Detaylı açıklama
 * - İlgili bölüm linkleri
 * - İpucu sistemi
 * - Skor gösterimi
 * - Motivasyonel mesajlar
 */
export function EnhancedQuizFeedback({
  isOpen,
  correct,
  explanation,
  attemptsUsed,
  attemptsRemaining,
  score,
  hintUsed = false,
  relatedSections = [],
  onTryAgain,
  onContinue,
  onShowHint,
}: EnhancedQuizFeedbackProps) {
  const [showConfetti, setShowConfetti] = React.useState(false);

  // Trigger confetti on correct answer
  React.useEffect(() => {
    if (isOpen && correct) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, correct]);

  // Motivational messages based on score
  const getMotivationalMessage = () => {
    if (score === 100) return '🎉 Mükemmel! Konuyu tam olarak anlamışsınız!';
    if (score >= 80) return '👏 Harika! Çok iyi bir performans!';
    if (score >= 60) return '👍 İyi! Gelişmeye devam ediyorsunuz!';
    if (score >= 40) return '💪 Kötü değil! Biraz daha çalışmalısınız!';
    return '📚 Endişelenmeyin! Konuyu tekrar gözden geçirin!';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Confetti */}
          {showConfetti && <ConfettiEffect />}

          {/* Feedback Dialog */}
          <motion.div
            initial={correct ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 0, x: -10 }}
            animate={
              correct
                ? { opacity: 1, scale: 1, y: 0 }
                : {
                    opacity: 1,
                    x: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }
            }
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 z-50 flex items-center justify-center"
          >
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl border-2 bg-card shadow-2xl">
              {/* Header */}
              <div
                className={cn(
                  'p-8',
                  correct
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'bg-gradient-to-br from-red-500 to-orange-600'
                )}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: correct ? 360 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    {correct ? (
                      <CheckCircle2 className="size-10 text-white" strokeWidth={2.5} />
                    ) : (
                      <XCircle className="size-10 text-white" strokeWidth={2.5} />
                    )}
                  </motion.div>

                  <div className="flex-1 text-white">
                    <h2 className="text-3xl font-bold">
                      {correct ? 'Doğru Cevap!' : 'Yanlış Cevap'}
                    </h2>
                    <p className="mt-1 text-lg opacity-90">
                      {correct
                        ? getMotivationalMessage()
                        : `${attemptsRemaining} deneme hakkınız kaldı`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-[60vh] overflow-y-auto p-8">
                <div className="space-y-6">
                  {/* Score Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-muted-foreground">Skorunuz</span>
                      <span className="flex items-center gap-2 font-bold text-primary">
                        <TrendingUp className="size-4" />
                        %{score}
                      </span>
                    </div>
                    <Progress value={score} className="h-3" />
                  </div>

                  {/* Explanation */}
                  <div className="rounded-lg border bg-muted/30 p-6">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                      <Sparkles className="size-5 text-primary" />
                      {correct ? 'Neden Doğru?' : 'Neden Yanlış?'}
                    </h3>
                    <p className="leading-relaxed text-foreground">{explanation}</p>
                  </div>

                  {/* Hint Used Warning */}
                  {hintUsed && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm"
                    >
                      <div className="flex items-center gap-2 font-medium text-yellow-600 dark:text-yellow-400">
                        <Lightbulb className="size-4" />
                        İpucu kullandınız
                      </div>
                      <p className="mt-1 text-yellow-600/80 dark:text-yellow-400/80">
                        Skorunuzdan puan kesildi
                      </p>
                    </motion.div>
                  )}

                  {/* Related Sections */}
                  {relatedSections.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <BookOpen className="size-4" />
                        İlgili Konular
                      </h4>
                      <div className="space-y-2">
                        {relatedSections.map((section, index) => (
                          <button
                            key={index}
                            className="flex w-full items-center justify-between rounded-lg border bg-card p-3 text-start transition-colors hover:border-primary hover:bg-primary/5"
                          >
                            <span className="text-sm font-medium">{section}</span>
                            <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attempts Info */}
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4 text-sm">
                    <span className="text-muted-foreground">Kullanılan Deneme:</span>
                    <span className="font-semibold text-foreground">
                      {attemptsUsed} / {attemptsUsed + attemptsRemaining}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* Show Hint (if available and incorrect) */}
                  {!correct && onShowHint && attemptsRemaining > 0 && (
                    <Button
                      variant="outline"
                      onClick={onShowHint}
                      className="gap-2"
                      size="lg"
                    >
                      <Lightbulb className="size-4" />
                      İpucu Göster
                    </Button>
                  )}

                  {/* Try Again */}
                  {!correct && onTryAgain && attemptsRemaining > 0 && (
                    <Button
                      variant="outline"
                      onClick={onTryAgain}
                      className="flex-1 gap-2"
                      size="lg"
                    >
                      <RotateCcw className="size-4" />
                      Tekrar Dene
                    </Button>
                  )}

                  {/* Continue */}
                  <Button onClick={onContinue} className="flex-1 gap-2" size="lg">
                    {correct ? 'Devam Et' : attemptsRemaining === 0 ? 'Tamam' : 'Kapat'}
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Confetti Effect Component
 */
function ConfettiEffect() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotate: Math.random() * 360,
    color: [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
    ][Math.floor(Math.random() * 6)],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: piece.rotate,
            opacity: 0,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
          className={cn('absolute h-3 w-3 rounded-sm', piece.color)}
        />
      ))}
    </div>
  );
}
