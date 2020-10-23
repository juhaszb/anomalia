import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedUiModule } from 'src/app/shared-ui.module';

import { LoginFormEffects } from './login/+state/login.effects';
import {
  LOGINFORM_FEATURE_KEY,
  loginFormInitialState,
  LoginFormReducer,
} from './login/+state/login.reducer';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public.routing';
import { PublicServiceService } from './public.service';
import { RegisterFormEffects } from './register/+state/register.effects';
import {
  REGISTERFORM_FEATURE_KEY,
  registerFormInitialState,
  RegisterFormReducer,
} from './register/+state/register.reducer';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedUiModule,
    EffectsModule.forFeature([RegisterFormEffects]),
    StoreModule.forFeature(REGISTERFORM_FEATURE_KEY, RegisterFormReducer, {
      initialState: registerFormInitialState,
    }),
    EffectsModule.forFeature([LoginFormEffects]),
    StoreModule.forFeature(LOGINFORM_FEATURE_KEY, LoginFormReducer, {
      initialState: loginFormInitialState,
    }),
  ],
  providers: [PublicServiceService],
})
export class PublicModule {}
