import React, { createContext, useContext, useMemo } from 'react';
import type { TabContextType, TabName, ProductInputs, CostInputs, Currency, eScalePricingInputs } from '../types';
import { useCostCalculator } from '../hooks/useCostCalculator';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Default values
const defaultProductInputs: ProductInputs = {
  productName: '',
  productDescription: '',
  targetAudience: '',
  category: '',
  subcategory: '',
  country: '',
  keyFeatures: '',
};

const defaultCostInputs: CostInputs = {
  rawMaterials: 10000,
  packagingPerUnit: 5,
  shippingPerUnit: 3,
  marketing: 5000,
  unitsProduced: 1000,
  pricePerUnit: 50,
  labor: 8000,
  operational: 3000,
};

const defaultEScalePricingInputs: eScalePricingInputs = {
  competitors: [],
  targetProfitMargin: 40,
  selectedStrategy: 'competitive',
};

// AI Recommendations now use eScalePricingInputs for shared data

// Create the context
const TabContext = createContext<TabContextType | undefined>(undefined);

// Provider component
export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useLocalStorage<TabName>('activeTab', 'product');
  const [productInputs, setProductInputs] = useLocalStorage<ProductInputs>('productInputs', defaultProductInputs);
  const [costInputs, setCostInputs] = useLocalStorage<CostInputs>('costInputs', defaultCostInputs);
  const [currency, setCurrency] = useLocalStorage<Currency>('currency', 'SAR');
  const [eScalePricingInputs, setEScalePricingInputs] = useLocalStorage<eScalePricingInputs>('eScalePricingInputs', defaultEScalePricingInputs);

  // Calculate costs using the hook
  const calculatedCosts = useCostCalculator(costInputs);

  const value: TabContextType = useMemo(() => ({
    activeTab,
    setActiveTab,
    productInputs,
    setProductInputs,
    costInputs,
    setCostInputs,
    currency,
    setCurrency,
    calculatedCosts,
    eScalePricingInputs,
    setEScalePricingInputs,
  }), [activeTab, productInputs, costInputs, currency, calculatedCosts, eScalePricingInputs]);

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
};

// Hook to use the context
export const useTabContext = (): TabContextType => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};