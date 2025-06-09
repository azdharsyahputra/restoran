// src/app/services/auth.service.ts
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

  // === API ===
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // === SESSION HANDLING ===
  saveSession(data: {
    token: string,
    role: string,
    nama: string,
    email: string,
    pengguna_id: string
  }) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role.trim());
    localStorage.setItem('nama', data.nama);
    localStorage.setItem('email', data.email);
    localStorage.setItem('pengguna_id', data.pengguna_id);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return !!token && !!role;
  }

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

  logout() {
    localStorage.clear();
  }
}
