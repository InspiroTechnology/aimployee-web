import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { AuthLayoutComponent } from './auth/components/auth-layout/auth-layout.component';
import { authGuard } from './core/auth/auth.guard'; // Import authGuard

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], // Protect all child routes with authGuard
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-page/dashboard-page.component'
          ).then((m) => m.DashboardPageComponent),
      },
      {
        path: 'new-flow',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-new-flow/dashboard-new-flow.component'
          ).then((m) => m.DashboardNewFlowComponent),
      },
      {
        path: 'knowledge-garden',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-knowledge-garden/dashboard-knowledge-garden.component'
          ).then((m) => m.DashboardKnowledgeGardenComponent),
      },
      {
        path: 'explore-more',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-explore-more/dashboard-explore-more.component'
          ).then((m) => m.DashboardExploreMoreComponent),
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./features/upload/upload-page/upload-page.component').then(
            (m) => m.UploadPageComponent
          ),
      },
    ],
  },
];
