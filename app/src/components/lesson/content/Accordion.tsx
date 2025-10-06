'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Accordion as AccordionPrimitive,
  AccordionContent as AccordionContentPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
} from '@/components/ui/accordion';

export interface AccordionProps {
  /**
   * Allow multiple items to be open at once
   * @default false
   */
  type?: 'single' | 'multiple';
  /**
   * Allow all items to be collapsed
   * @default true
   */
  collapsible?: boolean;
  /**
   * Accordion items
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Accordion container for collapsible content sections
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>What is React?</AccordionTrigger>
 *     <AccordionContent>
 *       React is a JavaScript library for building user interfaces.
 *     </AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>What is JSX?</AccordionTrigger>
 *     <AccordionContent>
 *       JSX is a syntax extension for JavaScript that looks like HTML.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export function Accordion({
  type = 'single',
  collapsible = true,
  children,
  className,
}: AccordionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('not-prose my-6', className)}
    >
      {type === 'single' ? (
        <AccordionPrimitive
          type="single"
          collapsible={collapsible}
          className="w-full"
        >
          {children}
        </AccordionPrimitive>
      ) : (
        <AccordionPrimitive type="multiple" className="w-full">
          {children}
        </AccordionPrimitive>
      )}
    </motion.div>
  );
}

export interface AccordionItemProps {
  /**
   * Unique value for this accordion item
   */
  value: string;
  /**
   * Content including AccordionTrigger and AccordionContent
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Individual accordion item
 */
export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <AccordionItemPrimitive value={value} className={className}>
      {children}
    </AccordionItemPrimitive>
  );
}

export interface AccordionTriggerProps {
  /**
   * Title/header text
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Trigger button for accordion item
 */
export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  return (
    <AccordionTriggerPrimitive className={className}>
      {children}
    </AccordionTriggerPrimitive>
  );
}

export interface AccordionContentProps {
  /**
   * Content to display when expanded
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Content panel for accordion item
 */
export function AccordionContent({ children, className }: AccordionContentProps) {
  return (
    <AccordionContentPrimitive className={cn('text-sm', className)}>
      {children}
    </AccordionContentPrimitive>
  );
}
