import { useMemo } from 'react';
import type { CostInputs, CalculatedCosts, Scenario } from '../types';

/**
 * A custom React hook that performs all cost and profitability calculations.
 * It takes the user's inputs as an argument and returns a detailed analysis.
 * The `useMemo` hook is used to ensure calculations are only re-run when inputs change,
 * optimizing performance.
 *
 * @param {CostInputs} inputs - An object containing all user-provided cost data.
 * @returns {CalculatedCosts} An object containing the full breakdown of calculated costs and profits.
 */
export const useCostCalculator = (inputs: CostInputs): CalculatedCosts => {
  return useMemo(() => {
    const {
      rawMaterials,
      packagingPerUnit,
      shippingPerUnit,
      marketing,
      unitsProduced,
      pricePerUnit,
      labor,
      operational,
    } = inputs;

    // Prevents division by zero errors if unitsProduced is 0.
    const safeUnitsProduced = unitsProduced > 0 ? unitsProduced : 1;

    // --- Cost Calculations ---

    // Direct (Variable) Costs
    const totalRawMaterialsCost = rawMaterials;
    const totalPackagingCost = packagingPerUnit * safeUnitsProduced;
    const totalShippingCost = shippingPerUnit * safeUnitsProduced;

    // Indirect (Fixed) Costs
    const totalMarketingCost = marketing;
    const totalLaborCost = labor;
    const totalOperationalCost = operational;

    // Cost Aggregations
    const totalFixedCosts = totalMarketingCost + totalLaborCost + totalOperationalCost;
    const variableCostPerUnit = (totalRawMaterialsCost / safeUnitsProduced) + packagingPerUnit + shippingPerUnit;
    const totalVariableCosts = variableCostPerUnit * safeUnitsProduced;
    const totalCost = totalFixedCosts + totalVariableCosts;
    const costPerUnit = totalCost / safeUnitsProduced;

    // --- Profitability Analysis ---
    const totalRevenue = pricePerUnit * safeUnitsProduced;
    const totalProfit = totalRevenue - totalCost;
    const profitPerUnit = pricePerUnit - costPerUnit;
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    // --- Break-Even Analysis ---
    const contributionMarginPerUnit = pricePerUnit - variableCostPerUnit;
    // If contribution margin is not positive, break-even is impossible (Infinity).
    const breakEvenUnits = contributionMarginPerUnit > 0 ? totalFixedCosts / contributionMarginPerUnit : Infinity;
    
    // --- Pricing Scenarios ---
    const scenarios: Scenario[] = [
      {
        name: 'سعر منخفض (20% أقل)',
        price: pricePerUnit * 0.8,
        profit: (pricePerUnit * 0.8 * safeUnitsProduced) - totalCost,
      },
      {
        name: 'السعر الحالي',
        price: pricePerUnit,
        profit: totalProfit,
      },
      {
        name: 'سعر مرتفع (20% أعلى)',
        price: pricePerUnit * 1.2,
        profit: (pricePerUnit * 1.2 * safeUnitsProduced) - totalCost,
      },
    ];

    // Return the final calculated data object.
    return {
      totalRawMaterialsCost,
      totalPackagingCost,
      totalShippingCost,
      totalMarketingCost,
      totalLaborCost,
      totalOperationalCost,
      totalFixedCosts,
      totalVariableCosts,
      totalCost,
      costPerUnit,
      totalRevenue,
      totalProfit,
      profitPerUnit,
      profitMargin,
      breakEvenUnits,
      unitsProduced,
      scenarios,
    };
  }, [inputs]);
};
