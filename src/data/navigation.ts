export interface NavLink {
  label: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Apps', href: '/apps/' },
  { label: 'About', href: '/about/' },
  { label: 'Support', href: '/support/' },
];

export const footerNavLinks: NavLink[] = [
  { label: 'Apps', href: '/apps/' },
  { label: 'About', href: '/about/' },
  { label: 'Support', href: '/support/' },
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Developer Info', href: '/app-support/' },
];
