import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LogoutRequest } from 'src/app/core/core.state/core.actions';
import { CoreState } from 'src/app/core/core.state/core.reducer';
import { CoreQuery } from 'src/app/core/core.state/core.selector';

@Component({
	selector: 'anomalia-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	userType$;
	constructor(private store: Store<CoreState>) {}
	ngOnInit() {
		this.userType$ = this.store.pipe(select(CoreQuery.getCurrentUserType));
	}

	logout() {
		this.store.dispatch(new LogoutRequest());
	}
}
