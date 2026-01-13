import React, { useState, useEffect } from 'react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setIsGenerating(true);
      // Complete generation after 2 seconds
      const timer = setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`absolute inset-0 z-[200] transition-opacity duration-300 ${isAnimating && isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Main AI Assistant Panel */}
      <div 
        className={`absolute inset-0 bg-[#f4f5f6] transition-transform duration-300 ease-out overflow-hidden flex flex-col ${
          isAnimating && isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Market Indices Header - Fixed at top */}
        <div className="bg-white px-4 py-3 flex gap-4 border-b border-gray-200 shadow-sm flex-shrink-0 relative">
          {/* Close Button - positioned within header */}
          <button 
            onClick={handleClose}
            className="absolute top-[60px] right-4 w-9 h-9 bg-gray-100 rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-colors z-10 border border-gray-200"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-2 flex-1">
            <svg className="w-8 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l4-4 4 4m-4-4v18m16-9l-4-4-4 4m4-4v18" />
            </svg>
            <div>
              <div className="text-gray-500 text-[9px] font-medium">Hang Seng Index</div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-900 text-sm font-bold">17,482.35</span>
                <span className="text-emerald-500 text-[10px] font-medium">+0.82%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <svg className="w-8 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 17l4 4 4-4m-4 4V3m16 14l-4 4-4-4m4 4V3" />
            </svg>
            <div>
              <div className="text-gray-500 text-[9px] font-medium">Shanghai Composite</div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-900 text-sm font-bold">3,245.89</span>
                <span className="text-red-500 text-[10px] font-medium">-0.34%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assistant Content - Scrollable with overscroll prevention */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-none" 
          style={{ paddingBottom: '20px' }}
        >
          {/* AI Avatar & Status */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#da0011] to-[#ff4757] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-gray-900 text-sm font-bold">HSBC Wealth Assistant</div>
              <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mt-0.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Deep thinking (1 second)
              </div>
            </div>
          </div>

          {/* Thought Process Section */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-gray-900 text-xs font-medium mb-1">Recalled your portfolio preferences</div>
                <div className="text-gray-500 text-[10px]">You focus on China A-share market</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-gray-900 text-xs font-medium mb-1">Analyzed market intelligence</div>
                <div className="text-gray-500 text-[10px]">Found 22 relevant articles & 3 financial indicators</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${isGenerating ? 'bg-gray-100 animate-spin' : 'bg-emerald-100'}`}>
                {isGenerating ? (
                  <div className="w-2 h-2 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                ) : (
                  <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-gray-900 text-xs font-medium">{isGenerating ? 'Generating insights' : 'Insights generated'}</div>
              </div>
            </div>
          </div>

          {/* AI Response - Only show after generation completes */}
          {!isGenerating && (
            <>
              {/* AI Response */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm animate-fade-in">
            <div className="text-gray-900 text-xs leading-relaxed space-y-3">
              <p>
                I notice you're very focused on the China A-share market. Today's market showed strong activity 
                with trading volume hitting new historical highs. Capital mainly flowed into AI and aerospace sectors.
              </p>
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-red-50 text-[#da0011] rounded text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                <span>I've compiled today's representative rising stocks for your reference:</span>
              </p>
            </div>
          </div>

          {/* Stock Information Card */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-900 text-sm font-bold">Stock Information</div>
              <div className="text-gray-500 text-[9px]">Updated 01-13 10:46:03</div>
            </div>

            <div className="text-gray-600 text-[10px] mb-3">Filter: Today's Gainers</div>

            {/* Table Header */}
            <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-gray-200">
              <div className="text-gray-500 text-[9px] font-medium">Name</div>
              <div className="text-gray-500 text-[9px] font-medium text-center">Change</div>
              <div className="text-gray-500 text-[9px] font-medium text-right">Price</div>
            </div>

            {/* Stock Items */}
            {[
              { name: 'HSBC Holdings', code: '00005.HK', change: '+2.85%', price: '68.45', isUp: true },
              { name: 'China Mobile', code: '00941.HK', change: '+1.92%', price: '54.30', isUp: true },
              { name: 'Tencent Holdings', code: '00700.HK', change: '+3.24%', price: '398.20', isUp: true },
            ].map((stock, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2 py-2.5 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-gray-900 text-[10px] font-bold">{stock.name}</div>
                  <div className="text-gray-500 text-[9px] flex items-center gap-1">
                    {stock.code}
                    <button className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center hover:border-gray-600">
                      <span className="text-gray-500 text-[8px]">+</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className={`flex items-center justify-center w-12 h-7 rounded-full ${stock.isUp ? 'bg-red-50' : 'bg-emerald-50'}`}>
                    <span className={`text-[10px] font-bold ${stock.isUp ? 'text-[#da0011]' : 'text-emerald-600'}`}>
                      {stock.change}
                    </span>
                  </div>
                </div>
                <div className="text-gray-900 text-[11px] font-bold text-right flex items-center justify-end">
                  {stock.price}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Insight */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-100 animate-fade-in">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#da0011] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <div className="text-gray-900 text-xs leading-relaxed">
                <span className="font-bold text-[#da0011]">Market Insight:</span> Based on your portfolio allocation 
                and current market trends, consider rebalancing your China equity exposure. The market shows 
                strong momentum but watch for volatility in tech sectors.
              </div>
            </div>
          </div>
            </>
          )}
        </div>

        {/* Input Bar at Bottom - Fixed */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
            <input 
              type="text"
              placeholder="Ask about wealth management..."
              className="flex-1 bg-transparent text-gray-900 text-xs placeholder:text-gray-400 focus:outline-none"
            />
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </button>
          </div>
          <div className="text-gray-400 text-[9px] text-center mt-2 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            Content generated by AI, not investment advice
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
