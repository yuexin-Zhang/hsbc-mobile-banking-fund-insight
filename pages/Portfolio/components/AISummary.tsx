import React from 'react';

interface AISummaryProps {
  children: React.ReactNode;
}

export const AISummary: React.FC<AISummaryProps> = ({ children }) => {
  return (
    <div className="bg-[#f0f8ff] p-2">
      <p className="text-[11px] text-gray-700 leading-snug">
        {children}
      </p>
    </div>
  );
};

export default AISummary;
