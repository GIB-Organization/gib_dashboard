import { Routes } from '@angular/router';
import { ERoutes } from './core/enums';

const mainLayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: `${ERoutes.statistics}`,
                pathMatch: 'full'
            },
            {
                path: ERoutes.statistics,
                loadComponent: () => import('./views/statistics-view/statistics-view.component').then(m => m.StatisticsViewComponent),
            }
        ]
    }
]




export const routes: Routes = [
    ...mainLayoutRoutes,
];
