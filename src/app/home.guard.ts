import {CanActivateFn, createUrlTreeFromSnapshot} from '@angular/router';
import {inject} from "@angular/core";

import {ApiService} from "./services/api.service";

export const homeGuard: CanActivateFn = (route, state) => {
  if(!inject(ApiService).isLogged)
    return createUrlTreeFromSnapshot(route, ['/login']);

  else
    return true;
};
