import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PesananItem {
  menu_id: number;
  jumlah: number;
  catatan?: string;
  nama?: string;
  harga?: number;
  menu?: Menu;
}

export interface Menu {
  id: number;
  nama: string;
  harga: number | string;
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

  private apiUrl = environment.apiUrl;
  private data: ReservasiData = {};
  private reservasi_id: string = '';

  constructor(private http: HttpClient) { }

  // ==================== Setters ====================
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

  // ==================== Getters ====================
  getReservasiData(): ReservasiData {
    return this.data;
  }

  resetData() {
    this.data = {};
  }

  // ==================== Reservasi ID (untuk payment tracking) ====================
  setReservasiID(id: string) {
    this.reservasi_id = id;
  }

  getReservasiID(): string {
    return this.reservasi_id;
  }

  // ==================== API Call: Buat Reservasi ====================
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
      pesanan: this.data.pesanan
    };

    return this.http.post(`${this.apiUrl}/reservasi`, body, { headers });
  }

  // ==================== API Call: Ambil Detail Reservasi (Untuk Halaman Payment) ====================
  getDetailReservasiPembayaran(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/reservasi/${id}/detail-pembayaran`, { headers });
  }

  // ==================== API Lainnya (jika perlu) ====================
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

  getSesiTersedia(tanggal: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservasi/sesi-tersedia?tanggal=${tanggal}`);
  }


}
