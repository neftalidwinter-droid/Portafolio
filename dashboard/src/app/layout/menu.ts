export interface MenuItem {
    path: string;
    label: string;
    icon: string;
}
export const MENU: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/perfil', label: 'Perfil de usuario', icon: 'person' },
    { path: '/tablas', label: 'Lista de tablas', icon: 'content_paste' },
    { path: '/tipografia', label: 'Tipografía', icon: 'library_books' },
    { path: '/iconos', label: 'Iconos', icon: 'bubble_chart' },
    { path: '/mapas', label: 'Mapas', icon: 'location_on' },
    { path: '/notificaciones', label: 'Notificaciones', icon: 'notifications' },
];
