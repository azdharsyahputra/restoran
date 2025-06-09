
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface PesananItem {
  menu_id: number;
  jumlah: number;
  catatan?: string;
  nama?: string;
  harga?: number;
}

export interface ReservasiData {
  pengguna_id?: number;
  tanggal?: string;
  sesi?: string;
  jumlah_tamu?: number;
  pesanan?: PesananItem[];
  metode_pembayaran?: string;
  bukti_pembayaran?: string;
  nama?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservasiService {

  private data: ReservasiData = {};
  private reservasi_id: string = '';



  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  setPengguna(pengguna_id: number) {
    this.data.pengguna_id = pengguna_id;
  }

  setTanggal(tanggal: string) {
    this.data.tanggal = tanggal;
  }

  setSesi(sesi: string) {
    this.data.sesi = sesi;
  }

  setJumlahTamu(jumlah: number) {
    this.data.jumlah_tamu = jumlah;
  }

  setPesanan(pesanan: PesananItem[]) {
    this.data.pesanan = pesanan;
  }

  setPembayaran(metode: string, bukti?: string) {
    this.data.metode_pembayaran = metode;
    this.data.bukti_pembayaran = bukti;
  }

  setNama(nama: string) {
    this.data.nama = nama;
  }

  getReservasiData(): ReservasiData {
    return this.data;
  }

  resetData() {
    this.data = {};
  }


  // code buat ambil data per reservasi

  setReservasiID(id: string) {
    this.reservasi_id = id;
  }

  getReservasiID(): string {
    return this.reservasi_id;
  }

  // kirimReservasi(pengguna_id: string, token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });

  //   const body = {
  //     pengguna_id: pengguna_id,
  //     tanggal: this.data.tanggal,
  //     sesi: this.data.sesi,
  //     jumlah_tamu: this.data.jumlah_tamu,
  //     pesanan: this.data.pesanan,
  //     metode_pembayaran: this.data.metode_pembayaran,
  //     bukti_pembayaran: this.data.bukti_pembayaran
  //   };

  //   return this.http.post(`${this.apiUrl}/reservasi`, body, { headers });
  // }

  kirimReservasi(pengguna_id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      pengguna_id: pengguna_id,
      tanggal: this.data.tanggal,
      sesi: this.data.sesi,
      jumlah_tamu: this.data.jumlah_tamu,
      pesanan: this.data.pesanan,   // pesanan sudah ada catatan di setiap itemnya
      // Jangan kirim metode_pembayaran dan bukti_pembayaran di sini, nanti di payment
    };

    return this.http.post(`${this.apiUrl}/reservasi`, body, { headers });
  }
  getDetailReservasi(token: string, id: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${this.apiUrl}/reservasi/${id}`, { headers });
}
getDetailReservasiSelesai(token: string, id: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${this.apiUrl}/reservasi/${id}/selesai`, { headers });
}



}


