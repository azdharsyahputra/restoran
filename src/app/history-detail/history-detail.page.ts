import { Component, OnInit } from '@angular/core';
import { HistoriService } from 'src/app/services/histori/histori.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// Tambahkan import berikut
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
  standalone: false,
})
export class HistoryDetailPage implements OnInit {
  reservasiId!: number;
  detailReservasi: any = null;
  qrData = '1345677';

  constructor(
    private historiService: HistoriService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Register locale data Indonesia supaya pipe currency id bisa dipakai tanpa error
    registerLocaleData(localeId);
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      console.error('Parameter ID reservasi tidak ditemukan!');
      return;
    }

    this.reservasiId = Number(idParam);
    if (this.reservasiId <= 0) {
      console.error('ID reservasi tidak valid:', this.reservasiId);
      return;
    }

    this.historiService.getDetailReservasi(this.reservasiId.toString())
      .subscribe({
        next: (res: any) => {
          if (res.status) {
            this.detailReservasi = res.data;
            console.log('Detail reservasi:', this.detailReservasi);
          } else {
            console.error('Gagal mendapatkan data reservasi:', res.message);
          }
        },
        error: (err: any) => {
          console.error('Error mengambil detail reservasi:', err);
        }
      });
  }

  getJamDariSesi(sesi: string): string {
    const mapJam: { [key: string]: string } = {
      'sarapan_1': '07:00 - 09:00',
      'sarapan_2': '09:00 - 11:00',
      'siang_1': '11:00 - 13:00',
      'siang_2': '13:00 - 15:00',
      'malam_1': '18:00 - 20:00',
      'malam_2': '20:00 - 22:00',
    };
    return mapJam[sesi] || 'Waktu tidak diketahui';
  }

  convertToNumber(value: any): number {
    return Number(value) || 0;
  }

  goBack() {
    this.router.navigate(['/history']);
  }

  closePage() {
    this.router.navigate(['/history']);
  }
}
