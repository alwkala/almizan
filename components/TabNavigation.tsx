import React from 'react';
import { useTabContext } from '../context/TabContext';
import type { TabName } from '../types';
import { CubeIcon, ChartBarIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/outline';

/**
 * Component for navigating between tabs.
 * Displays clickable tab headers and manages active tab state.
 */
const TabNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useTabContext();

  const tabs: { key: TabName; label: string; icon: React.ElementType }[] = [
    { key: 'product', label: 'المنتج', icon: CubeIcon },
    { key: 'costAnalysis', label: 'التكاليف', icon: ChartBarIcon },
    { key: 'eScalePricing', label: 'التسعير', icon: CurrencyDollarIcon },
    { key: 'aiRecommendations', label: 'توصيات', icon: SparklesIcon },
  ];

  return (
    <div className="bg-light-gray shadow-sm border-b border-slate-gray/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-8 space-x-reverse" aria-label="Tabs" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group relative py-3 sm:py-4 px-2 sm:px-3 flex items-center space-x-2 space-x-reverse font-medium text-sm transition-all duration-200 focus-ring rounded-t-lg min-w-0 flex-1 sm:flex-none ${
                  isActive
                    ? 'text-electric-teal border-b-2 border-electric-teal bg-pure-white'
                    : 'text-slate-gray hover:text-dark-charcoal hover:bg-pure-white/50 border-b-2 border-transparent'
                }`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.key}`}
                id={`tab-${tab.key}`}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200 flex-shrink-0 ${
                  isActive ? 'text-electric-teal' : 'text-slate-gray group-hover:text-dark-charcoal'
                }`} />
                <span className="truncate">{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-teal animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;