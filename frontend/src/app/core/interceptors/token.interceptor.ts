import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CoreState } from '../core.state/core.reducer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private store: Store<CoreState>) {}
	intercept(
		// tslint:disable-next-line: no-any
		req: HttpRequest<any>,
		next: HttpHandler
		// tslint:disable-next-line: no-any
	): Observable<HttpEvent<any>> {
		return next.handle(this.setToken(req));
	}
	// tslint:disable-next-line: no-any
	private setToken(request: HttpRequest<any>): HttpRequest<any> {
		const token = localStorage.getItem('access');

		if (token) {
			return request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		} else {
			return request;
		}
	}
}
