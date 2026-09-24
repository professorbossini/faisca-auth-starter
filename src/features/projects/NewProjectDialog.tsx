import { useState, type FormEvent } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  FormLabel,
} from '@mui/material';
import { FormField } from '@/components/form/FormField';
import { useNotify } from '@/components/feedback/notificationsContext';
import { createProject } from './service';
import type { Project, ProjectKind } from './types';

const KINDS: { value: ProjectKind; label: string }[] = [
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'dashboard', label: 'Painel' },
  { value: 'api', label: 'API' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (project: Project) => void;
}

export function NewProjectDialog({ open, onClose, onCreated }: Props) {
  const notify = useNotify();
  const [name, setName] = useState('');
  const [kind, setKind] = useState<ProjectKind>('web');
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState(false);

  const nameError = touched && !name.trim() ? 'Dê um nome ao projeto.' : undefined;

  const reset = () => {
    setName('');
    setKind('web');
    setTouched(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!name.trim()) return;
    setSaving(true);
    try {
      const project = await createProject({ name: name.trim(), kind });
      onCreated(project);
      notify(`Projeto "${project.name}" criado.`, 'success');
      reset();
      onClose();
    } catch {
      notify('Não foi possível criar o projeto.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: { component: 'form', onSubmit: handleSubmit, noValidate: true } as object,
      }}
    >
      <DialogTitle>Novo projeto</DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <FormField
            label="Nome do projeto"
            placeholder="Ex.: App de finanças"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(nameError)}
            helperText={nameError}
            autoFocus
          />
          <Stack spacing={1}>
            <FormLabel>Tipo</FormLabel>
            <ToggleButtonGroup
              exclusive
              value={kind}
              onChange={(_, value: ProjectKind | null) => value && setKind(value)}
              aria-label="Tipo de projeto"
            >
              {KINDS.map((k) => (
                <ToggleButton key={k.value} value={k.value} sx={{ flex: 1 }}>
                  {k.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving} color="inherit">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={saving} sx={{ minWidth: 96 }}>
          {saving ? <CircularProgress size={20} color="inherit" /> : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
