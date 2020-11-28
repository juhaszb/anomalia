import {
	HttpClient,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { SetToken } from '../core.state/core.actions';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
	constructor(private http: HttpClient, private store: Store) {}

	// tslint:disable-next-line: no-any
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			catchError((err) => {
				if (
					err.status === 401 &&
					!!localStorage.getItem('refresh') &&
					!req.url.includes('login')
				) {
					return this.http
						.post('user/refresh?skipResponseSnackbar=true', {
							refresh: localStorage.getItem('refresh'),
						})
						.pipe(
							// tslint:disable-next-line: no-any
							switchMap((data: any) => {
								localStorage.setItem('access', data.access);
								this.store.dispatch(new SetToken());
								return next.handle(req);
							})
						);
				} else {
					return throwError('');
				}
			})
		);
	}
}
