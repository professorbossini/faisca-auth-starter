import { createBrowserRouter } from 'react-router';
import { RedirectIfAuthenticated, RequireAuth } from '@/auth';
import { AppLayout } from '@/layouts/AppLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AccountPage } from '@/pages/AccountPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { TeamPage } from '@/pages/TeamPage';

/**
 * Public routes live under <AuthLayout>, private ones under <RequireAuth>.
 * Add new private pages as children of the AppLayout route.
 */
export const router = createBrowserRouter([
  {
    element: (
      <RedirectIfAuthenticated>
        <AuthLayout />
      </RedirectIfAuthenticated>
    ),
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, path: '/', element: <DashboardPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/team', element: <TeamPage /> },
      {
        path: '/components',
        lazy: async () => ({ Component: (await import('@/pages/ComponentsPage')).ComponentsPage }),
      },
      { path: '/account', element: <AccountPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
