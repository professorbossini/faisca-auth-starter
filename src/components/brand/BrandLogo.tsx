import { Stack, Typography } from '@mui/material';
import { env } from '@/config/env';
import { FaiscaMark } from './FaiscaMark';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
}

const sizes = {
  small: { mark: 32, font: '1.125rem' },
  medium: { mark: 40, font: '1.375rem' },
  large: { mark: 48, font: '1.625rem' },
} as const;

export function BrandLogo({ size = 'medium' }: BrandLogoProps) {
  const s = sizes[size];
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <FaiscaMark size={s.mark} />
      <Typography
        component="span"
        sx={{
          fontSize: s.font,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          fontVariationSettings: "'ROND' 100",
        }}
      >
        {env.appName}
      </Typography>
    </Stack>
  );
}
