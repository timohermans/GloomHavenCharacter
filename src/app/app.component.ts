import {Component} from '@angular/core';

import {routerTransition} from './router/router.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: routerTransition
})
export class AppComponent {
  title = 'app';

  getState(outlet) {
    return outlet.activatedRouteData['state'];
    // let path = null;

    // if (outlet.activated) {
    //   path = outlet.activatedRoute.routeConfig.path;
    // }

    // console.log(path);
    // return path;
  }
}
