import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard.component';
import { PlaceholderComponent } from './pages/placeholder.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'perfil', component: PlaceholderComponent, data: { nombre: 'Perfil de usuario' } },
            { path: 'tablas', component: PlaceholderComponent, data: { nombre: 'Lista de tablas' } },
            { path: 'tipografia', component: PlaceholderComponent, data: { nombre: 'Tipografía' } },
            { path: 'iconos', component: PlaceholderComponent, data: { nombre: 'Iconos' } },
            { path: 'mapas', component: PlaceholderComponent, data: { nombre: 'Mapas' } },
            { path: 'notificaciones', component: PlaceholderComponent, data: { nombre: 'Notificaciones' } },
        ],
    },
    { path: '**', redirectTo: '' },
];
