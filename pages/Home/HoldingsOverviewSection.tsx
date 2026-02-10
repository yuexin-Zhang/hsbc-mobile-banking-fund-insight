import React from 'react';

const HoldingsOverviewSection: React.FC = () => {
  return (
    <div className="bg-white px-4 pb-20 pt-6">
      <h3 className="text-[17px] font-semibold text-gray-900 mb-4">Your holdings</h3>
      
      {/* Holdings bar chart */}
      <div className="h-6 flex rounded-sm overflow-hidden mb-3">
        <div className="bg-[#31708f]" style={{ width: '34.85%' }}></div>
        <div className="bg-[#5cb85c]" style={{ width: '14.54%' }}></div>
        <div className="bg-[#a94442]" style={{ width: '13.01%' }}></div>
        <div className="bg-[#f0ad4e]" style={{ width: '12.93%' }}></div>
        <div className="bg-[#31b0d5]" style={{ width: '11.49%' }}></div>
        <div className="bg-[#d9534f]" style={{ width: '13.18%' }}></div>
      </div>

      {/* Holdings list */}
      <div className="space-y-4">
        {/* Stocks */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#31708f] rounded-sm"></div>
            <div>
              <div className="text-[15px] text-gray-900">Stocks (34.85%)</div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-gray-900">3,705,442</span>
                <span className="text-[13px] text-gray-600">.00 HKD</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#da0011]">
            <span className="text-[15px] font-medium">▲ 19,939.05</span>
          </div>
        </div>

        {/* Unit Trusts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#5cb85c] rounded-sm"></div>
            <div>
              <div className="text-[15px] text-gray-900">Unit Trusts (14.54%)</div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-gray-900">1,545,972</span>
                <span className="text-[13px] text-gray-600">.28 HKD</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#5cb85c]">
            <span className="text-[15px] font-medium">▼ 5,223.18</span>
          </div>
        </div>

        {/* Investment-linked insurance */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-[#a94442] rounded-sm"></div>
            <div className="text-[15px] text-gray-900">Investment-linked insurance (13.01%)</div>
          </div>
          <div className="ml-6">
            <div className="text-[12px] text-gray-600 mb-1">Total fund balance</div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-gray-900">1,383,294</span>
              <span className="text-[13px] text-gray-600">.32 HKD</span>
            </div>
          </div>
        </div>

        {/* Insurance with saving benefit */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-[#f0ad4e] rounded-sm"></div>
            <div className="text-[15px] text-gray-900">Insurance with saving benefit (12.93%)</div>
          </div>
          <div className="ml-6">
            <div className="text-[12px] text-gray-600 mb-1">Policy value</div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-gray-900">1,374,788</span>
              <span className="text-[13px] text-gray-600">.28 HKD</span>
            </div>
          </div>
        </div>

        {/* Bonds and CDs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#31b0d5] rounded-sm"></div>
            <div>
              <div className="text-[15px] text-gray-900">Bonds and CDs (11.49%)</div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-gray-900">1,221,679</span>
                <span className="text-[13px] text-gray-600">.61 HKD</span>
              </div>
            </div>
          </div>
          <div className="text-[15px] text-gray-600">0.00%</div>
        </div>

        {/* Other holdings */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-[#d9534f] rounded-sm"></div>
            <div className="text-[15px] text-gray-900">Other holdings</div>
          </div>
          
          <div className="ml-6 space-y-3">
            <div>
              <div className="text-[13px] text-gray-900 mb-1">ELIs and Structured Notes (3.45%)</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-gray-900">366,822</span>
                  <span className="text-[13px] text-gray-600">.86 HKD</span>
                </div>
                <div className="flex items-center gap-1 text-[#5cb85c]">
                  <span className="text-[15px] font-medium">▲ 4,883.96</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[13px] text-gray-900 mb-1">HSBC Gold Token (3.02%)</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-gray-900">321,102</span>
                  <span className="text-[13px] text-gray-600">.91 HKD</span>
                </div>
                <div className="flex items-center gap-1 text-[#5cb85c]">
                  <span className="text-[15px] font-medium">▲ 3,791.34</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsOverviewSection;
