import React from 'react';
import { FinancialDetailsType } from '../types';
import { formatCurrency } from '../utils/formatting';
import Tooltip from './Tooltip';

interface Props {
  value: FinancialDetailsType;
  onChange: (value: FinancialDetailsType) => void;
}

function FinancialDetails({ value, onChange }: Props) {
  const handleNumberInput = (newValue: string, field: keyof FinancialDetailsType) => {
    const numValue = newValue === '' ? 0 : parseFloat(newValue);
    if (isNaN(numValue)) return;

    const maxValues = {
      currentSavings: 100000000, // $100M max
      monthlyExpenses: 1000000, // $1M max monthly
      expectedReturn: 15,
      inflationRate: 10
    };

    if (numValue > maxValues[field]) return;
    if (numValue < 0) return;

    // Create a new object with all existing values plus the updated field
    const updatedValue = {
      ...value,
      [field]: numValue
    };

    onChange(updatedValue);
  };

  return (
    <div className="card">
      <h2 className="section-title">Financial Details</h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Current Savings
            </label>
            <Tooltip content="The total amount you've already saved for retirement, including 401(k)s, IRAs, and other investments." />
          </div>
          <input
            type="number"
            value={value.currentSavings || ''}
            onChange={(e) => handleNumberInput(e.target.value, 'currentSavings')}
            className="input-field mt-2"
            min="0"
            max="100000000"
            step="1000"
            placeholder="Enter amount"
            aria-label="Current savings amount"
          />
          <div className="mt-1 text-sm text-gray-600">
            {formatCurrency(value.currentSavings)}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Monthly Expenses
            </label>
            <Tooltip content="How much you expect to spend each month in retirement, including regular bills, healthcare, and leisure activities." />
          </div>
          <input
            type="number"
            value={value.monthlyExpenses || ''}
            onChange={(e) => handleNumberInput(e.target.value, 'monthlyExpenses')}
            className="input-field mt-2"
            min="0"
            max="1000000"
            step="100"
            placeholder="Enter monthly expenses"
            aria-label="Monthly expenses amount"
          />
          <div className="mt-1 text-sm text-gray-600">
            {formatCurrency(value.monthlyExpenses)}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Expected Return (%)
            </label>
            <Tooltip content="The average annual return you expect from your investments. A conservative estimate is usually between 5-7%." />
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={value.expectedReturn}
            onChange={(e) => handleNumberInput(e.target.value, 'expectedReturn')}
            className="slider mt-2"
            aria-label="Expected return percentage"
          />
          <div className="mt-1 text-sm text-gray-600">{value.expectedReturn}%</div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Inflation Rate (%)
            </label>
            <Tooltip content="The expected rate of price increases over time. The historical average is around 2-3% per year." />
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={value.inflationRate}
            onChange={(e) => handleNumberInput(e.target.value, 'inflationRate')}
            className="slider mt-2"
            aria-label="Inflation rate percentage"
          />
          <div className="mt-1 text-sm text-gray-600">{value.inflationRate}%</div>
        </div>
      </div>
    </div>
  );
}

export default FinancialDetails;