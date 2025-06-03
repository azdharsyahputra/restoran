import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const nama = params['nama'];
      const email = params['email'];

      if (token) {
        if (window.opener) {
          window.opener.postMessage({ token, nama, email }, '*');
          window.close();
        } else {
          localStorage.setItem('token', token);
          localStorage.setItem('nama', nama);
          localStorage.setItem('email', email);
          this.router.navigate(['/home']);
        }
      } else if (params['error']) {
        alert('Login gagal: ' + params['error']);
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
        // Menyimpan token, nama, email, dan role ke localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('nama', response.user.nama);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('role', response.user.role);  // Menyimpan role

        // Mengarahkan berdasarkan role
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

  redirectByRole(role: string) {
    if (role === 'Pelanggan') {
      this.router.navigate(['../home']);
    } else if (role === 'Pelayan') {
      this.router.navigate(['/pelayan-home']);
    } else if (role === 'Koki') {
      this.router.navigate(['/regist']);
    } else if (role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      // Jika role tidak dikenali, bisa diarahkan ke halaman login atau error
      this.router.navigate(['/login']);
    }
  }
}
