import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner';
import { HttpClient } from '@angular/common/http'; // ✅ Tambahkan ini

@Component({
  selector: 'app-konfirmasi-reservasi',
  templateUrl: './konfirmasi-reservasi.page.html',
  styleUrls: ['./konfirmasi-reservasi.page.scss'],
  standalone: false,
})
export class KonfirmasiReservasiPage implements OnInit {

  reservasiList: any[] = [];
  loading = false;
  token: string = '';
  searchQuery: string = '';
  scannedResult: string | null = null;

  constructor(
    private pelayanService: PelayanService,
    private alertCtrl: AlertController,
    private router: Router,
    private http: HttpClient // ✅ Tambahkan ke constructor
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    this.loadReservasi();
  }

  async loadReservasi() {
    this.loading = true;
    try {
      const response = await this.pelayanService.getReservasiPelayan(this.token).toPromise();
      this.reservasiList = response.data || [];
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Gagal memuat data reservasi.',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      this.loading = false;
    }
  }

  get filteredReservasiList() {
    const query = this.searchQuery.toLowerCase();
    return this.reservasiList.filter(item =>
      item.id.toString().includes(query) ||
      (item.pengguna?.nama || '').toLowerCase().includes(query)
    );
  }

  bukaDetail(reservasiId: number) {
    this.router.navigate(['/konfirmasi-reservasi-detail', reservasiId]);
  }

  private async ensureCameraPermission(): Promise<boolean> {
    return true; // biarkan true agar tetap lanjut
  }

  async startScan() {
    const ok = await this.ensureCameraPermission();
    if (!ok) {
      alert('Izin kamera diperlukan untuk scan');
      return;
    }

    try {
      const result: any = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });

      console.log('Hasil scan:', result); // debug dulu untuk pastikan struktur

      const scannedKode = result.value; // ✅ gunakan .value sesuai struktur yang benar
      if (scannedKode) {
        this.scannedResult = scannedKode;
        this.kirimVerifikasi(scannedKode);
      } else {
        this.scannedResult = null;
        alert('QR tidak terbaca atau kosong.');
      }

    } catch (e) {
      console.error('Error saat scanBarcode:', e);
      this.scannedResult = null;
    }
  }

  // ✅ Method untuk kirim kode QR (kode_reservasi) ke backend
  kirimVerifikasi(kode: string) {
  this.pelayanService.verifikasiKehadiran(kode, this.token).subscribe({
    next: async (res: any) => {
      if (res.status) {
        const alert = await this.alertCtrl.create({
          header: 'Sukses',
          message: 'Reservasi berhasil diverifikasi!',
          buttons: ['OK']
        });
        await alert.present();
        this.loadReservasi(); // refresh list
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Gagal',
          message: res.message || 'Verifikasi gagal.',
          buttons: ['OK']
        });
        await alert.present();
      }
    },
    error: async () => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Terjadi kesalahan saat menghubungi server.',
        buttons: ['OK']
      });
      await alert.present();
    }
  });
}
}
