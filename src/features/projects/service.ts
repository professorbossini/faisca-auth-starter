import { api } from '@/api';
import { env } from '@/config/env';
import { demoMembers, demoProjects, demoSummary } from './demoData';
import type { DashboardSummary, Member, Project, ProjectKind } from './types';

/**
 * Data access for the demo screens. When VITE_API_URL is set, calls your API
 * (with the auth token attached automatically); otherwise returns demo data.
 * Use this file as the pattern for your own features.
 */
const useApi = Boolean(env.apiUrl);

function delay<T>(value: T, signal?: AbortSignal, ms = 600): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(structuredClone(value)), ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(signal.reason);
    });
  });
}

export function listProjects(signal?: AbortSignal): Promise<Project[]> {
  return useApi ? api.get<Project[]>('/projects', { signal }) : delay(demoProjects, signal);
}

export function getDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  return useApi
    ? api.get<DashboardSummary>('/dashboard', { signal })
    : delay(demoSummary, signal, 400);
}

export function listMembers(signal?: AbortSignal): Promise<Member[]> {
  return useApi ? api.get<Member[]>('/team', { signal }) : delay(demoMembers, signal);
}

export interface NewProjectInput {
  name: string;
  kind: ProjectKind;
}

export function createProject(input: NewProjectInput): Promise<Project> {
  if (useApi) return api.post<Project>('/projects', input);
  return delay<Project>(
    {
      id: crypto.randomUUID(),
      name: input.name,
      kind: input.kind,
      status: 'draft',
      progress: 0,
      members: [],
      updatedAt: new Date().toISOString(),
    },
    undefined,
    500,
  );
}
