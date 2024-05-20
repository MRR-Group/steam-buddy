/* eslint-disable @typescript-eslint/no-explicit-any */

import gsap from 'gsap';

type AnimationCallback<T> = (tl: gsap.core.Timeline, item: T ) => void;
type AnimationFunction<T> = (item: T, onDone?: () => void) => () => void;

export function animation<T = (HTMLElement | null)>(animate: AnimationCallback<T>): AnimationFunction<T> {
  return (item, onDone) => {
    const tl = gsap.timeline();

    animate(tl, item);
    
    if (onDone) {
      tl.call(onDone as () => void);
    }

    return () => { tl.kill() };
  }
}