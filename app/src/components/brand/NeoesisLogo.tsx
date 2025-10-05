/**
 * Neoesis Brand Logo
 *
 * Modern, geometric logo representing "The New Mind of Learning"
 * Design: Abstract neural network pattern forming an "N"
 * Symbolizes: Interconnected knowledge, clarity, and understanding
 */

import * as React from 'react';

interface NeoesisLogoProps {
  className?: string;
  size?: number;
}

export function NeoesisLogo({ className, size = 32 }: NeoesisLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Neoesis Logo"
    >
      {/* Neural network pattern forming "N" */}
      {/* Left vertical line */}
      <path
        d="M6 4 L6 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Diagonal connecting line with nodes */}
      <path
        d="M6 8 L26 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Right vertical line */}
      <path
        d="M26 4 L26 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Neural nodes (circles at connection points) */}
      <circle cx="6" cy="8" r="2.5" fill="currentColor" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <circle cx="26" cy="24" r="2.5" fill="currentColor" />

      {/* Additional nodes for network effect */}
      <circle cx="6" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="26" cy="12" r="1.5" fill="currentColor" opacity="0.6" />

      {/* Subtle connecting lines for neural network effect */}
      <path
        d="M6 20 L16 16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M16 16 L26 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

export default NeoesisLogo;
