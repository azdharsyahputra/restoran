import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: false,
})
export class EditProfilePage implements OnInit {
  user = {
    nama: '',
    email: '',
    telepon: '',
    foto: ''
  };

  constructor(
    private profileService: ProfileService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    try {
      const res: any = await this.profileService.getProfile();
      const baseUrl = 'http://localhost:8000';

      this.user = {
        ...res.data,
        foto: res.data.foto ? `${baseUrl}${res.data.foto}` : ''
      };
    } catch (error) {
      console.error('Gagal ambil profil', error);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  filterAngka(event: any) {
    const input = event.target.value;
    const angkaSaja = input.replace(/[^0-9]/g, '');
    event.target.value = angkaSaja;
    this.user.telepon = angkaSaja;
  }

  async saveProfile() {
    // Validasi minimal 10 digit nomor telepon
    if (this.user.telepon.length < 10) {
      const alert = await this.alertController.create({
        header: 'Validasi Gagal',
        message: 'Nomor telepon minimal 10 digit',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Konfirmasi Simpan',
      message: 'Apakah kamu yakin ingin menyimpan perubahan profil?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Simpan',
          handler: async () => {
            try {
              const isBase64 = this.user.foto.startsWith('data:image');
              const payload: any = {
                nama: this.user.nama,
                telepon: this.user.telepon
              };
              if (isBase64) {
                payload.foto = this.user.foto;
              }

              const res: any = await this.profileService.updateProfile(payload);
              console.log('Profil berhasil diperbarui', res);
            } catch (error) {
              console.error('Gagal update profil', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
