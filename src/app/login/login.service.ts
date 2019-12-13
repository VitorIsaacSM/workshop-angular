import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, senha: string) {
    return this.http.post('/api/login', {username, password: senha});
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
