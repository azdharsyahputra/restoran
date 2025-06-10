import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadProfileFromAPI();
  }

  async loadProfileFromAPI() {
    try {
      const res: any = await this.profileService.getProfile();
      const baseUrl = 'http://localhost:8000';

      this.user = {
        ...res.data,
        foto: res.data.foto ? `${baseUrl}${res.data.foto}` : ''
      };

      this.profileService.saveUser(this.user);
    } catch (error) {
      console.error('Gagal ambil profil dari API:', error);
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

  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah kamu yakin ingin keluar?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            // Hapus data user dari localStorage
            this.profileService.clearUser();

            // Redirect ke halaman login
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
