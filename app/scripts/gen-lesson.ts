#!/usr/bin/env tsx
/**
 * Interactive Lesson Generator Script
 * Creates new lesson files with proper metadata and validation
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

interface LessonAnswers {
  slug: string;
  title: string;
  section: string;
  order: number;
  estimatedMinutes: number;
  description: string;
  objectives: string[];
  includeQuiz: boolean;
  animationPreset: string;
  gridLayout: string;
}

interface QuizAnswers {
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const SECTIONS = [
  { id: 'fundamentals', title: 'Fundamentals' },
  { id: 'advanced', title: 'Advanced Topics' },
  { id: 'best-practices', title: 'Best Practices' }
];

const ANIMATION_PRESETS = [
  { name: 'None (no animation)', value: 'none' },
  { name: 'Fade In - Simple opacity fade', value: 'fadeIn' },
  { name: 'Slide Up - Slide up with fade', value: 'slideUp' },
  { name: 'Slide Down - Slide down with fade', value: 'slideDown' },
  { name: 'Slide Right - Slide from left', value: 'slideRight' },
  { name: 'Scale In - Scale up with fade', value: 'scaleIn' },
  { name: 'Stagger Grid - Grid items in sequence', value: 'staggerGrid' },
  { name: 'Parallax Hero - Spring-based animation', value: 'parallaxHero' },
  { name: 'Bounce In - Bouncy entrance', value: 'bounceIn' },
  { name: 'Rotate In - Rotate and scale', value: 'rotateIn' },
  { name: 'Blur In - Opacity and blur', value: 'blurIn' }
];

const GRID_LAYOUTS = [
  { name: 'Default - Single column (prose)', value: 'default' },
  { name: 'Two Column - Equal width columns', value: 'twoColumn' },
  { name: 'Three Column - Equal width columns', value: 'threeColumn' },
  { name: 'Four Column - Equal width columns', value: 'fourColumn' },
  { name: 'Hero Split - Asymmetric 2:1 split', value: 'heroSplit' },
  { name: 'Asymmetric - Asymmetric 1:2 split', value: 'asymmetric' },
  { name: 'Sidebar Layout - Fixed sidebar + fluid', value: 'sidebarLayout' },
  { name: 'Card Grid - Responsive cards', value: 'cardGrid' },
  { name: 'Auto Fit - Auto-fitting columns', value: 'autoFit' },
  { name: 'List Layout - Narrow for readability', value: 'listLayout' },
  { name: 'Wide Content - Full-width content', value: 'wideContent' },
  { name: 'Centered Narrow - Narrow centered', value: 'centeredNarrow' }
];

const LESSONS_DIR = resolve(process.cwd(), 'src/lessons');
const LESSONS_INDEX = join(LESSONS_DIR, 'index.ts');

/**
 * Validates slug format and uniqueness
 */
function validateSlug(slug: string): boolean | string {
  if (!slug) return 'Slug is required';

  // Check format: lowercase, hyphens only
  if (!/^[a-z][a-z0-9-]*[a-z0-9]$/.test(slug)) {
    return 'Slug must be lowercase with hyphens (e.g., intro-to-react)';
  }

  // Check uniqueness by scanning existing lessons
  const indexContent = readFileSync(LESSONS_INDEX, 'utf-8');
  if (indexContent.includes(`'${slug}'`) || indexContent.includes(`"${slug}"`)) {
    return `Slug "${slug}" already exists`;
  }

  return true;
}

/**
 * Validates description length
 */
function validateDescription(desc: string): boolean | string {
  if (!desc) return 'Description is required';
  if (desc.length < 10) return 'Description must be at least 10 characters';
  if (desc.length > 200) return 'Description must be at most 200 characters';
  return true;
}

/**
 * Prompts user for lesson metadata
 */
async function promptLessonMeta(): Promise<LessonAnswers> {
  console.log(chalk.bold.blue('\n📚 Lesson Generator\n'));

  const answers = await inquirer.prompt<LessonAnswers>([
    {
      type: 'input',
      name: 'slug',
      message: 'Lesson slug (lowercase-with-hyphens):',
      validate: validateSlug,
      transformer: (input: string) => input.toLowerCase().trim()
    } as const,
    {
      type: 'input',
      name: 'title',
      message: 'Lesson title:',
      validate: (input: string) => input.length >= 3 || 'Title must be at least 3 characters'
    },
    {
      type: 'list',
      name: 'section',
      message: 'Section:',
      choices: SECTIONS.map(s => ({ name: s.title, value: s.id }))
    },
    {
      type: 'number',
      name: 'order',
      message: 'Order within section (1, 2, 3...):',
      validate: (input: number) => input > 0 || 'Order must be a positive number',
      default: 1
    },
    {
      type: 'number',
      name: 'estimatedMinutes',
      message: 'Estimated reading time (minutes):',
      validate: (input: number) => input > 0 || 'Must be a positive number',
      default: 10
    },
    {
      type: 'input',
      name: 'description',
      message: 'Brief description (10-200 chars):',
      validate: validateDescription
    },
    {
      type: 'input',
      name: 'objectives',
      message: 'Learning objectives (comma-separated, 3-5):',
      validate: (input: string) => {
        const objectives = input.split(',').map(o => o.trim()).filter(Boolean);
        if (objectives.length < 3) return 'Provide at least 3 objectives';
        if (objectives.length > 5) return 'Provide at most 5 objectives';
        return true;
      },
      filter: (input: string) => input.split(',').map(o => o.trim()).filter(Boolean)
    },
    {
      type: 'confirm',
      name: 'includeQuiz',
      message: 'Include quiz?',
      default: true
    }
  ]);

  return answers;
}

