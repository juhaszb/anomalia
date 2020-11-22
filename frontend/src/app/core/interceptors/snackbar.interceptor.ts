import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {
	constructor(private snackbar: MatSnackBar) {}

	intercept(
		// tslint:disable-next-line: no-any
		req: HttpRequest<any>,
		next: HttpHandler
		// tslint:disable-next-line: no-any
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status >= 400) {
					this.snackbar.open('Hiba történt', '', {
						duration: 2000,
						panelClass: 'error-snackbar',
					});
				}
				return throwError(error);
			})
		);
	}
}
