import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getUserList() {
    //   return this.httpClient.get('/user');
    return new BehaviorSubject([
      { id: '1', username: 'Kiskecske' },
      { id: '2', username: 'Kisgága' },
      { id: '3', username: 'Kiskutya' },
    ]).asObservable();
  }

  deleteUser(id: string) {
    //   return this.httpClient.delete('/user/'+id);
    return new BehaviorSubject({}).asObservable();
  }
}
