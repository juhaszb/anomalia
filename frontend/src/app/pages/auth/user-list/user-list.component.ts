import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/core/core.state/core.reducer';
import { CoreQuery } from 'src/app/core/core.state/core.selector';

import {
  UserListDeleteRequest,
  UserListRequest,
} from './+state/user-list.acions';
import { User } from './+state/user-list.reducer';
import { UserListQuery } from './+state/user-list.selector';

@Component({
  selector: 'anomalia-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  isRequesting$: Observable<boolean>;
  isDeleteRequesting$: Observable<boolean>;
  userList$: Observable<User[]>;
  deleteId$: Observable<string>;
  userType$: Observable<UserType | undefined> | undefined;

  constructor(private store: Store) {}

  displayedColumns = ['username', 'operations'];

  ngOnInit(): void {
    this.store.dispatch(new UserListRequest());
    this.isRequesting$ = this.store.pipe(
      select(UserListQuery.getUserListRequesting)
    );
    this.isDeleteRequesting$ = this.store.pipe(
      select(UserListQuery.getUserDeleteRequesting)
    );
    this.deleteId$ = this.store.pipe(select(UserListQuery.getDeleteId));
    this.userList$ = this.store.pipe(select(UserListQuery.getUserList));
    this.userType$ = this.store.pipe(select(CoreQuery.getCurrentUserType));
  }

  delete(id: string) {
    this.store.dispatch(new UserListDeleteRequest(id));
  }
}