/**
 * Prompts user for design options
 */
async function promptDesignOptions(): Promise<{ animationPreset: string; gridLayout: string }> {
  console.log(chalk.bold.blue('\n🎨 Design Options\n'));

  const answers = await inquirer.prompt<{ animationPreset: string; gridLayout: string }>([
    {
      type: 'list',
      name: 'animationPreset',
      message: 'Animation preset:',
      choices: ANIMATION_PRESETS,
      default: 'fadeIn'
    },
    {
      type: 'list',
      name: 'gridLayout',
      message: 'Grid layout:',
      choices: GRID_LAYOUTS,
      default: 'default'
    }
  ]);

  return answers;
}

/**
 * Prompts user for quiz details
 */
async function promptQuizDetails(): Promise<QuizAnswers> {
  console.log(chalk.bold.blue('\n❓ Quiz Setup\n'));

  const answers = await inquirer.prompt<QuizAnswers>([
    {
      type: 'input',
      name: 'prompt',
      message: 'Quiz question:',
      validate: (input: string) => input.length >= 10 || 'Question must be at least 10 characters'
    },
    {
      type: 'input',
      name: 'options',
      message: 'Answer options (comma-separated, 2-5):',
      validate: (input: string) => {
        const options = input.split(',').map(o => o.trim()).filter(Boolean);
        if (options.length < 2) return 'Provide at least 2 options';
        if (options.length > 5) return 'Provide at most 5 options';
        return true;
      },
      filter: (input: string) => input.split(',').map(o => o.trim()).filter(Boolean)
    },
    {
      type: 'number',
      name: 'correctAnswer',
      message: 'Index of correct answer (0-based):',
      validate: (input: number, answers?: Partial<QuizAnswers>) => {
        if (!answers?.options) return 'Options not available';
        if (input < 0 || input >= answers.options.length) {
          return `Must be between 0 and ${answers.options.length - 1}`;
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'explanation',
      message: 'Explanation for correct answer:',
      validate: (input: string) => input.length >= 10 || 'Explanation must be at least 10 characters'
    }
  ]);

  return answers;
}

/**
 * Generates lesson file content
 */
function generateLessonFile(lesson: LessonAnswers, quiz?: QuizAnswers): string {
  const quizSection = quiz ? `
  quiz: {
    id: 'quiz-${lesson.slug}',
    prompt: '${quiz.prompt}',
    type: 'single-choice',
    options: ${JSON.stringify(quiz.options, null, 6)},
    correctAnswer: ${quiz.correctAnswer},
    explanation: '${quiz.explanation}',
    maxAttempts: 3
  }` : '';

  // Determine imports based on selections
  const hasAnimation = lesson.animationPreset !== 'none';
  const hasCustomGrid = lesson.gridLayout !== 'default';

  const imports = [`import type { LessonMeta } from '@/types/lesson';`];
  if (hasAnimation) {
    imports.push(`import { motion } from 'framer-motion';`);
    imports.push(`import { animations } from '@/lib/animation-presets';`);
  }
  if (hasCustomGrid) {
    imports.push(`import { grids } from '@/lib/grid-presets';`);
  }

  // Determine article tag
  const articleTag = hasAnimation ? 'motion.article' : 'article';
  const animationProps = hasAnimation ? ` {...animations.${lesson.animationPreset}}` : '';

  // Determine className
  const className = hasCustomGrid
    ? `className={grids.${lesson.gridLayout}}`
    : `className="prose prose-slate max-w-none"`;

  return `${imports.join('\n')}

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: '${lesson.slug}',
  title: '${lesson.title}',
  order: ${lesson.order},
  section: '${lesson.section}',
  description: '${lesson.description}',
  estimatedMinutes: ${lesson.estimatedMinutes},
  objectives: ${JSON.stringify(lesson.objectives, null, 4)}${quizSection ? ',' + quizSection : ''}
};

// AI:SAFE-EDIT START - Lesson content
export default function ${toPascalCase(lesson.slug)}Lesson() {
  return (
    <${articleTag}${animationProps} ${className}>
      <h1>${lesson.title}</h1>

      <p>
        Welcome to ${lesson.title}. This lesson will cover the key concepts you need to know.
      </p>

      <h2>Overview</h2>
      <p>
        In this lesson, you will learn:
      </p>
      <ul>
${lesson.objectives.map(obj => `        <li>${obj}</li>`).join('\n')}
      </ul>

      <h2>Key Concepts</h2>
      <p>
        Add your lesson content here. Use semantic HTML and code examples to explain the concepts.
      </p>

      <h3>Example Code</h3>
      <pre><code>{\`// Add code examples here
const example = 'Hello World';
console.log(example);
\`}</code></pre>

      <h2>Summary</h2>
      <p>
        You have completed this lesson. Review the key concepts and practice the examples to solidify your understanding.
      </p>
    </${articleTag}>
  );
}
// AI:SAFE-EDIT END
`;
}

/**
 * Converts kebab-case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Gets the next available lesson number
 */
function getNextLessonNumber(): number {
  const indexContent = readFileSync(LESSONS_INDEX, 'utf-8');
  const lessonNumbers = Array.from(indexContent.matchAll(/\.\/(\d+)-/g))
    .map(match => parseInt(match[1], 10))
    .filter(num => !isNaN(num));

  return lessonNumbers.length > 0 ? Math.max(...lessonNumbers) + 1 : 1;
}

/**
 * Updates lessons/index.ts with new lesson import
 */
function updateLessonsIndex(lessonNumber: number, slug: string): void {
  const indexContent = readFileSync(LESSONS_INDEX, 'utf-8');

  // Add import statement after existing imports
  const importStatement = `import * as Lesson${String(lessonNumber).padStart(2, '0')}${toPascalCase(slug)} from './${String(lessonNumber).padStart(2, '0')}-${slug}';`;
  const importInsertionPoint = indexContent.indexOf('const lessonModules:');

  if (importInsertionPoint === -1) {
    throw new Error('Could not find lessonModules definition in index.ts');
  }

  // Insert import before lessonModules
  const beforeImports = indexContent.slice(0, importInsertionPoint);
  const afterImports = indexContent.slice(importInsertionPoint);

  const updatedBefore = beforeImports.trimEnd() + '\n' + importStatement + '\n\n';

  // Add to lessonModules object
  const moduleEntry = `  './${String(lessonNumber).padStart(2, '0')}-${slug}.tsx': Lesson${String(lessonNumber).padStart(2, '0')}${toPascalCase(slug)}`;
  const modulesObjectMatch = afterImports.match(/const lessonModules:.*?{([^}]*?)}/s);

  if (!modulesObjectMatch) {
    throw new Error('Could not parse lessonModules object');
  }

  const existingEntries = modulesObjectMatch[1].trim();
  const newModulesObject = `const lessonModules: Record<string, { meta: LessonMeta; default: React.ComponentType }> = {
${existingEntries ? existingEntries + ',\n' : ''}${moduleEntry}
};`;

  const updatedContent = updatedBefore + afterImports.replace(
    /const lessonModules:.*?{[^}]*?}/s,
    newModulesObject
  );

  writeFileSync(LESSONS_INDEX, updatedContent, 'utf-8');
}

