import React from 'react';
import type { Scenario, Currency } from '../types';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

/**
 * Props for the ScenarioAnalysis component.
 */
interface ScenarioAnalysisProps {
  /** An array of pricing scenario objects to be displayed. */
  scenarios: Scenario[];
  /** The currently selected currency for formatting monetary values. */
  currency: Currency;
}

/**
 * A component that displays different pricing scenarios (e.g., lower, current, higher price).
 * It visually indicates whether a scenario results in a profit or a loss using colors and icons.
 *
 * @param {ScenarioAnalysisProps} props - The props for the component.
 * @returns {React.ReactElement} A list of rendered pricing scenarios.
 */
const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ scenarios, currency }) => {
  /**
   * Formats a number into a currency string based on the selected currency.
   * @param {number} value - The number to format.
   * @returns {string} The formatted currency string.
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value);
  };
    
  return (
    <div className="space-y-4">
      {scenarios.map((scenario, index) => (
        <div key={index} className="p-4 rounded-lg flex items-center justify-between"
             style={{ backgroundColor: scenario.profit >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}}>
            <div className="flex items-center gap-4">
                {scenario.profit >= 0 ? (
                    <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
                ) : (
                    <ArrowTrendingDownIcon className="h-8 w-8 text-red-500" />
                )}
                <div>
                    <p className="font-semibold text-slate-700">{scenario.name}</p>
                    <p className="text-sm text-slate-500">سعر البيع: {formatCurrency(scenario.price)}</p>
                </div>
            </div>
            <div className={`text-lg font-bold ${scenario.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(scenario.profit)}
            </div>
        </div>
      ))}
    </div>
  );
};

export default ScenarioAnalysis;
