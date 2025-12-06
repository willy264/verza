import { useEffect, useState } from 'react';

interface ScrollMessageProps {
  onHidden?: () => void;
}

export const ScrollMessage: React.FC<ScrollMessageProps> = ({ onHidden }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled && isVisible) {
        setIsVisible(false);
        onHidden?.();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, onHidden]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10">
      <div className="flex flex-col items-center gap-6">
        {/* Hello message */}
        <div className="text-5xl md:text-6xl font-light tracking-wider">
          Hello <span className="text-2xl">👋</span>
        </div>

        {/* Scroll me text */}
        <div className="text-3xl md:text-4xl font-light text-gray-600">
          scroll me
        </div>

        {/* Animated arrow */}
        <div className="mt-8 animate-bounce text-4xl">
          ↓
        </div>
      </div>
    </div>
  );
};
