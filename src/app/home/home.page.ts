import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifService } from '../services/notif/notif.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  menuList: any[] = [];
  makananList: any[] = [];
  minumanList: any[] = [];
  snackList: any[] = [];
  selectedItems: any[] = [];
  selectedTitle = '';
  imageBaseUrl = environment.imageBaseUrl;
  terlarisList: any[] = [];

  searchTerm: string = '';
  userProfile: any = null;
  lastStatus: string = '';
  lastPesananUpdateTime: string = '';
  reservasiId: number = 1;

  constructor(
    private menuService: MenuService,
    private ProfileService: ProfileService,
    private alertController: AlertController,
    private notifService: NotifService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.menuService.getAllMenu().subscribe((res: any) => {
      this.menuList = res;
      this.makananList = res.filter((m: any) => m.kategori.toLowerCase() === 'makanan');
      this.minumanList = res.filter((m: any) => m.kategori.toLowerCase() === 'minuman');
      this.snackList = res.filter((m: any) => m.kategori.toLowerCase() === 'snack');
      this.selectedItems = this.menuList;
      this.selectedTitle = 'SEMUA MENU';
    });

    this.menuService.getMenuTerlaris().subscribe((res: any) => {
      this.terlarisList = res;
    });

    this.userProfile = await this.ProfileService.loadUserProfile();
    if (this.userProfile && this.userProfile.id) {
      localStorage.setItem('pengguna_id', this.userProfile.id.toString());
    }

    // Mulai pengecekan status pesanan tiap 5 detik
    setInterval(() => {
      this.cekStatusPesananTerbaru();
    }, 5000);
  }

  selectCategory(kategori: string) {
    switch (kategori) {
      case 'makanan':
        this.selectedItems = this.makananList;
        this.selectedTitle = 'MAKANAN';
        break;
      case 'minuman':
        this.selectedItems = this.minumanList;
        this.selectedTitle = 'MINUMAN';
        break;
      case 'snack':
        this.selectedItems = this.snackList;
        this.selectedTitle = 'SNACK';
        break;
      case 'semua':
        this.selectedItems = this.menuList;
        this.selectedTitle = 'SEMUA MENU';
        break;
      default:
        this.selectedItems = [];
        this.selectedTitle = '';
    }
    this.applySearch();
  }

  async cekStatusPesananTerbaru() {
    const token = localStorage.getItem('token');
    const penggunaId = localStorage.getItem('pengguna_id');
    if (!token || !penggunaId) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(
      `${environment.apiUrl}/pesanan/status-terbaru?pengguna_id=${penggunaId}`,
      { headers }
    ).subscribe(async (res) => {
      if (res.status && res.data.length > 0) {
        const pesananTerbaru = res.data[0];
        const newUpdatedAt = pesananTerbaru.updated_at;
        const statusBaru = pesananTerbaru.status;
        const menuNama = pesananTerbaru.menu?.nama || 'Pesanan';

        // Hanya tampilkan notifikasi jika updated_at berubah
        if (newUpdatedAt !== this.lastPesananUpdateTime) {
          this.lastPesananUpdateTime = newUpdatedAt;

          // Hanya jika status termasuk dalam list ini
          const statusYangPerluNotif = ['menunggu', 'diproses', 'disajikan'];
          if (!statusYangPerluNotif.includes(statusBaru)) return;

          let header = 'Status Pesanan';
          let message = `${menuNama} sekarang berstatus: ${statusBaru}`;

          if (statusBaru === 'disajikan') {
            header = 'Pesanan Disajikan!';
            message = `${menuNama} telah disajikan. Selamat menikmati!`;
          }

          const alert = await this.alertController.create({
            header,
            message,
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    });
  }

  applySearch() {
    const term = this.searchTerm.toLowerCase();
    if (term) {
      this.selectedItems = this.menuList.filter((item: any) =>
        item.nama.toLowerCase().includes(term)
      );
    } else {
      this.selectCategory(this.selectedTitle.toLowerCase());
    }
  }
}
