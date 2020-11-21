import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    // tslint:disable-next-line: no-any
    req: HttpRequest<any>,
    next: HttpHandler
    // tslint:disable-next-line: no-any
  ): Observable<HttpEvent<any>> {
    this.showSnackbar(req, next);
    return next.handle(req);
  }

  // tslint:disable-next-line: no-any
  private showSnackbar(req: HttpRequest<any>, next: HttpHandler) {
    next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.status >= 305) {
          this.openSnackBar('Sikertelen művelet', ['errorSnackBar']);
        } else {
          this.openSnackBar('Sikeres művelet', ['successSnackBar']);
        }
      })
    );
  }

  openSnackBar(message: string, classes: string[]) {
    this.snackBar.open(message, 'Bezárás', {
      duration: 2000,
      panelClass: classes,
    });
  }
}
