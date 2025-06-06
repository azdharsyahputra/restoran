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

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loadProfileFromAPI();
  }

  async loadProfileFromAPI() {
    try {
      const res: any = await this.profileService.getProfile();
      const baseUrl = 'http://localhost:8000';

      // Update user data dengan data dari API
      this.user = {
        ...res.data,
        foto: res.data.foto ? `${baseUrl}${res.data.foto}` : ''
      };

      // Simpan ke localStorage supaya bisa dipakai di lain waktu
      this.profileService.saveUser(this.user);
    } catch (error) {
      console.error('Gagal ambil profil dari API:', error);

      // Kalau gagal API, fallback ke localStorage
      this.loadUserFromLocalStorage();
    }
  }

  loadUserFromLocalStorage() {
    const userData = this.profileService.getUserFromLocalStorage();
    if (userData) {
      this.user = userData;
    } else {
      console.log('Data user tidak ditemukan di localStorage');
    }
  }
}
