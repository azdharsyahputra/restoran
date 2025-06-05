import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-konfirmasi-meja',
  templateUrl: './konfirmasi-meja.page.html',
  styleUrls: ['./konfirmasi-meja.page.scss'],
  standalone: false,
})
export class KonfirmasiMejaPage implements OnInit {
  reservasiId!: number;
  reservasiDetail: any = {
    mejaDipilih: null, // inisialisasi supaya tidak error di binding [(ngModel)]
  };
  mejaTersedia: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pelayanService: PelayanService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.reservasiId = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('token') || '';

    // Ambil daftar meja tersedia dari endpoint yang sesuai
    this.pelayanService.getReservasi(token).subscribe({
      next: (response) => {
        // Pastikan response.data.meja ada dan bertipe array
        this.mejaTersedia = Array.isArray(response.data?.meja) ? response.data.meja : [];
      },
      error: (err) => {
        console.error('Gagal load meja tersedia', err);
      },
    });

    // Ambil detail reservasi
    this.pelayanService.getDetailReservasi(this.reservasiId, token).subscribe({
      next: (data) => {
        this.reservasiDetail = data.data || {};
        // Pastikan properti mejaDipilih selalu ada supaya aman bind ngModel
        if (!this.reservasiDetail.mejaDipilih) {
          this.reservasiDetail.mejaDipilih = null;
        }
        this.loading = false;
      },
      error: async (err) => {
        this.loading = false;
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Gagal memuat data reservasi.',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['/halaman-sebelumnya']);
      },
    });
  }

  pilihMeja(event: any) {
    const value = event.target.value;
    if (!value) return;
    this.reservasiDetail.mejaDipilih = value;
  }

  async konfirmasi() {
    if (!this.reservasiDetail?.mejaDipilih) {
      const alert = await this.alertCtrl.create({
        header: 'Peringatan',
        message: 'Silakan pilih meja terlebih dahulu.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const token = localStorage.getItem('token') || '';
    const data = { meja_id: this.reservasiDetail.mejaDipilih };

    this.pelayanService.konfirmasiMeja(this.reservasiId, data, token).subscribe({
      next: async (res) => {
        const alert = await this.alertCtrl.create({
          header: 'Sukses',
          message: 'Meja berhasil dikonfirmasi.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                // Navigasi ke halaman tujuan setelah klik OK
                this.router.navigate(['/meja-pelayan']);
              },
            },
          ],
        });
        await alert.present();
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Gagal',
          message: 'Konfirmasi meja gagal. Silakan coba lagi.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }


  batal() {
    this.router.navigate(['/meja-pelayan']);
  }
}
