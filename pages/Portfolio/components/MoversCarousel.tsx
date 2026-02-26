import React, { useState } from 'react';
import { Stock } from '../data';

interface MoversCarouselProps {
  risers: Stock[];
  fallers: Stock[];
}

export const MoversCarousel: React.FC<MoversCarouselProps> = ({ risers, fallers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goNext = () => goTo((currentIndex + 1) % 2);
  const goPrev = () => goTo((currentIndex - 1 + 2) % 2);

  const renderStock = (stock: Stock, isRiser: boolean) => (
    <div className={`p-3 ${isRiser ? '' : 'border-b border-gray-100'}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-[11px] font-semibold text-gray-900 mb-1">{stock.name}</div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{stock.exchange}</span>
            <span className="text-[10px] text-gray-600">{stock.code}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[13px] font-bold text-gray-900 mb-1">{stock.price}</div>
          <div className="flex items-center gap-1 justify-end">
            <span className={`text-[10px] ${isRiser ? 'text-[#da0011]' : 'text-green-600'}`}>
              {isRiser ? '▲' : '▼'}
            </span>
            <span className="text-[10px] font-medium text-gray-900">{stock.change}</span>
            <span className={`text-[9px] ${isRiser ? 'text-[#da0011]' : 'text-green-600'}`}>{stock.percent}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-3 border-b border-gray-200">
      <h3 className="text-[14px] font-bold text-gray-900 mb-3">Your portfolio insights</h3>
      
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${currentIndex * 70}%))` }}
          >
            <div className="flex-shrink-0" style={{ width: '70%', paddingRight: '8px' }}>
              <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Biggest day risers</h4>
              <div className="bg-white border border-gray-200 overflow-hidden">
                {risers.map((stock, index) => (
                  <div key={index}>{renderStock(stock, true)}</div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0" style={{ width: '70%', paddingLeft: '8px' }}>
              <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Biggest day fallers</h4>
              <div className="bg-white border border-gray-200 overflow-hidden">
                {fallers.map((stock, index) => (
                  <div key={index}>{renderStock(stock, false)}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={goPrev}
            className="p-1 transition-colors cursor-pointer"
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1.5">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  index === currentIndex ? 'w-2 h-2 bg-gray-900' : 'w-1.5 h-1.5 bg-gray-400'
                }`}
                disabled={isTransitioning}
              />
            ))}
          </div>
          
          <button
            onClick={goNext}
            className="p-1 transition-colors cursor-pointer"
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoversCarousel;
