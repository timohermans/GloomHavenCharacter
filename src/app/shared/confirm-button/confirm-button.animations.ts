import {trigger, state, style, transition, animate} from '@angular/animations';

export const animations = [
  trigger('dialogPopup', [
    state('void', style({opacity: 0})),
    transition('void => *', [
      style({opacity: 0}),
      animate('200ms ease-in')
    ]),
    transition('* => void', [
      style({opacity: 1}),
      animate('200ms ease-in')
    ])
  ])
];
