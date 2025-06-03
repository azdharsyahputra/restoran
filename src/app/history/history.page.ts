import { Component, OnInit } from '@angular/core';
import { HistoriService } from '../services/histori/histori.service'; // pastikan path-nya sesuai

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {

  historiList: any[] = [];

  constructor(private historiService: HistoriService) { }

  ngOnInit() {
    this.loadHistori();
  }

  loadHistori() {
    const penggunaId = 1; // sementara, nanti ambil dari auth/login
    this.historiService.getHistoriReservasi(penggunaId).subscribe({
      next: (data: any) => {
        this.historiList = data;
      },
      error: (err) => {
        console.error('Gagal memuat histori reservasi:', err);
      }
    });
  }

}
