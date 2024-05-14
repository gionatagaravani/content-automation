import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { showDialog, showDialogQuestion, showToast } from 'src/app/shared/utils/alert';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  UserData: any;
  readonly URL = environment.backendUrl + '/auth';

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

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

  signIn(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(this.URL + '/login', body).pipe(
      catchError((err) => {
        showToast('error', err.error.message);
        return err.error;
      }),
      map((response: any) => {
        if (response.status === 'ok') {
          this.UserData = response.data;
          localStorage.setItem('user', response.token);
        }
      }),
    );
  }

  signOut(): void {
    showDialogQuestion('warning', 'Are you sure?', 'Where are you going?').then((result) => {
      if (result.isConfirmed) {
        showDialog('success', 'Goodbye!').then(() => {
          localStorage.removeItem('user');
          this.UserData = undefined;
          this.router.navigate(['/sign-in']);      
        })
      }
    });
  }
}
