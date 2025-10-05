#!/usr/bin/env tsx
/**
 * Interactive Lesson Reordering Script
 * Safely reorders lessons within sections
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

interface LessonInfo {
  fileName: string;
  filePath: string;
  slug: string;
  title: string;
  section: string;
  order: number;
}

interface SectionGroup {
  id: string;
  title: string;
  lessons: LessonInfo[];
}

const LESSONS_DIR = resolve(process.cwd(), 'src/lessons');

// Section definitions (must match curriculum.ts)
const SECTIONS = [
  { id: 'fundamentals', title: 'Fundamentals' },
  { id: 'advanced', title: 'Advanced Topics' },
  { id: 'best-practices', title: 'Best Practices' }
];

/**
 * Extracts lesson metadata from file content
 */
function extractLessonMeta(content: string, fileName: string): Partial<LessonInfo> {
  const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const sectionMatch = content.match(/section:\s*['"]([^'"]+)['"]/);
  const orderMatch = content.match(/order:\s*(\d+)/);

  if (!slugMatch || !titleMatch || !sectionMatch || !orderMatch) {
    throw new Error(`Failed to parse metadata from ${fileName}`);
  }

  return {
    slug: slugMatch[1],
    title: titleMatch[1],
    section: sectionMatch[1],
    order: parseInt(orderMatch[1], 10)
  };
}

/**
 * Scans lessons directory and builds section groups
 */
function scanLessons(): SectionGroup[] {
  const files = readdirSync(LESSONS_DIR).filter(f => f.endsWith('.tsx') && f !== 'index.ts');
  const lessonsBySection = new Map<string, LessonInfo[]>();

  for (const fileName of files) {
    const filePath = join(LESSONS_DIR, fileName);
    const content = readFileSync(filePath, 'utf-8');

    try {
      const meta = extractLessonMeta(content, fileName);
      const lessonInfo: LessonInfo = {
        fileName,
        filePath,
        slug: meta.slug!,
        title: meta.title!,
        section: meta.section!,
        order: meta.order!
      };

      const sectionLessons = lessonsBySection.get(lessonInfo.section) || [];
      sectionLessons.push(lessonInfo);
      lessonsBySection.set(lessonInfo.section, sectionLessons);
    } catch (error) {
      console.warn(chalk.yellow(`⚠ Warning: Skipping ${fileName} - ${error}`));
    }
  }

  // Sort lessons by order within each section
  for (const lessons of lessonsBySection.values()) {
    lessons.sort((a, b) => a.order - b.order);
  }

  // Build section groups
  return SECTIONS.map(section => ({
    id: section.id,
    title: section.title,
    lessons: lessonsBySection.get(section.id) || []
  })).filter(group => group.lessons.length > 0);
}

/**
 * Prompts user to select a section
 */
async function selectSection(sectionGroups: SectionGroup[]): Promise<SectionGroup> {
  const { selectedSection } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedSection',
      message: 'Which section would you like to reorder?',
      choices: sectionGroups.map(g => ({
        name: `${g.title} (${g.lessons.length} lessons)`,
        value: g.id
      }))
    }
  ]);

  return sectionGroups.find(g => g.id === selectedSection)!;
}

/**
 * Prompts user to select lesson to move and new position
 */
async function selectReorder(sectionGroup: SectionGroup): Promise<{ lessonIndex: number; newOrder: number } | null> {
  console.log(chalk.bold.blue(`\n📚 Current order in "${sectionGroup.title}":\n`));
  sectionGroup.lessons.forEach((lesson) => {
    console.log(chalk.dim(`  ${lesson.order}.`), chalk.cyan(lesson.title), chalk.dim(`(${lesson.slug})`));
  });
  console.log('');

  const { lessonToMove } = await inquirer.prompt([
    {
      type: 'list',
      name: 'lessonToMove',
      message: 'Which lesson do you want to move?',
      choices: [
        ...sectionGroup.lessons.map((lesson, index) => ({
          name: `${lesson.order}. ${lesson.title}`,
          value: index
        })),
        { name: chalk.dim('Cancel'), value: -1 }
      ]
    }
  ]);

  if (lessonToMove === -1) {
    return null;
  }

  const currentLesson = sectionGroup.lessons[lessonToMove];
  const maxOrder = sectionGroup.lessons.length;

  const { newOrder } = await inquirer.prompt([
    {
      type: 'number',
      name: 'newOrder',
      message: `New position for "${currentLesson.title}" (1-${maxOrder}):`,
      validate: (input: number) => {
        if (input < 1 || input > maxOrder) {
          return `Position must be between 1 and ${maxOrder}`;
        }
        return true;
      },
      default: currentLesson.order
    }
  ]);

  if (newOrder === currentLesson.order) {
    console.log(chalk.yellow('\n⚠ No change in position. Exiting.'));
    return null;
  }

  return { lessonIndex: lessonToMove, newOrder };
}

