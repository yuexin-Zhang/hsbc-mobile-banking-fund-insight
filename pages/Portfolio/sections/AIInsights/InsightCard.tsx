import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Insight } from './constants';

interface InsightCardProps {
  insight: Insight;
  index: number;
  currentIndex: number;
  isTransitioning: boolean;
  onTransitionEnd: () => void;
  onClick: (isPrev: boolean, isNext: boolean) => void;
  onRiskProfileOpen: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  index,
  currentIndex,
  isTransitioning,
  onTransitionEnd,
  onClick,
  onRiskProfileOpen,
}) => {
  const navigate = useNavigate();
  const totalInsights = 6;
  
  let offset = index - currentIndex;
  if (offset > totalInsights / 2) offset -= totalInsights;
  if (offset < -totalInsights / 2) offset += totalInsights;
  
  const isActive = offset === 0;
  const isPrev = offset === -1;
  const isNext = offset === 1;
  const isVisible = isActive || isPrev || isNext;
  2
  let translateX = 0;
  let translateZ = 0;
  let rotateY = 0;
  let scale = 1;
  let opacity = 0;
  let zIndex = 0;
  
  if (isActive) {
    translateX = 0;
    translateZ = 0;
    rotateY = 0;
    scale = 1;
    opacity = 1;
    zIndex = 30;
  } else if (isPrev) {
    translateX = -85;
    translateZ = -100;
    rotateY = 25;
    scale = 0.85;
    opacity = 0.4;
    zIndex = 10;
  } else if (isNext) {
    translateX = 85;
    translateZ = -100;
    rotateY = -25;
    scale = 0.85;
    opacity = 0.4;
    zIndex = 10;
  }

  const handleActionClick = (action?: string) => {
    if (action === 'Update now') {
      onRiskProfileOpen();
    }
  };

  const handleAdditionalActionClick = (additionalAction?: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (additionalAction === 'CIO House View') {
      navigate('/home');
      setTimeout(() => {
        const insightsSection = document.querySelector('[data-insights-section]');
        if (insightsSection) {
          insightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  return (
    <div
      className="absolute top-0 left-1/2 cursor-pointer"
      style={{
        width: 'calc(100% - 32px)',
        transform: `translateX(-50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity: isVisible ? opacity : 0,
        zIndex,
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      onClick={() => onClick(isPrev, isNext)}
    >
      <div className="bg-white rounded-sm p-3 pb-4 border border-gray-200 shadow-lg">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
            {insight.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-gray-900 mb-1">
              {insight.title}
            </div>
            <div className="text-[11px] text-gray-600 leading-relaxed whitespace-normal mb-2">
              {insight.description}
            </div>
            <div className="flex items-center gap-3">
              {insight.action && (
                <button 
                  onClick={() => handleActionClick(insight.action)}
                  className={`text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 cursor-pointer ${insight.action === 'Update now' ? 'relative' : ''}`}
                >
                  <span className="underline inline-flex items-center gap-0.5">
                    <span>{insight.action}</span>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              )}
              {insight.additionalAction && (
                <button 
                  onClick={(e) => handleAdditionalActionClick(insight.additionalAction, e)}
                  className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 relative cursor-pointer"
                >
                  <span className="underline inline-flex items-center gap-0.5">
                    <span>{insight.additionalAction}</span>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
