import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PelayanService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getReservasi(token: string): Observable<any> {
    // GET /pelayan/reservasi
    const url = `${this.baseUrl}/pelayan/reservasi`;
    return this.http.get(url, { headers: this.getHeaders(token) });
  }

  getDetailReservasi(reservasiId: number, token: string): Observable<any> {
    // GET /pelayan/reservasi/{id}
    const url = `${this.baseUrl}/pelayan/reservasi/${reservasiId}`;
    return this.http.get(url, { headers: this.getHeaders(token) });
  }

  konfirmasiMeja(reservasiId: number, data: any, token: string): Observable<any> {
    // POST /pelayan/reservasi/{id}/konfirmasi-meja
    const url = `${this.baseUrl}/pelayan/reservasi/${reservasiId}/konfirmasi-meja`;
    return this.http.post(url, data, { headers: this.getHeaders(token) });
  }

  getReservasiPelayan(token: string): Observable<any> {
    // GET /pelayan/kehadiran-reservasi
    const url = `${this.baseUrl}/pelayan/kehadiran-reservasi`;
    return this.http.get<any>(url, { headers: this.getHeaders(token) });
  }

  konfirmasiReservasi(id: number, status: string, token: string): Observable<any> {
    // PUT /pelayan/reservasi/{id}/konfirmasi
    const url = `${this.baseUrl}/pelayan/reservasi/${id}/konfirmasi`;
    return this.http.put<any>(url, { status }, { headers: this.getHeaders(token) });
  }

  // history buat di pelayan
  getHistoryReservasi(token: string): Observable<any> {
    const url = `${this.baseUrl}/pelayan/history-reservasi`;
    return this.http.get<any>(url, {
      headers: this.getHeaders(token)
    });
  }

  // data meja di pelayan
  getMeja(token: string): Observable<any> {
    const url = `${this.baseUrl}/pelayan/meja`;
    return this.http.get<any>(url, { headers: this.getHeaders(token) });
  }


}
