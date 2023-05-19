import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:3000/auth/";
  constructor(private http: HttpClient, private router:Router) { }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}signin`, loginObj, {
      withCredentials: true}).pipe(
        tap(response => {
          const token = response.token;
          if (token) {
            this.storeToken(token);
          }
          
        })
      );
  }

  logOut() {
    return this.http.get<any>(`${this.baseUrl}signout`)
  }

  storeToken(tokenValue:string) {
    localStorage.setItem('token', tokenValue);
    console.log(tokenValue);
  }
  

  getToken() {
    alert("get token called")
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
}
