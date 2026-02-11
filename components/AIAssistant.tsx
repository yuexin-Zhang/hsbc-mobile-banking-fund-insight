import React, { useState, useEffect } from 'react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'scenario' | 'analysis'; // 'scenario' for lion icon, 'analysis' for floating button
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, mode = 'scenario' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{type: 'user' | 'ai', content: string, timestamp: number}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [showRMContact, setShowRMContact] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      
      // If mode is 'analysis' (from floating button), auto-trigger portfolio-performance
      if (mode === 'analysis') {
        setSelectedScenario('portfolio-performance');
        setIsGenerating(true);
        setShowResponse(false);
        setTimeout(() => {
          setIsGenerating(false);
          setShowResponse(true);
        }, 2000);
      } else {
        setIsGenerating(false);
        setSelectedScenario(null);
        setShowResponse(false);
      }
    }
  }, [isOpen, mode]);

  const handleScenarioClick = (scenario: string) => {
    setSelectedScenario(scenario);
    setIsGenerating(true);
    setShowResponse(false);
    // Simulate AI thinking and response generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowResponse(true);
    }, 2000);
  };

  const scenarios = [
    {
      id: 'portfolio-performance',
      title: 'Portfolio Performance Review',
      question: "What's my portfolio performance?",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11z"/>
        </svg>
      )
    },
    {
      id: 'fixed-deposit',
      title: 'Fixed Deposit Maturity',
      question: "My fixed deposit has just matured and I'm holding a lot of cash. Given the recent HSBC House View on falling interest rates, I'm thinking of moving into the Global Equity Fund. Is now the right time to start, and will this make my portfolio too risky?",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
        </svg>
      )
    },
    {
      id: 'retirement-planning',
      title: 'Retirement Planning',
      question: "I'm 55 years old and planning to retire in 10 years. I want to make sure I have enough income during retirement. My portfolio has drifted quite a bit from my original allocation. How should I rebalance my investments to generate stable income for my retirement years?",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
      )
    }
  ];

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleHomeClick = () => {
    setSelectedScenario(null);
    setIsGenerating(false);
    setShowResponse(false);
    setConversationHistory([]);
    setInputValue('');
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      type: 'user' as const,
      content: inputValue,
      timestamp: Date.now()
    };
    setConversationHistory(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Start generating AI response
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Add AI response based on the question
      const aiResponse = {
        type: 'ai' as const,
        content: generateFollowUpResponse(inputValue),
        timestamp: Date.now()
      };
      setConversationHistory(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const generateFollowUpResponse = (question: string) => {
    // Check if question contains 'market' keyword
    if (question.toLowerCase().includes('market')) {
      return 'market-analysis';
    }
    // For now, return a predefined response for profit-taking question
    // You can expand this with more sophisticated logic
    return 'profit-taking-advice';
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
        <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200 shadow-sm flex-shrink-0">
          {/* Back Button */}
          {(selectedScenario || conversationHistory.length > 0) && (
            <button 
              onClick={handleHomeClick}
              className="w-8 h-8 bg-gray-100 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200 flex-shrink-0 cursor-pointer"
              title="Return to scenarios"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}

          {/* Market Indices */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <svg className="w-4 h-4 text-[#da0011] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l4-4 4 4m-4-4v18" />
              </svg>
              <div className="min-w-0">
                <div className="text-gray-500 text-[9px] font-medium truncate">S&P 500</div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 text-xs font-bold">3,425.18</span>
                  <span className="text-[#da0011] text-[9px] font-medium">+1.24%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <svg className="w-4 h-4 text-[#da0011] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l4-4 4 4m-4-4v18" />
              </svg>
              <div className="min-w-0">
                <div className="text-gray-500 text-[8px] font-medium truncate">Strategic Asset</div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 text-xs font-bold">128.45</span>
                  <span className="text-[#da0011] text-[9px] font-medium">+2.15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="w-8 h-8 bg-gray-100 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200 flex-shrink-0 cursor-pointer"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Assistant Content - Scrollable with overscroll prevention */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-none" 
          style={{ paddingBottom: '20px' }}
        >
          {/* Show Scenarios if no scenario selected AND no conversation history */}
          {!selectedScenario && conversationHistory.length === 0 && (
            <>
              {/* AI Avatar & Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#da0011] to-[#ba000e] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 text-sm font-bold">HSBC Wealth Assistant</div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mt-0.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Ready to assist
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="text-gray-900 text-xs leading-relaxed">
                  Hello Wei Zhang, I'm your HSBC Wealth Assistant. How can I help you today? Choose a scenario below or ask me anything about your portfolio.
                </div>
              </div>

              {/* Scenario Cards */}
              <div className="space-y-2">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleScenarioClick(scenario.id)}
                    className="w-full bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#da0011] to-[#ba000e] rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                        {scenario.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-900 text-xs font-bold mb-1">{scenario.title}</div>
                        <div className="text-gray-600 text-[10px] leading-relaxed line-clamp-2">{scenario.question}</div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Show Conversation when scenario is selected OR when user sends a message */}
          {(selectedScenario || conversationHistory.length > 0) && (
            <>
              {/* User Question from scenario */}
              {selectedScenario && (
                <div className="flex justify-end">
                  <div className="bg-[#da0011] text-white rounded-lg p-3 max-w-[85%] shadow-sm">
                    <div className="text-[10px] leading-relaxed">
                      {scenarios.find(s => s.id === selectedScenario)?.question}
                    </div>
                  </div>
                </div>
              )}

              {/* User messages from conversation history */}
              {!selectedScenario && conversationHistory.filter(msg => msg.type === 'user').map((msg, idx) => (
                <div key={`user-${idx}`} className="flex justify-end">
                  <div className="bg-[#da0011] text-white rounded-lg p-3 max-w-[85%] shadow-sm">
                    <div className="text-[10px] leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* AI Avatar & Status - only for scenario questions */}
              {selectedScenario && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#da0011] to-[#ba000e] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 text-sm font-bold">HSBC Wealth Assistant</div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mt-0.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        {isGenerating ? 'Deep thinking (1 second)' : 'Analysis complete'}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Thought Process - Only show during generation */}
              {isGenerating && selectedScenario && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-900 text-xs font-medium mb-1">
                        {selectedScenario === 'portfolio-performance' ? 'Analyzed your 9 fund holdings' : 'Analyzing your portfolio'}
                      </div>
                      <div className="text-gray-500 text-[10px]">
                        {selectedScenario === 'portfolio-performance' ? 'Total portfolio value: ¥9.40M CNY (9 funds)' : 'Reviewing asset allocation and market conditions'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-900 text-xs font-medium mb-1">
                        {selectedScenario === 'portfolio-performance' ? 'Retrieved performance metrics' : 'Consulting HSBC House View'}
                      </div>
                      <div className="text-gray-500 text-[10px]">
                        {selectedScenario === 'portfolio-performance' ? '1Y Return: +28.59% | Max Drawdown: 16.70%' : 'Checking latest market outlook and recommendations'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5 animate-spin">
                      <div className="w-2 h-2 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                    </div>
                    <div>
                      <div className="text-gray-900 text-xs font-medium">
                        {selectedScenario === 'portfolio-performance' ? 'Generating insights' : 'Generating personalized recommendation'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Thought Process for user input (non-scenario) */}
              {isGenerating && !selectedScenario && conversationHistory.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5 animate-spin">
                      <div className="w-2 h-2 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                    </div>
                    <div>
                      <div className="text-gray-900 text-xs font-medium">Analyzing your question...</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Analysis Response - Triggered by user input containing 'market' */}
              {conversationHistory.some(msg => msg.type === 'ai' && msg.content === 'market-analysis') && (
                <>
                  {conversationHistory.map((msg, idx) => {
                    if (msg.type === 'ai' && msg.content === 'market-analysis') {
                      return (
                        <React.Fragment key={`market-${idx}`}>
                          {/* Market Analysis AI Avatar */}
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#da0011] to-[#ba000e] rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-gray-900 text-sm font-bold">HSBC Wealth Assistant</div>
                              <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mt-0.5">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Analysis complete
                              </div>
                            </div>
                          </div>

                          {/* Market Analysis Response */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                              <p>
                                Certainly, Wei Zhang. Let me provide you with today's market analysis based on the current environment.
                              </p>
                            </div>
                          </div>

                          {/* Sector Impact Quadrant Chart */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <div className="text-gray-900 text-sm font-bold mb-3">Sector Impact from Rising Yield Environment</div>
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                              <div className="grid grid-cols-2 gap-4 relative">
                                {/* Quadrant Chart Representation */}
                                <div className="col-span-2 relative h-64 border-2 border-gray-300">
                                  {/* Axes Labels */}
                                  <div className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-gray-600 font-medium whitespace-nowrap">Cyclical ← → Defensive</div>
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-[10px] text-gray-600 font-medium whitespace-nowrap">Negative Impact ← → Positive Impact</div>
                                  
                                  {/* Center Lines */}
                                  <div className="absolute left-1/2 top-0 bottom-0 border-l border-gray-300"></div>
                                  <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
                                  
                                  {/* Sector Positions */}
                                  {/* Real Estate - Top Left (0.1, 0.85) */}
                                  <div className="absolute" style={{left: '10%', top: '15%'}}>
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <div className="text-[8px] text-gray-700 font-medium mt-1 whitespace-nowrap">Real Estate</div>
                                  </div>
                                  
                                  {/* Utilities - Top Left (0.15, 0.8) */}
                                  <div className="absolute" style={{left: '15%', top: '20%'}}>
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <div className="text-[8px] text-gray-700 font-medium mt-1 whitespace-nowrap">Utilities</div>
                                  </div>
                                  
                                  {/* Staples - Top Middle (0.4, 0.7) */}
                                  <div className="absolute" style={{left: '40%', top: '30%'}}>
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <div className="text-[8px] text-gray-700 font-medium mt-1 whitespace-nowrap">Staples</div>
                                  </div>
                                  
                                  {/* Technology - Right Middle (0.7, 0.6) */}
                                  <div className="absolute" style={{left: '70%', top: '40%'}}>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="text-[8px] text-gray-700 font-medium mt-1 whitespace-nowrap">Technology</div>
                                  </div>
                                  
                                  {/* Financials - Right Middle (0.65, 0.5) */}
                                  <div className="absolute" style={{left: '65%', top: '50%'}}>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <div className="text-[8px] text-gray-700 font-medium mt-1 whitespace-nowrap">Financials</div>
                                  </div>
                                  
                                  {/* Energy - Bottom Right (0.8, 0.4) */}
                                  <div className="absolute" style={{left: '80%', top: '60%'}}>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="text-[8px] text-gray-700 font-medium mt-1 whitespace-nowrap">Energy</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Market Drivers Card */}
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center gap-2 mb-3">
                              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                              </svg>
                              <div className="text-gray-900 text-xs font-bold">Primary Driver</div>
                            </div>
                            <div className="text-gray-900 text-xs leading-relaxed">
                              Markets are digesting a <span className="font-bold text-[#da0011]">"higher-for-longer"</span> interest rate narrative, pushing Treasury yields up and pressuring rate-sensitive sectors.
                            </div>
                          </div>

                          {/* Key Rotation Card */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <svg className="w-5 h-5 text-[#da0011] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                              </svg>
                              <div className="text-gray-900 text-xs font-bold">Key Rotation</div>
                            </div>
                            <div className="text-gray-900 text-xs leading-relaxed">
                              Leadership remains <span className="font-bold">narrow</span>, concentrated in <span className="font-bold text-blue-600">mega-cap Tech</span> (driven by AI themes), while <span className="font-bold text-orange-600">Utilities</span> and <span className="font-bold text-red-600">Real Estate</span> weaken. Small-caps are lagging, indicating compressed risk appetite.
                            </div>
                          </div>

                          {/* Strategic Takeaway Card */}
                          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              <div className="text-gray-900 text-xs leading-relaxed">
                                <span className="font-bold text-emerald-700">Strategic Takeaway:</span> Portfolios should emphasize <span className="font-bold">quality</span> and review <span className="font-bold text-[#da0011]">duration risk</span>. Consider tilting exposure toward sectors with <span className="font-bold">secular tailwinds</span> or <span className="font-bold">pricing power</span> that can navigate the current rate environment.
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
                </>
              )}

              {/* Portfolio Performance Response - From AIAssistantOriginal.tsx */}
              {showResponse && selectedScenario === 'portfolio-performance' && (
                <>
                  {/* AI Response */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm animate-fade-in">
                    <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                      <p>
                        Based on your portfolio analysis, I've identified key insights about your fund holdings worth 
                        <span className="font-bold text-[#da0011]"> ¥9.40M CNY</span> across 9 funds.
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-red-50 text-[#da0011] rounded text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                        <span>Your <span className="font-bold">top performer</span> is BLK Sys GE High Inc (IPFD3116) with an outstanding return of <span className="font-bold text-[#da0011]">+42.56%</span>, significantly outperforming the market.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-red-50 text-[#da0011] rounded text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
                        <span>Your portfolio shows strong diversification with exposure to global equity, energy, precious metals, and fixed income sectors.</span>
                      </p>
                    </div>
                  </div>

                  {/* Fund Performance Card */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-gray-900 text-sm font-bold">Top Performing Funds</div>
                      <div className="text-gray-500 text-[9px]">Based on Your Holdings</div>
                    </div>

                    <div className="text-gray-600 text-[10px] mb-3">Filter: Highest Returns YTD</div>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-gray-200">
                      <div className="text-gray-500 text-[9px] font-medium">Fund Name</div>
                      <div className="text-gray-500 text-[9px] font-medium text-center">Return</div>
                      <div className="text-gray-500 text-[9px] font-medium text-right">Market Value</div>
                    </div>

                    {/* Fund Items */}
                    {[
                      { name: 'BLK Sys GE High Inc', code: 'IPFD3116', change: '+42.56%', value: '$215,204', isUp: true },
                      { name: 'BLK Sys GE High Inc', code: 'IPFD2116', change: '+11.10%', value: '$213,257', isUp: true },
                      { name: 'BGF WLD MIN', code: 'IPFD3004', change: '+21.76%', value: '$134,832', isUp: true },
                    ].map((fund, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-2 py-2.5 border-b border-gray-100 last:border-0">
                        <div>
                          <div className="text-gray-900 text-[10px] font-bold">{fund.name}</div>
                          <div className="text-gray-500 text-[9px] flex items-center gap-1">
                            {fund.code}
                            <button className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center hover:border-gray-600">
                              <span className="text-gray-500 text-[8px]">→</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className={`flex items-center justify-center px-2 h-7 rounded-full ${fund.isUp ? 'bg-red-50' : 'bg-emerald-50'}`}>
                            <span className={`text-[10px] font-bold ${fund.isUp ? 'text-[#da0011]' : 'text-[#5cb85c]'}`}>
                              {fund.change}
                            </span>
                          </div>
                        </div>
                        <div className="text-gray-900 text-[11px] font-bold text-right flex items-center justify-end">
                          {fund.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Risk Alert */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200 animate-fade-in">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <div className="text-gray-900 text-xs leading-relaxed">
                        <span className="font-bold text-amber-700">Portfolio Alert:</span> Your China Trust holdings 
                        (CR Trust FirstEagle No.8) show a slight decline of <span className="font-medium text-[#3c763d]">-1.49%</span>. 
                        Consider reviewing your fixed income allocation as market conditions evolve.
                      </div>
                    </div>
                  </div>

                  {/* Additional Insight */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-100 animate-fade-in">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#da0011] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      <div className="text-gray-900 text-xs leading-relaxed">
                        <span className="font-bold text-[#da0011]">Rebalancing Strategy:</span> Your portfolio's 
                        1-year return of <span className="font-bold">+28.59%</span> with a max drawdown of 
                        <span className="font-bold"> 16.70%</span> indicates strong performance but higher volatility. 
                        Consider increasing your exposure to defensive assets like BGF GOLD to 
                        balance risk during potential market corrections.
                      </div>
                    </div>
                  </div>

                  {/* Smart RM Contact Recommendation */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 animate-fade-in">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="text-gray-900 text-xs leading-relaxed">
                        <span className="font-bold text-blue-700">Need Expert Advice?</span> Your portfolio shows exceptional growth. To optimize your rebalancing strategy and explore personalized options, 
                        <button 
                          onClick={() => setShowRMContact(true)}
                          className="text-[#da0011] underline font-semibold cursor-pointer hover:text-[#ba000e]"
                        >
                          contact your RM
                        </button> for a detailed consultation.
                      </div>
                    </div>
                  </div>
                
                  {/* Follow-up conversation */}
                  {conversationHistory.map((msg, idx) => (
                    <React.Fragment key={idx}>
                      {msg.type === 'user' ? (
                        <div className="flex justify-end">
                          <div className="bg-[#da0011] text-white rounded-lg p-3 max-w-[85%] shadow-sm">
                            <div className="text-[10px] leading-relaxed">
                              {msg.content}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* AI Avatar for follow-up */}
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#da0011] to-[#ba000e] rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-gray-900 text-sm font-bold">HSBC Wealth Assistant</div>
                              <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mt-0.5">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Analysis complete
                              </div>
                            </div>
                          </div>
                
                          {msg.content === 'profit-taking-advice' && (
                            <>
                              {/* Main Response */}
                              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                                  <p>
                                    Excellent question, Wei Zhang. Given your portfolio's strong performance with a <span className="font-bold text-[#da0011]">+28.59% return</span> but relatively high <span className="font-bold">16.70% drawdown</span>, let me provide a balanced perspective on profit-taking.
                                  </p>
                                  <p>
                                    Rather than an all-or-nothing approach, I recommend a <span className="font-bold text-[#da0011]">strategic partial profit-taking strategy</span>:
                                  </p>
                                </div>
                              </div>
                
                              {/* Strategy Card */}
                              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                <div className="text-gray-900 text-sm font-bold mb-3">Recommended Action Plan</div>
                                <div className="space-y-3">
                                  <div className="flex items-start gap-2">
                                    <span className="inline-flex items-center justify-center w-5 h-5 bg-[#da0011] text-white rounded text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                                    <div className="text-gray-900 text-xs leading-relaxed">
                                      <span className="font-bold">Take partial profits from your top performer</span> - Consider reducing your BLK Sys GE High Inc (IPFD3116) position by <span className="font-bold text-[#da0011]">20-30%</span> to lock in gains while maintaining exposure.
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <span className="inline-flex items-center justify-center w-5 h-5 bg-[#da0011] text-white rounded text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
                                    <div className="text-gray-900 text-xs leading-relaxed">
                                      <span className="font-bold">Rebalance into defensive assets</span> - Use proceeds to increase your BGF GOLD allocation, which serves as a hedge during market volatility.
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <span className="inline-flex items-center justify-center w-5 h-5 bg-[#da0011] text-white rounded text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
                                    <div className="text-gray-900 text-xs leading-relaxed">
                                      <span className="font-bold">Maintain core equity positions</span> - Keep your long-term holdings as the overall market outlook remains positive according to HSBC House View.
                                    </div>
                                  </div>
                                </div>
                              </div>
                
                              {/* Market Timing Card */}
                              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                                  <p className="font-bold text-gray-900">Why Now Could Be a Good Time:</p>
                                  <div className="space-y-2.5">
                                    <div className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                                      <div>Your top fund has gained <span className="font-bold text-[#da0011]">+42.56%</span>, significantly above market averages</div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                                      <div>Current market conditions show some uncertainty with geopolitical risks</div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                                      <div>Rebalancing helps maintain your target risk profile</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                
                              {/* Action Card */}
                              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                                <div className="flex items-start gap-2">
                                  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                  </svg>
                                  <div className="text-gray-900 text-xs leading-relaxed">
                                    <span className="font-bold text-emerald-700">Bottom Line:</span> Don't sell everything, but taking <span className="font-bold text-[#da0011]">strategic partial profits</span> from your strongest performers and rebalancing into defensive assets can help protect your gains while keeping you positioned for future growth.
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                
                  {/* Thinking animation for follow-up */}
                  {isGenerating && conversationHistory.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5 animate-spin">
                          <div className="w-2 h-2 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                        </div>
                        <div>
                          <div className="text-gray-900 text-xs font-medium">Analyzing your question</div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* AI Response - Only show after generation completes */}
              {showResponse && selectedScenario === 'fixed-deposit' && (
                <>
                  {/* Main AI Response */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                      <p>
                        Certainly, Wei Zhang. Let me analyze this for you.
                      </p>
                      <p>
                        Thank you for this thoughtful question about your investment timing. I can sense you're being prudent about both market opportunities and risk management - that's exactly the right approach.
                      </p>
                      <p>
                        Looking at the current market environment, our <span className="font-bold">HSBC House View</span> indicates we're entering a favorable period for investments. Global interest rates are expected to trend downward, and we're seeing moderate global economic growth forecasts for 2026, with gradually easing inflation pressures. This environment indeed creates an interesting opportunity to reconsider your cash allocation.
                      </p>
                      <p>
                        However, rather than moving all your funds at once, I'd recommend our proven <span className="font-bold text-[#da0011]">Phased Entry Strategy</span>:
                      </p>
                    </div>
                  </div>

                  {/* Strategy Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-[#da0011] text-white rounded text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                        <div className="text-gray-900 text-xs leading-relaxed">
                          Start with investing <span className="font-bold">30% of your intended amount now</span> - this gives you immediate market participation while managing risk
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-[#da0011] text-white rounded text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
                        <div className="text-gray-900 text-xs leading-relaxed">
                          Gradually invest the remaining <span className="font-bold">70% over the next few months</span> through systematic investments
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Review */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                      <p>
                        Regarding your portfolio risk concern - I've reviewed your current asset allocation:
                      </p>
                      <div className="grid grid-cols-2 gap-2 my-3">
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="text-gray-500 text-[9px] mb-1">Equities</div>
                          <div className="text-gray-900 text-sm font-bold">40%</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="text-gray-500 text-[9px] mb-1">Fixed Income</div>
                          <div className="text-gray-900 text-sm font-bold">30%</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="text-gray-500 text-[9px] mb-1">Cash</div>
                          <div className="text-gray-900 text-sm font-bold">20%</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="text-gray-500 text-[9px] mb-1">Alternatives</div>
                          <div className="text-gray-900 text-sm font-bold">10%</div>
                        </div>
                      </div>
                      <p>
                        Your portfolio actually shows good diversification. Our CIO team currently has an <span className="font-bold text-[#da0011]">'Overweight' recommendation</span> for both equities and bonds, with a particular focus on <span className="font-bold">technology and consumer sectors</span>. Given this view and your existing balanced allocation, a gradual increase in equity exposure could align well with our market outlook.
                      </p>
                    </div>
                  </div>

                  {/* Risk Alert */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <div className="text-gray-900 text-xs leading-relaxed">
                        <span className="font-bold text-amber-700">Key Risk Factors:</span> We should be mindful of potential geopolitical risks, inflation resurgence possibilities, and real estate market adjustments.
                      </div>
                    </div>
                  </div>

                  {/* Action Card with RM Contact */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#da0011] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                      <div className="text-gray-900 text-xs leading-relaxed">
                        <span className="font-bold text-[#da0011]">Next Step:</span> I suggest we schedule a detailed portfolio review with your relationship manager to fine-tune the entry strategy and ensure it aligns perfectly with your long-term financial goals.
                        <div className="mt-2">
                          <button 
                            onClick={() => setShowRMContact(true)}
                            className="text-[#da0011] underline font-medium cursor-pointer hover:text-[#ba000e]"
                          >
                            Contact your RM
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Retirement Planning Response */}
              {showResponse && selectedScenario === 'retirement-planning' && (
                <>
                  {/* Main AI Response */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                      <p>
                        Certainly, Wei Zhang. Let me analyze this for you.
                      </p>
                      <p>
                        I understand you're looking ahead to retirement in 10 years and feeling concerned about both your portfolio's current allocation and future income stability. Let me help you address both aspects.
                      </p>
                      <p>
                        Looking at your current situation, your portfolio of <span className="font-bold text-[#da0011]">CNY 4.5 million</span> has drifted from its target allocation. I notice your equity exposure is at 40%, fixed income at 30%, cash at 20%, and alternatives at 10%. Given your 10-year horizon to retirement, we should adjust this to better align with your retirement income goals.
                      </p>
                      <p className="font-bold text-gray-900">
                        Here's what I recommend:
                      </p>
                    </div>
                  </div>

                  {/* Portfolio Rebalancing Card */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-gray-900 text-sm font-bold mb-3">1. Portfolio Rebalancing</div>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                        <div className="text-gray-900">First, let's gradually reduce your cash position from <span className="font-bold">20% to around 10%</span>, as this is higher than optimal for your time horizon</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                        <div className="text-gray-900">Increase your fixed income allocation to <span className="font-bold">35-40%</span> to start building your income base</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                        <div className="text-gray-900">Maintain equity exposure around <span className="font-bold">40-45%</span> for continued growth potential</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                        <div className="text-gray-900">Keep the <span className="font-bold">10% allocation to alternatives</span> (particularly your gold position) as a hedge against market volatility</div>
                      </div>
                    </div>
                  </div>

                  {/* Income Strategy Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-gray-900 text-sm font-bold mb-3">2. Income Strategy for Retirement</div>
                    <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                      <p>
                        Your retirement goal is <span className="font-bold text-[#da0011]">CNY 5 million</span>, and you're currently <span className="font-bold">65% of the way there</span>, which is good progress. To strengthen your retirement income strategy:
                      </p>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                          <div>Consider increasing your allocation to <span className="font-bold">dividend-paying stocks</span>, particularly through funds like your existing HSBC China Growth Fund which can provide both growth and income</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                          <div>Add more <span className="font-bold">high-quality bonds</span> to your fixed income portion - the current market outlook suggests favorable conditions for bonds with rates expected to peak</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                          <div>Maintain a <span className="font-bold">diversified approach</span> across different income sources (dividends, bond interest, and alternative investments)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Implementation Timeline Card */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-gray-900 text-sm font-bold mb-3">3. Implementation Timeline</div>
                    <div className="text-gray-900 text-xs leading-relaxed space-y-3">
                      <p>
                        I recommend executing these changes gradually over the next <span className="font-bold">3-6 months</span> to minimize market timing risks. We can start with:
                      </p>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                          <div>Redeploying half of your excess cash position (about <span className="font-bold">CNY 450,000</span>) into fixed income initially</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                          <div>Adding to your equity positions through dollar-cost averaging</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#da0011] rounded-full flex-shrink-0 mt-1.5"></div>
                          <div>Regular quarterly reviews to ensure we stay on track with the new allocation</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Income Projection Card */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <div className="text-gray-900 text-xs leading-relaxed">
                        <span className="font-bold text-emerald-700">Income Projection:</span> Based on your current portfolio value and our recommended strategy, you could generate approximately <span className="font-bold text-[#da0011]">CNY 180,000-225,000 annually</span> (4-5% withdrawal rate) in retirement income, while maintaining portfolio growth potential.
                      </div>
                    </div>
                  </div>

                  {/* Action Card with RM Contact */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#da0011] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                      <div className="text-gray-900 text-xs leading-relaxed">
                        <span className="font-bold text-[#da0011]">Next Step:</span> Would you like to schedule a detailed review session to discuss these recommendations in more depth and create a specific implementation plan?
                        <div className="mt-2">
                          <button 
                            onClick={() => setShowRMContact(true)}
                            className="text-[#da0011] underline font-medium cursor-pointer hover:text-[#ba000e]"
                          >
                            Contact your RM
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Input Bar at Bottom - Fixed */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
            {/* RM Contact Button - Inside input box */}
            <button 
              onClick={() => setShowRMContact(true)}
              className="w-8 h-8 flex items-center justify-center text-[#da0011] hover:bg-red-50 rounded-full transition-colors flex-shrink-0 cursor-pointer"
              title="Contact your Relationship Manager"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <input 
              type="text"
              placeholder="Ask about your portfolio performance..."
              className="flex-1 bg-transparent text-gray-900 text-xs placeholder:text-gray-400 focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="w-8 h-8 bg-[#da0011] rounded-full flex items-center justify-center hover:bg-[#ba000e] transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={!inputValue.trim()}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
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
        
        {/* RM Contact Panel */}
        {showRMContact && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowRMContact(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h2 className="text-[17px] font-semibold text-gray-900">Your Relationship Manager</h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* RM Profile Card */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 border border-red-100">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#da0011] to-[#ba000e] flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 text-base font-bold">Sarah Chen</div>
                    <div className="text-gray-600 text-xs mt-0.5">Senior Relationship Manager</div>
                    <div className="text-gray-600 text-xs mt-0.5">HSBC Premier</div>
                    <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] mt-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Available now
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <div className="text-gray-900 text-sm font-bold mb-3">Contact Options</div>
                
                <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#da0011] to-[#ba000e] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 text-xs font-bold">Call Now</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">+852 2233 3322</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 text-xs font-bold">Send Email</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">sarah.chen@hsbc.com.hk</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 text-xs font-bold">Live Chat</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">Start secure messaging</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 text-xs font-bold">Schedule Meeting</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">Book an appointment</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Office Info */}
              <div className="bg-white p-4 border border-gray-200">
                <div className="text-gray-900 text-sm font-bold mb-3">Office Location</div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-gray-600 text-xs leading-relaxed">
                      HSBC Main Building<br/>
                      1 Queen's Road Central<br/>
                      Hong Kong
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-gray-600 text-xs">
                      Mon-Fri: 9:00 AM - 5:00 PM<br/>
                      Sat: 9:00 AM - 1:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 border border-amber-200">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <div className="text-gray-900 text-xs leading-relaxed">
                    <span className="font-bold text-amber-700">24/7 Premier Hotline:</span><br/>
                    For urgent matters, call +852 2233 3000
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
