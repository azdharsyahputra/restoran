import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner';
// Jika ingin cek izin manual, uncomment dan install plugin Camera:
// import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-history-reservasi',
  templateUrl: './history-reservasi.page.html',
  styleUrls: ['./history-reservasi.page.scss'],
  standalone: false,
})
export class HistoryReservasiPage implements OnInit {

  historyReservasi: any[] = [];    // Data asli dari backend
  filteredReservasi: any[] = [];   // Data hasil filter sesuai status
  loading = false;
  token: string = '';

  constructor(
    private pelayanService: PelayanService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    this.loadHistory();
  }

  async loadHistory() {
    this.loading = true;
    try {
      const response = await this.pelayanService.getHistoryReservasi(this.token).toPromise();
      this.historyReservasi = response.data || [];
      this.filteredReservasi = [...this.historyReservasi]; // Tampilkan semua awalnya
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Gagal',
        message: 'Gagal memuat riwayat reservasi.',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      this.loading = false;
    }
  }

  // Fungsi filter berdasarkan status
  filterByStatus(event: any) {
    const status = event.target.value;
    if (!status) {
      this.filteredReservasi = [...this.historyReservasi]; // Reset ke semua data
    } else {
      this.filteredReservasi = this.historyReservasi.filter(r => r.status === status);
    }
  }

  getJamDariSesi(sesi: string): string {
    const mapJam: { [key: string]: string } = {
      'sarapan_1': '07:00-09:00',
      'sarapan_2': '09:00-11:00',
      'siang_1': '11:00-13:00',
      'siang_2': '13:00-15:00',
      'malam_1': '18:00-20:00',
      'malam_2': '20:00-22:00',
    };
    return mapJam[sesi] || 'Waktu tidak diketahui';
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
