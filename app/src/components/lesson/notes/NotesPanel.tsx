'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StickyNote,
  Plus,
  Trash2,
  Download,
  Highlighter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Note {
  id: string;
  content: string;
  color: 'yellow' | 'green' | 'blue' | 'pink' | 'purple';
  createdAt: string;
  updatedAt: string;
  lessonSlug: string;
  highlightedText?: string;
}

interface NotesPanelProps {
  lessonSlug: string;
  className?: string;
}

const COLOR_MAP = {
  yellow: 'bg-yellow-100 border-yellow-300 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-100',
  green: 'bg-green-100 border-green-300 text-green-900 dark:bg-green-900/20 dark:border-green-700 dark:text-green-100',
  blue: 'bg-blue-100 border-blue-300 text-blue-900 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-100',
  pink: 'bg-pink-100 border-pink-300 text-pink-900 dark:bg-pink-900/20 dark:border-pink-700 dark:text-pink-100',
  purple: 'bg-purple-100 border-purple-300 text-purple-900 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-100',
};

/**
 * NotesPanel - Not alma paneli
 *
 * Özellikler:
 * - Not oluşturma/düzenleme/silme
 * - Renk kodlaması (5 renk)
 * - Metin vurgulama desteği
 * - Otomatik kaydetme (localStorage)
 * - Markdown export
 * - Zaman damgası
 */
export function NotesPanel({ lessonSlug, className }: NotesPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editContent, setEditContent] = React.useState('');

  // Load notes from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem(`notes-${lessonSlug}`);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        // Ignore invalid data
      }
    }
  }, [lessonSlug]);

  // Save notes to localStorage
  React.useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`notes-${lessonSlug}`, JSON.stringify(notes));
    }
  }, [notes, lessonSlug]);

  const handleAddNote = React.useCallback((color: Note['color'] = 'yellow') => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: '',
      color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lessonSlug,
    };
    setNotes((prev) => [newNote, ...prev]);
    setEditingId(newNote.id);
    setEditContent('');
  }, [lessonSlug]);

  const handleUpdateNote = React.useCallback((id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, content, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }, []);

  const handleDeleteNote = React.useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditContent('');
    }
  }, [editingId]);

  const handleSaveEdit = React.useCallback(() => {
    if (editingId && editContent.trim()) {
      handleUpdateNote(editingId, editContent);
    }
    setEditingId(null);
    setEditContent('');
  }, [editingId, editContent, handleUpdateNote]);

  const handleExportMarkdown = React.useCallback(() => {
    const markdown = notes
      .map((note) => {
        const date = new Date(note.createdAt).toLocaleDateString('tr-TR');
        return `## Not - ${date}\n\n${note.content}\n\n${note.highlightedText ? `> ${note.highlightedText}\n\n` : ''}---\n`;
      })
      .join('\n');

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lessonSlug}-notlar.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [notes, lessonSlug]);

  return (
    <div className={cn('relative', className)}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
        aria-label="Notlarımı aç"
      >
        <StickyNote className="size-4" />
        <span className="hidden sm:inline">Notlarım</span>
        {notes.length > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {notes.length}
          </span>
        )}
      </Button>

      {/* Notes Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 end-0 z-50 w-full max-w-md border-s bg-background shadow-2xl sm:max-w-lg"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <div className="flex items-center gap-2">
                    <StickyNote className="size-5 text-primary" />
                    <h2 className="text-lg font-semibold">Notlarım</h2>
                    <span className="text-sm text-muted-foreground">
                      ({notes.length})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {notes.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleExportMarkdown}
                        className="gap-2"
                      >
                        <Download className="size-4" />
                        Export
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="border-b px-6 py-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Yeni Not Ekle
                  </p>
                  <div className="flex gap-2">
                    {(['yellow', 'green', 'blue', 'pink', 'purple'] as const).map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() => handleAddNote(color)}
                          className={cn(
                            'group flex size-10 items-center justify-center rounded-lg border-2 transition-all hover:scale-110',
                            COLOR_MAP[color]
                          )}
                          aria-label={`${color} renkte not ekle`}
                        >
                          <Plus className="size-5 opacity-60 group-hover:opacity-100" />
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto p-6">
                  {notes.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                      <StickyNote className="mb-4 size-12 opacity-20" />
                      <p className="text-sm">Henüz not yok</p>
                      <p className="mt-1 text-xs">
                        Yukarıdaki renklerden birine tıklayarak başlayın
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notes.map((note, index) => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            'group relative rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md',
                            COLOR_MAP[note.color]
                          )}
                        >
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="absolute end-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Notu sil"
                          >
                            <Trash2 className="size-4" />
                          </button>

                          {/* Highlighted Text (if any) */}
                          {note.highlightedText && (
                            <div className="mb-3 flex items-start gap-2 border-s-2 border-current ps-3 text-xs opacity-75">
                              <Highlighter className="size-3 shrink-0" />
                              <span className="italic">"{note.highlightedText}"</span>
                            </div>
                          )}

                          {/* Content */}
                          {editingId === note.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="Notunuzu yazın..."
                                className="w-full resize-none rounded bg-white/50 p-2 text-sm outline-none dark:bg-black/20"
                                rows={4}
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={handleSaveEdit}
                                  className="flex-1"
                                >
                                  Kaydet
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditContent('');
                                  }}
                                >
                                  İptal
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingId(note.id);
                                setEditContent(note.content);
                              }}
                              className="cursor-pointer"
                            >
                              {note.content ? (
                                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                  {note.content}
                                </p>
                              ) : (
                                <p className="text-sm italic opacity-50">
                                  Tıklayarak not ekleyin...
                                </p>
                              )}
                            </div>
                          )}

                          {/* Timestamp */}
                          <div className="mt-3 text-xs opacity-60">
                            {new Date(note.updatedAt).toLocaleString('tr-TR', {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
