import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/components/UnSubOnDestroy';

import {
  ChangeLoginForm,
  LoginFormRequest,
} from './+state/animation-list.acions';
import { LoginForm } from './+state/animation-list.reducer';
import { LoginFormQuery } from './+state/animation-list.selector';

type LoginFormControls = Record<keyof LoginForm, FormControl>;
@Component({
  selector: 'anomalia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends UnsubscribeOnDestroyBaseComponent
  implements OnInit {
  formControls: LoginFormControls = {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  };
  form = new FormGroup(this.formControls);
  isRequesting$: Observable<boolean> | undefined;
  constructor(private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.isRequesting$ = this.store.pipe(
      select(LoginFormQuery.getLoginFormRequesting)
    );
    this.subscriptions.push(
      this.form.valueChanges.subscribe((x) =>
        this.store.dispatch(new ChangeLoginForm(x))
      ),
      this.store
        .pipe(select(LoginFormQuery.getLoginForm))
        .subscribe((x) => this.form.patchValue(x, { emitEvent: false }))
    );
  }

  onSave(): void {
    if (this.form.valid) {
      this.store.dispatch(new LoginFormRequest());
    } else {
      this.form.markAllAsTouched();
    }
  }
}
