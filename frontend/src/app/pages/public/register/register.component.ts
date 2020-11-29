import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/components/UnSubOnDestroy';

import {
	ChangeRegisterForm,
	RegisterFormRequest,
} from './+state/register.acions';
import { RegisterForm } from './+state/register.reducer';
import { registerFormQuery } from './+state/register.selector';

type RegisterFormControls = Record<keyof RegisterForm, FormControl>;
@Component({
	selector: 'anomalia-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent
	extends UnsubscribeOnDestroyBaseComponent
	implements OnInit {
	formControls: RegisterFormControls = {
		username: new FormControl('', [Validators.required, Validators.min(4)]),
		password: new FormControl('', [
			Validators.required,
			Validators.pattern(
				'^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$'
			),
		]),
	};
	form = new FormGroup(this.formControls);
	isRequesting$: Observable<boolean> | undefined;
	constructor(private store: Store) {
		super();
	}
	ngOnInit(): void {
		this.isRequesting$ = this.store.pipe(
			select(registerFormQuery.getRegisterFormRequesting)
		);
		this.subscriptions.push(
			this.form.valueChanges.subscribe((x) =>
				this.store.dispatch(new ChangeRegisterForm(x))
			),
			this.store
				.pipe(select(registerFormQuery.getRegisterForm))
				.subscribe((x) => this.form.patchValue(x, { emitEvent: false }))
		);
	}

	onSave(): void {
		if (this.form.valid) {
			this.store.dispatch(new RegisterFormRequest());
		} else {
			this.form.markAllAsTouched();
		}
	}
}
