import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedUiModule } from 'src/app/shared-ui.module';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing';
import { AuthService } from './auth.service';
import { UserListEffects } from './user-list/+state/user-list.effects';
import {
  USERLIST_FEATURE_KEY,
  UserListInitialState,
  UserListReducer,
} from './user-list/+state/user-list.reducer';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserListComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedUiModule,
    EffectsModule.forFeature([UserListEffects]),
    StoreModule.forFeature(USERLIST_FEATURE_KEY, UserListReducer, {
      initialState: UserListInitialState,
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
