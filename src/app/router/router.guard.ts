import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import * as _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  canActivate() {
    if (!_.isNil(this.firebaseAuth.auth.currentUser)) {
      return true;
    }

    this.router.navigateByUrl('/login');

    return false;
  }
}
