import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginInterface, ReponseLoginInterface } from '../auth/models/login.interface';
import { environment } from 'src/environments/environment';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = signal<boolean>(false);
  protected token = signal('');
  private user = signal('');
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private readonly url: string = environment.url + 'pix/login';

  login(dataLogin: LoginInterface): Observable<boolean> {
    return this.http.post<ReponseLoginInterface>(this.url, dataLogin)
      .pipe(
        map((res) => {
          if(res.token !== undefined) {
            this.setUser(res.user_name);
            this.setToken(res.token)
            this.isAuth.set(true)
          } else {
            this.isAuth.set(false);
          }
          return this.isAuthenticated();
      }),
      catchError(error => { // Manejar el error aquí
        console.log(error);
        return throwError('Algo salió mal');
      })
    );
  }
  setUser(username: string): void {
    this.user.set(username);
    localStorage.setItem('user', this.user());
  }
  setToken(token: string): void {
    this.token.set(token);
    this.cookies.set("token", token);
    localStorage.setItem('token', this.token());
  }
  getUser(): string {
    return this.user();
  }
  getToken(): string {
    //const token = localStorage.getItem('token');
    const token = this.cookies.get("token")
    this.token.mutate(() => token)
    return (token)?token:'';
  }
  isAuthenticated(): boolean {
    this.isAuth.update(() => (this.getToken()!='')?true:false)
    return this.isAuth();
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.cookies.deleteAll();
  }
}
