'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/lesson/content';
import type { CodeQuiz } from '@/types/quiz';

interface CodeQuizComponentProps {
  quiz: CodeQuiz;
  onSubmit: (code: string, passed: boolean, score: number) => void;
  disabled?: boolean;
}

interface TestResult {
  description: string;
  passed: boolean;
  error?: string;
}

/**
 * CodeQuizComponent - Kod yazma soruları
 *
 * Özellikler:
 * - Code editor (textarea with syntax highlighting preview)
 * - Run tests butonu
 * - Test sonuçları (passed/failed)
 * - Solution göster/gizle
 * - Reset to starter code
 * - Score calculation
 */
export function CodeQuizComponent({ quiz, onSubmit, disabled }: CodeQuizComponentProps) {
  const [code, setCode] = React.useState(quiz.starterCode);
  const [showSolution, setShowSolution] = React.useState(false);
  const [testResults, setTestResults] = React.useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = React.useState(false);

  const handleReset = React.useCallback(() => {
    setCode(quiz.starterCode);
    setTestResults([]);
    setShowSolution(false);
  }, [quiz.starterCode]);

  const handleRunTests = React.useCallback(async () => {
    setIsRunning(true);
    setTestResults([]);

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results: TestResult[] = [];

    // Run each test
    for (const test of quiz.tests) {
      try {
        // In a real implementation, you would execute the test code safely
        // For now, we'll simulate test results
        const passed = Math.random() > 0.3; // 70% pass rate for demo

        results.push({
          description: test.description,
          passed,
          error: passed ? undefined : 'Test başarısız oldu',
        });
      } catch (error) {
        results.push({
          description: test.description,
          passed: false,
          error: error instanceof Error ? error.message : 'Beklenmeyen hata',
        });
      }
    }

    setTestResults(results);
    setIsRunning(false);

    // Calculate score
    const passedCount = results.filter((r) => r.passed).length;
    const score = (passedCount / results.length) * 100;
    const allPassed = passedCount === results.length;

    // Submit if all tests passed
    if (allPassed) {
      onSubmit(code, true, score);
    }
  }, [code, quiz.tests, onSubmit]);

  const passedTests = testResults.filter((r) => r.passed).length;
  const totalTests = quiz.tests.length;
  const allTestsPassed = passedTests === totalTests && testResults.length > 0;

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-semibold text-foreground">
        {quiz.prompt}
      </div>

      {/* Code Editor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Kodunuzu yazın ({quiz.language.toUpperCase()})
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={disabled}
            >
              <RotateCcw className="size-4" />
            </Button>
            {quiz.solution && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                className="gap-2"
              >
                {showSolution ? (
                  <>
                    <EyeOff className="size-4" />
                    Çözümü Gizle
                  </>
                ) : (
                  <>
                    <Eye className="size-4" />
                    Çözümü Göster
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={disabled}
          className="h-64 w-full rounded-lg border bg-muted/30 p-4 font-mono text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          spellCheck={false}
        />
      </div>

      {/* Solution (if shown) */}
      <AnimatePresence>
        {showSolution && quiz.solution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg border-2 border-green-500/50 bg-green-500/10 p-4">
              <h4 className="mb-3 font-semibold text-green-600 dark:text-green-400">
                💡 Çözüm Kodu
              </h4>
              <CodeBlock language={quiz.language} showLineNumbers>
                {quiz.solution}
              </CodeBlock>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Run Tests Button */}
      <Button
        onClick={handleRunTests}
        disabled={disabled || isRunning}
        className="w-full gap-2"
        size="lg"
      >
        {isRunning ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Testler Çalıştırılıyor...
          </>
        ) : (
          <>
            <Play className="size-4" />
            Testleri Çalıştır ({totalTests} test)
          </>
        )}
      </Button>

      {/* Test Results */}
      <AnimatePresence>
        {testResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <span className="font-semibold">Test Sonuçları</span>
              <span
                className={cn(
                  'font-bold',
                  allTestsPassed ? 'text-green-600' : 'text-orange-600'
                )}
              >
                {passedTests} / {totalTests} geçti
              </span>
            </div>

            {testResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'flex items-start gap-3 rounded-lg border-2 p-4',
                  result.passed
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-red-500/50 bg-red-500/10'
                )}
              >
                {result.passed ? (
                  <CheckCircle2 className="size-5 shrink-0 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="size-5 shrink-0 text-red-600 dark:text-red-400" />
                )}
                <div className="flex-1">
                  <p
                    className={cn(
                      'font-medium',
                      result.passed
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {result.description}
                  </p>
                  {result.error && (
                    <p className="mt-1 text-sm text-red-500">{result.error}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Submit if all tests passed */}
            {allTestsPassed && (
              <Button
                onClick={() => onSubmit(code, true, 100)}
                className="w-full gap-2 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <CheckCircle2 className="size-5" />
                Tüm Testler Geçti - Cevabı Gönder
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
