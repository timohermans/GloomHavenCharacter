import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import * as _ from 'lodash';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate() {
    if (this.storageService.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl('/login');

    return false;
  }
}
