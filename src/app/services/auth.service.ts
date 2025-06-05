import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // getRole(): string | null {
  //   return localStorage.getItem('role');
  // }

  getRole(): string {
    return localStorage.getItem('role')?.trim() ?? '';
  }



  getUser(): any {
    return {
      nama: localStorage.getItem('nama'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      pengguna_id: localStorage.getItem('pengguna_id'),
    };
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('nama');
    localStorage.removeItem('pengguna_id');
  }
}
