import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoreState, UserType } from 'src/app/core/core.state/core.reducer';
import { CoreQuery } from 'src/app/core/core.state/core.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'anomalia-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  userType$: Observable<UserType | undefined> | undefined;
  constructor(private store: Store<CoreState>, private router: Router) {}
  ngOnInit() {
    this.userType$ = this.store.pipe(select(CoreQuery.getCurrentUserType));
  }

  logout() {
    //TODO send logout request
    this.store.pipe(select(CoreQuery.deleteCredentials));
    this.router.navigate(['/public/login']);
  }
}
