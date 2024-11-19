import React from 'react';
import { DollarSign } from 'lucide-react';
import Tooltip from './Tooltip';

interface RetirementIncomeProps {
  socialSecurity: number;
  pension: number;
  otherIncome: number;
  onUpdate: (field: string, value: number) => void;
}

function RetirementIncome({ socialSecurity, pension, otherIncome, onUpdate }: RetirementIncomeProps) {
  const handleInputChange = (value: string, field: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numValue)) return;

    // Maximum monthly income limits
    const maxValues = {
      socialSecurity: 100000, // $100k max monthly
      pension: 100000, // $100k max monthly
      otherIncome: 100000 // $100k max monthly
    };

    if (numValue > maxValues[field]) return;
    if (numValue < 0) return;

    onUpdate(field, numValue);
  };

  return (
    <div className="card">
      <h2 className="section-title">Retirement Income Sources</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-1">
            <label htmlFor="socialSecurity" className="text-sm font-medium text-gray-700">
              Monthly Social Security Benefits
            </label>
            <Tooltip content="Your expected monthly Social Security payment. You can get an estimate from the Social Security Administration website." />
          </div>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              id="socialSecurity"
              className="input-field pl-10"
              value={socialSecurity || ''}
              onChange={(e) => handleInputChange(e.target.value, 'socialSecurity')}
              min="0"
              max="100000"
              step="100"
              placeholder="0"
              aria-label="Monthly Social Security benefits amount"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label htmlFor="pension" className="text-sm font-medium text-gray-700">
              Monthly Pension Income
            </label>
            <Tooltip content="Monthly payments from any pension plans you'll receive in retirement." />
          </div>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              id="pension"
              className="input-field pl-10"
              value={pension || ''}
              onChange={(e) => handleInputChange(e.target.value, 'pension')}
              min="0"
              max="100000"
              step="100"
              placeholder="0"
              aria-label="Monthly pension income amount"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label htmlFor="otherIncome" className="text-sm font-medium text-gray-700">
              Other Monthly Income
            </label>
            <Tooltip content="Any other regular monthly income you expect in retirement, such as rental income or part-time work." />
          </div>
          <div className="mt-2 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              id="otherIncome"
              className="input-field pl-10"
              value={otherIncome || ''}
              onChange={(e) => handleInputChange(e.target.value, 'otherIncome')}
              min="0"
              max="100000"
              step="100"
              placeholder="0"
              aria-label="Other monthly income amount"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetirementIncome;