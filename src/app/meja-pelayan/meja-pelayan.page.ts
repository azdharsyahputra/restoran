import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meja-pelayan',
  templateUrl: './meja-pelayan.page.html',
  styleUrls: ['./meja-pelayan.page.scss'],
  standalone: false,
})
export class MejaPelayanPage implements OnInit {

  reservasi: any[] = [];
  mejaTersedia: any[] = [];
  namaUser: string = 'Tamu';

  constructor(private pelayanService: PelayanService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const namaUser = localStorage.getItem('nama');

    if (namaUser) {
      this.namaUser = namaUser;
    }

    if (token) {
      this.pelayanService.getReservasi(token).subscribe({
        next: (res) => {
          if (res.status) {
            this.reservasi = res.data.reservasi || [];
            this.mejaTersedia = res.data.meja || [];
            console.log('Reservasi:', this.reservasi);
          } else {
            console.warn('Gagal ambil data:', res.message);
          }
        },
        error: (err) => {
          console.error('Error ambil data reservasi:', err);
        }
      });
    } else {
      console.warn('Token tidak ditemukan');
    }
  }
 
  bukaHalamanKonfirmasi(reservasiId: number) {
    this.router.navigate(['/konfirmasi-meja', reservasiId]);
  }

  formatSesi(sesi: string): string {
    const mapSesi: { [key: string]: string } = {
      'sarapan_1': '07:00-09:00',
      'sarapan_2': '09:00-11:00',
      'siang_1': '11:00-13:00',
      'siang_2': '13:00-15:00',
      'malam_1': '17:00-19:00',
      'malam_2': '19:00-21:00'
    };
    return mapSesi[sesi] || sesi;
  }
}
