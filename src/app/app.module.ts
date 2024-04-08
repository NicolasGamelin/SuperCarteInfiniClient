import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { HomeComponent  } from './home/home.component';
import { MatchComponent } from './match/match.component';
import { BattlefieldComponent } from './match/battlefield/battlefield.component';
import { PlayerhandComponent } from './match/playerhand/playerhand.component';
import { EnemyhandComponent } from './match/enemyhand/enemyhand.component';
import { HealthComponent } from './match/health/health.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {InterceptorinterceptorInterceptor} from "./interceptorinterceptor.interceptor";
import {StoreComponent} from "./components/store/store.component";
import {CardsComponent} from "./components/cards/cards.component";
import {DeckComponent} from "./components/deck/deck.component";



@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    MatchComponent,
    BattlefieldComponent,
    PlayerhandComponent,
    EnemyhandComponent,
    HealthComponent,
    RegisterComponent,
    LoginComponent,
    StoreComponent,
    CardsComponent,
    DeckComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: InterceptorinterceptorInterceptor, multi: true },CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
