import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'list',
  //   data: {
  //     title: 'Animáció lista',
  //   },
  //   component: ,
  // },
  // {
  //   path: 'user',
  //   data: {
  //     title: 'Bejelentkezés',
  //   },
  //   component: LoginComponent,
  // },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
