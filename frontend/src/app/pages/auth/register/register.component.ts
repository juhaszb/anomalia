import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/components/UnSubOnDestroy';

import { RegisterForm } from './+state/register.reducer';

type RegisterFormControls = Record<keyof RegisterForm, FormControl>;
@Component({
  selector: 'anomalia-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponentComponent
  extends UnsubscribeOnDestroyBaseComponent
  implements OnInit {
  formControls: RegisterFormControls = {
    username: new FormControl('', [Validators.required, Validators.min(4)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '"^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"'
      ),
    ]),
  };
  form = new FormGroup(this.formControls);
  constructor() {
    super();
  }
  ngOnInit(): void {}

  onSave(): void {
    if (this.form.valid) {
    } else {
      this.form.markAllAsTouched();
    }
  }
}
