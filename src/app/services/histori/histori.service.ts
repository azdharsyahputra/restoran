import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriService {

  constructor(private http: HttpClient) { }

  getHistoriReservasi() {
    const token = localStorage.getItem('token'); // ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.apiUrl}/histori/`, { headers });
  }
}
