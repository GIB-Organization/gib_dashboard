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
            {
                path: ERoutes.seo,
                loadComponent: () => import('./views/settings/seo/seo.component').then(m => m.SeoComponent),
                data:{animation:'seo'}
            },
            {
                path: ERoutes.changePassword,
                loadComponent: () => import('./views/settings/change-password/change-password.component').then(m => m.ChangePasswordComponent),
                data:{animation:'seo'}
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
                path: `${ERoutes.client}`,
                loadComponent: () => import('./views/clients/client/client.component').then(m => m.ClientComponent),
                data:{animation:ERoutes.client}
            },
            {
                path: ERoutes.tickets,
                loadComponent: () => import('./views/tickets/tickets.component').then(m => m.TicketsComponent),
                data:{animation:ERoutes.tickets}
            },
            {
                path: `${ERoutes.ticket}`,
                loadComponent: () => import('./views/tickets/ticket/ticket.component').then(m => m.TicketComponent),
                data:{animation:ERoutes.ticket}
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
                path: `${ERoutes.blog}`,
                loadComponent: () => import('./views//blogs/blog/blog.component').then(m => m.BlogComponent),
                data:{animation:ERoutes.blog}
            },
            {
                path: ERoutes.contacts,
                loadComponent: () => import('./views/contacts/contacts.component').then(m => m.ContactsComponent),
                data:{animation:ERoutes.contacts}
            },
            {
                path: ERoutes.faqs,
                loadComponent: () => import('./views/faqs/faqs.component').then(m => m.FaqsComponent),
                data:{animation:ERoutes.faqs}
            },
            {
                path: `${ERoutes.faq}`,
                loadComponent: () => import('./views/faqs/faq/faq.component').then(m => m.FaqComponent),
                data:{animation:ERoutes.faq}
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
            {
                path: ERoutes.resetPassword,
                loadComponent: () => import('./views/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
            },
        ]
    }
]






export const routes: Routes = [
    ...mainLayoutRoutes,
    ...authLayoutRoutes,
    ...settingsLayoutRoutes,
];
