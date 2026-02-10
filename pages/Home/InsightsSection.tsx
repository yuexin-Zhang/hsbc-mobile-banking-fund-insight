import React from 'react';

interface InsightsArticle {
  id: number;
  image: string;
  title: string;
  date: string;
}

const insightsArticles: InsightsArticle[] = [
  {
    id: 1,
    image: `${import.meta.env.BASE_URL}insight-01.png`,
    title: 'FX Viewpoint: USD and CAD: Continued underperformance?',
    date: '02 Feb 2026'
  },
  {
    id: 2,
    image: `${import.meta.env.BASE_URL}insight-02.png`,
    title: 'Investment Monthly: Diversifying further amid evolving geopolitical risks',
    date: '30 Jan 2026'
  },
  {
    id: 3,
    image: `${import.meta.env.BASE_URL}insight-03.png`,
    title: 'Investment Weekly: Broadening out in 2026',
    date: '09 Feb 2026'
  },
  {
    id: 4,
    image: `${import.meta.env.BASE_URL}insight-04.png`,
    title: 'Special Coverage: Policy on hold as the Fed signals patience',
    date: '29 Jan 2026'
  },
  {
    id: 5,
    image: `${import.meta.env.BASE_URL}insight-05.png`,
    title: 'Think Future 2026: Your guide to the global investment landscape',
    date: '20 Nov 2025'
  }
];

const InsightsSection: React.FC = () => {
  return (
    <div className="bg-white px-4 pb-20 pt-4">
      <div className="space-y-4">
        {insightsArticles.map((article) => (
          <button
            key={article.id}
            className="w-full flex items-start gap-3 text-left active:bg-gray-50 transition-colors py-2 cursor-pointer"
          >
            {/* Article Image */}
            <div className="w-[100px] h-[100px] flex-shrink-0 overflow-hidden bg-gray-200">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }
                }}
              />
            </div>

            {/* Article Content */}
            <div className="flex-1 min-w-0 pt-1">
              <h4 className="text-[15px] font-normal text-gray-900 leading-snug mb-3">
                {article.title}
              </h4>
              <div className="flex items-center gap-1.5 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[13px]">{article.date}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Important information section */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <h4 className="text-[15px] font-semibold text-gray-900 mb-3">Important information</h4>
        <div className="text-[12px] text-gray-600 leading-relaxed space-y-2">
          <p>• Unrealised gain/loss and market value are not available for certain product types including Insurance with saving benefit, Investment-linked insurance, Structured products and Payment Protection Policies</p>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
