import React from 'react';
import type { CostInputs } from '../types';
import { useTabContext } from '../context/TabContext';
import InputField from './InputField';
import CostAnalysisCard from './CostAnalysisCard';
import BreakdownChart from './BreakdownChart';
import ScenarioAnalysis from './ScenarioAnalysis';
import GeminiInsights from './GeminiInsights';
import {
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  TruckIcon,
  MegaphoneIcon,
  BeakerIcon,
  TagIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';

/**
 * Component for the Cost Analysis tab.
 * Contains all cost input fields and analysis results.
 */
const CostAnalysisTab: React.FC = () => {
  const {
    costInputs,
    setCostInputs,
    currency,
    setCurrency,
    calculatedCosts,
  } = useTabContext();

  /**
   * Handles changes to any numerical input field.
   */
  const handleInputChange = (field: keyof CostInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCostInputs({
      ...costInputs,
      [field]: Number(value) >= 0 ? Number(value) : 0
    });
  };

  /**
   * Handles changes in the currency selection dropdown.
   */
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as typeof currency);
  };

  /**
   * Formats a number as a currency string according to the selected currency.
   */
  const formatCurrency = (value: number, digits: number = 0): string => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  };

  /**
   * Data structure for the cost breakdown pie chart.
   */
  const costBreakdownData = [
    { name: 'المواد الخام', value: calculatedCosts.totalRawMaterialsCost, fill: '#3b82f6' },
    { name: 'التعبئة', value: calculatedCosts.totalPackagingCost, fill: '#10b981' },
    { name: 'الشحن', value: calculatedCosts.totalShippingCost, fill: '#f97316' },
    { name: 'التكاليف الثابتة', value: calculatedCosts.totalFixedCosts, fill: '#6366f1' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen" dir="rtl">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center space-x-2 space-x-reverse">
                <CalculatorIcon className="h-6 w-6 text-slate-600" />
                <span>مدخلات التكلفة</span>
              </h2>
              <p className="text-slate-600 text-sm mb-4">أدخل جميع التكاليف المتعلقة بإنتاج وتسويق منتجك</p>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-slate-600 mb-1">العملة</label>
                <select
                  id="currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="EGP">جنيه مصري (EGP)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
                <InputField label="إجمالي المواد الخام" value={costInputs.rawMaterials} onChange={handleInputChange('rawMaterials')} icon={BeakerIcon} unit={currency} />
                <InputField label="التعبئة للوحدة" value={costInputs.packagingPerUnit} onChange={handleInputChange('packagingPerUnit')} icon={ArchiveBoxIcon} unit={currency} />
                <InputField label="الشحن للوحدة" value={costInputs.shippingPerUnit} onChange={handleInputChange('shippingPerUnit')} icon={TruckIcon} unit={currency} />
                <InputField label="إجمالي التسويق" value={costInputs.marketing} onChange={handleInputChange('marketing')} icon={MegaphoneIcon} unit={currency} />
                <InputField label="إجمالي العمالة" value={costInputs.labor} onChange={handleInputChange('labor')} icon={UserGroupIcon} unit={currency} />
                <InputField label="إجمالي التشغيل" value={costInputs.operational} onChange={handleInputChange('operational')} icon={WrenchScrewdriverIcon} unit={currency} />
                <InputField label="عدد الوحدات المنتجة" value={costInputs.unitsProduced} onChange={handleInputChange('unitsProduced')} icon={TagIcon} unit="وحدة" />
                <InputField label="سعر بيع الوحدة" value={costInputs.pricePerUnit} onChange={handleInputChange('pricePerUnit')} icon={CurrencyDollarIcon} unit={currency} />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">تحليل التكاليف والأرباح</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CostAnalysisCard title="إجمالي الربح" value={formatCurrency(calculatedCosts.totalProfit)} color={calculatedCosts.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'} />
              <CostAnalysisCard title="هامش الربح" value={`${calculatedCosts.profitMargin.toFixed(1)}%`} color={calculatedCosts.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'} />
              <CostAnalysisCard title="نقطة التعادل" value={`${Math.ceil(calculatedCosts.breakEvenUnits).toLocaleString('ar-EG')} وحدة`} color="text-slate-700" />
              <CostAnalysisCard title="إجمالي الإيرادات" value={formatCurrency(calculatedCosts.totalRevenue)} color="text-blue-600" />
              <CostAnalysisCard title="إجمالي التكاليف" value={formatCurrency(calculatedCosts.totalCost)} color="text-orange-600" />
              <CostAnalysisCard title="تكلفة الوحدة" value={formatCurrency(calculatedCosts.costPerUnit, 2)} color="text-orange-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-slate-700 mb-4">توزيع التكاليف</h3>
                <BreakdownChart data={costBreakdownData} currency={currency} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-slate-700 mb-4">سيناريوهات التسعير</h3>
                <ScenarioAnalysis scenarios={calculatedCosts.scenarios} currency={currency} />
              </div>
            </div>

            <GeminiInsights inputs={costInputs} calculatedCosts={calculatedCosts} currencyName={currency} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisTab;