'use client';

import * as React from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { OrderingQuiz as OrderingQuizType } from '@/types/quiz';

interface OrderingQuizProps {
  quiz: OrderingQuizType;
  onSubmit: (order: string[]) => void;
  disabled?: boolean;
}

/**
 * OrderingQuiz - Sıralama soruları
 *
 * Özellikler:
 * - Drag-and-drop sıralama (Framer Motion Reorder)
 * - Görsel sıra numaraları
 * - Smooth reorder animations
 * - Touch device desteği
 * - Shuffle butonu
 */
export function OrderingQuiz({ quiz, onSubmit, disabled }: OrderingQuizProps) {
  // Shuffle items initially
  const [orderedItems, setOrderedItems] = React.useState(() => {
    const items = [...quiz.items];
    // Fisher-Yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  });

  const handleShuffle = React.useCallback(() => {
    const shuffled = [...orderedItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrderedItems(shuffled);
  }, [orderedItems]);

  const handleSubmit = React.useCallback(() => {
    const currentOrder = orderedItems.map((item) => item.id);
    onSubmit(currentOrder);
  }, [orderedItems, onSubmit]);

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg font-semibold text-foreground">
        {quiz.prompt}
      </div>

      {/* Instructions */}
      <div className="flex items-center justify-between rounded-md bg-muted/50 p-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ArrowUpDown className="size-4" />
          <span>Öğeleri doğru sıraya göre sürükleyin</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShuffle}
          disabled={disabled}
          className="gap-2"
        >
          <GripVertical className="size-4" />
          Karıştır
        </Button>
      </div>

      {/* Reorderable List */}
      <Reorder.Group
        axis="y"
        values={orderedItems}
        onReorder={setOrderedItems}
        className="space-y-3"
      >
        {orderedItems.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            disabled={disabled}
            className={cn(
              'group relative cursor-move rounded-lg border-2 bg-card p-4 shadow-sm transition-all',
              'hover:border-primary/50 hover:shadow-md',
              disabled && 'cursor-not-allowed opacity-60'
            )}
            whileDrag={{
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              zIndex: 10,
            }}
          >
            <div className="flex items-center gap-4">
              {/* Drag Handle */}
              <div className="flex items-center gap-3">
                <GripVertical className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />

                {/* Order Number */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-sm font-medium leading-relaxed text-foreground">
                {item.content}
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Submit Button */}
      <Button onClick={handleSubmit} disabled={disabled} className="w-full" size="lg">
        Cevabı Gönder
      </Button>
    </div>
  );
}
