import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


interface responseUserUpdate {
  name: string;
  job: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  private readonly url = "https://reqres.in/api/users";
  private http = inject(HttpClient);

  updateUser(id: number, body: any): Observable<responseUserUpdate> {
    return this.http.put<responseUserUpdate>(`${this.url}/${id}`, {
      "name": body.name,
      "job": body.job
    });
  }

  async updateUser2(id: number, body: any): Promise<responseUserUpdate> {
    return new Promise((resolv, reject) => {

    })
  }
}
