import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

/**
 * Props for the CostAnalysisCard component.
 */
interface CostAnalysisCardProps {
  /** The title of the metric being displayed (e.g., "Total Profit"). */
  title: string;
  /** The calculated value to display, pre-formatted as a string. */
  value: string;
  /** The Tailwind CSS color class to apply to the value (e.g., 'text-green-600'). */
  color: string;
  /** Optional trend indicator (+, -, neutral) */
  trend?: 'up' | 'down' | 'neutral';
  /** Optional subtitle or additional info */
  subtitle?: string;
}

/**
 * A presentational component that displays a single key metric in a styled card.
 *
 * @param {CostAnalysisCardProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered card component.
 */
const CostAnalysisCard: React.FC<CostAnalysisCardProps> = ({
  title,
  value,
  color,
  trend = 'neutral',
  subtitle
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />;
      case 'down':
        return <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-pure-white p-4 sm:p-6 rounded-2xl shadow-sm border border-light-gray/50 text-center card-hover group transition-all duration-300 hover:shadow-xl hover:border-electric-teal/20">
      <div className="flex items-center justify-center mb-2 sm:mb-3">
        {getTrendIcon()}
        <h3 className="text-base sm:text-lg font-semibold text-dark-charcoal group-hover:text-electric-teal transition-colors duration-200">
          {title}
        </h3>
      </div>
      <p className={`text-2xl sm:text-4xl font-bold mb-2 transition-all duration-200 group-hover:scale-105 ${color}`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-gray font-medium">{subtitle}</p>
      )}
      <div className="mt-3 sm:mt-4 h-1 bg-gradient-to-r from-electric-teal to-bright-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default CostAnalysisCard;
