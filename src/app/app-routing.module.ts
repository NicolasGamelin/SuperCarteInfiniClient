import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import {CardComponent} from "./components/card/card.component";
import {StoreComponent} from "./components/store/store.component";
import {CardsComponent} from "./components/cards/cards.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {homeGuard} from "./home.guard";
import {loginGuard} from "./login.guard";
import {DeckComponent} from "./components/deck/deck.component";
import {StatistiqueComponent} from "./components/statistique/statistique.component";
import { ClassementComponent } from './components/classement/classement.component';


const routes: Routes = [
  { path: 'match/:id', component: MatchComponent,  },

  { path: 'Register', component: RegisterComponent, canActivate:[loginGuard] },
  { path: 'Login', component: LoginComponent, canActivate:[loginGuard] },
  { path: '', component: HomeComponent,  children: [
      { path: 'cards', component: CardsComponent },
      { path: 'store', component: StoreComponent },
      { path: 'deck', component: DeckComponent },
      { path: 'Stat', component: StatistiqueComponent },
      { path: 'classement', component: ClassementComponent },
      { path: '**', redirectTo: 'cards'}

  ], canActivate:[homeGuard] },
      { path: '**', redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
