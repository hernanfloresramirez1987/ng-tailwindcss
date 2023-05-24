import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { PaginateUser, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClasicService {
  private readonly baseUrl: string = 'https://reqres.in/api/users';
  private http = inject(HttpClient);

  loadPage(page: number): Observable<PaginateUser>{
    return this.http.get<PaginateUser>(this.baseUrl, {
      params: { page }
    })
    .pipe(
      filter(res => res.data.length > 0),
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

  async getProductDetails(productId: number): Promise<PaginateUser> {
    try {
      const response = await this.http.get<PaginateUser>(this.baseUrl).toPromise();
      return response as PaginateUser; // Conversión de tipo asegurada
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
      throw error;
    }
  }
}
