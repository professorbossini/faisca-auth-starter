import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { MemberStack, ProjectProgress, StatusChip } from './ProjectBits';
import { KIND_ICON } from './projectMeta';
import type { Project } from './types';

export function ProjectRow({ project }: { project: Project }) {
  const Icon = KIND_ICON[project.kind];
  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr auto',
          sm: 'minmax(0, 1.4fr) 130px minmax(80px, 1fr) 96px',
        },
        gap: { xs: 1.5, sm: 3 },
        alignItems: 'center',
        px: { xs: 2, sm: 2.5 },
        py: 1.75,
        transition: 'background-color 150ms',
        '&:hover': { bgcolor: theme.alpha(theme.vars.palette.primary.main, 0.035) },
        '& + &': { borderTop: `1px solid ${theme.vars.palette.divider}` },
      })}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
        <Icon fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography variant="subtitle2" noWrap>
          {project.name}
        </Typography>
      </Stack>
      <Box sx={{ justifySelf: { xs: 'end', sm: 'start' } }}>
        <StatusChip status={project.status} />
      </Box>
      <Box sx={{ gridColumn: { xs: '1 / 2', sm: 'auto' } }}>
        <ProjectProgress status={project.status} value={project.progress} />
      </Box>
      <MemberStack members={project.members} />
    </Box>
  );
}

export function ProjectListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <Stack key={i} direction="row" spacing={3} sx={{ px: 2.5, py: 2, alignItems: 'center' }}>
          <Skeleton variant="rounded" width="30%" height={18} />
          <Skeleton variant="rounded" width={90} height={22} sx={{ borderRadius: 99 }} />
          <Skeleton variant="rounded" sx={{ flex: 1 }} height={6} />
          <Skeleton variant="circular" width={28} height={28} />
        </Stack>
      ))}
    </>
  );
}
