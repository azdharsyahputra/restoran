import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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
  ) {}

  ngOnInit() {
    this.loadProfileFromAPI();
  }

  async loadProfileFromAPI() {
    try {
      const res: any = await this.profileService.getProfile();

      this.user = {
        ...res.data,
        foto: res.data.foto || 'assets/icon/ajar.jpg'
      };

      this.profileService.saveUser(this.user);

      console.log('Profil berhasil dimuat:', this.user);
    } catch (error) {
      console.error('Gagal ambil profil dari API:', error);
      this.loadUserFromLocalStorage();
    }
  }

  loadUserFromLocalStorage() {
    const userData = this.profileService.getUserFromLocalStorage();
    if (userData) {
      this.user = {
        ...userData,
        foto: userData.foto || 'assets/icon/ajar.jpg'
      };
    } else {
      console.log('Data user tidak ditemukan di localStorage');
      this.user.foto = 'assets/icon/ajar.jpg';
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah kamu yakin ingin keluar?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Logout', handler: () => {
            this.profileService.clearUser();
            this.router.navigate(['/login']);
          } 
        }
      ]
    });

    await alert.present();
  }
}
