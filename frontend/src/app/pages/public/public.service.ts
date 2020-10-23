import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RegisterForm } from './register/+state/register.reducer';

@Injectable()
export class PublicServiceService {
  constructor(private httpClient: HttpClient) {}

  register(form: RegisterForm) {
    return this.httpClient.post('/user/register', form);
  }
}
