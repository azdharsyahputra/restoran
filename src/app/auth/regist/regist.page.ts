import { Component } from '@angular/core';
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
    private router: Router
  ) { }

  register() {
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
      }
    });
  }


  loginWithGoogle() {
    const oauthUrl = `${environment.apiUrl}/auth/google/redirect`;
    const browser = window.open(oauthUrl, '_blank', 'location=yes,height=600,width=800');

    // Dengarkan pesan dari jendela popup
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8100') return; // amankan dengan origin
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



  ngOnInit() { }
}
