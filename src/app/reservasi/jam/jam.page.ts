import { Component, OnInit } from '@angular/core';
import { ReservasiService } from '../../services/reservasi/reservasi.service'; // sesuaikan path
import { NavController } from '@ionic/angular';

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

  sesiList = [
    {
      label: 'Sarapan',
      jamList: [
        { key: 'sarapan_1', label: '07:00 - 10:00' },
        { key: 'sarapan_2', label: '10:00 - 12:00' },
      ]
    },
    { 
      label: 'Makan Siang',
      jamList: [
        { key: 'siang_1', label: '12:00 - 14:00' },
        { key: 'siang_2', label: '14:00 - 17:00' },
      ]
    },
    {
      label: 'Makan Malam',
      jamList: [
        { key: 'malam_1', label: '17:00 - 19:00' },
        { key: 'malam_2', label: '19:00 - 22:00' },
      ]
    }
  ];
  
  constructor(
    private reservasiService: ReservasiService,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

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
      alert('Silakan pilih jam terlebih dahulu');
      return;
    }
    this.reservasiService.setSesi(this.selectedJam);
    this.reservasiService.setJumlahTamu(this.jumlahTamu);

    console.log('Data reservasi saat ini:', this.reservasiService.getReservasiData());

    this.navCtrl.navigateForward('/pilih-menu');
  }
}
