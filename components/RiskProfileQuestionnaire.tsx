import React, { useState, useEffect } from 'react';
import { useMobileDetect } from '../hooks/useMobileDetect';

interface RiskProfileQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
}

const RiskProfileQuestionnaire: React.FC<RiskProfileQuestionnaireProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<number>(1); // Default to "Between >0% and 50%"
  const [currentTime, setCurrentTime] = useState('');
  const isMobile = useMobileDetect();

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      {/* Status Bar - Hidden on mobile */}
      {!isMobile && (
        <div className="pt-2 pb-1 px-4 bg-white shrink-0">
          <div className="flex items-center justify-between text-[15px] font-semibold text-gray-900">
            <span>{currentTime || '3:41'}</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M0 6v8h2V6H0zm4 8h12V6H4v8zm14 0h2V6h-2v8z" />
              </svg>
              <span className="text-[11px] ml-0.5">5G</span>
              <svg className="w-6 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 12">
                <rect x="1" y="1" width="18" height="10" rx="2" />
                <rect x="3" y="3" width="14" height="6" fill="currentColor" />
                <path d="M19 4v4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white shrink-0">
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-[17px] font-semibold text-gray-900">Risk profile questionnaire</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Question Section - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <h2 className="text-[17px] font-semibold text-gray-900 leading-[1.4] mb-6">
            1. What portion of your net worth would you like to set aside for investments? Please note that there is a potential for loss of your capital when investing in investment products.
          </h2>

          {/* Options */}
          <div className="space-y-0 border-t border-gray-200">
            {/* Option 1: 0% */}
            <button
              onClick={() => setSelectedOption(0)}
              className="w-full flex items-center justify-between py-4 border-b border-gray-200 active:bg-gray-50 transition-colors"
            >
              <span className="text-[17px] text-gray-900">0%</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedOption === 0 
                  ? 'border-gray-900' 
                  : 'border-gray-400'
              }`}>
                {selectedOption === 0 && (
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-900"></div>
                )}
              </div>
            </button>

            {/* Option 2: Between >0% and 50% */}
            <button
              onClick={() => setSelectedOption(1)}
              className="w-full flex items-center justify-between py-4 border-b border-gray-200 active:bg-gray-50 transition-colors"
            >
              <span className="text-[17px] text-gray-900">Between &gt;0% and 50%</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedOption === 1 
                  ? 'border-gray-900' 
                  : 'border-gray-400'
              }`}>
                {selectedOption === 1 && (
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-900"></div>
                )}
              </div>
            </button>

            {/* Option 3: Over 50% */}
            <button
              onClick={() => setSelectedOption(2)}
              className="w-full flex items-center justify-between py-4 border-b border-gray-200 active:bg-gray-50 transition-colors"
            >
              <span className="text-[17px] text-gray-900">Over 50%</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedOption === 2 
                  ? 'border-gray-900' 
                  : 'border-gray-400'
              }`}>
                {selectedOption === 2 && (
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-900"></div>
                )}
              </div>
            </button>
          </div>

          {/* Important Notes */}
          <div className="mt-6">
            <p className="text-[15px] text-gray-900">
              Make sure you read the{' '}
              <button className="underline font-medium">important notes</button>
              {' '}before answering the questions.
            </p>
          </div>
        </div>

        {/* Next Button - Fixed at bottom */}
        <div className="px-4 pb-6 pt-4">
          <button 
            onClick={onClose}
            className="w-full bg-[#da0011] text-white text-[17px] font-semibold py-3.5 rounded active:bg-[#b5000e] transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskProfileQuestionnaire;