/**
 * Main execution
 */
async function main() {
  try {
    // Verify lessons directory exists
    if (!existsSync(LESSONS_DIR)) {
      console.error(chalk.red('✗ Error: src/lessons directory not found'));
      process.exit(1);
    }

    // Prompt for lesson metadata
    const lessonMeta = await promptLessonMeta();

    // Prompt for design options
    const designOptions = await promptDesignOptions();

    // Combine lesson metadata and design options
    const lesson: LessonAnswers = {
      ...lessonMeta,
      ...designOptions
    };

    // Optionally prompt for quiz
    let quiz: QuizAnswers | undefined;
    if (lesson.includeQuiz) {
      quiz = await promptQuizDetails();
    }

    // Generate lesson file
    const lessonNumber = getNextLessonNumber();
    const fileName = `${String(lessonNumber).padStart(2, '0')}-${lesson.slug}.tsx`;
    const filePath = join(LESSONS_DIR, fileName);

    // Check if file already exists
    if (existsSync(filePath)) {
      console.error(chalk.red(`✗ Error: File ${fileName} already exists`));
      process.exit(1);
    }

    // Write lesson file
    const fileContent = generateLessonFile(lesson, quiz);
    writeFileSync(filePath, fileContent, 'utf-8');

    // Update index.ts
    updateLessonsIndex(lessonNumber, lesson.slug);

    // Success message
    console.log(chalk.green('\n✓ Lesson created successfully!\n'));
    console.log(chalk.bold('File:'), chalk.cyan(filePath));
    console.log(chalk.bold('Slug:'), chalk.cyan(lesson.slug));
    console.log(chalk.bold('URL:'), chalk.cyan(`/lesson/${lesson.slug}`));

    console.log(chalk.yellow('\n📝 Next steps:'));
    console.log(chalk.dim('  1. Edit the lesson content in'), chalk.cyan(fileName));
    console.log(chalk.dim('  2. Run'), chalk.cyan('pnpm dev'), chalk.dim('to preview'));
    console.log(chalk.dim('  3. Navigate to'), chalk.cyan(`http://localhost:3000/lesson/${lesson.slug}`));
    console.log(chalk.dim('  4. Run'), chalk.cyan('pnpm test'), chalk.dim('to verify tests pass\n'));

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('\n✗ Error:'), error.message);
    } else {
      console.error(chalk.red('\n✗ Unknown error occurred'));
    }
    process.exit(1);
  }
}

main();
