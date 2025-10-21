import React, { useState } from 'react';
import { useTabContext } from '../context/TabContext';
import { usePricingCalculator } from '../hooks/usePricingCalculator';
import { exportToCsv } from '../utils/exportUtils';
import type { Competitor, PricingStrategy } from '../types';
import { PlusIcon, TrashIcon, DocumentArrowDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

/**
 * Component for the eScale Pricing tab.
 * Provides smart pricing recommendations based on cost analysis and market data.
 */
const EScalePricingTab: React.FC = () => {
  const {
    productInputs,
    calculatedCosts,
    currency,
    eScalePricingInputs,
    setEScalePricingInputs,
  } = useTabContext();

  const [newCompetitor, setNewCompetitor] = useState<Omit<Competitor, 'id'>>({
    name: '',
    price: 0,
    quality: 'medium',
  });

  const { optimalPrice, scenarios, warnings } = usePricingCalculator(
    calculatedCosts.costPerUnit,
    eScalePricingInputs.competitors,
    calculatedCosts.unitsProduced,
    eScalePricingInputs.targetProfitMargin,
    eScalePricingInputs.selectedStrategy
  );

  /**
   * Formats a number as a currency string.
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
   * Adds a new competitor to the list.
   */
  const addCompetitor = () => {
    if (newCompetitor.name.trim()) {
      const competitor: Competitor = {
        ...newCompetitor,
        id: Date.now().toString(),
      };
      setEScalePricingInputs({
        ...eScalePricingInputs,
        competitors: [...eScalePricingInputs.competitors, competitor],
      });
      setNewCompetitor({ name: '', price: 0, quality: 'medium' });
    }
  };

  /**
   * Removes a competitor from the list.
   */
  const removeCompetitor = (id: string) => {
    setEScalePricingInputs({
      ...eScalePricingInputs,
      competitors: eScalePricingInputs.competitors.filter(c => c.id !== id),
    });
  };

  /**
   * Updates a competitor's information.
   */
  const updateCompetitor = (id: string, field: keyof Competitor, value: any) => {
    setEScalePricingInputs({
      ...eScalePricingInputs,
      competitors: eScalePricingInputs.competitors.map(c =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  /**
   * Handles strategy selection.
   */
  const handleStrategyChange = (strategy: PricingStrategy) => {
    setEScalePricingInputs({
      ...eScalePricingInputs,
      selectedStrategy: strategy,
    });
  };

  /**
   * Exports pricing scenarios to CSV.
   */
  const handleExport = () => {
    exportToCsv('pricing_scenarios.csv', scenarios);
  };

  const avgCompetitorPrice = eScalePricingInputs.competitors.length > 0
    ? eScalePricingInputs.competitors.reduce((sum, c) => sum + c.price, 0) / eScalePricingInputs.competitors.length
    : 0;

  return (
    <div className="bg-slate-50 min-h-screen" dir="rtl">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center space-x-2 space-x-reverse">
              <CurrencyDollarIcon className="h-8 w-8 text-slate-600" />
              <span>استراتيجية التسعير</span>
            </h1>
            <p className="text-slate-600">تحديد السعر الأمثل بناءً على التكاليف والسوق</p>
          </div>

          {/* Product Basic Data */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-slate-700 mb-4">📊 بيانات المنتج الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="text-sm text-slate-600">المنتج</div>
                <div className="font-semibold">{productInputs.productName || 'لم يتم تحديد اسم المنتج'}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="text-sm text-slate-600">تكلفة الوحدة</div>
                <div className="font-semibold text-green-600">{formatCurrency(calculatedCosts.costPerUnit, 2)}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="text-sm text-slate-600">الإنتاج الشهري</div>
                <div className="font-semibold">{calculatedCosts.unitsProduced.toLocaleString('ar-EG')} وحدة</div>
              </div>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-slate-700 mb-4">🏪 تحليل السوق</h2>

            {/* Competitors Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">أسعار المنافسين</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-2">المنافس</th>
                      <th className="text-right p-2">السعر</th>
                      <th className="text-right p-2">الجودة</th>
                      <th className="text-right p-2">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eScalePricingInputs.competitors.map((competitor) => (
                      <tr key={competitor.id} className="border-b">
                        <td className="p-2">
                          <input
                            type="text"
                            value={competitor.name}
                            onChange={(e) => updateCompetitor(competitor.id, 'name', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={competitor.price}
                            onChange={(e) => updateCompetitor(competitor.id, 'price', Number(e.target.value))}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2">
                          <select
                            value={competitor.quality}
                            onChange={(e) => updateCompetitor(competitor.id, 'quality', e.target.value)}
                            className="w-full p-1 border rounded"
                          >
                            <option value="low">منخفضة</option>
                            <option value="medium">متوسطة</option>
                            <option value="high">عالية</option>
                            <option value="excellent">ممتازة</option>
                          </select>
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => removeCompetitor(competitor.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Add new competitor row */}
                    <tr>
                      <td className="p-2">
                        <input
                          type="text"
                          placeholder="اسم المنافس"
                          value={newCompetitor.name}
                          onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          placeholder="السعر"
                          value={newCompetitor.price || ''}
                          onChange={(e) => setNewCompetitor({ ...newCompetitor, price: Number(e.target.value) })}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={newCompetitor.quality}
                          onChange={(e) => setNewCompetitor({ ...newCompetitor, quality: e.target.value as any })}
                          className="w-full p-1 border rounded"
                        >
                          <option value="low">منخفضة</option>
                          <option value="medium">متوسطة</option>
                          <option value="high">عالية</option>
                          <option value="excellent">ممتازة</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={addCompetitor}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="text-sm text-slate-600">متوسط سعر السوق</div>
                <div className="font-semibold">{formatCurrency(avgCompetitorPrice, 2)}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="text-sm text-slate-600">النطاق السعري</div>
                <div className="font-semibold">
                  {eScalePricingInputs.competitors.length > 0
                    ? `${formatCurrency(Math.min(...eScalePricingInputs.competitors.map(c => c.price)))} - ${formatCurrency(Math.max(...eScalePricingInputs.competitors.map(c => c.price)))}`
                    : 'لا توجد بيانات'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Strategy */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-slate-700 mb-4">🎚️ استراتيجية التسعير</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'competitive', label: 'تسعير تنافسي (مطابقة السوق)' },
                { key: 'valueBased', label: 'تسعير قائم على القيمة (الجودة مقابل السعر)' },
                { key: 'marketPenetration', label: 'اختراق السوق (سعر منخفض للحصة)' },
                { key: 'priceSkimming', label: 'القشط (سعر عالي للأرباح السريعة)' },
              ].map((strategy) => (
                <label key={strategy.key} className="flex items-center space-x-3 space-x-reverse">
                  <input
                    type="radio"
                    name="strategy"
                    checked={eScalePricingInputs.selectedStrategy === strategy.key}
                    onChange={() => handleStrategyChange(strategy.key as PricingStrategy)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">{strategy.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Profit Margin */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-slate-700 mb-4">💰 هامش الربح المستهدف</h2>
            <div className="space-y-4">
              <input
                type="range"
                min="20"
                max="80"
                value={eScalePricingInputs.targetProfitMargin}
                onChange={(e) => setEScalePricingInputs({
                  ...eScalePricingInputs,
                  targetProfitMargin: Number(e.target.value)
                })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600">
                <span>دنيا: 20%</span>
                <span className="font-semibold">مثالي: {eScalePricingInputs.targetProfitMargin}%</span>
                <span>قصوى: 80%</span>
              </div>
            </div>
          </div>


          {/* Results */}
          {optimalPrice > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-700 mb-4">📈 النتائج والتوصيات</h2>

              {/* Warnings */}
              {warnings.length > 0 && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">تحذيرات:</h3>
                  <ul className="list-disc list-inside text-yellow-700">
                    {warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optimal Price */}
              <div className="mb-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(optimalPrice, 2)}
                </div>
                <div className="text-slate-600">السعر المقترح الأمثل</div>
              </div>

              {/* Scenarios */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">سيناريوهات التسعير</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-2">السيناريو</th>
                        <th className="text-right p-2">السعر</th>
                        <th className="text-right p-2">الربح المتوقع</th>
                        <th className="text-right p-2">الحصة السوقية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenarios.map((scenario, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{scenario.name}</td>
                          <td className="p-2">{formatCurrency(scenario.price, 2)}</td>
                          <td className="p-2">{formatCurrency(scenario.profit, 2)}</td>
                          <td className="p-2">{scenario.marketShare}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Export Button */}
              <div className="text-center">
                <button
                  onClick={handleExport}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2 space-x-reverse"
                >
                  <DocumentArrowDownIcon className="h-5 w-5" />
                  <span>تصدير إلى CSV</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EScalePricingTab;