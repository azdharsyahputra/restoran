import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular'; // ✅ Import
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
  standalone: false,
})
export class RegistPage {
  nama: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  telepon: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // ✅ Tambahkan di sini
  ) {}

  // ✅ Fungsi untuk menampilkan popup alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async register() {
    // Validasi manual sebelum kirim ke backend
    if (!this.nama || !this.email || !this.password || !this.password_confirmation || !this.telepon) {
      this.presentAlert('Peringatan', 'Semua field harus diisi.');
      return;
    }

    if (this.password.length < 8) {
      this.presentAlert('Peringatan', 'Password harus minimal 8 karakter.');
      return;
    }

    if (this.password !== this.password_confirmation) {
      this.presentAlert('Peringatan', 'Konfirmasi password tidak cocok.');
      return;
    }

    const data = {
      nama: this.nama,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      telepon: this.telepon,
    };

    this.authService.register(data).subscribe({
      next: (response: any) => {
        console.log('Register berhasil', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error saat register', error);
        this.presentAlert('Gagal', 'Registrasi gagal. Periksa kembali data Anda.');
      }
    });
  }

  loginWithGoogle() {
    const oauthUrl = `${environment.apiUrl}/auth/google/redirect`;
    const browser = window.open(oauthUrl, '_blank', 'location=yes,height=600,width=800');

    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8100') return;
      const { token, nama, email } = event.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('nama', nama);
        localStorage.setItem('email', email);
        browser?.close();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {}
}
