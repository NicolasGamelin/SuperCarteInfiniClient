import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import {CardComponent} from "./components/card/card.component";
import {StoreComponent} from "./components/store/store.component";
import {CardsComponent} from "./components/cards/cards.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: 'match/:id', component: MatchComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'store', component: StoreComponent },
  { path: 'Register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'Home', component: HomeComponent, children: [


      { path: '**', redirectTo: 'cards'}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
