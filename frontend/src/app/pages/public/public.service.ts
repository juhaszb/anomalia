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

    //Login with Admin
    return new BehaviorSubject({
      acceptToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2MDM0NzQ3NDksImV4cCI6MTYzNTAxMDc0OSwiYXVkIjoiIiwic3ViIjoiIiwidXNlck5hbWUiOiJLaXNrYWNzYSIsInVzZXJUeXBlIjoiQWRtaW4ifQ.8z4jhCPGMcHnTs7Y1D6y1oH7f5KxMIWu92mSHOLB-ks',
      refreshToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2MDM0NzQ3NDksImV4cCI6MTYzNTAxMDc0OSwiYXVkIjoiIiwic3ViIjoiIiwidXNlck5hbWUiOiJLaXNrYWNzYSIsInVzZXJUeXBlIjoiU2FqdCJ9.oF19AOSG5B1xtR1axm9eWqC8OTPp6NoeqZCxbPtmKr4',
    }).asObservable();

    //Login with User
    // return new BehaviorSubject({
    //   acceptToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2MDM0NzQ3NDksImV4cCI6MTYzNTAxMDc0OSwiYXVkIjoiIiwic3ViIjoiIiwidXNlck5hbWUiOiJLaXNsaWJhIiwidXNlclR5cGUiOiJVc2VyIn0.j3EfahmGw2YrfqCL9VOH_DxqTFXpDYGWzFA4xPyWG8s',
    //   refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2MDM0NzQ3NDksImV4cCI6MTYzNTAxMDc0OSwiYXVkIjoiIiwic3ViIjoiIiwidXNlck5hbWUiOiJLaXNrYWNzYSIsInVzZXJUeXBlIjoiU2FqdCJ9.oF19AOSG5B1xtR1axm9eWqC8OTPp6NoeqZCxbPtmKr4',
    // }).asObservable();
  }
}
