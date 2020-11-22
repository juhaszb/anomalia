import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CoreState } from '../core.state/core.reducer';
import { CoreQuery } from '../core.state/core.selector';

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
		let token: string | undefined;
		this.store
			.pipe(select(CoreQuery.getAcceptToken))
			.subscribe((x) => (token = x))
			.unsubscribe();
		if (token) {
			return request.clone({
				headers: request.headers.append('Authorization', `Bearer ${token}`),
			});
		} else {
			return request;
		}
	}
}
