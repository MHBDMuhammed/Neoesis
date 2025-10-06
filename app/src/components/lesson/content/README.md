# Lesson Content Components

A comprehensive set of React components designed to create engaging, interactive, and visually rich learning experiences in the Neosis platform.

## Overview

These components transform plain text lessons into dynamic, engaging content with:

✨ **Visual Variety** - 8+ component types for diverse content presentation
🎨 **Beautiful Design** - Modern, professional styling with OKLCH colors
🌓 **Dark Mode** - Full support with proper contrast ratios
📱 **Responsive** - Mobile-first design that works on all devices
♿ **Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
⚡ **Animated** - Smooth Framer Motion animations for polish
🎯 **TypeScript** - Full type safety with strict mode

## Components

### 1. Callout

Highlight important information with colored boxes.

**Variants:** `info`, `warning`, `success`, `error`, `tip`

```tsx
import { Callout } from '@/components/lesson/content';

<Callout type="info" title="Did you know?">
  React uses a virtual DOM for efficient updates.
</Callout>

<Callout type="warning">
  This approach may cause performance issues in production.
</Callout>
```

**Props:**
- `type`: Callout variant (required)
- `title?`: Optional heading
- `children`: Content to display
- `icon?`: Custom icon override
- `className?`: Additional CSS classes

---

### 2. CodeBlock

Syntax-highlighted code with copy button and line numbers.

```tsx
import { CodeBlock } from '@/components/lesson/content';

<CodeBlock
  language="tsx"
  filename="App.tsx"
  highlightLines={[3, 5]}
  showLineNumbers
>
{`function App() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
}`}
</CodeBlock>
```

**Props:**
- `children`: Code string (required)
- `language?`: Programming language (default: `'typescript'`)
- `filename?`: Optional filename in header
- `highlightLines?`: Array of line numbers to highlight
- `showLineNumbers?`: Show line numbers (default: `true`)
- `className?`: Additional CSS classes

**Supported Languages:**
TypeScript, JavaScript, JSX, TSX, Python, Bash, CSS, HTML, JSON, Markdown, and more (via prism-react-renderer)

---

### 3. KeyConcepts & KeyConcept

Display key terms and definitions in a card-based grid.

```tsx
import { KeyConcepts, KeyConcept } from '@/components/lesson/content';

<KeyConcepts title="Core React Concepts">
  <KeyConcept term="Component">
    Reusable UI building blocks that can accept props and manage state
  </KeyConcept>
  <KeyConcept term="Props">
    Data passed from parent to child components
  </KeyConcept>
  <KeyConcept term="State">
    Internal component data that triggers re-renders when changed
  </KeyConcept>
</KeyConcepts>
```

**KeyConcepts Props:**
- `title?`: Section title (default: `'Key Concepts'`)
- `children`: KeyConcept components
- `className?`: Additional CSS classes

**KeyConcept Props:**
- `term`: The term/concept name (required)
- `children`: Definition/explanation (required)
- `className?`: Additional CSS classes

---

### 4. StepGuide & Step

Numbered step-by-step instructions with connecting line.

```tsx
import { StepGuide, Step } from '@/components/lesson/content';
import { CodeBlock } from '@/components/lesson/content';

<StepGuide title="Getting Started with React">
  <Step number={1} title="Create Project">
    <CodeBlock language="bash">
      npx create-react-app my-app
    </CodeBlock>
  </Step>
  <Step number={2} title="Start Dev Server">
    <CodeBlock language="bash">
      cd my-app && npm start
    </CodeBlock>
  </Step>
  <Step number={3} title="Open Browser">
    Navigate to http://localhost:3000 to see your app
  </Step>
</StepGuide>
```

**StepGuide Props:**
- `title?`: Guide title (default: `'Step-by-Step Guide'`)
- `children`: Step components
- `className?`: Additional CSS classes

**Step Props:**
- `number`: Step number (required)
- `title`: Step title (required)
- `children`: Step content (required)
- `className?`: Additional CSS classes

---

### 5. Tabs

Organize content into switchable tabs (great for code examples in different languages).

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/lesson/content';
import { CodeBlock } from '@/components/lesson/content';

