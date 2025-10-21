/**
 * Defines the supported currency codes for the application.
 * - SAR: Saudi Riyal
 * - EGP: Egyptian Pound
 * - USD: US Dollar
 */
export type Currency = 'SAR' | 'EGP' | 'USD';

/**
 * Defines the available tabs in the application.
 */
export type TabName = 'product' | 'costAnalysis' | 'eScalePricing' | 'aiRecommendations';

/**
 * Interface defining the structure of a competitor for pricing analysis.
 */
export interface Competitor {
  /** Unique identifier for the competitor. */
  id: string;
  /** Name of the competitor. */
  name: string;
  /** Price of the competitor's product. */
  price: number;
  /** Perceived quality of the competitor's product. */
  quality: 'low' | 'medium' | 'high' | 'excellent';
}

/**
 * Defines the available pricing strategies.
 */
export type PricingStrategy = 'competitive' | 'valueBased' | 'marketPenetration' | 'priceSkimming';

/**
 * Interface defining the inputs specific to the eScale Pricing tab.
 */
export interface eScalePricingInputs {
  /** List of competitors for market analysis. */
  competitors: Competitor[];
  /** Target profit margin percentage. */
  targetProfitMargin: number;
  /** Selected pricing strategy. */
  selectedStrategy: PricingStrategy;
}

/**
 * Interface defining the structure of a pricing scenario.
 */
export interface PricingScenario {
  /** Descriptive name of the scenario. */
  name: string;
  /** Suggested price for the scenario. */
  price: number;
  /** Expected profit for the scenario. */
  profit: number;
  /** Market share percentage for the scenario. */
  marketShare: number;
}

/**
 * Interface defining the results of the pricing calculation.
 */
export interface PricingSuggestion {
  /** The optimal selling price. */
  optimalPrice: number;
  /** Array of pricing scenarios. */
  scenarios: PricingScenario[];
  /** Array of warnings or alerts. */
  warnings: string[];
}

/**
 * Interface defining the inputs for the Product tab.
 */
export interface ProductInputs {
  /** Product name. */
  productName: string;
  /** Product description. */
  productDescription: string;
  /** Target audience. */
  targetAudience: string;
  /** Product category. */
  category: string;
  /** Product subcategory. */
  subcategory: string;
  /** Target country. */
  country: string;
  /** Key features of the product. */
  keyFeatures: string;
}

// AI Recommendations now use eScalePricingInputs for shared data

/**
 * Interface defining the context for tab management.
 */
export interface TabContextType {
  /** The currently active tab. */
  activeTab: TabName;
  /** Function to set the active tab. */
  setActiveTab: (tab: TabName) => void;
  /** Product inputs. */
  productInputs: ProductInputs;
  /** Function to update product inputs. */
  setProductInputs: (inputs: ProductInputs) => void;
  /** Cost inputs shared across tabs. */
  costInputs: CostInputs;
  /** Function to update cost inputs. */
  setCostInputs: (inputs: CostInputs) => void;
  /** Selected currency. */
  currency: Currency;
  /** Function to set the currency. */
  setCurrency: (currency: Currency) => void;
  /** Calculated costs based on inputs. */
  calculatedCosts: CalculatedCosts;
  /** eScale Pricing inputs (shared with AI Recommendations). */
  eScalePricingInputs: eScalePricingInputs;
  /** Function to update eScale Pricing inputs. */
  setEScalePricingInputs: (inputs: eScalePricingInputs) => void;
}

/**
 * Interface representing the structure of all user-provided cost inputs.
 * All values are numerical.
 */
export interface CostInputs {
  /** Total cost of all raw materials for the entire production batch. */
  rawMaterials: number;
  /** Cost of packaging for a single unit. */
  packagingPerUnit: number;
  /** Cost of shipping for a single unit. */
  shippingPerUnit: number;
  /** Total marketing and advertising expenses for the product. */
  marketing: number;
  /** Total number of units produced in the batch. */
  unitsProduced: number;
  /** The selling price for a single unit. */
  pricePerUnit: number;
  /** Total labor costs for the production batch. */
  labor: number;
  /** Total operational overheads (rent, utilities, etc.). */
  operational: number;
}

/**
 * Interface defining the structure for a pricing scenario object.
 * Used to display potential profit outcomes at different price points.
 */
export interface Scenario {
  /** The descriptive name of the scenario (e.g., "Current Price", "Discounted Price"). */
  name: string;
  /** The unit price used in this scenario. */
  price: number;
  /** The total profit calculated for this scenario. */
  profit: number;
}

/**
 * Interface representing the comprehensive results of all cost calculations.
 * This object contains all the key metrics derived from the user's inputs.
 */
export interface CalculatedCosts {
  /** Total cost of raw materials for the batch. */
  totalRawMaterialsCost: number;
  /** Total packaging cost for all units produced. */
  totalPackagingCost: number;
  /** Total shipping cost for all units produced. */
  totalShippingCost: number;
  /** Total cost of marketing. */
  totalMarketingCost: number;
  /** Total cost of labor. */
  totalLaborCost: number;
  /** Total cost of operational overheads. */
  totalOperationalCost: number;
  /** The sum of all fixed costs (marketing, labor, operational). */
  totalFixedCosts: number;
  /** The sum of all variable costs (raw materials, packaging, shipping). */
  totalVariableCosts: number;
  /** The grand total of all fixed and variable costs. */
  totalCost: number;
  /** The total cost to produce a single unit. */
  costPerUnit: number;
  /** The total revenue generated from selling all produced units. */
  totalRevenue: number;
  /** The total net profit (Total Revenue - Total Cost). */
  totalProfit: number;
  /** The net profit generated from selling a single unit. */
  profitPerUnit: number;
  /** The profit margin percentage ((Total Profit / Total Revenue) * 100). */
  profitMargin: number;
  /** The number of units that must be sold to cover all costs. */
  breakEvenUnits: number;
  /** The number of units produced. */
  unitsProduced: number;
  /** An array of different pricing scenarios for analysis. */
  scenarios: Scenario[];
}
