'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FocusModeProps {
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * FocusMode - Tam ekran okuyucu modu
 *
 * Özellikleri:
 * - Yan panelleri gizler (SOL: navigasyon, SAĞ: ilerleme)
 * - Header'ı minimize eder (sadece logo + çıkış butonu)
 * - İçeriği merkeze alır (max-w-4xl)
 * - F11 veya Cmd+Shift+F ile açılır/kapanır
 * - ESC ile kapatılır
 * - localStorage'da durum saklanır
 * - Smooth Framer Motion animasyonları
 * - Toast bildirimi gösterir
 */
export function FocusMode({ isActive, onToggle, children, className }: FocusModeProps) {
  const [showExitHint, setShowExitHint] = React.useState(true);

  // Klavye kısayolu yönetimi
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F11 veya Cmd+Shift+F
      if (
        e.key === 'F11' ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'f')
      ) {
        e.preventDefault();
        onToggle();
      }

      // ESC ile çıkış
      if (e.key === 'Escape' && isActive) {
        onToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onToggle]);

  // Durum değiştiğinde ipucu göster
  React.useEffect(() => {
    if (isActive) {
      setShowExitHint(true);
      const timer = setTimeout(() => setShowExitHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // localStorage'dan durum yükle
  React.useEffect(() => {
    const saved = localStorage.getItem('focusMode');
    if (saved === 'true' && !isActive) {
      onToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // localStorage'a durum kaydet
  React.useEffect(() => {
    localStorage.setItem('focusMode', isActive.toString());
  }, [isActive]);

  if (!isActive) {
    return (
      <div className={className}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="gap-2"
          aria-label="Tam ekran modunu aç"
        >
          <Maximize2 className="size-4" />
          <span className="hidden sm:inline">Odaklanma Modu</span>
        </Button>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'fixed inset-0 z-50 bg-background',
          'flex flex-col',
          className
        )}
      >
        {/* Minimized Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="container flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold">Neosis</span>
              <span className="text-sm text-muted-foreground">
                Odaklanma Modu
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="gap-2"
                aria-label="Tam ekran modundan çık"
              >
                <Minimize2 className="size-4" />
                <span className="hidden sm:inline">Normal Mod</span>
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Centered Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </motion.div>

        {/* Exit Hint Toast */}
        <AnimatePresence>
          {showExitHint && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm shadow-lg">
                <span>
                  <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
                    ESC
                  </kbd>{' '}
                  tuşuna basarak çıkabilirsiniz
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExitHint(false)}
                  className="size-6 p-0"
                  aria-label="İpucunu kapat"
                >
                  <X className="size-3" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
