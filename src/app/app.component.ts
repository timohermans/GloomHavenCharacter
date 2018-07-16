import {Component, OnInit} from '@angular/core';

import {animations} from './app.animations';
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
  }

  getState(outlet) {
    return outlet.activatedRouteData['state'];
  }

  closeMenu(): void {
      this.isMenuOpen = false;
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  logout(): void {
    this.isMenuOpen = false;
    this.storageService.logout();
  }
}
