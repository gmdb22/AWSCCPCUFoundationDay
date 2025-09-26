import { useState } from 'react';

interface HiddenEggProps {
  id: number;
  position: { top: string; left: string };
  onCollect: (id: number) => void;
  isCollected: boolean;
}

export function HiddenEgg({ id, position, onCollect, isCollected }: HiddenEggProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    if (!isCollected) {
      onCollect(id);
    }
  };

  if (isCollected) {
    return null;
  }

  return (
    <div
      className="absolute cursor-pointer group"
      style={{ top: position.top, left: position.left }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={handleClick}
    >
      {/* Hidden egg area - larger clickable area */}
      <div className="w-16 h-16 rounded-full hover:bg-yellow-200/30 transition-all duration-200 flex items-center justify-center">
        {/* Egg icon - shows on hover or when visible */}
        <span 
          className={`text-4xl transition-all duration-200 ${
            isVisible ? 'opacity-100 scale-110' : 'opacity-20 scale-100'
          } group-hover:opacity-100 group-hover:scale-110`}
        >
          🥚
        </span>
      </div>
      
      {/* Subtle hint - sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1 left-1 text-xs animate-pulse opacity-50">✨</span>
        <span className="absolute bottom-1 right-1 text-xs animate-pulse opacity-50 animation-delay-500">✨</span>
      </div>
    </div>
  );
}