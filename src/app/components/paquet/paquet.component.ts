import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Paquet } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-paquet',
  templateUrl: './paquet.component.html',
  styleUrls: ['./paquet.component.css']
})
export class PaquetComponent {
  @Input() paquet?:Paquet;

  constructor(public service:ApiService){}

  async buy(){
    let money = await this.getMoney();
    if( money >= this.paquet!.cout){
      this.service.buyPaquet(this.paquet!.id);
    }
  }

  async getMoney(): Promise<number>{
    return await firstValueFrom(this.service.getMoney())
  }
}
