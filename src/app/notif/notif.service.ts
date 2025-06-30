import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotifService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Ambil semua notifikasi berdasarkan token (Laravel akan mengenali pengguna dari token ini)
  getNotifikasiWithToken() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/notifikasi`, { headers });
  }

  // Tandai notifikasi sudah dibaca berdasarkan id, juga dengan token
  tandaiDibaca(notifikasiId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/notifikasi/${notifikasiId}/baca`, {}, { headers });
  }
}
