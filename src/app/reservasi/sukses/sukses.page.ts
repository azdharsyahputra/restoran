import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sukses',
  templateUrl: './sukses.page.html',
  styleUrls: ['./sukses.page.scss'],
  standalone: false,
})
export class SuksesPage implements OnInit {
  reservasiId: any;
  reservasi: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }


  getTanggalIndonesia(dateString: string): string {
    const tanggal = new Date(dateString);

    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulan = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const namaHari = hari[tanggal.getDay()];
    const namaBulan = bulan[tanggal.getMonth()];
    const tanggalAngka = tanggal.getDate();
    const tahun = tanggal.getFullYear();

    return `${namaHari}, ${tanggalAngka} ${namaBulan} ${tahun}`;
  }



  ngOnInit() {
    this.reservasiId = this.route.snapshot.paramMap.get('id');
    this.loadReservasi();
  }

  loadReservasi() {
    const token = localStorage.getItem('token'); // atau storage lain yang kamu pakai
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`${environment.apiUrl}/reservasi/${this.reservasiId}`, { headers })
      .subscribe((res: any) => {
        this.reservasi = res.data;
      }, err => {
        console.error('Gagal memuat data reservasi:', err);
      });
  }
}
