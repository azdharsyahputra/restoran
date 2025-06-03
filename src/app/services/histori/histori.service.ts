import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriService {

  constructor(private http: HttpClient) { }

  getHistoriReservasi(penggunaId: number) {
    return this.http.get(`${environment.apiUrl}/histori/${penggunaId}`);
  }
}
