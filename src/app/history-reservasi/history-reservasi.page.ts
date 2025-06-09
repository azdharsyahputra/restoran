import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';

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
}
