import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  tadks = signal([]);
  isTooHard = computed(() => {

  })

  //private readonly url = "https://test4.shipedge.com/android/confirmation1.2.0.php";
  private readonly url = "https://reqres.in/api/users";
  //private readonly url = 'localhost:8082/eng/v1/account/accounts';
  private http = inject(HttpClient);
  getPostsAccounts() {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const params = {
      "name": "morpheus",
      "job": "leader"
    }
    return this.http.post(this.url, params, { 'headers': headers })
      .pipe(
        map(res => {
          console.log(res);
          return res;
        }),
        catchError(error => { // Manejar el error aquí
          console.log(error);
          return throwError(error);
        }));
  }
  getAccountsList(page: number) {
    const url = this.url + "?page=" + page;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res.data;
        }),
        catchError(error => { // Manejar el error aquí
          console.log(error);
          return throwError(error);
        }));
  }
}
