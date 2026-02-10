import React from 'react';
import { useMobileDetect } from '../../hooks/useMobileDetect';
import StatusBar from '../shared/StatusBar';
import NavigationTabs from '../shared/NavigationTabs';

interface PageLayoutProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
  showNavigationTabs?: boolean;
  navigationActiveTab?: 'home' | 'wealth';
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showStatusBar = true, 
  showNavigationTabs = true,
  navigationActiveTab = 'wealth'
}) => {
  const isMobile = useMobileDetect();

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] font-sans relative">
      {/* Combined Status Bar and Navigation */}
      <div className="bg-white shrink-0">
        {/* Status Bar - Hidden on mobile */}
        {showStatusBar && !isMobile && <StatusBar />}
        
        {/* Navigation Tabs */}
        {showNavigationTabs && <NavigationTabs activeTab={navigationActiveTab} />}
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default PageLayout;
