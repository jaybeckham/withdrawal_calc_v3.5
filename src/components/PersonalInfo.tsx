import React from 'react';
import { PersonalInfoType } from '../types';
import Tooltip from './Tooltip';

interface Props {
  value: PersonalInfoType;
  onChange: (value: PersonalInfoType) => void;
}

function PersonalInfo({ value, onChange }: Props) {
  return (
    <div className="card">
      <h2 className="section-title">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Current Age
            </label>
            <Tooltip content="Your current age. This helps calculate how long your savings need to grow before retirement." />
          </div>
          <input
            type="range"
            min="18"
            max="80"
            value={value.currentAge}
            onChange={(e) =>
              onChange({ ...value, currentAge: parseInt(e.target.value) })
            }
            className="slider mt-2"
          />
          <div className="mt-1 text-sm text-gray-600">{value.currentAge} years</div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Retirement Age
            </label>
            <Tooltip content="The age when you plan to stop working and start living off your retirement savings." />
          </div>
          <input
            type="range"
            min={value.currentAge + 1}
            max="90"
            value={value.retirementAge}
            onChange={(e) =>
              onChange({ ...value, retirementAge: parseInt(e.target.value) })
            }
            className="slider mt-2"
          />
          <div className="mt-1 text-sm text-gray-600">{value.retirementAge} years</div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <label className="text-sm font-medium text-gray-700">
              Life Expectancy
            </label>
            <Tooltip content="How long you expect to live. It's recommended to use a higher estimate to ensure your savings last long enough." />
          </div>
          <input
            type="range"
            min={value.retirementAge + 1}
            max="100"
            value={value.lifeExpectancy}
            onChange={(e) =>
              onChange({ ...value, lifeExpectancy: parseInt(e.target.value) })
            }
            className="slider mt-2"
          />
          <div className="mt-1 text-sm text-gray-600">{value.lifeExpectancy} years</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;