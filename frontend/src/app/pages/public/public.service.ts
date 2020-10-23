import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LoginForm } from './login/+state/login.reducer';
import { RegisterForm } from './register/+state/register.reducer';

@Injectable()
export class PublicServiceService {
  constructor(private httpClient: HttpClient) {}

  register(form: RegisterForm) {
    //   return this.httpClient.post('/user/register', form);
    return new BehaviorSubject({}).asObservable();
  }
  login(form: LoginForm) {
    // return this.httpClient.post<LoginResponse>('/user/login', form);
    return new BehaviorSubject({
      acceptToken: 'asd',
      refreshToken: 'dsaf',
    }).asObservable();
  }
}
