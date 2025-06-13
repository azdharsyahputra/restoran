import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner';
// Jika ingin cek izin manual, uncomment dan install plugin Camera:
// import { Camera } from '@capacitor/camera';


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

  constructor(
    private pelayanService: PelayanService,
    private alertCtrl: AlertController,
    private router: Router
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

  // Getter untuk hasil filter
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
    scannedResult: string | null = null;

  // Opsional: cek izin kamera jika plugin Camera diinstal
  private async ensureCameraPermission(): Promise<boolean> {
    // Jika tidak mengimpor Camera, kembalikan true agar OS prompt otomatis muncul
    try {
      // Uncomment jika Camera plugin terpasang:
      // const status = await Camera.checkPermissions();
      // if (status.camera !== 'granted') {
      //   const res = await Camera.requestPermissions({ permissions: ['camera'] });
      //   return res.camera === 'granted';
      // }
      return true;
    } catch (e) {
      console.warn('Error checking camera permission', e);
      return true;
    }
  }

  async startScan() {
    // Jika ingin cek izin manual, tetap panggil ensureCameraPermission
    const ok = await this.ensureCameraPermission();
    if (!ok) {
      alert('Izin kamera diperlukan untuk scan');
      return;
    }

    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });
      // Hasil ada di property ScanResult
      if (result && result.ScanResult) {
        this.scannedResult = result.ScanResult;
      } else {
        this.scannedResult = null;
      }
    } catch (e) {
      console.error('Error saat scanBarcode:', e);
      this.scannedResult = null;
    }
  }

  // Hapus atau jangan panggil stopScan() karena tidak ada di API resmi
  // Jika ingin memberi instruksi batal, tangani lewat UI/back button
  cancelScanInstruction() {
    // Misalnya tampilkan toast atau teks “Tekan Back untuk batal”
  }
}
