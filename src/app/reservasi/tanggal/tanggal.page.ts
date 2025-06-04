import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tanggal',
  templateUrl: './tanggal.page.html',
  styleUrls: ['./tanggal.page.scss'],
  standalone: false,
})
export class TanggalPage implements OnInit {
  selectedDate: string | null = null;
  constructor() { }

    formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options); // menggunakan locale Indonesia
  }
    onOk() {
    alert('Tanggal dipilih: ' + this.formatDate(this.selectedDate!));
    // Lanjutkan ke proses berikutnya
  }

  onCancel() {
    this.selectedDate = null;
  }

  ngOnInit() {
  }

}
