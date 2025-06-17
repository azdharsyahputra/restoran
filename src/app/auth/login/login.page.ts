import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  
  email: string = '';
  password: string = '';
  showPassword = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const nama = params['nama'];
      const email = params['email'];

      if (token) {
        if (window.opener) {
          // Jika dari popup OAuth, kirim data ke parent lalu tutup popup
          window.opener.postMessage({ token, nama, email }, '*');
          window.close();
        } else {
          // Jika bukan popup, simpan token dan data user di localStorage
          localStorage.setItem('token', token);
          if (nama) localStorage.setItem('nama', nama);
          if (email) localStorage.setItem('email', email);

          // Bersihkan query params agar token tidak tersimpan di URL
          this.location.replaceState('/login');

          // Redirect ke home setelah login sukses
          this.router.navigate(['/home']);
        }
      } else if (params['error']) {
        alert('Login gagal: ' + params['error']);
      }
    });

    // Listener untuk menerima token dari popup OAuth Google
    window.addEventListener('message', (event) => {
      const { token, nama, email } = event.data;
      if (token) {
        localStorage.setItem('token', token);
        if (nama) localStorage.setItem('nama', nama);
        if (email) localStorage.setItem('email', email);

        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        // Simpan token dan data user ke localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('nama', response.user.nama);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('role', response.user.role);
        localStorage.setItem('pengguna_id', response.user.id.toString());

        // Redirect sesuai role user
        this.redirectByRole(response.user.role);
      },
      error: async (error) => {
        const alert = await this.alertController.create({
          header: 'Login Gagal',
          message: error.error.message || 'Terjadi kesalahan saat login',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  redirectByRole(role: string) {
    switch (role) {
      case 'Pelanggan':
        this.router.navigate(['/home']);
        break;
      case 'Pelayan':
        this.router.navigate(['/meja-pelayan']);
        break;
      case 'Koki':
        this.router.navigate(['/regist']);
        break;
      case 'Admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