<Tabs defaultValue="jsx">
  <TabsList>
    <TabsTrigger value="jsx">JSX</TabsTrigger>
    <TabsTrigger value="js">JavaScript</TabsTrigger>
    <TabsTrigger value="ts">TypeScript</TabsTrigger>
  </TabsList>

  <TabsContent value="jsx">
    <CodeBlock language="tsx">
      {`function Welcome() {
        return <h1>Hello, React!</h1>;
      }`}
    </CodeBlock>
  </TabsContent>

  <TabsContent value="js">
    <CodeBlock language="js">
      {`function Welcome() {
        return React.createElement('h1', null, 'Hello, React!');
      }`}
    </CodeBlock>
  </TabsContent>

  <TabsContent value="ts">
    <CodeBlock language="typescript">
      {`function Welcome(): JSX.Element {
        return <h1>Hello, React!</h1>;
      }`}
    </CodeBlock>
  </TabsContent>
</Tabs>
```

**Tabs Props:**
- `defaultValue`: Initially active tab value (required)
- `children`: TabsList and TabsContent components
- `className?`: Additional CSS classes

---

### 6. Accordion

Collapsible content sections (great for FAQs or optional details).

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/lesson/content';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is React?</AccordionTrigger>
    <AccordionContent>
      React is a JavaScript library for building user interfaces.
      It was created by Facebook and is maintained by Meta.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>What is JSX?</AccordionTrigger>
    <AccordionContent>
      JSX is a syntax extension for JavaScript that looks like HTML.
      It makes writing React components more intuitive.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Accordion Props:**
- `type?`: `'single'` or `'multiple'` (default: `'single'`)
- `collapsible?`: Allow all items to collapse (default: `true`)
- `children`: AccordionItem components
- `className?`: Additional CSS classes

---

### 7. Figure

Display images with optional captions.

```tsx
import { Figure } from '@/components/lesson/content';

<Figure
  src="/images/react-component-tree.png"
  alt="React component tree diagram"
  caption="Figure 1: React component hierarchy showing parent-child relationships"
  width={800}
  height={600}
/>

{/* Or use fill mode for responsive images */}
<Figure
  src="/images/hero.jpg"
  alt="Hero image"
  fill
  className="aspect-video"
/>
```

**Props:**
- `src`: Image URL (required)
- `alt`: Alt text for accessibility (required)
- `caption?`: Optional caption text
- `width?`: Image width (for static images)
- `height?`: Image height (for static images)
- `fill?`: Use fill mode for responsive images (default: `false`)
- `className?`: Additional CSS classes

---

### 8. ComparisonTable

Side-by-side comparisons with support for text, booleans (✓/✗), or custom content.

```tsx
import { ComparisonTable } from '@/components/lesson/content';

<ComparisonTable
  title="Class vs Function Components"
  rowLabels={['Syntax', 'State', 'Lifecycle', 'Performance']}
  columns={[
    {
      header: 'Class Components',
      rows: [
        'Uses class syntax',
        'this.state',
        'Lifecycle methods',
        'Slightly slower'
      ]
    },
    {
      header: 'Function Components',
      rows: [
        'Uses function syntax',
        'useState hook',
        'useEffect hook',
        'Faster'
      ]
    }
  ]}
/>

{/* Or use booleans for feature comparison */}
<ComparisonTable
  title="Feature Support"
  rowLabels={['Hooks', 'Suspense', 'Concurrent Mode', 'Server Components']}
  columns={[
    {
      header: 'React 17',
      rows: [true, false, false, false]
    },
    {
      header: 'React 18',
      rows: [true, true, true, false]
    },
    {
      header: 'React 19',
      rows: [true, true, true, true]
    }
  ]}
/>
```

**Props:**
- `columns`: Array of column data (required)
- `title?`: Optional table title
- `rowLabels?`: Optional array of row labels
- `className?`: Additional CSS classes

---

## Usage in Lessons

### Basic Example

```tsx
import type { LessonMeta } from '@/types/lesson';
import {
  Callout,
  CodeBlock,
  KeyConcepts,
  KeyConcept,
} from '@/components/lesson/content';

