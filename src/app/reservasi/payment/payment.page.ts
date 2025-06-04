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

  constructor(private reservasiService: ReservasiService) { }

  ngOnInit() {
    const data = this.reservasiService.getReservasiData();
    this.pesanan = data.pesanan || [];

    // Format tanggal hanya ambil yyyy-mm-dd
    const rawTanggal = data.tanggal || '';
    this.tanggal = rawTanggal.split('T')[0]; // Hasil: '2025-06-04'

    this.sesi = data.sesi || '';

    const sesiToJamMap: { [key: string]: string } = {
      sarapan_1: '07:00',
      sarapan_2: '08:00',
      siang_1: '12:00',
      siang_2: '13:00',
      malam_1: '18:00',
      malam_2: '19:00'
    };
    this.jam = sesiToJamMap[this.sesi] || '-';

    // const namaDariLocalStorage = localStorage.getItem('nama');
    // if (namaDariLocalStorage) {
    //   this.namaPengguna = namaDariLocalStorage;
    // } else {
    //   this.namaPengguna = 'Nama tidak ditemukan';
    // }
  }

}
