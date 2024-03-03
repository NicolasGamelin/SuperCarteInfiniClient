import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from '../models/models';
import { environment } from 'src/environments/environment';
import {LoginDTO} from "../models/LoginDTO";
import {RegisterDTO} from "../models/RegisterDTO";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

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
  error:string = "";
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
    this.error = "";
  }

  async Login(user:LoginDTO)
  {

    try {
      let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Account/Login',user))
      localStorage.setItem(this.localStorageKey, r.userName);
      console.log(r.userName)
      this.error = "";
      await this.route.navigate(['/']);
      window.location.reload();
    }
   catch (e) {
const error = e as HttpErrorResponse
     console.log(error.error.error);
this.error = error.error.error;
   }

  }

  async Logout()
  {

    let r = await  lastValueFrom(this.http.get<any>('https://localhost:7219/api/Account/Logout'))

this.error = "";

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
    for (let i = 0; i < this.Username.length; i++) {
      this.Username.push(r[i])
    }

  }
}