export const meta: LessonMeta = {
  // ... meta configuration
};

export default function MyLesson() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>React Hooks</h1>

      <Callout type="info" title="New in React 16.8">
        Hooks let you use state and other React features without writing a class.
      </Callout>

      <p>
        Hooks are functions that let you "hook into" React state and lifecycle
        features from function components.
      </p>

      <KeyConcepts>
        <KeyConcept term="useState">
          A Hook that lets you add state to function components
        </KeyConcept>
        <KeyConcept term="useEffect">
          A Hook that lets you perform side effects in function components
        </KeyConcept>
      </KeyConcepts>

      <h2>useState Example</h2>

      <CodeBlock language="tsx" filename="Counter.tsx" highlightLines={[2, 5]}>
{`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
      </CodeBlock>

      <Callout type="success">
        Now you know how to use the useState Hook!
      </Callout>
    </article>
  );
}
```

---

## Design Principles

### 1. Composition Over Configuration

Components are designed to be composable rather than having many props:

```tsx
// ✅ Good - composable
<KeyConcepts>
  <KeyConcept term="X">...</KeyConcept>
  <KeyConcept term="Y">...</KeyConcept>
</KeyConcepts>

// ❌ Bad - too many props
<KeyConcepts items={[{term: 'X', def: '...'}, {term: 'Y', def: '...'}]} />
```

### 2. TypeScript-First

All components have full TypeScript support with explicit types and JSDoc comments.

### 3. Accessibility-First

- Proper ARIA attributes
- Semantic HTML
- Keyboard navigation
- Screen reader support
- WCAG 2.1 AA compliant

### 4. Animation-Ready

All components use Framer Motion for smooth entrance animations that enhance UX without being distracting.

### 5. Dark Mode Support

All components automatically adapt to light/dark mode with proper contrast ratios.

---

## Best Practices

### Do's ✅

- Use `Callout` to highlight important information
- Use `CodeBlock` for all code examples (with syntax highlighting)
- Use `KeyConcepts` to introduce new terminology
- Use `StepGuide` for sequential instructions
- Use `Tabs` for alternative implementations
- Use `Accordion` for optional/advanced content
- Use `Figure` for all images with descriptive captions
- Use `ComparisonTable` for feature comparisons

### Don'ts ❌

- Don't use plain `<pre><code>` tags (use `CodeBlock` instead)
- Don't use plain `<img>` tags (use `Figure` instead)
- Don't nest complex layouts inside components
- Don't override component styles unless necessary
- Don't use the components outside of lesson content

---

## Technical Details

### Dependencies

- `framer-motion` - Animations
- `prism-react-renderer` - Code syntax highlighting
- `lucide-react` - Icons
- `@radix-ui/react-tabs` - Accessible tabs primitive
- `@radix-ui/react-accordion` - Accessible accordion primitive
- `next/image` - Optimized images

### Styling

Components use:
- **Tailwind CSS v4** (logical properties: `ps`, `pe`, `ms`, `me`)
- **Design tokens** from `@/lib/design-tokens.ts`
- **CSS variables** for theme colors
- **OKLCH color space** for consistent colors

### Performance

- All components are optimized for performance
- Images use Next.js `Image` component for automatic optimization
- Code highlighting is client-side for fast SSR
- Animations use GPU-accelerated transforms

---

## Troubleshooting

### Component not appearing

Make sure you've imported from the correct path:

```tsx
import { Callout } from '@/components/lesson/content';
```

### TypeScript errors

Ensure you're passing required props:

```tsx
// ❌ Missing required props
<Callout>Content</Callout>

// ✅ Correct
<Callout type="info">Content</Callout>
```

### Animations not working

Make sure parent has `not-prose` class if inside prose:

```tsx
<div className="not-prose">
  <Callout type="info">...</Callout>
</div>
```

---

## Contributing

When adding new content components:

1. Follow the existing patterns
2. Add full TypeScript types
3. Include JSDoc comments with examples
4. Support dark mode
5. Add Framer Motion animations
6. Test accessibility with screen readers
7. Export from `index.ts`
8. Update this README

---

## License

MIT - Part of the Neosis project
