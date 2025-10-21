import React from 'react';
import { useTabContext } from '../context/TabContext';
import ProductTab from './ProductTab';
import CostAnalysisTab from './CostAnalysisTab';
import EScalePricingTab from './EScalePricingTab';
import AIRecommendationsTab from './AIRecommendationsTab';

/**
 * Component that manages and renders the active tab content.
 */
const TabManager: React.FC = () => {
  const { activeTab } = useTabContext();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'product':
        return <ProductTab />;
      case 'costAnalysis':
        return <CostAnalysisTab />;
      case 'eScalePricing':
        return <EScalePricingTab />;
      case 'aiRecommendations':
        return <AIRecommendationsTab />;
      default:
        return <ProductTab />;
    }
  };

  return (
    <main className="flex-1">
      {renderTabContent()}
    </main>
  );
};

export default TabManager;