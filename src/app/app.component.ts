import {Component} from '@angular/core';
import * as _ from 'lodash';

import {routerTransition} from './router/router.animation';
import { animations } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: animations
})
export class AppComponent {
  title = 'app';

  public isMenuOpen = false;

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
}
