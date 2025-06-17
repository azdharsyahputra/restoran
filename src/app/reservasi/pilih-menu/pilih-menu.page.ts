import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { ReservasiService, PesananItem } from '../../services/reservasi/reservasi.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pilih-menu',
  templateUrl: './pilih-menu.page.html',
  styleUrls: ['./pilih-menu.page.scss'],
  standalone: false,
})
export class PilihMenuPage implements OnInit {

  allMenu: any[] = [];
  itemList: any[] = [];
  selectedCategory: string = 'All';
  imageBaseUrl = environment.imageBaseUrl;

  constructor(
    private menuService: MenuService,
    private reservasiService: ReservasiService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.menuService.getAllMenu().subscribe({
      next: (res) => {
        this.allMenu = res.map((menu: any) => ({
          ...menu,
          jumlah: 0,
        }));

        const pesananSaved = this.reservasiService.getReservasiData().pesanan || [];
        this.allMenu.forEach(item => {
          const pesananItem = pesananSaved.find(p => p.menu_id === item.id);
          item.jumlah = pesananItem ? pesananItem.jumlah : 0;
        });

        this.filterCategory('All');
      },
      error: (err) => {
        console.error('Gagal load menu:', err);
        this.presentToast('Gagal memuat menu. Silakan coba lagi.');
      }
    });
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.itemList = [...this.allMenu];
    } else if (category === 'Food') {
      this.itemList = this.allMenu.filter(menu => menu.kategori === 'makanan');
    } else if (category === 'Drink') {
      this.itemList = this.allMenu.filter(menu => menu.kategori === 'minuman');
    } else if (category === 'Snack') {
      this.itemList = this.allMenu.filter(menu =>
        menu.nama.toLowerCase().includes('snack')
      );
    } else {
      this.itemList = [];
    }
  }

  onCategoryClick(category: string) {
    this.filterCategory(category);
  }

  tambah(index: number) {
    this.itemList[index].jumlah++;
    this.updatePesananKeService();
  }

  kurang(index: number) {
    if (this.itemList[index].jumlah > 0) {
      this.itemList[index].jumlah--;
      this.updatePesananKeService();
    }
  }

  updatePesananKeService() {
    const pesanan: PesananItem[] = this.allMenu
      .filter(item => item.jumlah > 0)
      .map(item => ({
        menu_id: item.id,
        jumlah: item.jumlah,
        catatan: item.catatan || '',
        nama: item.nama,
        harga: item.harga
      }));

    this.reservasiService.setPesanan(pesanan);
    console.log('Pesanan tersimpan sementara:', pesanan);
  }

  adaPesanan(): boolean {
    const ada = this.allMenu.some(item => item.jumlah > 0);
    console.log('Cek ada pesanan:', ada);
    return ada;
  }

  cancelPesanan() {
    this.allMenu.forEach(item => item.jumlah = 0);
    this.filterCategory(this.selectedCategory);
    this.updatePesananKeService();
    console.log('Pesanan dibatalkan, data pesanan saat ini:', this.reservasiService.getReservasiData().pesanan);
  }

  konfirmasiPesanan() {
    const reservasiData = this.reservasiService.getReservasiData();

    if (!reservasiData.tanggal || !reservasiData.sesi || !reservasiData.jumlah_tamu || !reservasiData.pesanan?.length) {
      this.presentToast('Data reservasi belum lengkap!');
      return;
    }

    const pengguna_id = localStorage.getItem('pengguna_id');
    const token = localStorage.getItem('token');

    if (!pengguna_id || !token) {
      this.presentToast('Pengguna belum login.');
      return;
    }

    this.reservasiService.kirimReservasi(pengguna_id, token).subscribe({
      next: (res) => {
        console.log('Reservasi berhasil dikirim:', res);
        const reservasi_id = res.data?.id || res.data?.reservasi_id;
        if (!reservasi_id) {
          this.presentToast('Reservasi berhasil tapi ID tidak ditemukan.');
          return;
        }
        this.reservasiService.setReservasiID(reservasi_id);
        this.router.navigate(['/payment', reservasi_id]);
      },
      error: (err) => {
        console.error('Gagal kirim reservasi:', err);
        this.presentToast('Gagal mengirim reservasi. Silakan coba lagi.');
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

}
