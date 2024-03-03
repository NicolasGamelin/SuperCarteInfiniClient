import {CanActivateFn, createUrlTreeFromSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {ApiService} from "./services/api.service";

export const loginGuard: CanActivateFn = (route, state) => {
  if(inject(ApiService).isLogged)
    return createUrlTreeFromSnapshot(route, ['/cards']);

  else
    return true;
};
