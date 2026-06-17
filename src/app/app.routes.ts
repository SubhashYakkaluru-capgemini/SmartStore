import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login')
                .then(m => m.Login)
    },
    

    // ✅ Protected app layout
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./main/main')
                .then(m => m.Main),
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },
            {
                path: 'inventory',
                loadComponent: () =>
                    import('./features/inventory/inventory')
                        .then(m => m.Inventory)
            },
            {
                path: 'sales',
                loadComponent: () =>
                    import('./features/sales/sales')
                        .then(m => m.Sales)
            },
            {
                path: 'employees',
                loadComponent: () =>
                    import('./features/employees/employees')
                        .then(m => m.Employees)
            },
            {
                path: 'analytics',
                loadComponent: () =>
                    import('./features/analytics/analytics')
                        .then(m => m.Analytics)
            },

            // ✅ default redirect
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },

    // ✅ fallback
    {
        path: '**',
        redirectTo: 'login'
    }
];
