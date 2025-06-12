import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PembayaranService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Mendapatkan Snap Token Midtrans
  getMidtransToken(token: string, reservasiId: string, amount: number, name: string, email: string) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post(`${this.baseUrl}/midtrans/token`, {
      reservasi_id: reservasiId,
      amount,
      name,
      email
    }, { headers });
  }

  // Simpan pembayaran manual (Transfer / COD)
  simpanManual(token: string, data: { reservasi_id: string; metode: string; bukti: File }) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const formData = new FormData();

    formData.append('reservasi_id', data.reservasi_id);
    formData.append('metode', data.metode);
    formData.append('bukti', data.bukti);
    formData.append('dibuat_oleh', 'pelanggan');

    return this.http.post(`${this.baseUrl}/pembayaran/manual`, formData, { headers });
  }
}
