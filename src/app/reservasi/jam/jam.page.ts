import { Component, OnInit } from '@angular/core';
import { ReservasiService } from '../../services/reservasi/reservasi.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-jam',
  templateUrl: './jam.page.html',
  styleUrls: ['./jam.page.scss'],
  standalone: false,
})
export class JamPage implements OnInit {

  selectedJam: string = '';
  jumlahTamu: number = 1;
  maxTamu: number = 20;
  sesiList: any[] = [];
  reservasiPenuh: boolean = false;   // flag untuk tampilan pesan penuh

  constructor(
    private reservasiService: ReservasiService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const tanggalReservasi = this.reservasiService.getReservasiData().tanggal;

    if (!tanggalReservasi) {
      this.presentToast('Tanggal reservasi belum dipilih');
      this.navCtrl.back();
      return;
    }

    this.reservasiService.getSesiTersedia(tanggalReservasi).subscribe(
      res => {
        if (res.status) {
          this.sesiList = res.data;
          console.log('Sesi tersedia:', this.sesiList);

          this.cekSemuaPenuh();

        } else {
          this.presentToast(res.message || 'Gagal mengambil sesi');
        }
      },
      err => {
        console.error('Error ambil sesi:', err);
        this.presentToast('Terjadi kesalahan saat mengambil sesi');
      }
    );
  }

  cekSemuaPenuh() {
    const semuaJam = [].concat(...this.sesiList.map((kategori: any) => kategori.jamList));
    const jamTersedia = semuaJam.filter((jam: any) => !jam.penuh);

    this.reservasiPenuh = jamTersedia.length === 0;
  }


  selectJam(jam: string) {
    this.selectedJam = jam;
  }

  kurangJumlah() {
    if (this.jumlahTamu > 1) {
      this.jumlahTamu--;
    }
  }

  tambahJumlah() {
    if (this.jumlahTamu < this.maxTamu) {
      this.jumlahTamu++;
    }
  }

  onOk() {
    if (!this.selectedJam) {
      this.presentToast('Silakan pilih jam terlebih dahulu');
      return;
    }
    this.reservasiService.setSesi(this.selectedJam);
    this.reservasiService.setJumlahTamu(this.jumlahTamu);
    console.log('Data reservasi saat ini:', this.reservasiService.getReservasiData());
    this.navCtrl.navigateForward('/pilih-menu');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color: 'warning'
    });
    await toast.present();
  }

}
