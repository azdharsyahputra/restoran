// src/app/services/profile/profile.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/api';
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Fungsi lama, tetap ada, untuk request GET profile langsung (raw dari backend)
  getProfile() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers }).toPromise();
  }

  // Fungsi baru: ambil profil + proses baseUrl foto supaya mudah dipakai di komponen
  async loadUserProfile() {
    try {
      const res: any = await this.getProfile();
      return {
        ...res.data,
        foto: res.data.foto ? `${this.baseUrl}${res.data.foto}` : ''
      };
    } catch (error) {
      console.error('Gagal ambil profil:', error);
      return null;
    }
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

  // Fungsi update profile (PUT)
  updateProfile(data: any) {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/profile`, data, { headers }).toPromise();
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }


}
