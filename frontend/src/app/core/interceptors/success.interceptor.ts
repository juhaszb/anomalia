import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {
	constructor(private snackbar: MatSnackBar) {}

	intercept(
		// tslint:disable-next-line: no-any
		req: HttpRequest<any>,
		next: HttpHandler
		// tslint:disable-next-line: no-any
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap((evt) => {
				if (evt instanceof HttpResponse) {
					if (
						evt.status <= 400 &&
						['PUT', 'PATCH', 'DELETE', 'POST'].includes(req.method) &&
						req.params.get('skipResponseSnackbar') !== 'true'
					) {
						this.snackbar.open(
							req.method === 'POST' ? 'Sikeres felvétel' : 'Sikeres módosítás',
							'',
							{
								duration: 2000,
								panelClass: 'success-snackbar',
							}
						);
					}
				}
			})
		);
	}
}
