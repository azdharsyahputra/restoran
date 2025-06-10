import { Component, OnInit } from '@angular/core';
import { PemesananLangsungService } from 'src/app/services/pemesanan-langsung/pemesanan-langsung.service';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pesann-langsung',
  templateUrl: './pesann-langsung.page.html',
  styleUrls: ['./pesann-langsung.page.scss'],
  standalone: false,
})
export class PesannLangsungPage implements OnInit {
  daftarMeja: any[] = [];
  daftarMenu: any[] = [];
  kategoriAktif: string = 'All';
  totalHarga = 0;
  imageBaseUrl = environment.imageBaseUrl;
  catatan: string = '';
  mejaDipilihId: number | null = null;
  userProfile: any = null;
  catatanGlobal: string = '';
  pesanan: any[] = [];





  // resetForm() {
  //   this.pesanan = [];
  //   this.mejaDipilihId = null;
  //   this.catatanGlobal = '';
  // }

  constructor(
    private pemesananService: PemesananLangsungService,
    private menuService: MenuService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.ambilMeja();
    this.ambilMenu();

    const id = localStorage.getItem('pengguna_id');
    if (id) {
      this.userProfile = { id: parseInt(id, 10) };
    } else {
      alert('Pengguna tidak ditemukan. Harap login ulang.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  ambilMeja() {
    this.pemesananService.getMeja().subscribe((res: any) => {
      this.daftarMeja = (res.data || res).filter((meja: any) => meja.status === 'tersedia');
    });
  }

  ambilMenu() {
    this.menuService.getAllMenu().subscribe((res: any) => {
      this.daftarMenu = res.map((menu: any) => ({
        ...menu,
        jumlah: 0,
        catatan: ''
      }));
    });
  }

  hitungTotalHarga() {
    this.totalHarga = this.daftarMenu.reduce((total, menu) => {
      return total + (menu.harga * (menu.jumlah || 0));
    }, 0);
  }

  tambahJumlah(menu: any) {
    menu.jumlah = (menu.jumlah || 0) + 1;
    this.hitungTotalHarga();
  }

  kurangJumlah(menu: any) {
    if (menu.jumlah > 0) {
      menu.jumlah -= 1;
      this.hitungTotalHarga();
    }
  }

  gantiKategori(kategori: string) {
    this.kategoriAktif = kategori;
  }

  get menuTersaring() {
    if (this.kategoriAktif === 'All') return this.daftarMenu;
    return this.daftarMenu.filter(m => m.kategori?.toLowerCase() === this.kategoriAktif.toLowerCase());
  }

  getGambar(menu: any) {
    return menu.gambar ? `${this.imageBaseUrl}${menu.gambar}` : 'assets/images/default.jpg';
  }

  // bayarSekarang() {
  //   if (!this.userProfile || !this.userProfile.id) {
  //     this.presentAlert('Gagal', 'Pengguna belum dikenali.');
  //     return;
  //   }

  //   const pesananDipilih = this.daftarMenu
  //     .filter(menu => menu.jumlah > 0)
  //     .map(menu => ({
  //       menu_id: menu.id,
  //       jumlah: menu.jumlah,
  //       catatan: this.catatan || '' // jika catatan umum untuk semua
  //     }));

  //   if (pesananDipilih.length === 0) {
  //     this.presentAlert('Gagal', 'Silakan pilih minimal 1 menu.');
  //     return;
  //   }

  //   const mejaId = this.mejaDipilihId || (this.daftarMeja[0]?.id ?? null);
  //   if (!mejaId) {

  //     this.presentAlert('Gagal', 'Meja belum tersedia atau belum dipilih.');
  //     return;
  //   }

  //   const data = {
  //     pengguna_id: this.userProfile.id,
  //     meja_id: mejaId,
  //     pesanan: pesananDipilih
  //   };

  //   this.pemesananService.buatPemesanan(data).subscribe(
  //     (res: any) => {
  //       if (res.status) {
  //         this.presentAlert('Sukses', 'Pemesanan berhasil!');
  //         this.router.navigate(['/pembayaran']);
  //       } else {
  //         this.presentAlert('Gagal', 'Penyimpanan Gagal di buat');
  //       }
  //     },
  //     (err) => {
  //       console.error(err);
  //       this.presentAlert('Gagal', 'Terjadi kesalahan saat mengirim pesanan.');
  //     }
  //   );
  // }

  async bayarSekarang() {
    if (!this.userProfile || !this.userProfile.id) {
      this.presentAlert('Gagal', 'Pengguna belum dikenali.');
      return;
    }

    const menuDipesan = this.daftarMenu.filter(menu => menu.jumlah > 0);

    if (menuDipesan.length === 0) {
      this.presentAlert('Gagal', 'Silakan pilih minimal 1 menu.');
      return;
    }
    const mejaId = this.mejaDipilihId || (this.daftarMeja[0]?.id ?? null);
    if (!mejaId) {
      this.presentAlert('Gagal', 'Meja belum tersedia atau belum dipilih.');
      return;
    }

    // Tampilkan alert untuk input catatan per menu
    for (let menu of menuDipesan) {
      const alert = await this.alertCtrl.create({
        header: `Catatan untuk ${menu.nama}`,
        inputs: [
          {
            name: 'catatan',
            type: 'textarea',
            placeholder: 'Contoh: tanpa sambal...',
            value: menu.catatan || ''
          }
        ],
        buttons: [
          {
            text: 'Lewati',
            role: 'cancel'
          },
          {
            text: 'Simpan',
            handler: data => {
              menu.catatan = data.catatan;
            }
          }
        ]
      });

      await alert.present();
      await alert.onDidDismiss();
    }

    const data = {
      pengguna_id: this.userProfile.id,
      meja_id: mejaId,
      pesanan: menuDipesan.map(menu => ({
        menu_id: menu.id,
        jumlah: menu.jumlah,
        catatan: menu.catatan || ''
      }))
    };

    this.pemesananService.buatPemesanan(data).subscribe(
      async (res: any) => {
        if (res.status) {
          const alert = await this.alertCtrl.create({
            header: 'Sukses',
            message: 'Pemesanan berhasil!',
            buttons: ['OK']
          });
          await alert.present();
          // this.resetForm();
          await alert.onDidDismiss();
          window.location.reload();
          this.router.navigate(['/pembayaran']);
        } else {
          this.presentAlert('Gagal', 'Penyimpanan gagal dibuat.');
        }
      },
      (err) => {
        console.error(err);
        this.presentAlert('Gagal', 'Terjadi kesalahan saat mengirim pesanan.');
      }
    );
  }


}
