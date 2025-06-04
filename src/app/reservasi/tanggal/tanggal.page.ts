import { Component, OnInit } from '@angular/core';
import { ReservasiService } from '../../services/reservasi/reservasi.service'; // sesuaikan path jika beda
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tanggal',
  templateUrl: './tanggal.page.html',
  styleUrls: ['./tanggal.page.scss'],
  standalone: false,
})
export class TanggalPage implements OnInit {

  selectedDate: string | null = null;

  constructor(private reservasiService: ReservasiService, private navCtrl: NavController) { }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
  }

  onOk() {
    if (this.selectedDate) {
      this.reservasiService.setTanggal(this.selectedDate);
      // alert('Tanggal dipilih: ' + this.formatDate(this.selectedDate));
      this.navCtrl.navigateForward('/jam');
      console.log('Data reservasi di service:', this.reservasiService.getReservasiData());
      // TODO: navigasi ke halaman berikutnya, misal jam.page
    } else {
      alert('Silakan pilih tanggal terlebih dahulu');
    }
  }

  onCancel() {
    this.selectedDate = null;
  }

  ngOnInit() {
  }

}
