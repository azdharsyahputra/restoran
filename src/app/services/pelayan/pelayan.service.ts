// src/app/services/pelayan/pelayan.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PelayanService {

  private apiUrl = `${environment.apiUrl}/pelayan/reservasi`;

  constructor(private http: HttpClient) { }

  getReservasi(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get(this.apiUrl, { headers });
  }

  // Tambahkan method untuk ambil detail reservasi berdasarkan ID
  getDetailReservasi(reservasiId: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/${reservasiId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get(url, { headers });
  }

  // Jika ingin post konfirmasi meja juga, bisa tambah method ini
  konfirmasiMeja(reservasiId: number, data: any, token: string): Observable<any> {
    const url = `${this.apiUrl}/${reservasiId}/konfirmasi-meja`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.post(url, data, { headers });
  }
}
