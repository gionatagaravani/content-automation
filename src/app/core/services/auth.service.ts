import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserData: any;

  constructor(private readonly router: Router) { }

  //get Authenticated user from Local Storage
  getAuthLocal() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user;
  }
  //get Authenticated user from Local Storage
  getAuthToken() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user.token;
  }

  //Check wither User Is looged in or not
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }
}
