export interface NavItem {
    label: string;
    href: string;
}

export const navigationItems: NavItem[] = [
    { label: 'E-Rechnung erstellen', href: '/create' },
    { label: 'E-Rechnung/X-Rechnung lesen', href: '/read' },
    { label: 'Warum bin ich hier?', href: '/' }
];
