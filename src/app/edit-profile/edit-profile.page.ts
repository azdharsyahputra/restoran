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
      console.log('RESPON DARI BACKEND:', res);

      let telepon = res.data.telepon || '';
      if (telepon.startsWith('08')) {
        // Hapus angka 0 pertama, jadi "812xxxx"
        telepon = telepon.substring(1);
      } else if (telepon.startsWith('62')) {
        // Hapus "62", jadi "812xxxx"
        telepon = telepon.substring(2);
      }

      this.user = {
        ...res.data,
        telepon: telepon, // Pakai hasil potongan
        foto: res.data.foto || ''
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
  let input = event.target.value; // pakai let supaya bisa diubah
  input = input.replace(/[^0-9]/g, ''); // hanya angka

  // Hapus angka 0 di awal kalau ada
  if (input.startsWith('0')) {
    input = input.substring(1);
  }

  event.target.value = input;      // Update field input di UI
  this.user.telepon = input;      // Update ke variabel user
}

  async saveProfile() {
    // Validasi minimal 10 digit (tanpa prefix)
    if (this.user.telepon.length < 10) {
      const alert = await this.alertController.create({
        header: 'Validasi Gagal',
        message: 'Nomor telepon minimal 10 digit',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Tambahkan kembali angka 0 saat simpan ke backend
    const nomorLengkap = '0' + this.user.telepon;

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
                telepon: nomorLengkap // kirim nomor lengkap
              };
              if (isBase64) {
                payload.foto = this.user.foto;
              }

              const res: any = await this.profileService.updateProfile(payload);
              console.log('Profil berhasil diperbarui', res);
            } catch (error) {
              console.error('Gagal update profil', error);
            }

            const successAlert = await this.alertController.create({
              header: 'Berhasil',
              message: 'Profil berhasil diperbarui!',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    window.location.href = '/profile';
                  }
                }
              ]
            });
            await successAlert.present();
          }
        }
      ]
    });

    await alert.present();
  }
}
