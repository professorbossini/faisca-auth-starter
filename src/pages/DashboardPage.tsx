import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Link,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import AddRounded from '@mui/icons-material/AddRounded';
import TuneRounded from '@mui/icons-material/TuneRounded';
import { Link as RouterLink } from 'react-router';
import { useAuth } from '@/auth';
import { NewProjectDialog } from '@/features/projects/NewProjectDialog';
import { ProjectListSkeleton, ProjectRow } from '@/features/projects/ProjectList';
import { getDashboardSummary, listProjects } from '@/features/projects/service';
import type { ProjectStatus } from '@/features/projects/types';
import { STATUS_META } from '@/features/projects/projectMeta';
import { useAsync } from '@/hooks/useAsync';
import { PageHeader } from './PageHeader';

function StatCard({
  label,
  value,
  footer,
  loading,
}: {
  label: string;
  value: string;
  footer: React.ReactNode;
  loading: boolean;
}) {
  return (
    <Card sx={{ height: '100%', '&:hover': { borderColor: 'primary.light' } }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h3" component="p" sx={{ mt: 0.5, mb: 1.5 }}>
          {loading ? <Skeleton width={56} /> : value}
        </Typography>
        {loading ? (
          <Skeleton variant="rounded" width={110} height={24} sx={{ borderRadius: 99 }} />
        ) : (
          footer
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const summary = useAsync(getDashboardSummary);
  const projects = useAsync(listProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');

  const firstName = user?.name?.split(' ')[0] ?? 'por aqui';
  const s = summary.data;
  const visible = (projects.data ?? [])
    .filter((p) => filter === 'all' || p.status === filter)
    .slice(0, 4);

  return (
    <>
      <PageHeader
        title={`Olá, ${firstName}`}
        subtitle={s ? `Você tem ${s.tasksToday} tarefas para hoje.` : 'Carregando seu dia…'}
        actions={
          <>
            <Button
              variant="outlined"
              startIcon={<TuneRounded />}
              onClick={(e) => setFilterAnchor(e.currentTarget)}
            >
              Filtrar
            </Button>
            <Button
              variant="contained"
              startIcon={<AddRounded />}
              onClick={() => setDialogOpen(true)}
            >
              Novo projeto
            </Button>
          </>
        }
      />
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
      >
        {(['all', ...Object.keys(STATUS_META)] as const).map((key) => (
          <MenuItem
            key={key}
            selected={filter === key}
            onClick={() => {
              setFilter(key as ProjectStatus | 'all');
              setFilterAnchor(null);
            }}
          >
            {key === 'all' ? 'Todos os status' : STATUS_META[key as ProjectStatus].label}
          </MenuItem>
        ))}
      </Menu>

      {(summary.error || projects.error) && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              onClick={() => {
                summary.reload();
                projects.reload();
              }}
            >
              Tentar de novo
            </Button>
          }
        >
          Não foi possível carregar os dados da API.
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label="Projetos ativos"
            value={String(s?.activeProjects ?? '')}
            loading={summary.loading}
            footer={
              <Chip
                size="small"
                variant="soft"
                color="lime"
                label={`+${s?.activeProjectsDelta} esta semana`}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label="Tarefas hoje"
            value={String(s?.tasksToday ?? '')}
            loading={summary.loading}
            footer={
              <Chip size="small" variant="soft" color="info" label={`${s?.urgentTasks} urgentes`} />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label="Taxa de conclusão"
            value={`${s?.completionRate ?? ''}%`}
            loading={summary.loading}
            footer={
              <Box sx={{ pt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={s?.completionRate ?? 0}
                  color="lime"
                  sx={{ height: 8 }}
                  aria-label="Taxa de conclusão"
                />
              </Box>
            }
          />
        </Grid>
      </Grid>

      <Card>
        <Stack
          direction="row"
          sx={{
            px: 2.5,
            py: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" component="h2">
            Projetos recentes
          </Typography>
          <Link component={RouterLink} to="/projects" variant="body2">
            Ver todos
          </Link>
        </Stack>
        {projects.loading ? (
          <ProjectListSkeleton />
        ) : visible.length === 0 ? (
          <Typography color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>
            Nenhum projeto com esse filtro.
          </Typography>
        ) : (
          visible.map((p) => <ProjectRow key={p.id} project={p} />)
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
