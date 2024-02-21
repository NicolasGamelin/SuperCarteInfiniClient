import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from '../models/models';
import { environment } from 'src/environments/environment';
import {LoginDTO} from "../models/LoginDTO";
import {RegisterDTO} from "../models/RegisterDTO";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient,public cookie:CookieService) { }
  public localStorageKey = 'username';


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
    let options = { withCredentials:true };
let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Account/Register',user,options))
  }

  async Login(user:LoginDTO)
  {
    let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Account/Login',user))
    localStorage.setItem(this.localStorageKey, r.userName);
    console.log(r.userName)
  }

  async Logout()
  {
    let options = { withCredentials:true };
let r = await  lastValueFrom(this.http.get<any>('https://localhost:7219/api/Account/Logout',options))
    localStorage.removeItem(this.localStorageKey);
  }
async Private()
  {
    let options = { withCredentials:true };
    let r = await  lastValueFrom(this.http.get<any>('https://localhost:7219/api/Account/PrivateData',options))
    console.log(r)
  }
}
