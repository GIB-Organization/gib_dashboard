import { Routes } from '@angular/router';
import { ERoutes } from './core/enums';
import { AuthGuard, GuestGuard } from './core/guards/auth/auth.guard';

const settingsLayoutRoutes: Routes = [
    {
        path: ERoutes.settings,
        loadComponent: () => import('./views/settings/settings.component').then(m => m.SettingsComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: `${ERoutes.generalSettings}`,
                pathMatch: 'full'
            },
            {
                path: ERoutes.generalSettings,
                loadComponent: () => import('./views/settings/general/general.component').then(m => m.GeneralComponent),
                data:{animation:'general'}
            },
        ]
    }
]

const mainLayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: `${ERoutes.statistics}`,
                pathMatch: 'full'
            },
            {
                path: ERoutes.statistics,
                loadComponent: () => import('./views/statistics/statistics.component').then(m => m.StatisticsComponent),
                data:{animation:ERoutes.statistics}
            },
            {
                path: ERoutes.users,
                loadComponent: () => import('./views/users/users.component').then(m => m.UsersComponent),
                data:{animation:ERoutes.users}
            },
            {
                path: `${ERoutes.user}`,
                loadComponent: () => import('./views/users/user/user.component').then(m => m.UserComponent),
                data:{animation:ERoutes.user}
            },
            {
                path: ERoutes.policies,
                loadComponent: () => import('./views/policies/policies.component').then(m => m.PoliciesComponent),
                data:{animation:ERoutes.policies}
            },
            {
                path: ERoutes.clients,
                loadComponent: () => import('./views/clients/clients.component').then(m => m.ClientsComponent),
                data:{animation:ERoutes.clients}
            },
            {
                path: ERoutes.tickets,
                loadComponent: () => import('./views/tickets/tickets.component').then(m => m.TicketsComponent),
                data:{animation:ERoutes.tickets}
            },
            {
                path: ERoutes.promoCodes,
                loadComponent: () => import('./views/promo-codes/promo-codes.component').then(m => m.PromoCodesComponent),
                data:{animation:ERoutes.promoCodes}
            },
            {
                path: ERoutes.blogs,
                loadComponent: () => import('./views/blogs/blogs.component').then(m => m.BlogsComponent),
                data:{animation:ERoutes.blogs}
            },
            {
                path: `${ERoutes.blogs}/:id`,
                loadComponent: () => import('./views/single-blog/single-blog.component').then(m => m.SingleBlogComponent),
                data:{animation:ERoutes.blogs}
            },
            {
                path: `${ERoutes.ticket}/:id`,
                loadComponent: () => import('./views/single-ticket/single-ticket.component').then(m => m.SingleTicketComponent),
                data:{animation:ERoutes.ticket}
            },
            ...settingsLayoutRoutes
        ],
    }
]
const authLayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        canActivate: [GuestGuard],
        children: [
            {
                path: '',
                redirectTo: `${ERoutes.login}`,
                pathMatch: 'full'
            },
            {
                path: ERoutes.login,
                loadComponent: () => import('./views/auth/login/login.component').then(m => m.LoginComponent),
            },
            {
                path: ERoutes.forgotPassword,
                loadComponent: () => import('./views/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
            },
        ]
    }
]






export const routes: Routes = [
    ...mainLayoutRoutes,
    ...authLayoutRoutes,
    ...settingsLayoutRoutes,
];
