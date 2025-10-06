/**
 * Lesson Content Components
 *
 * Enhanced components for creating rich, interactive lesson content.
 * All components support dark mode, animations, and responsive design.
 */

// Callout - Highlight important information
export { Callout } from './Callout';
export type { CalloutProps } from './Callout';

// CodeBlock - Syntax-highlighted code with copy button
export { CodeBlock } from './CodeBlock';
export type { CodeBlockProps } from './CodeBlock';

// KeyConcepts - Card-based key term definitions
export { KeyConcepts, KeyConcept } from './KeyConcepts';
export type { KeyConceptsProps, KeyConceptProps } from './KeyConcepts';

// StepGuide - Numbered step-by-step instructions
export { StepGuide, Step } from './StepGuide';
export type { StepGuideProps, StepProps } from './StepGuide';

// Tabs - Tabbed content for code examples
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs';

// Accordion - Collapsible content sections
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './Accordion';

// Figure - Images with captions
export { Figure } from './Figure';
export type { FigureProps } from './Figure';

// ComparisonTable - Side-by-side comparisons
export { ComparisonTable } from './ComparisonTable';
export type { ComparisonTableProps, ComparisonColumn } from './ComparisonTable';
