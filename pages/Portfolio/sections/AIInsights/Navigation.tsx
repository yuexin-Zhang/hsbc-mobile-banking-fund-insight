import React from 'react';

interface NavigationProps {
  totalItems: number;
  currentIndex: number;
  isTransitioning: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  totalItems,
  currentIndex,
  isTransitioning,
  onPrevious,
  onNext,
  onGoTo,
}) => {
  return (
    <div className="flex items-center justify-between px-1 pt-1">
      <button
        onClick={onPrevious}
        className="p-1 transition-colors cursor-pointer"
        disabled={isTransitioning}
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentIndex 
                ? 'w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]' 
                : 'w-1.5 h-1.5 bg-gray-400'
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div>
      
      <button
        onClick={onNext}
        className="p-1 transition-colors cursor-pointer"
        disabled={isTransitioning}
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Navigation;
