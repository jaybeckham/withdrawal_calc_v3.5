import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { ProjectionsType } from '../types';
import { formatCurrency } from '../utils/formatting';
import { AlertCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface Props {
  projections: ProjectionsType;
}

function ChartSection({ projections }: Props) {
  const [showAge, setShowAge] = useState(true);

  const currentYear = new Date().getFullYear();
  const ages = Array.from(
    { length: projections.balances.length },
    (_, i) => projections.years[0] + i
  );
  const years = Array.from(
    { length: projections.balances.length },
    (_, i) => currentYear + i
  );

  // Find the index where balance first hits zero
  const zeroBalanceIndex = projections.balances.findIndex(
    (balance, index) => index > 0 && balance <= 0
  );

  const balanceData = {
    labels: showAge ? ages : years,
    datasets: [
      {
        label: 'Portfolio Balance',
        data: projections.balances,
        borderColor: (context: any) => {
          const index = context.dataIndex;
          return index >= zeroBalanceIndex && zeroBalanceIndex !== -1
            ? 'rgb(239, 68, 68)' // Red for depleted funds
            : 'rgb(99, 102, 241)'; // Blue for active portfolio
        },
        backgroundColor: (context: any) => {
          const index = context.dataIndex;
          return index >= zeroBalanceIndex && zeroBalanceIndex !== -1
            ? 'rgba(239, 68, 68, 0.1)' // Red for depleted funds
            : 'rgba(99, 102, 241, 0.1)'; // Blue for active portfolio
        },
        fill: true,
        segment: {
          borderColor: (ctx: any) => {
            const index = ctx.p1.parsed.x;
            return index >= zeroBalanceIndex && zeroBalanceIndex !== -1
              ? 'rgb(239, 68, 68)' // Red for depleted funds
              : 'rgb(99, 102, 241)'; // Blue for active portfolio
          },
        },
      },
    ],
  };

  const incomeData = {
    labels: ['Social Security', 'Pension', 'Investments', 'Other'],
    datasets: [
      {
        data: projections.incomeSources,
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(99, 102, 241)',
          'rgb(245, 158, 11)',
        ],
      },
    ],
  };

  const withdrawalData = {
    labels: years,
    datasets: [
      {
        label: 'Annual Withdrawals',
        data: projections.withdrawals,
        backgroundColor: 'rgb(99, 102, 241)',
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="subsection-title mb-0">Portfolio Balance Projection</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAge(true)}
              className={`px-3 py-1 rounded-l-md text-sm ${
                showAge
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Age
            </button>
            <button
              onClick={() => setShowAge(false)}
              className={`px-3 py-1 rounded-r-md text-sm ${
                !showAge
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        {zeroBalanceIndex !== -1 && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 text-sm font-medium">
                  Portfolio Adjustment Recommended
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  Based on current projections, you may want to consider adjusting your strategy. 
                  The portfolio could require additional funding by {showAge ? `age ${ages[zeroBalanceIndex]}` : `year ${years[zeroBalanceIndex]}`}.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="h-64">
          <Line
            data={balanceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    title: (context) => {
                      const value = context[0].label;
                      return showAge ? `Age ${value}` : `Year ${value}`;
                    },
                    label: (context) => {
                      const value = context.raw as number;
                      if (value <= 0) {
                        return 'Portfolio Requires Additional Funding';
                      }
                      return `Balance: ${formatCurrency(value)}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: showAge ? 'Age' : 'Year',
                  },
                  ticks: {
                    callback: (value) => {
                      const label = balanceData.labels[value as number];
                      return showAge ? `${label}` : `${label}`;
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Portfolio Balance ($)',
                  },
                  ticks: {
                    callback: (value) => formatCurrency(value as number),
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="subsection-title">Income Sources</h3>
          <div className="h-64">
            <Pie
              data={incomeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.raw as number;
                        return `${context.label}: ${value.toFixed(1)}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="card">
          <h3 className="subsection-title">Annual Withdrawals</h3>
          <div className="h-64">
            <Bar
              data={withdrawalData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    onClick: null // This disables the click handler
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `Withdrawal: ${formatCurrency(context.raw as number)}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Year',
                    },
                    ticks: {
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Withdrawal Amount ($)',
                    },
                    ticks: {
                      callback: (value) => formatCurrency(value as number),
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartSection;