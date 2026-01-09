
import React from 'react';

const PromoBanner: React.FC = () => {
  return (
    <div className="relative h-24 rounded-md overflow-hidden shadow-sm bg-blue-900 group">
      <img 
        src="https://picsum.photos/seed/hsbc-promo/600/300" 
        alt="Promotion" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex flex-col justify-center px-4 text-white">
        <h4 className="text-sm font-bold mb-1">Global Perspective, Multi-Asset Opportunities</h4>
        <p className="text-[10px] opacity-90">HSBC China adds new mutual recognition funds for diversified allocation</p>
      </div>
      {/* Decorative skyscraper-like element to match image */}
      <div className="absolute right-8 bottom-0 w-8 h-16 bg-white/20 skew-x-[-10deg]"></div>
    </div>
  );
};

export default PromoBanner;