/**
 * Reorders lessons and updates files
 */
function reorderLessons(sectionGroup: SectionGroup, lessonIndex: number, newOrder: number): void {
  const lessons = [...sectionGroup.lessons];
  const [movedLesson] = lessons.splice(lessonIndex, 1);

  // Insert at new position (convert from 1-indexed to 0-indexed)
  lessons.splice(newOrder - 1, 0, movedLesson);

  // Update order values (1-indexed)
  lessons.forEach((lesson, index) => {
    lesson.order = index + 1;
  });

  // Update files
  for (const lesson of lessons) {
    const content = readFileSync(lesson.filePath, 'utf-8');
    const updatedContent = content.replace(
      /order:\s*\d+/,
      `order: ${lesson.order}`
    );
    writeFileSync(lesson.filePath, updatedContent, 'utf-8');
  }

  console.log(chalk.green('\n✓ Lessons reordered successfully!\n'));
  console.log(chalk.bold('New order:'));
  lessons.forEach(lesson => {
    const changed = lesson === movedLesson ? chalk.green('← moved') : '';
    console.log(chalk.dim(`  ${lesson.order}.`), chalk.cyan(lesson.title), changed);
  });
  console.log('');
}

/**
 * Validates the registry can build
 */
async function validateRegistry(): Promise<boolean> {
  console.log(chalk.dim('Validating curriculum registry...'));

  try {
    // Check if files exist and have no duplicate orders
    const sectionGroups = scanLessons();

    for (const group of sectionGroups) {
      const orders = group.lessons.map(l => l.order);
      const uniqueOrders = new Set(orders);

      if (orders.length !== uniqueOrders.size) {
        throw new Error(`Duplicate orders found in section ${group.id}`);
      }
    }

    console.log(chalk.green('✓ Validation passed\n'));
    return true;
  } catch (error) {
    console.error(chalk.red('✗ Validation failed:'), error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log(chalk.bold.blue('\n📝 Lesson Reordering Tool\n'));

    // Verify lessons directory exists
    if (!existsSync(LESSONS_DIR)) {
      console.error(chalk.red('✗ Error: src/lessons directory not found'));
      process.exit(1);
    }

    // Scan lessons
    const sectionGroups = scanLessons();

    if (sectionGroups.length === 0) {
      console.log(chalk.yellow('No lessons found to reorder.'));
      process.exit(0);
    }

    // Select section
    const selectedSection = await selectSection(sectionGroups);

    if (selectedSection.lessons.length < 2) {
      console.log(chalk.yellow(`\nSection "${selectedSection.title}" has only ${selectedSection.lessons.length} lesson(s). Nothing to reorder.`));
      process.exit(0);
    }

    // Select lesson and new position
    const reorderResult = await selectReorder(selectedSection);

    if (!reorderResult) {
      console.log(chalk.dim('Reordering cancelled.'));
      process.exit(0);
    }

    // Confirm
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Proceed with reordering?',
        default: true
      }
    ]);

    if (!confirm) {
      console.log(chalk.dim('Reordering cancelled.'));
      process.exit(0);
    }

    // Reorder and update files
    reorderLessons(selectedSection, reorderResult.lessonIndex, reorderResult.newOrder);

    // Validate registry
    const isValid = await validateRegistry();

    if (!isValid) {
      console.error(chalk.red('\n✗ Registry validation failed. Please check lesson files.'));
      process.exit(1);
    }

    console.log(chalk.yellow('📝 Next steps:'));
    console.log(chalk.dim('  1. Review the changes with'), chalk.cyan('git diff'));
    console.log(chalk.dim('  2. Run'), chalk.cyan('pnpm dev'), chalk.dim('to preview'));
    console.log(chalk.dim('  3. Verify lesson order in the TOC'));
    console.log(chalk.dim('  4. Run'), chalk.cyan('pnpm test'), chalk.dim('to ensure tests pass\n'));

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
