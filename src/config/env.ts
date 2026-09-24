/**
 * Typed, validated access to environment variables.
 * Everything the app reads from `import.meta.env` goes through here, so a fork
 * only has one place to look when adding or renaming configuration.
 */

export const AUTH_PROVIDERS = ['mock', 'firebase', 'backend'] as const;
export type AuthProviderId = (typeof AUTH_PROVIDERS)[number];

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

export interface AppEnv {
  appName: string;
  authProvider: AuthProviderId;
  enableEmailPassword: boolean;
  /** Base URL of your API without trailing slash, or `null` to use demo data. */
  apiUrl: string | null;
  firebase: FirebaseConfig;
  googleClientId: string;
}

/** A configuration problem the developer must fix; shown on a friendly screen. */
export class ConfigError extends Error {
  readonly missing: string[];

  constructor(message: string, missing: string[] = []) {
    super(message);
    this.name = 'ConfigError';
    this.missing = missing;
  }
}

const raw = import.meta.env;

function read(name: string): string {
  const value = raw[name];
  return typeof value === 'string' ? value.trim() : '';
}

function readBool(name: string, fallback: boolean): boolean {
  const value = read(name).toLowerCase();
  if (!value) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value);
}

function parseProvider(value: string): AuthProviderId {
  const normalized = (value || 'mock').toLowerCase();
  return (AUTH_PROVIDERS as readonly string[]).includes(normalized)
    ? (normalized as AuthProviderId)
    : 'mock';
}

export const env: AppEnv = {
  appName: read('VITE_APP_NAME') || 'Órbita',
  authProvider: parseProvider(read('VITE_AUTH_PROVIDER')),
  enableEmailPassword: readBool('VITE_ENABLE_EMAIL_PASSWORD', true),
  apiUrl: read('VITE_API_URL').replace(/\/+$/, '') || null,
  firebase: {
    apiKey: read('VITE_FIREBASE_API_KEY'),
    authDomain: read('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: read('VITE_FIREBASE_PROJECT_ID'),
    appId: read('VITE_FIREBASE_APP_ID'),
  },
  googleClientId: read('VITE_GOOGLE_CLIENT_ID'),
};

/**
 * Throws a {@link ConfigError} listing every missing variable for the selected
 * auth provider. Called once at startup.
 */
export function assertValidEnv(config: AppEnv = env): void {
  const rawProvider = read('VITE_AUTH_PROVIDER');
  if (rawProvider && !(AUTH_PROVIDERS as readonly string[]).includes(rawProvider.toLowerCase())) {
    throw new ConfigError(
      `VITE_AUTH_PROVIDER="${rawProvider}" is not valid. Use one of: ${AUTH_PROVIDERS.join(', ')}.`,
      ['VITE_AUTH_PROVIDER'],
    );
  }

  const required: Record<AuthProviderId, [string, string][]> = {
    mock: [],
    firebase: [
      ['VITE_FIREBASE_API_KEY', config.firebase.apiKey],
      ['VITE_FIREBASE_AUTH_DOMAIN', config.firebase.authDomain],
      ['VITE_FIREBASE_PROJECT_ID', config.firebase.projectId],
      ['VITE_FIREBASE_APP_ID', config.firebase.appId],
    ],
    backend: [
      ['VITE_GOOGLE_CLIENT_ID', config.googleClientId],
      ['VITE_API_URL', config.apiUrl ?? ''],
    ],
  };

  const missing = required[config.authProvider].filter(([, value]) => !value).map(([name]) => name);
  if (missing.length > 0) {
    throw new ConfigError(
      `The "${config.authProvider}" auth provider needs these variables in your .env file.`,
      missing,
    );
  }
}
