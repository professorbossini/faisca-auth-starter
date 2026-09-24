import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';
import PersonAddAlt1Rounded from '@mui/icons-material/PersonAddAlt1Rounded';
import { useNotify } from '@/components/feedback/notificationsContext';
import { initials } from '@/utils/initials';
import { AVATAR_TONES } from '@/features/projects/projectMeta';
import { listMembers } from '@/features/projects/service';
import { useAsync } from '@/hooks/useAsync';
import { PageHeader } from './PageHeader';

export function TeamPage() {
  const members = useAsync(listMembers);
  const notify = useNotify();

  return (
    <>
      <PageHeader
        title="Equipe"
        subtitle="Pessoas com acesso a este espaço."
        actions={
          <Button
            variant="tonal"
            startIcon={<PersonAddAlt1Rounded />}
            onClick={() => notify('Convite enviado!', 'success')}
          >
            Convidar
          </Button>
        }
      />
      <Grid container spacing={2}>
        {(members.loading ? Array.from({ length: 6 }, () => null) : (members.data ?? [])).map(
          (m, i) => (
            <Grid key={m?.id ?? i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{ '&:hover': { borderColor: 'primary.light', transform: 'translateY(-2px)' } }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    {m ? (
                      <Avatar
                        sx={{ width: 48, height: 48, ...AVATAR_TONES[i % AVATAR_TONES.length] }}
                      >
                        {initials(m.name)}
                      </Avatar>
                    ) : (
                      <Skeleton variant="circular" width={48} height={48} />
                    )}
                    <Stack sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="subtitle1" noWrap>
                        {m ? m.name : <Skeleton width="60%" />}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {m ? m.role : <Skeleton width="40%" />}
                      </Typography>
                    </Stack>
                    {m?.email && (
                      <Button
                        size="small"
                        color="inherit"
                        href={`mailto:${m.email}`}
                        aria-label={`Enviar e-mail para ${m.name}`}
                        sx={{ minWidth: 0, px: 1 }}
                      >
                        <MailOutlineRounded fontSize="small" />
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>
    </>
  );
}
