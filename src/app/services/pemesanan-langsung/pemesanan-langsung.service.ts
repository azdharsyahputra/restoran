import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PemesananLangsungService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token tidak ditemukan di localStorage');
      return new HttpHeaders(); 
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getMeja() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/pelayan/meja`, { headers });
  }

  getMenu() {
    return this.http.get(`${this.apiUrl}/menu`);
  }

  buatPemesanan(data: any) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/pemesanan-langsung`, data, { headers });
  }

  
}
