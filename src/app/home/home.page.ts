import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AlertController } from '@ionic/angular';
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
  constructor(private menuService: MenuService, private ProfileService: ProfileService,private alertController: AlertController) { }

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
    this.cekStatusAntrian();
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
    this.applySearch();  // Apply search filter setiap ganti kategori
  }
async cekStatusAntrian() {
  const sudahDipanggil = true;
  if (sudahDipanggil) {
    const alert = await this.alertController.create({
      header: 'Saatnya Masuk!',
      message: 'Silakan masuk ke ruangan dokter sekarang untuk pemeriksaan.',
      buttons: ['OK']
    });
    await alert.present();
  }
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
