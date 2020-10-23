import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    data: {
      title: 'Regisztráció',
    },
    component: RegisterComponent,
  },
  {
    path: 'login',
    data: {
      title: 'Bejelentkezés',
    },
    component: LoginComponent,
  },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
