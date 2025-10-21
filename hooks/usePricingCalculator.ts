import { useMemo } from 'react';
import type { Competitor, PricingStrategy, PricingSuggestion, PricingScenario } from '../types';

/**
 * A custom hook that performs smart pricing calculations.
 * @param unitCost - The cost per unit from cost analysis.
 * @param competitors - Array of competitors.
 * @param marketSize - Target market size.
 * @param targetProfitMargin - Target profit margin percentage.
 * @param selectedStrategy - Selected pricing strategy.
 * @returns PricingSuggestion object with optimal price, scenarios, and warnings.
 */
export const usePricingCalculator = (
  unitCost: number,
  competitors: Competitor[],
  marketSize: number,
  targetProfitMargin: number,
  selectedStrategy: PricingStrategy
): PricingSuggestion => {
  return useMemo(() => {
    const warnings: string[] = [];

    // Handle zero or invalid inputs
    if (unitCost <= 0 || marketSize <= 0) {
      return {
        optimalPrice: 0,
        scenarios: [],
        warnings: ['يرجى التأكد من إدخال تكلفة الوحدة وعدد الوحدات المنتجة بشكل صحيح'],
      };
    }

    // Calculate average competitor price
    const competitorPrices = competitors.map(c => c.price);
    const avgCompetitorPrice = competitorPrices.length > 0
      ? competitorPrices.reduce((sum, price) => sum + price, 0) / competitorPrices.length
      : 0;

    // Calculate optimal price based on strategy
    let optimalPrice = unitCost;

    switch (selectedStrategy) {
      case 'competitive':
        optimalPrice = avgCompetitorPrice * 0.95; // Slightly below average
        break;
      case 'valueBased':
        // Assume higher quality, price above average
        optimalPrice = avgCompetitorPrice * 1.2;
        break;
      case 'marketPenetration':
        optimalPrice = unitCost * 1.1; // Minimal markup for volume
        break;
      case 'priceSkimming':
        optimalPrice = unitCost * 2.0; // High markup for premium
        break;
    }

    // Ensure optimal price covers costs
    if (optimalPrice < unitCost) {
      warnings.push('السعر المقترح لا يغطي تكلفة الوحدة');
      optimalPrice = unitCost * 1.05; // Minimum 5% markup
    }

    // Generate scenarios
    const scenarios: PricingScenario[] = [
      {
        name: 'سعر منخفض (اختراق السوق)',
        price: unitCost * 1.1,
        profit: (unitCost * 1.1 - unitCost) * marketSize * 0.8, // Assume 80% market share
        marketShare: 80,
      },
      {
        name: 'سعر تنافسي',
        price: optimalPrice,
        profit: (optimalPrice - unitCost) * marketSize * 0.5, // Assume 50% market share
        marketShare: 50,
      },
      {
        name: 'سعر مرتفع (قشط)',
        price: unitCost * 1.8,
        profit: (unitCost * 1.8 - unitCost) * marketSize * 0.2, // Assume 20% market share
        marketShare: 20,
      },
    ];

    // Check if target profit margin is achievable
    const targetPrice = unitCost / (1 - targetProfitMargin / 100);
    if (targetPrice > optimalPrice * 1.5) {
      warnings.push('هامش الربح المستهدف قد يكون غير واقعي بناءً على السوق');
    }

    return {
      optimalPrice,
      scenarios,
      warnings,
    };
  }, [unitCost, competitors, marketSize, targetProfitMargin, selectedStrategy]);
};