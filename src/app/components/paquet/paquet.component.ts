import { Component, EventEmitter, Input, Output } from '@angular/core';
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
      await this.service.buyPaquet(this.paquet!.id);
    }
    this.service.emitChange("money");
  }

  async getMoney(): Promise<number>{
    return await firstValueFrom(this.service.getMoney())
  }
}
