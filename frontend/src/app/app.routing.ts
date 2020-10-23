import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'public',
    data: {
      title: 'Publikus oldal',
    },
    loadChildren: () =>
      import('./pages/public/public.module').then((e) => e.PublicModule),
  },
  // { path: 'auth', canActivate: undefined, canActivateChild: undefined },
  { path: '', redirectTo: 'public', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
