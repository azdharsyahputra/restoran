import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllMenu(): Observable<any> {
    return this.http.get(`${this.apiUrl}/menu`);
  }

  getMenuTerlaris() {
  return this.http.get(`${environment.apiUrl}/menu-terlaris`);
}

}
