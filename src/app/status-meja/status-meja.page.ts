import { Component, OnInit } from '@angular/core';
import { PelayanService } from '../services/pelayan/pelayan.service';
import { AlertController } from '@ionic/angular';

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
}
