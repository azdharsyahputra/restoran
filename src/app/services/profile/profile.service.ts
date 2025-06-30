// src/app/services/profile/profile.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; // ✅ Import environment

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

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

  async loadUserProfile() {
    try {
      const res: any = await this.getProfile();
      return {
        ...res.data,
        foto: res.data.foto || ''
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
