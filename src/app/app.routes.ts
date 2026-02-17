import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'documentation',
    loadComponent: () => import('./pages/documentation/documentation.component').then(m => m.DocumentationComponent),
    children: [
      {
        path: '',
        redirectTo: 'getting-started',
        pathMatch: 'full'
      },
      {
        path: 'getting-started',
        loadComponent: () => import('./pages/documentation/getting-started/getting-started.component').then(m => m.GettingStartedComponent)
      },
      {
        path: 'features',
        loadComponent: () => import('./pages/documentation/features/features.component').then(m => m.FeaturesComponent)
      },
      {
        path: 'faq',
        loadComponent: () => import('./pages/documentation/faq/faq.component').then(m => m.FaqComponent)
      }
    ]
  },
  {
    path: 'support',
    loadComponent: () => import('./pages/support/support.component').then(m => m.SupportComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
