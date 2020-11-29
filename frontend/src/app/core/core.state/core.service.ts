import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Logout } from './core.reducer';

@Injectable()
export class CoreService {
	constructor(private httpClient: HttpClient) {}

	logout(token: Logout) {
		// tslint:disable-next-line: no-any
		return this.httpClient.post<any>(
			'user/logout?skipResponseSnackbar=true',
			token
		);
	}
}
