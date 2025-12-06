import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
}

export const useScrollAnimation = (
  animationFn: (element: HTMLElement) => void,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      animationFn(element);

      ScrollTrigger.create({
        trigger: element,
        start,
        end,
        scrub,
        markers,
        once,
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return elementRef;
};

export default useScrollAnimation;