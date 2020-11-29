import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SetToken } from './core/core.state/core.actions';
import { IsAuthenticated } from './core/core.state/core.reducer';

@Component({
	selector: 'anomalia-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private store: Store) {}
	ngOnInit() {
		if (IsAuthenticated()) {
			this.store.dispatch(new SetToken());
		}
	}
}
