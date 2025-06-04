// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ReservasiService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';

export interface PesananItem {
  menu_id: number;
  jumlah: number;
  catatan?: string;
  nama?: string;   // <-- ditambahkan
  harga?: number;  // <-- ditambahkan
}

export interface ReservasiData {
  pengguna_id?: number;
  tanggal?: string;
  sesi?: string;
  jumlah_tamu?: number;
  pesanan?: PesananItem[];
  metode_pembayaran?: string;
  bukti_pembayaran?: string; // Bisa berupa base64 atau path file
}

@Injectable({
  providedIn: 'root'
})
export class ReservasiService {

  private data: ReservasiData = {};

  constructor() { }

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

  getReservasiData(): ReservasiData {
    return this.data;
  }

  resetData() {
    this.data = {};
  }
}
