import { useEffect, useState } from 'react';

interface CollectionAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export function CollectionAnimation({ show, onComplete }: CollectionAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-40">
      <div className="animate-bounce">
        <div className="text-8xl animate-pulse">🎉</div>
        <div className="text-center mt-4">
          <p className="text-2xl text-orange-500 animate-fade-in">Egg Found!</p>
          <div className="text-6xl animate-spin-slow">🥚</div>
        </div>
      </div>
    </div>
  );
}