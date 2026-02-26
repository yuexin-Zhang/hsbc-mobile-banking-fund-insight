import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIInsightsHeader } from './Header';
import { InsightCard } from './InsightCard';
import { Navigation } from './Navigation';
import { getInsights } from './constants';

interface AIInsightsCarouselProps {
  onRiskProfileOpen: () => void;
  isPaused?: boolean;
}

const AIInsightsCarousel: React.FC<AIInsightsCarouselProps> = ({ onRiskProfileOpen, isPaused = false }) => {
  const navigate = useNavigate();
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const insights = getInsights(navigate);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, insights.length]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, insights.length]);

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === currentInsightIndex) return;
    setIsTransitioning(true);
    setCurrentInsightIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, currentInsightIndex]);

  const handleCardClick = useCallback((isPrev: boolean, isNext: boolean) => {
    if (!isTransitioning) {
      if (isPrev) {
        goToPrevious();
      } else if (isNext) {
        goToNext();
      }
    }
  }, [isTransitioning, goToNext, goToPrevious]);

  // Auto-carousel
  useEffect(() => {
    if (isPaused || isTransitioning || isHovered) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPaused, isTransitioning, isHovered, insights.length]);

  // Wheel event handling
  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;
      
      setIsTransitioning(true);
      if (e.deltaY > 0) {
        setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
      } else if (e.deltaY < 0) {
        setCurrentInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);
      }
      setTimeout(() => setIsTransitioning(false), 500);
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [isTransitioning, insights.length]);

  return (
    <div className="bg-[#f4f5f6] px-2 py-2 pb-3 relative">
      <AIInsightsHeader />

      <div 
        ref={carouselRef}
        className="relative overflow-hidden"
        style={{ 
          perspective: '1000px',
          touchAction: 'pan-y',
          minHeight: '180px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative pb-4">
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              insight={insight}
              index={index}
              currentIndex={currentInsightIndex}
              isTransitioning={isTransitioning}
              onTransitionEnd={() => setIsTransitioning(false)}
              onClick={handleCardClick}
              onRiskProfileOpen={onRiskProfileOpen}
            />
          ))}
        </div>
      </div>
      
      <Navigation
        totalItems={insights.length}
        currentIndex={currentInsightIndex}
        isTransitioning={isTransitioning}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onGoTo={goTo}
      />
    </div>
  );
};

export default AIInsightsCarousel;
