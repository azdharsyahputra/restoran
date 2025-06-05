import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone:false,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.storage.create(); // wajib untuk inisialisasi penyimpanan

    const role = await this.storage.get('role');

    if (role === 'Pelayan') {
      this.router.navigateByUrl('/meja-pelayan', { replaceUrl: true });
    } else if (role === 'Pelanggan') {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
}
