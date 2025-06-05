// src/app/pages/profile/profile.page.ts
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user = {
    nama: '',
    email: '',
    telepon: '',
    role: '',
    foto: ''
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadUserFromLocalStorage();
  }

  loadUserFromLocalStorage() {
    const userData = this.profileService.getUserFromLocalStorage();
    if (userData) {
      this.user = userData;
    } else {
      console.log('Data user tidak ditemukan di localStorage');
    }
  }

  async refreshProfileFromAPI() {
    try {
      const res: any = await this.profileService.getProfile();
      this.user = res.data;
      this.profileService.saveUser(this.user); // Simpan ke localStorage
    } catch (error) {
      console.error('Gagal ambil profil dari API:', error);
    }
  }
}
