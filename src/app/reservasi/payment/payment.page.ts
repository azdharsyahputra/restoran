import { Component, OnInit } from '@angular/core';
import { ReservasiService, PesananItem } from 'src/app/services/reservasi/reservasi.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false,
})
export class PaymentPage implements OnInit {

  pesanan: PesananItem[] = [];
  tanggal: string = '';
  sesi: string = '';
  jam: string = '';
  namaPengguna: string = '';
  catatanGlobal: string = '';
  metodePembayaran: string = '';

  constructor(private reservasiService: ReservasiService) {}

  ngOnInit() {
    const data = this.reservasiService.getReservasiData();

    this.pesanan = data.pesanan || [];
    this.tanggal = data.tanggal || '';
    this.sesi = data.sesi || '';
    this.namaPengguna = data.nama || '';

    const sesiToJamMap: { [key: string]: string } = {
      sarapan_1: '07:00',
      sarapan_2: '10:00',
      siang_1: '12:00',
      siang_2: '14:00',
      malam_1: '16:00',
      malam_2: '19:00'
    };
    this.jam = sesiToJamMap[this.sesi] || '-';

    if (!this.namaPengguna) {
      const namaDariStorage = localStorage.getItem('nama');
      if (namaDariStorage) this.namaPengguna = namaDariStorage;
    }
  }

  updateCatatanPesanan() {
    this.pesanan = this.pesanan.map(p => ({
      ...p,
      catatan: this.catatanGlobal || p.catatan || ''
    }));
    this.reservasiService.setPesanan(this.pesanan);
  }

  submitReservasi() {
    if (!this.metodePembayaran) {
      alert('Pilih metode pembayaran terlebih dahulu!');
      return;
    }

    this.updateCatatanPesanan(); 

    // Simpan metode pembayaran ke service
    this.reservasiService.setPembayaran(this.metodePembayaran);

    const pengguna_id = localStorage.getItem('pengguna_id');
    const token = localStorage.getItem('token');

    if (!pengguna_id || !token) {
      alert('Login tidak valid. Silakan login kembali.');
      return;
    }

    this.reservasiService.kirimReservasi(pengguna_id, token).subscribe({
      next: (res) => {
        console.log('Reservasi berhasil:', res);
        alert('Reservasi berhasil dibuat!');
        this.reservasiService.resetData();
      },
      error: (err) => {
        console.error('Gagal kirim reservasi:', err);
        alert('Gagal membuat reservasi!');
      }
    });
  }
}
