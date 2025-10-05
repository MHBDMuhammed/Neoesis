import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Icon generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#5B5FC7',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Neural network pattern forming "N" */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left vertical line */}
          <line
            x1="6"
            y1="4"
            x2="6"
            y2="28"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Diagonal connecting line */}
          <line
            x1="6"
            y1="8"
            x2="26"
            y2="24"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Right vertical line */}
          <line
            x1="26"
            y1="4"
            x2="26"
            y2="28"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Neural nodes */}
          <circle cx="6" cy="8" r="2.5" fill="white" />
          <circle cx="16" cy="16" r="2.5" fill="white" />
          <circle cx="26" cy="24" r="2.5" fill="white" />

          {/* Additional nodes */}
          <circle cx="6" cy="20" r="1.5" fill="white" opacity="0.6" />
          <circle cx="26" cy="12" r="1.5" fill="white" opacity="0.6" />

          {/* Connecting lines */}
          <line
            x1="6"
            y1="20"
            x2="16"
            y2="16"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
          <line
            x1="16"
            y1="16"
            x2="26"
            y2="12"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
