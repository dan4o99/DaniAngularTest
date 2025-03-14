import { trigger, transition } from '@angular/animations';
import { TabTransitionConstants } from './consts/nav-tab-transition-animation.consts';

export abstract class CommonAnimations {
  public static readonly tabTransitionAnimation = (animationName: string) => [
    trigger(animationName, [
      transition(':increment', TabTransitionConstants.right),
      transition(':decrement', TabTransitionConstants.left),
    ]),
  ];
}
