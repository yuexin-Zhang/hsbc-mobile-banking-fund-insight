import React, { useEffect, useState } from 'react';
import { useMobileDetect } from '../../../hooks/useMobileDetect';
import AlertEditor, { PriceAlert, AssetType } from '../components/AlertEditor';
import { AlertsModalProps, AlertTab, PriceAlertView, Alert } from './AlertsModal/types';
import { mockPriceAlerts, getDefaultAlert } from './AlertsModal/data';
import { dropdownAnimationStyles } from './AlertsModal/styles';
import FocusTab from './AlertsModal/FocusTab';
import PriceAlertsTab from './AlertsModal/PriceAlertsTab';
import ManageView from './AlertsModal/ManageView';

// Generate focus alerts based on callbacks
const createFocusAlerts = (onClose: () => void): Alert[] => [
  {
    id: '1',
    title: 'Stock Concentration Risk',
    description: 'Tech concentration at 45% exceeds recommended 35% threshold →',
    action: 'Rebalance',
    actionHandler: () => {
      onClose();
      const stockSection = document.querySelector('[data-section="stock"]');
      if (stockSection) stockSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  {
    id: '2',
    title: 'Unit Trust Underperformance',
    description: 'BGF ENERGY showing recent underperformance; monitor for reallocation →',
    action: 'Compare',
    actionHandler: () => {
      onClose();
      const utSection = document.querySelector('[data-section="unit-trust"]');
      if (utSection) utSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  {
    id: '3',
    title: 'Rebalancing Opportunity',
    description: 'Increase Asia ex-Japan exposure by 3-5% to capture emerging growth →',
    action: 'View Funds',
    actionHandler: () => {
      onClose();
      const utSection = document.querySelector('[data-section="unit-trust"]');
      if (utSection) utSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
];

const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose, onContactRM, onShowStockDetail }) => {
  const [activeTab, setActiveTab] = useState<AlertTab>('focus');
  const [priceAlertView, setPriceAlertView] = useState<PriceAlertView>('triggered');
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(mockPriceAlerts);
  const [editingAlert, setEditingAlert] = useState<PriceAlert | null>(null);
  const [showNewAlertMenu, setShowNewAlertMenu] = useState(false);
  const isMobile = useMobileDetect();

  const triggeredAlerts = priceAlerts.filter(a => a.triggered);
  const focusAlerts = createFocusAlerts(onClose);

  const handleTriggeredAlertClick = (alert: PriceAlert) => {
    if (alert.assetType === 'stock' && onShowStockDetail) {
      onShowStockDetail();
    }
  };

  const handleEditAlert = (alert: PriceAlert) => {
    setEditingAlert(alert);
    setPriceAlertView('edit');
  };

  const handleAddNewAlert = (assetType: AssetType) => {
    setEditingAlert(getDefaultAlert(assetType));
    setShowNewAlertMenu(false);
    setPriceAlertView('edit');
  };

  const handleSaveAlert = (savedAlert: PriceAlert) => {
    setPriceAlerts(prev => {
      const existingIndex = prev.findIndex(a => a.id === savedAlert.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = savedAlert;
        return updated;
      }
      if (prev.length >= 6) {
        return [...prev.slice(1), savedAlert];
      }
      return [...prev, savedAlert];
    });
    setPriceAlertView('manage');
  };

  const handleDeleteAlert = (alertId: string) => {
    setPriceAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{dropdownAnimationStyles}</style>
      
      <div className="absolute inset-0 z-50">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/20" onClick={onClose} />
        
        {/* Modal content */}
        <div 
          className={`absolute ${isMobile ? 'top-[52px]' : 'top-[82px]'} right-4 w-[300px] alert-dropdown`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-300 transform rotate-45 shadow-lg"></div>
          
          <div className="relative bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-300 overflow-hidden max-h-[480px] flex flex-col rounded-sm">
            {/* Tab Header */}
            <div className="flex border-b border-gray-200 bg-white flex-shrink-0">
              <button
                onClick={() => setActiveTab('focus')}
                className={`cursor-pointer flex-1 py-2.5 text-[13px] font-medium transition-colors relative ${
                  activeTab === 'focus' ? 'text-[#da0011]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Today's Focus
                {activeTab === 'focus' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da0011]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('priceAlerts')}
                className={`cursor-pointer flex-1 py-2.5 text-[13px] font-medium transition-colors relative ${
                  activeTab === 'priceAlerts' ? 'text-[#da0011]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Price Alerts ({triggeredAlerts.length})
                {activeTab === 'priceAlerts' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da0011]" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="overflow-y-auto flex-1">
              {activeTab === 'focus' ? (
                <FocusTab alerts={focusAlerts} />
              ) : (
                <PriceAlertsTab
                  triggeredAlerts={triggeredAlerts}
                  totalAlertCount={priceAlerts.length}
                  onAlertClick={handleTriggeredAlertClick}
                  onManage={() => setPriceAlertView('manage')}
                />
              )}
            </div>

            {/* Footer */}
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <p className="text-[9px] text-gray-500 text-center leading-snug">
                {activeTab === 'focus' ? 'Key insights from your holdings and market data' : 'Tap triggered alerts to view details'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Manage View Overlay */}
      {activeTab === 'priceAlerts' && priceAlertView === 'manage' && (
        <ManageView
          isMobile={isMobile}
          priceAlerts={priceAlerts}
          showNewAlertMenu={showNewAlertMenu}
          onBack={() => setPriceAlertView('triggered')}
          onEdit={handleEditAlert}
          onAddNew={handleAddNewAlert}
          onToggleNewMenu={setShowNewAlertMenu}
        />
      )}

      {/* Alert Editor Overlay */}
      {activeTab === 'priceAlerts' && priceAlertView === 'edit' && (
        <AlertEditor
          isOpen={priceAlertView === 'edit'}
          onClose={() => setPriceAlertView('manage')}
          alert={editingAlert}
          onSave={handleSaveAlert}
          onDelete={handleDeleteAlert}
        />
      )}
    </>
  );
};

export default AlertsModal;
