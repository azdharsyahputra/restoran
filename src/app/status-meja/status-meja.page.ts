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
  selector: 'app-status-meja',
  templateUrl: './status-meja.page.html',
  styleUrls: ['./status-meja.page.scss'],
  standalone: false,
})
export class StatusMejaPage implements OnInit {

  mejaList: any[] = [];
  filteredMejaList: any[] = [];
  loading = false;
  token: string = '';
  filterStatus: string = ''; // kosong berarti semua

  constructor(
    private pelayanService: PelayanService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    this.loadMeja();
  }

  async loadMeja() {
    this.loading = true;
    try {
      const response = await this.pelayanService.getMeja(this.token).toPromise();
      this.mejaList = response.data || [];
      this.applyFilter();
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Gagal',
        message: 'Gagal memuat data meja.',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      this.loading = false;
    }
  }

  applyFilter() {
    if (!this.filterStatus) {
      this.filteredMejaList = this.mejaList;
    } else {
      this.filteredMejaList = this.mejaList.filter(m => m.status === this.filterStatus);
    }
  }

  onStatusChange(event: any) {
    this.filterStatus = event.detail.value;
    this.applyFilter();
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
