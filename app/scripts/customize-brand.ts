#!/usr/bin/env tsx
/**
 * Brand Customization Script
 * Interactive tool to customize brand identity and design tokens
 *
 * Usage: pnpm customize:brand
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

interface BrandAnswers {
  brandName: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  primaryColor: string;
  accentColor: string;
}

const DESIGN_TOKENS_PATH = resolve(
  process.cwd(),
  'src/lib/design-tokens.ts'
);
const HERO_PATH = resolve(process.cwd(), 'src/components/home/Hero.tsx');

/**
 * Validate OKLCH color syntax
 */
function validateOKLCH(color: string): boolean | string {
  // Format: oklch(L C H) where L=0-1, C=0-0.4, H=0-360
  const oklchRegex = /^oklch\(\s*([0-1](\.\d+)?)\s+([0-9.]+)\s+([0-9.]+)\s*\)$/;

  if (!oklchRegex.test(color)) {
    return 'Invalid OKLCH format. Use: oklch(L C H) e.g., oklch(0.6 0.2 250)';
  }

  const match = color.match(oklchRegex);
  if (!match) return 'Invalid OKLCH format';

  const [, lightness, , chroma, hue] = match;
  const L = parseFloat(lightness);
  const C = parseFloat(chroma);
  const H = parseFloat(hue);

  if (L < 0 || L > 1) return 'Lightness must be between 0 and 1';
  if (C < 0 || C > 0.4) return 'Chroma should be between 0 and 0.4';
  if (H < 0 || H > 360) return 'Hue must be between 0 and 360';

  return true;
}

/**
 * Prompt user for brand customization
 */
async function promptBrandCustomization(): Promise<BrandAnswers> {
  console.log(chalk.bold.blue('\n🎨 Brand Customization Wizard\n'));
  console.log(chalk.dim('Current brand: Limbo'));
  console.log(chalk.dim('Press Enter to keep current values\n'));

  return inquirer.prompt<BrandAnswers>([
    {
      type: 'input',
      name: 'brandName',
      message: 'Brand name:',
      default: 'Limbo',
      validate: (input: string) =>
        input.length >= 2 || 'Brand name must be at least 2 characters',
    },
    {
      type: 'input',
      name: 'tagline',
      message: 'Tagline (badge text):',
      default: 'Interactive Learning Platform',
    },
    {
      type: 'input',
      name: 'heroTitle',
      message: 'Hero title (main headline):',
      default: 'Master Skills Through Interactive Practice',
    },
    {
      type: 'input',
      name: 'heroDescription',
      message: 'Hero description (supporting text):',
      default:
        'Learn at your own pace with hands-on lessons, instant feedback, and progress tracking.',
    },
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary brand color (OKLCH):',
      default: 'oklch(0.6 0.2 250)',
      validate: validateOKLCH,
    },
    {
      type: 'input',
      name: 'accentColor',
      message: 'Accent color (OKLCH):',
      default: 'oklch(0.7 0.15 320)',
      validate: validateOKLCH,
    },
  ]);
}

/**
 * Update design-tokens.ts with new colors
 */
function updateDesignTokens(answers: BrandAnswers): void {
  let tokensContent = readFileSync(DESIGN_TOKENS_PATH, 'utf-8');

  // Update brand colors (light versions)
  tokensContent = tokensContent.replace(
    /brand:\s*{\s*light:\s*'[^']+'/,
    `brand: {\n    light: '${answers.primaryColor}'`
  );

  tokensContent = tokensContent.replace(
    /accent:\s*{\s*light:\s*'[^']+'/,
    `accent: {\n    light: '${answers.accentColor}'`
  );

  // For dark mode, slightly adjust lightness (increase by 0.1)
  const primaryDark = answers.primaryColor.replace(
    /oklch\(([0-9.]+)/,
    (match, lightness) => {
      const newL = Math.min(parseFloat(lightness) + 0.1, 1);
      return `oklch(${newL}`;
    }
  );

  const accentDark = answers.accentColor.replace(
    /oklch\(([0-9.]+)/,
    (match, lightness) => {
      const newL = Math.min(parseFloat(lightness) + 0.1, 1);
      return `oklch(${newL}`;
    }
  );

  tokensContent = tokensContent.replace(
    /brand:\s*{\s*light:[^}]+dark:\s*'[^']+'/,
    `brand: {\n    light: '${answers.primaryColor}',\n    dark: '${primaryDark}'`
  );

  tokensContent = tokensContent.replace(
    /accent:\s*{\s*light:[^}]+dark:\s*'[^']+'/,
    `accent: {\n    light: '${answers.accentColor}',\n    dark: '${accentDark}'`
  );

  writeFileSync(DESIGN_TOKENS_PATH, tokensContent, 'utf-8');
}

