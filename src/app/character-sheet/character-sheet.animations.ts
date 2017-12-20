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
    transition('* <=> *', [
      // query(':enter, :leave', style({position: 'absolute', display: 'block'})),
      query(':enter, :leave', style({position: 'relative', width: '100%', display: 'block'})),
      group([
        query(':leave', [
          animate(500, style({transform: 'translateX(-100%)'}))
        ], {optional: true}),
        query(':enter', [
          style({transform: 'translateX(100%)'}),
          animate(500, style({transform: 'translateX(0)'}))
        ])
      ])
    ])
    // state('active', style({transform: 'translateX(0)'})),
    // transition('active => void', [
    //   animate(300, style({transform: 'translateX(-100%)'}))
    // ]),
    // transition('void => active', [
    //   style({transform: 'translateX(-100%)'}),
    //   animate(300, style({transform: 'translateX(0)'}))
    // ])
    // transition('general => void', [
    //   style({transform: 'translateX(-100%)'}),
    //   animate(1000)
    // ])
    // transition('perks => general', [
    //   animate(1000, style({transform: 'translateX(100%)'}))
    // ])
  ])
];
