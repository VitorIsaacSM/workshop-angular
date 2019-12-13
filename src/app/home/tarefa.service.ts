import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getTarefas() {
    return this.http.post('/api/getTodos', {token: this.loginService.getToken()});
  }
}
