import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
    return this.http.get(`${environment.apiUrl}/histori`, { headers });
  }

  getDetailReservasi(id: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.apiUrl}/histori/${id}`, { headers });
  }
  // getDetailReservasi(id: string) {

  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get(`${environment.apiUrl}/histori/${id}`, { headers });
  // }

}
