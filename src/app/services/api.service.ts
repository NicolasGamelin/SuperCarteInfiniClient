import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {Card, Deck} from '../models/models';
import { environment } from 'src/environments/environment';
import {LoginDTO} from "../models/LoginDTO";
import {RegisterDTO} from "../models/RegisterDTO";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";
import {deckname} from "../models/Deckname";

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





async getAllDecks(){
  let r:Deck[] = await lastValueFrom(this.http.get<Deck[]>('https://localhost:7219/api/Deck/GetDecks'));
  console.log(r);
  return r;
}



  async createDeck(name:deckname):Promise<Deck | null>{

  try {


  let r = await lastValueFrom(this.http.post<any>('https://localhost:7219/api/Deck/CreateDeck', name));
  console.log(r);
  return r;
  }
  catch (e) {
    const error = e as HttpErrorResponse
    console.log(error.error.error);
    this.error = error.error.error;
  }
  return null
}










}
