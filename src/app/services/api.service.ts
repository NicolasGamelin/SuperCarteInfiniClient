import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from '../models/models';
import { environment } from 'src/environments/environment';
import {LoginDTO} from "../models/LoginDTO";
import {RegisterDTO} from "../models/RegisterDTO";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }



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
let r = await lastValueFrom(this.http.post('https://localhost:7219/api/Account/Register',user))
  }

  async Login(user:LoginDTO)
  {
    let r = await lastValueFrom(this.http.post('https://localhost:7219/api/Account/Login',user))
  }

  async Logout()
  {
let r = await  lastValueFrom(this.http.get('https://localhost:7219/api/Account/Logout'))
  }

}
