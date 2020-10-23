import { NgModule } from '@angular/core';
import { SharedUiModule } from 'src/app/shared-ui.module';

import { PublicRoutingModule } from './public.routing';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [PublicRoutingModule, SharedUiModule],
  providers: [],
})
export class PublicModule {}
