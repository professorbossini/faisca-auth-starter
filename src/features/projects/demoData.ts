import type { DashboardSummary, Member, Project } from './types';

export const demoMembers: Member[] = [
  { id: 'm1', name: 'Ana Lima', role: 'Product designer', email: 'ana.lima@exemplo.com' },
  { id: 'm2', name: 'Rafael Moura', role: 'Front-end', email: 'rafael@exemplo.com' },
  { id: 'm3', name: 'João Pedro', role: 'Back-end', email: 'jp@exemplo.com' },
  { id: 'm4', name: 'Thaís Souza', role: 'Tech lead', email: 'thais@exemplo.com' },
  { id: 'm5', name: 'Bruno Alves', role: 'QA', email: 'bruno@exemplo.com' },
  { id: 'm6', name: 'Carla Nunes', role: 'Data', email: 'carla@exemplo.com' },
];

const [ana, rafael, jp, thais, bruno, carla] = demoMembers as [
  Member,
  Member,
  Member,
  Member,
  Member,
  Member,
];

export const demoProjects: Project[] = [
  {
    id: 'p1',
    name: 'App de finanças',
    kind: 'mobile',
    status: 'in_progress',
    progress: 62,
    members: [ana, rafael],
    updatedAt: '2026-09-23T14:10:00Z',
  },
  {
    id: 'p2',
    name: 'Site institucional',
    kind: 'web',
    status: 'done',
    progress: 100,
    members: [jp],
    updatedAt: '2026-09-22T09:30:00Z',
  },
  {
    id: 'p3',
    name: 'Painel de vendas',
    kind: 'dashboard',
    status: 'review',
    progress: 34,
    members: [ana, thais],
    updatedAt: '2026-09-21T18:45:00Z',
  },
  {
    id: 'p4',
    name: 'API de pagamentos',
    kind: 'api',
    status: 'in_progress',
    progress: 48,
    members: [jp, bruno, carla],
    updatedAt: '2026-09-20T11:00:00Z',
  },
  {
    id: 'p5',
    name: 'Portal do aluno',
    kind: 'web',
    status: 'draft',
    progress: 8,
    members: [rafael],
    updatedAt: '2026-09-18T16:20:00Z',
  },
  {
    id: 'p6',
    name: 'App de entregas',
    kind: 'mobile',
    status: 'in_progress',
    progress: 76,
    members: [thais, bruno, ana, carla],
    updatedAt: '2026-09-17T08:05:00Z',
  },
];

export const demoSummary: DashboardSummary = {
  activeProjects: 12,
  activeProjectsDelta: 2,
  tasksToday: 8,
  urgentTasks: 3,
  completionRate: 94,
};
