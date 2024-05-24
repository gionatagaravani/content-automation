import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Nfts', route: '/dashboard/nfts' },
            { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/play.svg',
          label: 'Automations',
          route: '/automations'
        },
        {
          icon: 'assets/icons/heroicons/outline/link.svg',
          label: 'Connections',
          route: '/connections'
        }
      ],
    }
  ];
}
