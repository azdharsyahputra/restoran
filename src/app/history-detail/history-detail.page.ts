import { Component, OnInit } from '@angular/core';
import { HistoriService } from 'src/app/services/histori/histori.service';
import { PembayaranService } from 'src/app/services/payment/pembayaran.service'; // ✅ Tambahkan
import { ActivatedRoute, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
  standalone: false,
})
export class HistoryDetailPage implements OnInit {
  reservasiId!: number;
  detailReservasi: any = null;
  qrData: string = '';
  ratingPelayan: number = 5;
  ratingKoki: number = 5;
  ulasanPelayan: string = '';
  ulasanKoki: string = '';
  selectedFile: File | null = null;

  constructor(
    private historiService: HistoriService,
    private pembayaranService: PembayaranService, // ✅ Tambahkan ini
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
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
          if (res.status && res.data?.kode_reservasi) {
            this.detailReservasi = res.data;
            this.qrData = this.detailReservasi.kode_reservasi;
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

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  submitRatingPegawai(tipe: 'pelayan' | 'koki') {
    let pegawaiId: number | undefined;

    if (tipe === 'pelayan' && this.detailReservasi.pelayan) {
      pegawaiId = this.detailReservasi.pelayan.id;
    } else if (tipe === 'koki' && this.detailReservasi.koki) {
      pegawaiId = this.detailReservasi.koki.id;
    }

    if (!pegawaiId) {
      console.error(`Tidak ada ${tipe} untuk reservasi ini`);
      this.showAlert('Gagal', `Tidak ada ${tipe} untuk reservasi ini`);
      return;
    }

    const data = {
      reservasi_id: this.reservasiId,
      pegawai_id: pegawaiId,
      tipe: tipe,
      rating: tipe === 'pelayan' ? this.ratingPelayan : this.ratingKoki,
      ulasan: tipe === 'pelayan' ? this.ulasanPelayan : this.ulasanKoki
    };

    this.historiService.submitRating(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.showAlert('Sukses', `Rating untuk ${tipe} berhasil dikirim`);
        } else {
          this.showAlert('Gagal', res.message || `Rating untuk ${tipe} gagal dikirim`);
        }
      },
      error: (err: any) => {
        console.error(`Gagal kirim rating ${tipe}`, err);
        this.showAlert('Error', 'Terjadi kesalahan saat mengirim rating');
      }
    });
  }

  setRating(tipe: 'pelayan' | 'koki', value: number) {
    if (tipe === 'pelayan') {
      this.ratingPelayan = value;
    } else {
      this.ratingKoki = value;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadBukti() {
    if (!this.selectedFile) {
      this.showAlert('Gagal', 'Silakan pilih file terlebih dahulu.');
      return;
    }

    const token = localStorage.getItem('token') || '';
    const data = {
      pembayaran_id: this.detailReservasi?.pembayaran?.id,
      bukti: this.selectedFile
    };

    if (!data.pembayaran_id) {
      this.showAlert('Gagal', 'Pembayaran ID tidak ditemukan dari data reservasi.');
      return;
    }

    this.pembayaranService.uploadBukti(token, data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.showAlert('Sukses', 'Bukti pembayaran berhasil diunggah!');
          this.selectedFile = null;
          this.detailReservasi.pembayaran.status = 'dikonfirmasi';
        } else {
          this.showAlert('Gagal', res.message);
        }
      },
      error: (err: any) => {
        console.error(err);
        this.showAlert('Error', 'Terjadi kesalahan saat mengunggah bukti.');
      }
    });
  }
}
