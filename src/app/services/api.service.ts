import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from '../models/models';
import { environment } from 'src/environments/environment';
import {LoginDTO} from "../models/LoginDTO";
import {RegisterDTO} from "../models/RegisterDTO";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient,public cookie:CookieService,public route:Router) {
    let userString = localStorage.getItem(this.localStorageKey);
    if(userString != null){
      this.Loginerr = userString;
      this.isLogged = true;
    }
  }
  isLogged:boolean = false;
  public localStorageKey = 'username';
Loginerr: string = ""
Username: string[] = []
  async getAllCards(): Promise<Card[]> {
    let result = await lastValueFrom(this.http.get<Card[]>(environment.apiUrl+'api/card/GetAllCards'));
    return result;
  }

  async getPlayersCards(): Promise<Card[]> {
    let result = await lastValueFrom(this.http.get<Card[]>(environment.apiUrl+'api/card/GetPlayersCards'));
    return result;
  }

  async Register(user:RegisterDTO)
  {
    let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Account/Register',user))

  }

  async Login(user:LoginDTO)
  {
    let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Account/Login',user))
    localStorage.setItem(this.localStorageKey, r.userName);
    console.log(r.userName)
    console.log(r.error)
    this.Loginerr = r

   await this.route.navigate(['/']);
    window.location.reload();
  }

  async Logout()
  {

    let r = await  lastValueFrom(this.http.get<any>('https://localhost:7219/api/Account/Logout'))
    localStorage.removeItem(this.localStorageKey);
    await this.route.navigate(['/Login']);
    window.location.reload();
  }
async Private()
  {

    let r = await  lastValueFrom(this.http.get<any>('https://localhost:7219/api/Account/PrivateData'))
    console.log(r)
  }

  async GetAllUserName()
  {

    let r = await  lastValueFrom(this.http.get<any>('https://localhost:7219/api/Account/GetAllUser'))
    console.log(r)
    this.Username = r
  }
}
