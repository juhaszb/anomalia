import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bejelentkezett',
    },
    component: AuthComponent,
    children: [
      // {
      //     path: 'list',
      //     data: {
      //       title: 'Animáció lista',
      //     },
      //     component: ,
      //   },
      {
        path: 'user',
        data: {
          title: 'Bejelentkezés',
        },
        component: UserListComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
