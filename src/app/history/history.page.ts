import { Component, OnInit } from '@angular/core';
import { HistoriService } from '../services/histori/histori.service'; // pastikan path-nya sesuai
// Tambahkan ini di bagian import
import { ProfileService } from '../services/profile/profile.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {

  historiList: any[] = [];
  user: any = null;

  constructor(
    private historiService: HistoriService,
    private profileService: ProfileService
  ) {}

  
  loadHistori() {
    this.historiService.getHistoriReservasi().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.historiList = res.data;
        }
      },
      error: (err) => {
        console.error('Gagal memuat histori reservasi:', err);
      }
    });
  }
  
  async loadProfile() {
    this.user = await this.profileService.loadUserProfile();
    console.log('User profile:', this.user);
  }
  
  ngOnInit() {
    this.loadHistori();
    this.loadProfile();
  }
}