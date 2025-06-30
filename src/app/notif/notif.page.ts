import { Component, OnInit } from '@angular/core';
import { NotifService } from './notif.service';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.page.html',
  styleUrls: ['./notif.page.scss'],
  standalone: false, // dipertahankan sesuai permintaan
})
export class NotifPage implements OnInit {
  notifikasiList: any[] = [];

  constructor(private notifService: NotifService) {}

  ngOnInit() {
    this.ambilNotifikasi();
  }

  ambilNotifikasi() {
    this.notifService.getNotifikasiWithToken().subscribe({
      next: (res: any) => {
        console.log('📥 Notifikasi:', res);
        this.notifikasiList = res.data;
      },
      error: (err: any) => {
        console.error('❌ Gagal ambil notifikasi:', err);
      }
    });
  }

  tandaiDibaca(id: number) {
    this.notifService.tandaiDibaca(id).subscribe(() => {
      const index = this.notifikasiList.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifikasiList[index].dibaca = true;
      }
    });
  }
}
