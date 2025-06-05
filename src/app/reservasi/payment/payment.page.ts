import { Component, OnInit } from '@angular/core';
import { ReservasiService, PesananItem } from 'src/app/services/reservasi/reservasi.service';
import { Router } from '@angular/router';

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

  constructor(private reservasiService: ReservasiService, private router: Router) { }

  ngOnInit() {
    const data = this.reservasiService.getReservasiData();

    this.pesanan = data.pesanan || [];
    this.tanggal = data.tanggal || '';
    this.sesi = data.sesi || '';
    this.namaPengguna = data.nama || '';

    // Isi catatanGlobal dari catatan pesanan pertama (jika ada)
    if (this.pesanan.length > 0) {
      this.catatanGlobal = this.pesanan[0].catatan || '';
    }

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

  submitPembayaran() {
    if (!this.metodePembayaran) {
      alert('Pilih metode pembayaran terlebih dahulu!');
      return;
    }

    this.updateCatatanPesanan();

    this.reservasiService.setPembayaran(this.metodePembayaran);

    // TODO: Panggil endpoint pembayaran di backend jika perlu

    alert('Metode pembayaran disimpan. Silakan lanjutkan proses pembayaran.');

    // Contoh navigasi ke halaman konfirmasi pembayaran atau selesai
    this.router.navigate(['/konfirmasi-pembayaran']);
  }
}
