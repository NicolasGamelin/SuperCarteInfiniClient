import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: 'match/:id', component: MatchComponent },
  { path: 'Register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'Home', component: HomeComponent, children: [

  ]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
