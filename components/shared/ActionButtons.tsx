import React from 'react';

const ActionButtons: React.FC = () => {
  return (
    <div className="bg-white px-4 pt-6 pb-4 mt-4">
      <div className="grid grid-cols-4 gap-4">
        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}icon1.png`} alt="Trade stocks" className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] text-center text-gray-900 leading-tight">Trade<br/>stocks</span>
        </button>

        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}icon2.png`} alt="Wealth Portfolio Lending" className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] text-center text-gray-900 leading-tight">Wealth<br/>Portfolio<br/>Lending</span>
        </button>

        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}icon3.png`} alt="Trade funds" className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] text-center text-gray-900 leading-tight">Trade<br/>funds</span>
        </button>

        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}icon4.png`} alt="Analyse your portfolio" className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] text-center text-gray-900 leading-tight">Analyse<br/>your<br/>portfolio</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
