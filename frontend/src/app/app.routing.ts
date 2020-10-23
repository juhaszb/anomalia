import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'public',
    data: {
      title: 'Publikus oldal',
    },
    loadChildren: () =>
      import('./pages/public/public.module').then((e) => e.PublicModule),
  },
  {
    path: 'auth',
    canActivate: [UnauthGuard],
    canActivateChild: [UnauthGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((e) => e.AuthModule),
  },
  { path: '', redirectTo: 'public', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
