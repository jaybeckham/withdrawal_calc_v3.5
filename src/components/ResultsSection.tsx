import React from 'react';
import { ProjectionsType } from '../types';
import { formatCurrency } from '../utils/formatting';

interface Props {
  projections: ProjectionsType;
}

function ResultsSection({ projections }: Props) {
  const renderInsight = (insight: string) => {
    return insight.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="text-indigo-600 font-semibold">$1</span>'
    );
  };

  return (
    <div className="card">
      <h2 className="section-title">Results Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="subsection-title">Monthly Withdrawal</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {formatCurrency(projections.monthlyWithdrawal)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Sustainable monthly withdrawal amount
          </p>
        </div>

        <div>
          <h3 className="subsection-title">Portfolio Longevity</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {projections.portfolioLongevity} years
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Expected duration of savings
          </p>
        </div>

        <div>
          <h3 className="subsection-title">Success Rate</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {projections.successRate}%
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Monte Carlo simulation success
          </p>
        </div>

        <div>
          <h3 className="subsection-title">Legacy Amount</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {formatCurrency(projections.legacyAmount)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Estimated inheritance amount
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="subsection-title">Key Insights</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {projections.insights.map((insight, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: renderInsight(insight) }} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResultsSection;