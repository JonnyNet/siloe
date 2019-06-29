import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    // {
    //     path: '404',
    //     component: P404Component,
    //     data: {
    //         title: 'Page 404'
    //     }
    // },
    // {
    //     path: '500',
    //     component: P500Component,
    //     data: {
    //         title: 'Page 500'
    //     }
    // },
    // {
    //     path: 'register',
    //     component: RegisterComponent,
    //     data: {
    //         title: 'Register Page'
    //     }
    // },
    {
        path: 'auth',
        loadChildren: './views/auth/auth.module#AuthModule'
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'config',
                loadChildren: './views/config/config.module#ConfigModule',
                data: {
                    title: 'Configuracion'
                }
            },
            {
                path: 'seguridad',
                loadChildren: './views/seguridad/seguridad.module#SeguridadModule',
                data: {
                    title: 'Seguridad'
                }
            },
            {
                path: 'tesoreria',
                loadChildren: './views/tesoreria/tesoreria.module#TesoreriaModule',
                data: {
                    title: 'Tesoreria'
                }
            },
            {
                path: 'user',
                loadChildren: './views/user/user.module#UserModule',
                data: {
                    title: 'Usuario'
                }
            }
        ]
    },
    //{ path: '**', component: P404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
