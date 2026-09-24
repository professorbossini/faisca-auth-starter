import ApiRounded from '@mui/icons-material/ApiRounded';
import InsertChartOutlinedRounded from '@mui/icons-material/InsertChartOutlinedRounded';
import LanguageRounded from '@mui/icons-material/LanguageRounded';
import PhoneIphoneRounded from '@mui/icons-material/PhoneIphoneRounded';
import type { ProjectKind, ProjectStatus } from './types';

export const STATUS_META: Record<
  ProjectStatus,
  { label: string; chip: 'info' | 'lime' | 'default'; bar: 'primary' | 'lime' | 'neutral' }
> = {
  in_progress: { label: 'Em andamento', chip: 'info', bar: 'primary' },
  done: { label: 'Concluído', chip: 'lime', bar: 'lime' },
  review: { label: 'Em revisão', chip: 'default', bar: 'primary' },
  draft: { label: 'Rascunho', chip: 'default', bar: 'neutral' },
};

export const KIND_ICON: Record<ProjectKind, typeof ApiRounded> = {
  mobile: PhoneIphoneRounded,
  web: LanguageRounded,
  dashboard: InsertChartOutlinedRounded,
  api: ApiRounded,
};

/** Fixed tones (not theme-dependent) so neighbors stay distinguishable in both modes. */
export const AVATAR_TONES = [
  { bgcolor: '#6B3CC9', color: '#FFFFFF' },
  { bgcolor: 'lime.main', color: '#2A1263' },
  { bgcolor: 'info.container', color: 'info.onContainer' },
] as const;
