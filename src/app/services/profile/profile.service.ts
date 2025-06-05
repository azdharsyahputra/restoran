// src/app/services/profile/profile.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/api';
  // http://localhost:8000/storage/profile/run.jpg

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getProfile() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers }).toPromise();
  }

  saveUser(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUserFromLocalStorage() {
    const nama = localStorage.getItem('nama');
  const email = localStorage.getItem('email');
  if (nama && email) {
    return {
      nama,
      email,
      telepon: '',
      role: '',
      foto: ''
    };
  }
  return null;
}

  updateProfile(data: any) {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/profile`, data, { headers }).toPromise();
  }
}
