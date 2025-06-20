import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ganti-password',
  templateUrl: './ganti-password.page.html',
  styleUrls: ['./ganti-password.page.scss'],
  standalone: false,
})
export class GantiPasswordPage implements OnInit {
  email = '';
  password = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Auto-isi email jika sudah login
    const user = this.authService.getUser();
    if (user && user.email) {
      this.email = user.email;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async submit() {
    if (!this.email || !this.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Email dan password baru wajib diisi',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.authService.gantiPassword({
      email: this.email,
      new_password: this.password
    }).subscribe({
      next: async (res) => {
        const alert = await this.alertController.create({
          header: 'Sukses',
          message: res.message || 'Password berhasil diubah.',
          buttons: ['OK']
        });
        await alert.present();
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Gagal',
          message: err.error.message || 'Terjadi kesalahan',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
