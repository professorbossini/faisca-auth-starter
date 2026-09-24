export type ProjectStatus = 'in_progress' | 'done' | 'review' | 'draft';
export type ProjectKind = 'mobile' | 'web' | 'dashboard' | 'api';

export interface Member {
  id: string;
  name: string;
  role?: string;
  email?: string;
  photoUrl?: string | null;
}

export interface Project {
  id: string;
  name: string;
  kind: ProjectKind;
  status: ProjectStatus;
  /** 0–100 */
  progress: number;
  members: Member[];
  updatedAt: string;
}

export interface DashboardSummary {
  activeProjects: number;
  activeProjectsDelta: number;
  tasksToday: number;
  urgentTasks: number;
  completionRate: number;
}
