import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
  ) {
    this.platform.ready().then(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || !role) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
      // Jangan langsung redirect ke halaman role,
      // biarkan user bebas pindah ke halaman lain lewat UI
    });
  }
}
