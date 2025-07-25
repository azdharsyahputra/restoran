import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { HttpClient } from '@angular/common/http';
import { NotifService } from '../notif/notif.service'; // ← Tambahkan ini

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
  reservasiId: number = 1;
  noMenuAvailable: boolean = false;

  hasNewNotif: boolean = false; // ← Tambahkan ini

  constructor(
    private menuService: MenuService,
    private ProfileService: ProfileService,
    private http: HttpClient,
    private notifService: NotifService // ← Tambahkan ini
  ) { }

  async ngOnInit() {
    this.menuService.getAllMenu().subscribe((res: any) => {
      this.menuList = res;
      if (this.menuList.length === 0) {
        console.log('Tidak ada menu tersedia');
        this.noMenuAvailable = true;
      } else {
        this.noMenuAvailable = false;
      }

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

    this.cekNotifikasiBaru(); // ← Tambahkan ini untuk mengecek notifikasi
  }

  cekNotifikasiBaru() {
    this.notifService.getNotifikasiWithToken().subscribe({
      next: (res: any) => {
        const data = res.data;
        const belumDibaca = data.some((n: any) => !n.dibaca);
        this.hasNewNotif = belumDibaca;
      },
      error: (err: any) => {
        console.error('❌ Gagal cek notifikasi:', err);
      }
    });
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
