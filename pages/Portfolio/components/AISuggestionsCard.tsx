import React from 'react';

interface SuggestionItem {
  icon?: 'bell' | 'none';
  prefix?: string;
  prefixColor?: string;
  text: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
}

interface AISuggestionsCardProps {
  suggestions: SuggestionItem[];
  primaryAction?: {
    label: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
}

export const AISuggestionsCard: React.FC<AISuggestionsCardProps> = ({
  suggestions,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
      <div className="mb-3">
        <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Suggestions</h4>
        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <div key={index} className="flex items-start gap-2 text-[11px] relative">
              <span className="text-[#db0011] font-bold mt-0.5">•</span>
              {item.icon === 'bell' && (
                <svg 
                  className="absolute -left-[4px] -top-[1px] w-4 h-4 text-[#FFA500] transform rotate-45 scale-x-[-1]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2.5" 
                  style={{ zIndex: 1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              )}
              <div className="text-gray-700">
                {item.prefix && (
                  <span className={`font-semibold ${item.prefixColor || 'text-orange-700'}`}>{item.prefix}</span>
                )}
                <span>{item.text}</span>
                {item.action && (
                  <button 
                    onClick={item.action.onClick}
                    className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer ml-1"
                  >
                    <span>{item.action.label}</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-[#d5e5ec]">
          {secondaryAction && (
            <button 
              onClick={secondaryAction.onClick}
              className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 border border-[#db0011] active:opacity-80 transition-opacity cursor-pointer"
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button 
              onClick={primaryAction.onClick}
              className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 active:opacity-80 transition-opacity cursor-pointer"
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AISuggestionsCard;
