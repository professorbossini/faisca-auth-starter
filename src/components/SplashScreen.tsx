import { Box, Fade } from '@mui/material';
import { OrbitaMark } from './brand/OrbitaMark';

/** Shown while the auth adapter restores the session. */
export function SplashScreen() {
  return (
    <Fade in timeout={{ enter: 400 }} style={{ transitionDelay: '150ms' }}>
      <Box
        role="progressbar"
        aria-label="Carregando"
        sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}
      >
        <OrbitaMark size={64} animated />
      </Box>
    </Fade>
  );
}
