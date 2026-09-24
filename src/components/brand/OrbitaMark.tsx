import { useId } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

export interface OrbitaMarkProps {
  /** Rendered size in pixels. */
  size?: number;
  /** Animates the satellite along its orbit and makes the core breathe. */
  animated?: boolean;
  sx?: SxProps<Theme>;
}

const INK = '#2A1263';
/** Orbit geometry (viewBox 48×48): ellipse rx=17 ry=7.5 tilted -40° around the center. */
const SATELLITE = { cx: 37.02, cy: 13.07 };

/**
 * Órbita brand mark: a floating diamond core with a tilted orbit and a
 * satellite breaking through the ring, an intelligence in motion.
 * Legible down to 16px. Replace this component (and public/favicon.svg)
 * to rebrand the template.
 */
export function OrbitaMark({ size = 40, animated = false, sx }: OrbitaMarkProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const tileId = `orbita-tile-${uid}`;
  const gapId = `orbita-gap-${uid}`;

  return (
    <Box
      component="svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      sx={[
        { display: 'block', flexShrink: 0 },
        animated && {
          '& .orbita-core': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'orbita-breathe 2.4s cubic-bezier(0.2, 0, 0, 1) infinite',
          },
          '@keyframes orbita-breathe': {
            '0%, 100%': { transform: 'rotate(45deg) scale(1)' },
            '50%': { transform: 'rotate(135deg) scale(0.8)' },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <defs>
        <linearGradient id={tileId} x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DDFB6A" />
          <stop offset="1" stopColor="#B4E21C" />
        </linearGradient>
        <mask id={gapId} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
          <rect width="48" height="48" fill="#fff" />
          {!animated && <circle cx={SATELLITE.cx} cy={SATELLITE.cy} r="6.8" fill="#000" />}
          <rect
            x="17.5"
            y="17.5"
            width="13"
            height="13"
            rx="4.2"
            transform="rotate(45 24 24)"
            fill="#000"
          />
        </mask>
      </defs>
      <rect width="48" height="48" rx="13" fill={`url(#${tileId})`} />
      <ellipse
        cx="24"
        cy="24"
        rx="17"
        ry="7.5"
        fill="none"
        transform="rotate(-40 24 24)"
        stroke={INK}
        strokeWidth="2.6"
        strokeOpacity={animated ? 0.6 : 1}
        mask={`url(#${gapId})`}
      />
      {animated ? (
        <rect className="orbita-core" x="19" y="19" width="10" height="10" rx="3" fill={INK} />
      ) : (
        <rect x="19" y="19" width="10" height="10" rx="3" transform="rotate(45 24 24)" fill={INK} />
      )}
      {animated ? (
        <g transform="rotate(-40 24 24)">
          <circle r="3.3" fill={INK}>
            <animateMotion
              dur="2.4s"
              repeatCount="indefinite"
              path="M 41 24 A 17 7.5 0 1 1 7 24 A 17 7.5 0 1 1 41 24"
            />
          </circle>
        </g>
      ) : (
        <circle cx={SATELLITE.cx} cy={SATELLITE.cy} r="3.3" fill={INK} />
      )}
    </Box>
  );
}
