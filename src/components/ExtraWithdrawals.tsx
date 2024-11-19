import React, { useState } from 'react';
import { PlusCircle, Trash2, DollarSign } from 'lucide-react';
import { ExtraWithdrawalType } from '../types';
import { formatCurrency } from '../utils/formatting';
import Tooltip from './Tooltip';

interface Props {
  retirementAge: number;
  lifeExpectancy: number;
  extraWithdrawals: ExtraWithdrawalType[];
  onUpdate: (withdrawals: ExtraWithdrawalType[]) => void;
}

function ExtraWithdrawals({ retirementAge, lifeExpectancy, extraWithdrawals, onUpdate }: Props) {
  const [newWithdrawal, setNewWithdrawal] = useState<ExtraWithdrawalType>({
    age: retirementAge,
    amount: 0,
    description: ''
  });

  const handleAdd = () => {
    if (newWithdrawal.amount > 0 && newWithdrawal.description) {
      onUpdate([...extraWithdrawals, newWithdrawal]);
      setNewWithdrawal({
        age: retirementAge,
        amount: 0,
        description: ''
      });
    }
  };

  const handleRemove = (index: number) => {
    const updated = extraWithdrawals.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  const handleAmountChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numValue)) return;
    
    // Maximum single withdrawal of $10M
    if (numValue > 10000000) return;
    if (numValue < 0) return;

    setNewWithdrawal({ ...newWithdrawal, amount: numValue });
  };

  const handleDescriptionChange = (value: string) => {
    // Limit description to 100 characters
    if (value.length > 100) return;
    setNewWithdrawal({ ...newWithdrawal, description: value });
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-1">
        <h2 className="section-title mb-0">Extra Withdrawals</h2>
        <Tooltip content="Plan for large one-time expenses during retirement, such as buying a new car, home renovations, or special vacations." />
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Plan for large one-time expenses during retirement (e.g., new car, home renovation, travel)
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <Tooltip content="The age at which you plan to make this withdrawal." />
            </div>
            <input
              type="number"
              min={retirementAge}
              max={lifeExpectancy}
              value={newWithdrawal.age}
              onChange={(e) => setNewWithdrawal({
                ...newWithdrawal,
                age: parseInt(e.target.value)
              })}
              className="input-field mt-2"
              aria-label="Age for extra withdrawal"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <Tooltip content="How much money you'll need for this expense." />
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="number"
                min="0"
                max="10000000"
                step="1000"
                value={newWithdrawal.amount || ''}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter amount"
                aria-label="Amount for extra withdrawal"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Tooltip content="A brief note about what this withdrawal is for." />
            </div>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={newWithdrawal.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="e.g., New Car"
                className="input-field"
                maxLength={100}
                aria-label="Description for extra withdrawal"
              />
              <button
                onClick={handleAdd}
                disabled={!newWithdrawal.amount || !newWithdrawal.description}
                className="btn-primary"
                aria-label="Add extra withdrawal"
              >
                <PlusCircle className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {extraWithdrawals.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Planned Withdrawals</h3>
            <div className="space-y-2">
              {extraWithdrawals
                .sort((a, b) => a.age - b.age)
                .map((withdrawal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-indigo-600 font-semibold">
                          Age {withdrawal.age}:
                        </span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(withdrawal.amount)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{withdrawal.description}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-700 p-1"
                      aria-label={`Remove ${withdrawal.description}`}
                    >
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExtraWithdrawals;