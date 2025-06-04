
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { ReservasiService, PesananItem } from '../../services/reservasi/reservasi.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pilih-menu',
  templateUrl: './pilih-menu.page.html',
  styleUrls: ['./pilih-menu.page.scss'],
  standalone: false,
})
export class PilihMenuPage implements OnInit {

  allMenu: any[] = [];       // Semua data menu dari API
  itemList: any[] = [];      // Data menu yang ditampilkan, bisa difilter
  selectedCategory: string = 'All';
  imageBaseUrl = environment.imageBaseUrl;

  constructor(
    private menuService: MenuService,
    private reservasiService: ReservasiService,
    private router: Router
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

        // Sinkronisasi jumlah pesanan dari ReservasiService jika ada
        const pesananSaved = this.reservasiService.getReservasiData().pesanan || [];
        this.allMenu.forEach(item => {
          const pesananItem = pesananSaved.find(p => p.menu_id === item.id);
          item.jumlah = pesananItem ? pesananItem.jumlah : 0;
        });

        // Awalnya tampil semua menu
        this.filterCategory('All');
      },
      error: (err) => {
        console.error('Gagal load menu:', err);
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
        catatan: '',
        nama: item.nama,      // Tambahkan nama
        harga: item.harga     // Tambahkan harga
      }));
    this.reservasiService.setPesanan(pesanan);
    console.log('Pesanan tersimpan sementara:', pesanan);
  }


  // Cek ada pesanan atau tidak
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
    console.log('Pesanan dikonfirmasi, data pesanan:', this.reservasiService.getReservasiData().pesanan);
    this.router.navigate(['/payment']);
  }


}

