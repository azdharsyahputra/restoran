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
  // getMidtransToken(token: string, reservasiId: string, amount: number, name: string, email: string) {
  //   const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

  //   return this.http.post(`${this.baseUrl}/midtrans/token`, {
  //     reservasi_id: reservasiId,
  //     amount,
  //     name,
  //     email
  //   }, { headers });
  // }
  getMidtransToken(token: string, reservasiId: string, total: number, nama: string, email: string, metode: string) {
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const body = {
      reservasi_id: reservasiId,
      name: nama,
      email: email,
      metode: metode // ← tambahkan
    };

    return this.http.post(`${this.baseUrl}/midtrans/token`, body, { headers });
  }


  // buat upload bukti manual

  // Upload bukti pembayaran setelah reservasi
  uploadBukti(token: string, data: { pembayaran_id: string; bukti: File }) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const formData = new FormData();

    formData.append('pembayaran_id', data.pembayaran_id);
    formData.append('bukti', data.bukti);

    return this.http.post(`${this.baseUrl}/midtrans/upload-bukti`, formData, { headers });
  }


  // Simpan pembayaran manual (Transfer / COD)
  simpanManual(token: string, data: { reservasi_id: string; metode: string; bukti?: File }) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const formData = new FormData();

    formData.append('reservasi_id', data.reservasi_id);
    formData.append('metode', data.metode);
    formData.append('dibuat_oleh', 'pelanggan');

    // hanya kirim bukti jika ada
    if (data.bukti) {
      formData.append('bukti', data.bukti);
    }

    return this.http.post(`${this.baseUrl}/pembayaran/manual`, formData, { headers });
  }

}
