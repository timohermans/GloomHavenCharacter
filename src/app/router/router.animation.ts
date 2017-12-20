import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  animateChild
} from '@angular/animations';

export const routerTransition = [trigger('routerTransition', [
  // but anytime a route changes let's animate!
  transition('* => *', [
    query(':enter, :leave', style({display: 'block', position: 'absolute'}), {optional: true}),
    group([
      query(':enter', [
        style({opacity: 0}),
        animate('0.5s', style({opacity: 1}))
      ], {optional: true}),
      query(':leave', [
        animate('0.5s', style({opacity: 0}))
      ], {optional: true})
    ])
  ])
])];
