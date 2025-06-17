import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) { }

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
    return true; // izinkan langsung
  }

  async startScan() {
    const ok = await this.ensureCameraPermission();
    if (!ok) {
      alert('Izin kamera diperlukan untuk scan');
      return;
    }

    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });

      if (result && result.ScanResult) {
        this.scannedResult = result.ScanResult;
        // ✅ Tampilkan hasil scan
        alert(`Hasil QR: ${this.scannedResult}`);

        // ✅ Kirim ke backend untuk validasi dan ubah status
        this.kirimVerifikasi(this.scannedResult);

      } else {
        this.scannedResult = null;
        alert('QR kosong atau tidak terbaca.');
      }

    } catch (e) {
      console.error('Error saat scanBarcode:', e);
      this.scannedResult = null;
      alert('Terjadi kesalahan saat memindai QR.');
    }
  }

  kirimVerifikasi(kode: string) {
    this.pelayanService.verifikasiKehadiran(kode, this.token).subscribe({
      next: async (res: any) => {
        const alert = await this.alertCtrl.create({
          header: res.status ? 'Sukses' : 'Gagal',
          message: res.message || (res.status ? 'Reservasi diterima.' : 'Kode tidak ditemukan.'),
          buttons: ['OK']
        });
        await alert.present();

        if (res.status) {
          this.loadReservasi(); // refresh list jika berhasil
        }
      },
      error: async () => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Gagal menghubungi server.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}