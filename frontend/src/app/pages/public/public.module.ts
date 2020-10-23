import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedUiModule } from 'src/app/shared-ui.module';

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
  declarations: [RegisterComponent],
  imports: [
    PublicRoutingModule,
    SharedUiModule,
    EffectsModule.forFeature([RegisterFormEffects]),
    StoreModule.forFeature(REGISTERFORM_FEATURE_KEY, RegisterFormReducer, {
      initialState: registerFormInitialState,
    }),
  ],
  providers: [PublicServiceService],
})
export class PublicModule {}
