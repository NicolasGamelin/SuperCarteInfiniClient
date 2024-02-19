import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import {CardComponent} from "./components/card/card.component";
import {StoreComponent} from "./components/store/store.component";
import {CardsComponent} from "./components/cards/cards.component";

const routes: Routes = [
  { path: 'match/:id', component: MatchComponent },
  { path: '', component: HomeComponent, children: [
      { path: 'cards', component: CardsComponent },
      { path: 'store', component: StoreComponent },
      { path: '**', redirectTo: 'cards'}
  ]},

  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
