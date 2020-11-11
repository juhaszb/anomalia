import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoreState, UserType } from 'src/app/core/core.state/core.reducer';
import { CoreQuery } from 'src/app/core/core.state/core.selector';

@Component({
  selector: 'anomalia-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  userType$: Observable<UserType | undefined> | undefined;
  constructor(private store: Store<CoreState>) {}
  ngOnInit() {
    this.userType$ = this.store.pipe(select(CoreQuery.getCurrentUserType));
  }

  logout() {
    //TODO delete tokens
    //TODO navigate to login screen
  }
}
