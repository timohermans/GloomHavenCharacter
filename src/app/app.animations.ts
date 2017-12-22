import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
} from '@angular/animations';

export const animations = [
  trigger('routerTransition', [
    // but anytime a route changes let's animate!
    transition('* => *', [
      query(':enter, :leave', style({width: '100%', display: 'block', position: 'absolute'}), {optional: true}),
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
  ]),

  trigger('sidebarSlide', [
    state('void', style({transform: 'translateX(-100%)'})),
    state('*', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate('200ms ease-in')
    ]),
    transition('* => void', animate('200ms ease-out', style({transform: 'translateX(-100%)'})))
  ]),

  trigger('flyInOut', [
    transition('* <=> *', [
      query('.row', style({marginRight: '0px'})),
      query(':enter, :leave, .navbar', style({position: 'fixed'})),
      group([
        query(':leave', [
          animate(300, style({transform: 'translateX(-100%)'}))
        ], {optional: true}),
        query(':enter', [
          style({transform: 'translateX(100%)'}),
          animate(300, style({transform: 'translateX(0)'}))
        ])
      ])
    ])
  ])
];
