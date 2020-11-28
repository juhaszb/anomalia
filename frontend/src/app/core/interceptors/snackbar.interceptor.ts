import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {
	constructor(private snackbar: MatSnackBar) {}

	intercept(
		// tslint:disable-next-line: no-any
		req: HttpRequest<any>,
		next: HttpHandler
	) {
		return next.handle(req).pipe(
			catchError((error) => {
				console.log(error);
				if (error.status >= 400) {
					this.snackbar.open(
						error?.error
							? error?.error?.details ?? JSON.stringify(error.error)
							: 'Hiba történt',
						'',
						{
							duration: 2000,
							panelClass: 'error-snackbar',
						}
					);
				}
				return throwError(error);
			})
		);
	}
}
