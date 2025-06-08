import { Component, OnInit } from '@angular/core';
import { ReservasiService } from 'src/app/services/reservasi/reservasi.service'; 
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
  standalone: false,
})
export class HistoryDetailPage implements OnInit {
  token: string = '';
  reservasiId!: number;
  detailReservasi: any = null; // bisa juga bikin interface khusus

  constructor(
    private reservasiService: ReservasiService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';

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

    this.reservasiService.getDetailReservasi(this.token, this.reservasiId.toString())
      .subscribe({
        next: res => {
          if (res.status) {
            this.detailReservasi = res.data; // ambil data di properti data
            console.log('Detail reservasi:', this.detailReservasi);
          } else {
            console.error('Gagal mendapatkan data reservasi:', res.message);
          }
        },
        error: err => {
          console.error('Error mengambil detail reservasi:', err);
        }
      });
  }

  goBack() {
    this.router.navigate(['/history']);
  }

  closePage() {
    this.router.navigate(['/history']);  // ganti '/home' sesuai rute tujuan yang kamu inginkan
  }
}
