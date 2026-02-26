import React, { useEffect, useState } from 'react';
import { useMobileDetect } from '../../../hooks/useMobileDetect';

interface Alert {
  id: string;
  title: string;
  description: string;
  action: string;
  actionHandler: () => void;
}

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactRM: () => void;
}

const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose, onContactRM }) => {
  const [currentTime, setCurrentTime] = useState('');
  const isMobile = useMobileDetect();

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

  const alerts: Alert[] = [
    {
      id: '1',
      title: 'Stock Concentration Risk',
      description: 'Tech concentration at 45% exceeds recommended 35% threshold →',
      action: 'Rebalance Now',
      actionHandler: () => {
        onClose();
        const stockSection = document.querySelector('[data-section="stock"]');
        if (stockSection) {
          stockSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    {
      id: '2',
      title: 'Unit Trust Underperformance',
      description: 'BGF ENERGY showing recent underperformance; monitor for reallocation →',
      action: 'Compare Alternatives',
      actionHandler: () => {
        onClose();
        const utSection = document.querySelector('[data-section="unit-trust"]');
        if (utSection) {
          utSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    {
      id: '3',
      title: 'Unit Trust Rebalancing Opportunity',
      description: 'Increase Asia ex-Japan exposure by 3-5% to capture emerging growth →',
      action: 'View Asia Funds',
      actionHandler: () => {
        onClose();
        const utSection = document.querySelector('[data-section="unit-trust"]');
        if (utSection) {
          utSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  ];

  return (
    <>
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.3); }
          to { opacity: 1; transform: scale(1); }
        }
        .alert-dropdown {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: top right;
        }
      `}</style>
      
      <div className="absolute inset-0 z-50" onClick={onClose}>
        <div 
          className={`absolute ${isMobile ? 'top-[52px]' : 'top-[82px]'} right-3 w-[280px] alert-dropdown`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          
          <div className="relative bg-white shadow-2xl border border-gray-200 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-semibold text-gray-900">Today's Focus</h2>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {alerts.map((alert, index) => (
                  <div key={alert.id} className="px-3 py-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#da0011] text-white text-[9px] font-bold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[12px] font-semibold text-gray-900 mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-[11px] text-gray-600 leading-snug mb-2">
                          {alert.description}
                        </p>
                        <button
                          onClick={alert.actionHandler}
                          className="inline-flex items-center gap-0.5 px-2.5 py-1 bg-[#da0011] text-white text-[11px] font-semibold active:bg-[#9a000d] transition-colors cursor-pointer"
                        >
                          {alert.action}
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
                <p className="text-[9px] text-gray-500 text-center leading-snug">
                  AI-generated portfolio alerts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertsModal;
