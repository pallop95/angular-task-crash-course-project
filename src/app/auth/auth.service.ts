import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { ResponseLogin } from '../interface/Response-login';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5001/login';

  private isAuthenticated = false;
  // private token: string = '';
  // private tokenTimer: any;
  private userId: string | null = null;
  private roleId: string | null = null;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  // getToken() {
  //   return this.token;
  // }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getRoleId() {
    return this.roleId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // createUser(email: string, password: string) {
  //   const authData: AuthData = { email: email, password: password };
  //   this.http
  //     .post("http://localhost:3000/api/user/signup", authData)
  //     .subscribe(() => {
  //       this.router.navigate(["/"]);
  //     }, error => {
  //       this.authStatusListener.next(false);
  //     });
  // }

  login(userId: string, password: string) {
    console.log('login...')
    const authData: AuthData = { userId, password };
    this.http
      // .post<{ token: string; expiresIn: number; userId: string }>(
      // .post<ResponseLogin>(
      .get<ResponseLogin>(
        this.apiUrl
        // authData
      )
      .subscribe(
        (response) => {
          // const token = response.token;
          // this.token = token;
          // if (token) {
          //   const expiresInDuration = response.expiresIn;
          //   this.setAuthTimer(expiresInDuration);
          //   this.isAuthenticated = true;
          //   this.userId = response.userId;
          //   this.authStatusListener.next(true);
          //   const now = new Date();
          //   const expirationDate = new Date(
          //     now.getTime() + expiresInDuration * 1000
          //   );
          //   console.log(expirationDate);
          //   this.saveAuthData(token, expirationDate, this.userId);
          //   this.router.navigate(["/"]);
          // }
          console.log('response', response);
          const success = response.isSuccess;

          if (success) {
            this.userId = response.detail.userId;
            this.roleId = response.role.id;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAuthData(this.userId, this.roleId);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  // autoAuthUser() {
  //   const authInformation = this.getAuthData();
  //   if (!authInformation) {
  //     return;
  //   }
  //   const now = new Date();
  //   const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  //   if (expiresIn > 0) {
  //     this.token = authInformation.token;
  //     this.isAuthenticated = true;
  //     this.userId = authInformation.userId;
  //     this.setAuthTimer(expiresIn / 1000);
  //     this.authStatusListener.next(true);
  //   }
  // }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    if (authInformation) {
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.roleId = authInformation.roleId;
      this.authStatusListener.next(true);
    }
  }

  // logout() {
  //   this.token = null;
  //   this.isAuthenticated = false;
  //   this.authStatusListener.next(false);
  //   this.userId = null;
  //   clearTimeout(this.tokenTimer);
  //   this.clearAuthData();
  //   this.router.navigate(["/"]);
  // }
  logout() {
    this.roleId = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    // clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // private setAuthTimer(duration: number) {
  //   console.log("Setting timer: " + duration);
  //   this.tokenTimer = setTimeout(() => {
  //     this.logout();
  //   }, duration * 1000);
  // }

  // private saveAuthData(token: string, expirationDate: Date, userId: string) {
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("expiration", expirationDate.toISOString());
  //   localStorage.setItem("userId", userId);
  // }
  private saveAuthData(userId: string, roleId: string) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('roleId', roleId);
  }

  // private clearAuthData() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("expiration");
  //   localStorage.removeItem("userId");
  // }
  private clearAuthData() {
    localStorage.removeItem('roleId');
    localStorage.removeItem('userId');
  }

  // private getAuthData() {
  //   const token = localStorage.getItem("token");
  //   const expirationDate = localStorage.getItem("expiration");
  //   const userId = localStorage.getItem("userId");
  //   if (!token || !expirationDate) {
  //     return;
  //   }
  //   return {
  //     token: token,
  //     expirationDate: new Date(expirationDate),
  //     userId: userId
  //   };
  // }
  private getAuthData() {
    const roleId = localStorage.getItem('roleId');
    const userId = localStorage.getItem('userId');
    if (!roleId || !userId) {
      return;
    }
    return {
      roleId: roleId,
      userId: userId,
    };
  }
}
