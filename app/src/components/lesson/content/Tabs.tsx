'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Tabs as TabsPrimitive,
  TabsContent as TabsContentPrimitive,
  TabsList as TabsListPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
} from '@/components/ui/tabs';

export interface TabsProps {
  /**
   * Default active tab value
   */
  defaultValue: string;
  /**
   * Tab panels
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Tabs container for organizing content into switchable panels
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="jsx">
 *   <TabsList>
 *     <TabsTrigger value="jsx">JSX</TabsTrigger>
 *     <TabsTrigger value="js">JavaScript</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="jsx">
 *     <CodeBlock language="tsx">
 *       {`function App() { return <div>Hello</div> }`}
 *     </CodeBlock>
 *   </TabsContent>
 *   <TabsContent value="js">
 *     <CodeBlock language="js">
 *       {`function App() { return React.createElement('div', null, 'Hello') }`}
 *     </CodeBlock>
 *   </TabsContent>
 * </Tabs>
 * ```
 */
export function Tabs({ defaultValue, children, className }: TabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('not-prose my-6', className)}
    >
      <TabsPrimitive defaultValue={defaultValue} className="w-full">
        {children}
      </TabsPrimitive>
    </motion.div>
  );
}

export interface TabsListProps {
  /**
   * Tab trigger buttons
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Container for tab trigger buttons
 */
export function TabsList({ children, className }: TabsListProps) {
  return (
    <TabsListPrimitive className={cn('mb-4', className)}>
      {children}
    </TabsListPrimitive>
  );
}

export interface TabsTriggerProps {
  /**
   * Value that identifies this tab
   */
  value: string;
  /**
   * Label for the tab
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Button that triggers a tab panel
 */
export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  return (
    <TabsTriggerPrimitive value={value} className={className}>
      {children}
    </TabsTriggerPrimitive>
  );
}

export interface TabsContentProps {
  /**
   * Value that identifies this tab panel
   */
  value: string;
  /**
   * Content of the tab panel
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Content panel for a tab
 */
export function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <TabsContentPrimitive value={value} className={cn('mt-0', className)}>
      {children}
    </TabsContentPrimitive>
  );
}
