import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  threshold?: number;
  triggerOnce?: boolean;
};

const useInView = (options: UseInViewOptions = {}) => {
  const { threshold = 0.1, triggerOnce = false } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, inView };
};

export default useInView;