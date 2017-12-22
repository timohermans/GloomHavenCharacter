import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {routerTransition} from './router/router.animation';
import { animations } from './app.animations';
import {StorageService} from './storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: animations
})
export class AppComponent implements OnInit {
  title = 'app';

  public isMenuOpen = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
      this.storageService.initialize();
      this.storageService.handleAuthentication();
  }

  getState(outlet) {
    return outlet.activatedRouteData['state'];
  }

  windowClick($event: any) {
    if (!this.isMenuOpen) {
      return;
    }

    const isSidebarClicked = _.find($event.path, (element) => {
      return element.id === 'sidebar' || element.id === 'btnSidebar';
    });

    if (!isSidebarClicked) {
      this.isMenuOpen = false;
    }

    if ($event.target instanceof HTMLAnchorElement && $event.target.parentElement.id === 'menuItems') {
      this.isMenuOpen = false;
    }


    console.log($event);
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  logout(): void {
    this.storageService.logout();
  }
}
