import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { BrandPulse } from '@/components/brand/BrandMark';
import { PoweredByFaisca } from '@/components/brand/PoweredByFaisca';

export function NotFoundPage() {
  return (
    <Stack
      spacing={2}
      sx={{
        minHeight: '70dvh',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 3,
      }}
    >
      <BrandPulse size={72} />
      <Typography variant="h2" component="h1">
        404
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
        Essa faísca não acendeu: a página não existe. Confira o endereço ou volte para o início.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" size="large">
        Voltar para o início
      </Button>
      <PoweredByFaisca />
    </Stack>
  );
}
