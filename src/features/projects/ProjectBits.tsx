import { AvatarGroup, Avatar, Chip, LinearProgress, Tooltip } from '@mui/material';
import { initials } from '@/utils/initials';
import { AVATAR_TONES, STATUS_META } from './projectMeta';
import type { Member, ProjectStatus } from './types';

export function StatusChip({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return <Chip size="small" variant="soft" color={meta.chip} label={meta.label} />;
}

export function ProjectProgress({ status, value }: { status: ProjectStatus; value: number }) {
  const meta = STATUS_META[status];
  return (
    <Tooltip title={`${value}% concluído`}>
      <LinearProgress
        variant="determinate"
        value={value}
        color={meta.bar === 'neutral' ? 'inherit' : meta.bar}
        aria-label={`Progresso: ${value}%`}
        sx={meta.bar === 'neutral' ? { color: 'text.disabled' } : undefined}
      />
    </Tooltip>
  );
}

export function MemberStack({ members, max = 3 }: { members: Member[]; max?: number }) {
  if (members.length === 0) return null;
  return (
    <AvatarGroup max={max} sx={{ justifyContent: 'flex-end' }}>
      {members.map((m, i) => (
        <Tooltip key={m.id} title={m.name}>
          <Avatar
            alt={m.name}
            src={m.photoUrl ?? undefined}
            sx={AVATAR_TONES[i % AVATAR_TONES.length]}
          >
            {initials(m.name)}
          </Avatar>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
}