/**
 * Update Hero.tsx with new content
 */
function updateHero(answers: BrandAnswers): void {
  let heroContent = readFileSync(HERO_PATH, 'utf-8');

  // Update badge text
  heroContent = heroContent.replace(
    /<span>Interactive Learning Platform<\/span>/,
    `<span>${answers.tagline}</span>`
  );

  // Update hero title (split into two lines if "Through" is present)
  if (answers.heroTitle.includes('Through')) {
    const [line1, line2] = answers.heroTitle.split('Through');
    heroContent = heroContent.replace(
      /Master Skills Through[\s\S]*?Interactive Practice/,
      `${line1.trim()} Through\n        <br />\n        <span className="bg-gradient-to-r from-primary via-primary\/80 to-primary\/60 bg-clip-text">\n          ${line2.trim()}\n        </span>`
    );
  } else {
    // Single line title
    heroContent = heroContent.replace(
      /Master Skills Through[\s\S]*?Interactive Practice/,
      answers.heroTitle
    );
  }

  // Update description
  heroContent = heroContent.replace(
    /Learn at your own pace with hands-on lessons[\s\S]*?practical exercises\./,
    answers.heroDescription
  );

  writeFileSync(HERO_PATH, heroContent, 'utf-8');
}

/**
 * Update Header and Footer brand name
 */
function updateBrandName(brandName: string): void {
  const HEADER_PATH = resolve(
    process.cwd(),
    'src/components/layout/Header.tsx'
  );
  const FOOTER_PATH = resolve(
    process.cwd(),
    'src/components/layout/Footer.tsx'
  );

  // Update Header
  let headerContent = readFileSync(HEADER_PATH, 'utf-8');
  headerContent = headerContent.replace(
    /<span className="text-xl">Limbo<\/span>/,
    `<span className="text-xl">${brandName}</span>`
  );
  writeFileSync(HEADER_PATH, headerContent, 'utf-8');

  // Update Footer
  let footerContent = readFileSync(FOOTER_PATH, 'utf-8');
  footerContent = footerContent.replace(
    /<span className="text-2xl font-bold text-foreground">Limbo<\/span>/,
    `<span className="text-2xl font-bold text-foreground">${brandName}</span>`
  );
  footerContent = footerContent.replace(
    /&copy; \{currentYear\} Limbo\./,
    `&copy; {currentYear} ${brandName}.`
  );
  writeFileSync(FOOTER_PATH, footerContent, 'utf-8');
}

/**
 * Main execution
 */
async function main() {
  try {
    const answers = await promptBrandCustomization();

    console.log(chalk.yellow('\n✨ Applying changes...\n'));

    // Update files
    console.log(chalk.dim('→ Updating design tokens...'));
    updateDesignTokens(answers);

    console.log(chalk.dim('→ Updating Hero component...'));
    updateHero(answers);

    console.log(chalk.dim('→ Updating brand name...'));
    updateBrandName(answers.brandName);

    console.log(chalk.green('\n✅ Brand customization complete!\n'));

    console.log(chalk.bold('Modified files:'));
    console.log(chalk.cyan('  - src/lib/design-tokens.ts'));
    console.log(chalk.cyan('  - src/components/home/Hero.tsx'));
    console.log(chalk.cyan('  - src/components/layout/Header.tsx'));
    console.log(chalk.cyan('  - src/components/layout/Footer.tsx'));

    console.log(chalk.yellow('\n📝 Next steps:'));
    console.log(chalk.dim('  1. Run'), chalk.cyan('pnpm dev'), chalk.dim('to preview'));
    console.log(
      chalk.dim('  2. Check both light and dark modes')
    );
    console.log(
      chalk.dim('  3. Run'),
      chalk.cyan('pnpm audit:a11y'),
      chalk.dim('for color contrast')
    );
    console.log(
      chalk.dim('  4. Commit changes when satisfied\n')
    );
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
