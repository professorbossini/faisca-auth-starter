import DashboardRounded from '@mui/icons-material/SpaceDashboardRounded';
import FolderRounded from '@mui/icons-material/FolderRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import WidgetsRounded from '@mui/icons-material/WidgetsRounded';

/** Main navigation. Add your app's sections here. */
export const NAV_ITEMS = [
  { to: '/', label: 'Início', icon: DashboardRounded },
  { to: '/projects', label: 'Projetos', icon: FolderRounded },
  { to: '/team', label: 'Equipe', icon: GroupsRounded },
  { to: '/components', label: 'Componentes', icon: WidgetsRounded },
] as const;

export function activeNavItem(pathname: string) {
  const match = [...NAV_ITEMS]
    .sort((a, b) => b.to.length - a.to.length)
    .find((item) => (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)));
  return match?.to ?? false;
}
