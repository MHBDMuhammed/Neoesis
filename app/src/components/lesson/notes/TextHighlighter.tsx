'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlighter, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Highlight {
  id: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'pink' | 'purple';
  position: { start: number; end: number };
  createdAt: string;
}

interface TextHighlighterProps {
  contentRef: React.RefObject<HTMLElement | null>;
  lessonSlug: string;
  onCreateNote?: (text: string, color: Highlight['color']) => void;
}

const HIGHLIGHT_COLORS = {
  yellow: 'bg-yellow-200/60 dark:bg-yellow-500/30',
  green: 'bg-green-200/60 dark:bg-green-500/30',
  blue: 'bg-blue-200/60 dark:bg-blue-500/30',
  pink: 'bg-pink-200/60 dark:bg-pink-500/30',
  purple: 'bg-purple-200/60 dark:bg-purple-500/30',
};

/**
 * TextHighlighter - Metin vurgulama bileşeni
 *
 * Özellikler:
 * - Metni seçip vurgulama
 * - 5 renk seçeneği
 * - Context menu
 * - Not oluşturma entegrasyonu
 * - localStorage'da saklanır
 * - Vurguları render eder
 */
export function TextHighlighter({
  contentRef,
  lessonSlug,
  onCreateNote,
}: TextHighlighterProps) {
  const [highlights, setHighlights] = React.useState<Highlight[]>([]);
  const [menuPosition, setMenuPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedText, setSelectedText] = React.useState('');

  // Load highlights from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem(`highlights-${lessonSlug}`);
    if (saved) {
      try {
        setHighlights(JSON.parse(saved));
      } catch {
        // Ignore
      }
    }
  }, [lessonSlug]);

  // Save highlights to localStorage
  React.useEffect(() => {
    if (highlights.length > 0) {
      localStorage.setItem(`highlights-${lessonSlug}`, JSON.stringify(highlights));
    }
  }, [highlights, lessonSlug]);

  // Handle text selection
  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setMenuPosition(null);
        return;
      }

      const text = selection.toString().trim();
      if (!text || text.length < 3) {
        setMenuPosition(null);
        return;
      }

      // Check if selection is within content
      if (contentRef.current && contentRef.current.contains(selection.anchorNode)) {
        setSelectedText(text);
        setMenuPosition({
          x: e.clientX,
          y: e.clientY - 60, // Position above cursor
        });
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [contentRef]);

  // Close menu on click outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setMenuPosition(null);
    };

    if (menuPosition) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuPosition]);

  const handleAddHighlight = React.useCallback(
    (color: Highlight['color']) => {
      if (!selectedText) return;

      const newHighlight: Highlight = {
        id: Date.now().toString(),
        text: selectedText,
        color,
        position: { start: 0, end: 0 }, // Simplified - in real app, calculate actual position
        createdAt: new Date().toISOString(),
      };

      setHighlights((prev) => [...prev, newHighlight]);
      setMenuPosition(null);
      setSelectedText('');

      // Clear selection
      window.getSelection()?.removeAllRanges();
    },
    [selectedText]
  );

  const handleAddNote = React.useCallback(
    (color: Highlight['color']) => {
      if (selectedText && onCreateNote) {
        onCreateNote(selectedText, color);
        handleAddHighlight(color);
      }
    },
    [selectedText, onCreateNote, handleAddHighlight]
  );

  return (
    <>
      {/* Context Menu */}
      <AnimatePresence>
        {menuPosition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{
              position: 'fixed',
              left: menuPosition.x,
              top: menuPosition.y,
            }}
            className="z-50 rounded-lg border bg-card p-2 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              {/* Highlight Section */}
              <div>
                <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                  <Highlighter className="me-1 inline size-3" />
                  Vurgula
                </p>
                <div className="flex gap-1">
                  {(['yellow', 'green', 'blue', 'pink', 'purple'] as const).map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => handleAddHighlight(color)}
                        className={cn(
                          'size-8 rounded border-2 border-transparent transition-all hover:scale-110 hover:border-white',
                          HIGHLIGHT_COLORS[color]
                        )}
                        aria-label={`${color} ile vurgula`}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Add Note Section */}
              {onCreateNote && (
                <div className="border-t pt-2">
                  <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                    <Plus className="me-1 inline size-3" />
                    Not Ekle
                  </p>
                  <div className="flex gap-1">
                    {(['yellow', 'green', 'blue', 'pink', 'purple'] as const).map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() => handleAddNote(color)}
                          className={cn(
                            'flex size-8 items-center justify-center rounded border-2 border-transparent transition-all hover:scale-110 hover:border-white',
                            HIGHLIGHT_COLORS[color]
                          )}
                          aria-label={`${color} not ekle`}
                        >
                          <Plus className="size-4" />
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual feedback for highlights (simplified - in real app, would wrap actual text) */}
      {highlights.length > 0 && (
        <div className="fixed bottom-4 end-4 z-40 rounded-lg border bg-card p-3 text-xs shadow-lg">
          <p className="font-medium">
            {highlights.length} metin vurgulandı
          </p>
        </div>
      )}
    </>
  );
}
