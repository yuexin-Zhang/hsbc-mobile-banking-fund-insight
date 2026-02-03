import React from 'react';

interface FloatingAIButtonProps {
  onClick: () => void;
}

const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick }) => {
  return (
    <div className="sticky bottom-4 left-0 right-0 z-50 pointer-events-none px-4">
      <div className="flex justify-center">
        <button 
          className="group relative flex items-center gap-3 px-6 py-3.5 rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto"
          style={{
            background: 'linear-gradient(135deg, #da0011 0%, #da0011 50%, #ba000e 100%)',
          }}
          onClick={onClick}
        >
          {/* Animated background gradient overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #da0011 0%, #da0011 50%, #a7000d 100%)',
            }}
          />
          
          {/* Microphone Icon */}
          <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>

          {/* Button Text */}
          <span className="relative z-10 text-white font-bold text-[10px] tracking-wide whitespace-nowrap">
            Ask: "Will the market continue to rise?"
          </span>

          {/* Chat Icon */}
          <div className="relative z-10 flex items-center justify-center">
            <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>
      </div>
    </div>
  );
};

export default FloatingAIButton;
