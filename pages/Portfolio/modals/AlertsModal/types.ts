import { PriceAlert, AssetType, AlertType } from '../../components/AlertEditor';

export type { PriceAlert, AssetType, AlertType };

export interface Alert {
  id: string;
  title: string;
  description: string;
  action: string;
  actionHandler: () => void;
}

export type AlertTab = 'focus' | 'priceAlerts';
export type PriceAlertView = 'triggered' | 'manage' | 'edit';

export interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactRM: () => void;
  onShowStockDetail?: () => void;
}

export interface ManageViewProps {
  isMobile: boolean;
  priceAlerts: PriceAlert[];
  showNewAlertMenu: boolean;
  onBack: () => void;
  onEdit: (alert: PriceAlert) => void;
  onAddNew: (assetType: AssetType) => void;
  onToggleNewMenu: (show: boolean) => void;
}

export interface AlertItemProps {
  alert: PriceAlert;
  onEdit: (alert: PriceAlert) => void;
}

export interface NewAlertMenuProps {
  onSelect: (assetType: AssetType) => void;
  onCancel: () => void;
}
