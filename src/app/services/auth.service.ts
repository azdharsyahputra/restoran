import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // login(data: any) {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }
  
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data); 
  }

 
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

 
  logout() {
    localStorage.removeItem('token');
  }
}
