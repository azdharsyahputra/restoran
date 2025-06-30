import { Component, OnInit } from '@angular/core';
import { ReservasiService, PesananItem } from 'src/app/services/reservasi/reservasi.service';
import { PembayaranService } from 'src/app/services/payment/pembayaran.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


declare global {
  interface Window {
    snap: any;
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false,
})
export class PaymentPage implements OnInit {

  pesanan: PesananItem[] = [];
  tanggal: string = '';
  sesi: string = '';
  jam: string = '';
  namaPengguna: string = '';
  emailPengguna: string = '';
  catatanGlobal: string = '';
  metodePembayaran: string = '';
  token: string = '';
  reservasiId: string = '';
  uploadBukti: File | null = null;

  constructor(
    private reservasiService: ReservasiService,
    private router: Router,
    private route: ActivatedRoute,
    private pembayaranService: PembayaranService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    this.reservasiId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.token || !this.reservasiId) {
      alert('Gagal mengambil data reservasi. Silakan kembali.');
      this.router.navigate(['/tanggal']);
      return;
    }

    this.reservasiService.getDetailReservasiPembayaran(this.token, this.reservasiId)
      .subscribe({
        next: (response) => {
          if (response.status) {
            const data = response.data;
            this.pesanan = data.pesanan || [];
            this.tanggal = data.tanggal || '';
            this.sesi = data.sesi || '';
            this.namaPengguna = data.pengguna?.nama || '';
            this.emailPengguna = data.pengguna?.email || '';

            const sesiToJamMap: { [key: string]: string } = {
              sarapan_1: '07:00',
              sarapan_2: '10:00',
              siang_1: '12:00',
              siang_2: '14:00',
              malam_1: '16:00',
              malam_2: '19:00'
            };
            this.jam = sesiToJamMap[this.sesi] || '-';

            if (this.pesanan.length > 0) {
              this.catatanGlobal = this.pesanan[0].catatan || '';
            }
          } else {
            alert('Gagal memuat detail reservasi.');
          }
        },
        error: (err) => {
          console.error('Error mengambil detail reservasi:', err);
          alert('Terjadi kesalahan saat memuat data reservasi.');
        }
      });
  }

  hitungTotalBayar(): number {
    return this.pesanan.reduce((total, item) => {
      const harga = Number(item.menu?.harga) || 0;
      return total + (harga * item.jumlah);
    }, 0);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadBukti = file;
    }
  }

  uploadBuktiPembayaran() {
    if (!this.uploadBukti) {
      alert('Silakan pilih file bukti pembayaran terlebih dahulu!');
      return;
    }

    this.pembayaranService.simpanManual(this.token, {
      reservasi_id: this.reservasiId,
      metode: this.metodePembayaran,
      bukti: this.uploadBukti
    }).subscribe({
      next: (res: any) => {
        if (res.status) {
          alert('Pembayaran berhasil disimpan!');
          this.router.navigate(['/sukses']); // sesuaikan rute tujuan
        } else {
          alert('Gagal menyimpan pembayaran!');
        }
      },
      error: (err) => {
        console.error('Error upload bukti:', err);
        alert('Terjadi kesalahan saat upload bukti pembayaran.');
      }
    });
  }

  // bayarSekarang() {
  //   if (!this.reservasiId || !this.token) {
  //     alert('Data tidak lengkap!');
  //     return;
  //   }

  //   const totalBayar = this.hitungTotalBayar();

  //   this.pembayaranService.getMidtransToken(
  //     this.token,
  //     this.reservasiId,
  //     totalBayar,
  //     this.namaPengguna,
  //     this.emailPengguna
  //   ).subscribe((res: any) => {
  //     if (res.snapToken) {
  //       window.snap.pay(res.snapToken, {
  //         onSuccess: (result: any) => {
  //           console.log('Pembayaran berhasil', result);
  //           // alert('Pembayaran berhasil');
  //           this.router.navigate(['/sukses', this.reservasiId]);
  //         },
  //         onPending: (result: any) => {
  //           console.log('Menunggu pembayaran', result);
  //           alert('Menunggu pembayaran diselesaikan');
  //         },
  //         onError: (result: any) => {
  //           console.error('Pembayaran gagal', result);
  //           alert('Pembayaran gagal. Silakan coba lagi.');
  //         },
  //         onClose: () => {
  //           console.log('User menutup Snap');
  //         }
  //       });
  //     } else {
  //       alert('Gagal mendapatkan token pembayaran');
  //     }
  //   }, err => {
  //     console.error(err);
  //     alert('Terjadi kesalahan saat memproses pembayaran');
  //   });
  // }

  bayarSekarang() {
    if (!this.reservasiId || !this.token || !this.metodePembayaran) {
      alert('Data tidak lengkap atau metode belum dipilih!');
      return;
    }

    const totalBayar = this.hitungTotalBayar();

    this.pembayaranService.getMidtransToken(
      this.token,
      this.reservasiId,
      totalBayar,
      this.namaPengguna,
      this.emailPengguna,
      this.metodePembayaran
    ).subscribe((res: any) => {
      if (this.metodePembayaran === 'cod') {
        this.alertCtrl.create({
          header: 'Berhasil!',
          message: 'Pesanan dengan metode COD berhasil dicatat. Silakan lakukan pembayaran saat di tempat.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/sukses', this.reservasiId]);
              }
            }
          ]
        }).then(alert => alert.present());
        return;
      }


      if (res.snapToken) {
        window.snap.pay(res.snapToken, {
          onSuccess: (result: any) => {
            console.log('Pembayaran berhasil', result);
            this.router.navigate(['/sukses', this.reservasiId]);
          },
          onPending: (result: any) => {
            console.log('Menunggu pembayaran', result);
            alert('Menunggu pembayaran diselesaikan');
          },
          onError: (result: any) => {
            console.error('Pembayaran gagal', result);
            alert('Pembayaran gagal. Silakan coba lagi.');
          },
          onClose: () => {
            console.log('User menutup Snap');
          }
        });
      } else {
        alert('Gagal mendapatkan token pembayaran');
      }
    }, err => {
      console.error(err);
      alert('Terjadi kesalahan saat memproses pembayaran');
    });
  }


}
