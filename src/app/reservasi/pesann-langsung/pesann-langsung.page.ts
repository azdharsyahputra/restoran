import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesann-langsung',
  templateUrl: './pesann-langsung.page.html',
  styleUrls: ['./pesann-langsung.page.scss'],
  standalone: false,
})
export class PesannLangsungPage implements OnInit {
  totalHarga = 0;

bayarSekarang() {
  // Logika pembayaran di sini
  console.log('Bayar diklik, total:', this.totalHarga);
}
  constructor() { }

  ngOnInit() {
  }

}
