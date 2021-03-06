import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {StorageService} from '../storage/storage.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.storageService.watchAuthChanges()
      .pipe(
        map(user => {
          if (this.storageService.isLoggedIn()) {
            return true;
          }

          this.router.navigateByUrl('/login');
          return false;
        })
      );
  }
}
