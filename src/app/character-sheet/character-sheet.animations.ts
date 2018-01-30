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
  trigger('levelUp', [
    state('level', style({
      transform: 'scale(1)'
    })),
    state('current-level', style({
      transform: 'scale(1.1)'
    })),
    transition('level => current-level', animate('200ms ease-in')),
    transition('current-level => level', animate('200ms ease-out'))
  ]),

  trigger('enter', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate('0.2s 100ms ease-out')
    ]),
  ]),

  trigger('tabSlideAlt', [
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]),

  trigger('flyInOut', [
    transition('general => perks', [
      query(':enter, :leave, .navbar', style({position: 'fixed', width: '100%'})),
      group([
        query(':leave', [
          animate('200ms', style({transform: 'translateX(-200%)'}))
        ], {optional: true}),
        query(':enter', [
          style({transform: 'translateX(200%)'}),
          animate('200ms 300ms', style({transform: 'translateX(0)'}))
        ])
      ])
    ]),

    transition('perks => general', [
      query(':enter, :leave, .navbar', style({position: 'fixed', width: '100%'})),
      group([
        query(':leave', [
          animate('200ms', style({transform: 'translateX(200%)'}))
        ], {optional: true}),
        query(':enter', [
          style({transform: 'translateX(-200%)'}),
          animate('200ms 300ms', style({transform: 'translateX(0)'}))
        ])
      ])
    ])

  ]),
];
