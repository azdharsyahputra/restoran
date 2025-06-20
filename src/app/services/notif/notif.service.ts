// src/app/services/notif.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotifService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Ambil semua notifikasi
  getNotifikasi() {
    return this.http.get<any[]>(`${this.apiUrl}/notifikasi`);
  }

  // Tandai sebagai dibaca
  tandaiDibaca(id: number) {
    return this.http.post(`${this.apiUrl}/notifikasi/${id}/dibaca`, {});
  }
  getStatusPesananTerbaru(pengguna_id: number) {
  return this.http.get<any>(`${this.apiUrl}/pesanan/status-terbaru?pengguna_id=${pengguna_id}`);
}

}
