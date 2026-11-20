import { Routes } from '@angular/router';
import { ListaTareas } from './lista-tareas/lista-tareas';

export const routes: Routes = [
    { path: '', component: ListaTareas, title: 'Tareas' },
    {
        path: 'acerca',
        loadComponent: () => import('./acerca/acerca').then((m) => m.Acerca),
        title: 'Acerca de',
    },
    {
        path: 'remotas',
        loadComponent: () => import('./remotas/remotas').then((m) => m.Remotas),
        title: 'Tareas remotas',
    },
    {
        path: 'tarea/:id',
        loadComponent: () =>
            import('./detalle-tarea/detalle-tarea').then((m) => m.DetalleTarea),
        title: 'Detalle de tarea',
    },
    { path: '**', redirectTo: '' },
];
