import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
}
