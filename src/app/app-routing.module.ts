import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: '**', redirectTo: 'home'}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
