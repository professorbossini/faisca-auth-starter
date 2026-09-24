import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import AddRounded from '@mui/icons-material/AddRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import { NewProjectDialog } from '@/features/projects/NewProjectDialog';
import { ProjectListSkeleton, ProjectRow } from '@/features/projects/ProjectList';
import { STATUS_META } from '@/features/projects/projectMeta';
import { listProjects } from '@/features/projects/service';
import type { ProjectStatus } from '@/features/projects/types';
import { useAsync } from '@/hooks/useAsync';
import { PageHeader } from './PageHeader';

export function ProjectsPage() {
  const projects = useAsync(listProjects);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (projects.data ?? []).filter(
      (p) => (status === 'all' || p.status === status) && (!q || p.name.toLowerCase().includes(q)),
    );
  }, [projects.data, query, status]);

  return (
    <>
      <PageHeader
        title="Projetos"
        subtitle={projects.data ? `${projects.data.length} projetos no seu espaço` : 'Carregando…'}
        actions={
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={() => setDialogOpen(true)}
          >
            Novo projeto
          </Button>
        }
      />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2.5 }}>
        <TextField
          size="small"
          placeholder="Buscar projeto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ flex: 1, maxWidth: { md: 360 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: { 'aria-label': 'Buscar projeto' },
          }}
        />
        <ToggleButtonGroup
          exclusive
          size="small"
          value={status}
          onChange={(_, v: ProjectStatus | 'all' | null) => v && setStatus(v)}
          aria-label="Filtrar por status"
          sx={{ overflowX: 'auto', alignSelf: { xs: 'stretch', md: 'center' } }}
        >
          <ToggleButton value="all">Todos</ToggleButton>
          {(Object.keys(STATUS_META) as ProjectStatus[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ whiteSpace: 'nowrap' }}>
              {STATUS_META[key].label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <Card>
        {projects.loading ? (
          <ProjectListSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
            Nenhum projeto encontrado.
          </Typography>
        ) : (
          filtered.map((p) => <ProjectRow key={p.id} project={p} />)
        )}
      </Card>
      <NewProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={(project) => projects.setData((prev) => [project, ...(prev ?? [])])}
      />
    </>
  );
}
