import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMobileDetect } from './hooks/useMobileDetect';
import PhoneFrame from './components/PhoneFrame';
import HomePage from './pages/Home';
import PortfolioPage from './pages/Portfolio';
import FundPage from './pages/Fund';

const App: React.FC = () => {
  const isMobile = useMobileDetect();

  return (
    <BrowserRouter basename="/hsbc-mobile-banking-fund-insight">
      <div className={`w-full ${isMobile ? 'h-screen' : 'flex justify-center items-center'}`}>
        <PhoneFrame>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/fund" element={<FundPage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </PhoneFrame>
      </div>
    </BrowserRouter>
  );
};

export default App;
