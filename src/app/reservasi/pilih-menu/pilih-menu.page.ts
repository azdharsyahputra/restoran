import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pilih-menu',
  templateUrl: './pilih-menu.page.html',
  styleUrls: ['./pilih-menu.page.scss'],
  standalone: false,
})
export class PilihMenuPage implements OnInit {

 itemList = [
    { nama: 'Nasi Goreng', harga: 20000, gambar: 'nasigoreng.jpg', jumlah: 0 },
    { nama: 'Mie Goreng', harga: 18000, gambar: 'miegoreng.jpg', jumlah: 0 },
    { nama: 'Ayam Geprek', harga: 22000, gambar: 'ayamgeprek.jpg', jumlah: 0 },
    { nama: 'Ayam Geprek', harga: 22000, gambar: 'ayamgeprek.jpg', jumlah: 0 },
    { nama: 'Ayam Geprek', harga: 22000, gambar: 'ayamgeprek.jpg', jumlah: 0 },
    { nama: 'Ayam Geprek', harga: 22000, gambar: 'ayamgeprek.jpg', jumlah: 0 },
  ];

  constructor() {}

  ngOnInit() {}

  tambah(index: number) {
    this.itemList[index].jumlah++;
  }
}
