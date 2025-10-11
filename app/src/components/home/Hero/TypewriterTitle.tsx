'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTitleProps {
  /**
   * Static text that appears before the rotating words
   */
  staticText?: string;
  /**
   * Array of words that will rotate with typewriter effect
   */
  rotatingWords: string[];
  /**
   * Interval between word rotations (ms)
   * @default 3000
   */
  interval?: number;
  /**
   * Typing speed (ms per character)
   * @default 100
   */
  typingSpeed?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TypewriterTitle - Premium typewriter effect with rotating words
 *
 * Features:
 * - Typewriter animation
 * - Word rotation
 * - Gradient text support
 * - Smooth transitions
 * - Accessibility optimized
 *
 * @example
 * <TypewriterTitle
 *   staticText="Öğrenmenin"
 *   rotatingWords={["Geleceği", "Zihni", "Evrimi"]}
 *   interval={3000}
 * />
 */
export function TypewriterTitle({
  staticText,
  rotatingWords,
  interval = 3000,
  typingSpeed = 100,
  className = '',
}: TypewriterTitleProps) {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  const currentWord = rotatingWords[currentWordIndex];

  React.useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            // Word complete, wait then start deleting
            setTimeout(() => setIsDeleting(true), interval);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            // Deleted, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord, rotatingWords, interval, typingSpeed, currentWordIndex]);

  return (
    <div
      className={className}
      role="heading"
      aria-level={1}
      aria-label={`${staticText || ''} ${rotatingWords.join(', ')}`}
    >
      {/* Static text */}
      {staticText && (
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-bold tracking-tight text-foreground"
          style={{ fontSize: 'clamp(2.5rem, 2rem + 3vw, 5.5rem)' }}
        >
          {staticText}
        </motion.div>
      )}

      {/* Rotating typewriter text */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative block font-bold tracking-tight"
        style={{ fontSize: 'clamp(2.5rem, 2rem + 3vw, 5.5rem)' }}
      >
        {/* Gradient text */}
        <span
          style={{
            background:
              'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.65 0.18 280) 50%, oklch(0.70 0.16 15) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          aria-hidden="true"
        >
          {displayText}
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            |
          </motion.span>
        </span>

        {/* Animated underline */}
        <AnimatePresence mode="wait">
          {displayText.length === currentWord.length && !isDeleting && (
            <motion.span
              key={currentWordIndex}
              className="absolute -bottom-2 left-0 h-1 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, oklch(0.55 0.15 265) 0%, oklch(0.70 0.16 15) 100%)',
              }}
              initial={{ width: '0%', opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: '0%', opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
