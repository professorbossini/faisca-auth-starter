import '@fontsource-variable/google-sans-flex/rond.css';
import '@fontsource/google-sans-code/400.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { App } from './App';
import { createAuthAdapter } from './auth';
import { ConfigErrorScreen } from './components/ConfigErrorScreen';
import { assertValidEnv, ConfigError } from './config/env';
import { theme } from './theme';

const root = createRoot(document.getElementById('root')!);

async function bootstrap() {
  try {
    assertValidEnv();
    const adapter = await createAuthAdapter();
    root.render(
      <StrictMode>
        <App adapter={adapter} />
      </StrictMode>,
    );
  } catch (error) {
    console.error(error);
    const configError =
      error instanceof ConfigError
        ? error
        : new ConfigError(error instanceof Error ? error.message : String(error));
    root.render(
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline enableColorScheme />
        <ConfigErrorScreen error={configError} />
      </ThemeProvider>,
    );
  }
}

void bootstrap();
