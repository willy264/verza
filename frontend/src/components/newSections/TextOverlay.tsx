import { useEffect, useState } from 'react';

export const TextOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.5;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-auto z-20 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <p className="text-center text-lg font-light">
        <a
          href="https://linkedin.com/in/ksenia-kondrashova/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          LinkedIn
        </a>
        {' | '}
        <a
          href="https://codepen.io/ksenia-k"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          CodePen
        </a>
        {' | '}
        <a
          href="https://twitter.com/uuuuuulala"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          Twitter (X)
        </a>
      </p>
    </div>
  );
};
