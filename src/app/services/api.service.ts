import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Card, Paquet } from '../models/models';
import { environment } from 'src/environments/environment';
import {LoginDTO} from "../models/LoginDTO";
import {RegisterDTO} from "../models/RegisterDTO";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

const LOCAL_STORAGE_KEY = 'username';
const LOCAL_STORAGE_PLAYERID_KEY = 'playerId';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient,public cookie:CookieService,public route:Router) {
    let userString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(userString != null){
      this.Loginerr = userString;
      this.isLogged = true;
    }
  }
  isLogged:boolean = false;

  error:string = "";
Loginerr: string = ""
Username: string[] = []
  async getAllCards(): Promise<Card[]> {
    let result = await lastValueFrom(this.http.get<Card[]>(environment.apiUrl+'api/card/GetAllCards'));
    return result;
  }


  GetUserName(){
  return localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  async getPlayersCards(): Promise<Card[]> {
    const headerDict = {
      "Access-Control-Allow-Origin": "http://localhost:4200"
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    let result = await lastValueFrom(this.http.get<Card[]>(environment.apiUrl+'api/card/GetPlayersCards', requestOptions));
    return result;
  }

  async Register(user:RegisterDTO)
  {
    let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Account/Register',user))
    this.error = "";

    let u = new LoginDTO(user.UserName,user.Password);
     await this.Login(u);
  }

  async Login(user:LoginDTO)
  {

    try {
      let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Account/Login',user))
      localStorage.setItem(LOCAL_STORAGE_KEY, r.userName);
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

    localStorage.removeItem(LOCAL_STORAGE_KEY);
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

  getMoney():Observable<number>{
    return this.http.get<any>('https://localhost:7219/api/Account/getMoney');
  }

  getMoneyForWin(): Observable<number>{
    return this.http.get<any>('https://localhost:7219/api/Account/getMoneyForWin');
  }

  getMoneyForLose(): Observable<number>{
    return this.http.get<any>('https://localhost:7219/api/Account/getMoneyForLose');
  }

  async getAllPaquets(){
    let result = await lastValueFrom(this.http.get<Paquet[]>(environment.apiUrl+'api/card/GetAllPaquets'));
    return result;
  }

  async buyPaquet(id: number){
    let result = await lastValueFrom(this.http.get<Paquet[]>(environment.apiUrl+'api/card/buyPaquet?id='+id));
    console.log(result);
    return result;
  }
}
