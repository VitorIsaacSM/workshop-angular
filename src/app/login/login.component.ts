import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    username: ['', Validators.required],
    senha: ['', Validators.required]
  }) as FormGroup;

  senhaInvalida = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.form.invalid) {
      this.username.markAsDirty();
      this.senha.markAsDirty();
      return;
    }
    this.loginService.login(this.username.value, this.senha.value).subscribe(
      (res: {token: string}) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['home']);
      },
      () => {
        this.senhaInvalida = true;
      }
    );
  }

  get username() {
    return this.form.get('username');
  }

  get senha() {
    return this.form.get('senha');
  }

  isUsernameValid(): boolean {
    return this.username.dirty && this.username.invalid;
  }

  isSenhaInvalid(): boolean {
    return this.senha.dirty && this.senha.invalid;
  }

}
