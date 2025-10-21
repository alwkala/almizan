import React from 'react';
import type { ProductInputs } from '../types';
import { useTabContext } from '../context/TabContext';
import InputField from './InputField';
import {
  CubeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  TagIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

/**
 * Component for the Product tab.
 * Contains all product input fields and currency selection.
 */
const ProductTab: React.FC = () => {
  const {
    productInputs,
    setProductInputs,
    currency,
    setCurrency,
  } = useTabContext();

  /**
   * Handles changes to any text input field.
   */
  const handleInputChange = (field: keyof ProductInputs) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProductInputs({
      ...productInputs,
      [field]: value
    });
  };

  /**
   * Handles changes in the currency selection dropdown.
   */
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as typeof currency);
  };

  return (
    <div className="bg-slate-50 min-h-screen" dir="rtl">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center space-x-2 space-x-reverse">
              <CubeIcon className="h-6 w-6 text-slate-600" />
              <span>معلومات المنتج</span>
            </h2>
            <p className="text-slate-600 text-sm mb-6">أدخل تفاصيل منتجك الأساسية للبدء في تحليل التكاليف والتسعير</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="lg:col-span-2">
                <label htmlFor="productName" className="block text-sm font-medium text-slate-600 mb-2">
                  اسم المنتج
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productInputs.productName}
                  onChange={handleInputChange('productName')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل اسم المنتج"
                />
              </div>

              {/* Product Description */}
              <div className="lg:col-span-2">
                <label htmlFor="productDescription" className="block text-sm font-medium text-slate-600 mb-2">
                  وصف المنتج
                </label>
                <textarea
                  id="productDescription"
                  value={productInputs.productDescription}
                  onChange={handleInputChange('productDescription')}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="وصف مفصل للمنتج..."
                />
              </div>

              {/* Target Audience */}
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-600 mb-2">
                  الجمهور المستهدف
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  value={productInputs.targetAudience}
                  onChange={handleInputChange('targetAudience')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="مثال: النساء 25-45 سنة"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-2">
                  الفئة
                </label>
                <input
                  type="text"
                  id="category"
                  value={productInputs.category}
                  onChange={handleInputChange('category')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="مثال: مستحضرات تجميل"
                />
              </div>

              {/* Subcategory */}
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-slate-600 mb-2">
                  الفئة الفرعية
                </label>
                <input
                  type="text"
                  id="subcategory"
                  value={productInputs.subcategory}
                  onChange={handleInputChange('subcategory')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="مثال: العناية بالبشرة"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-slate-600 mb-2">
                  البلد
                </label>
                <input
                  type="text"
                  id="country"
                  value={productInputs.country}
                  onChange={handleInputChange('country')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="مثال: السعودية"
                />
              </div>

              {/* Currency Selection */}
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-slate-600 mb-2">
                  العملة
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="EGP">جنيه مصري (EGP)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                </select>
              </div>

              {/* Key Features */}
              <div className="lg:col-span-2">
                <label htmlFor="keyFeatures" className="block text-sm font-medium text-slate-600 mb-2">
                  الميزات الرئيسية
                </label>
                <textarea
                  id="keyFeatures"
                  value={productInputs.keyFeatures}
                  onChange={handleInputChange('keyFeatures')}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="قائمة بالميزات الرئيسية للمنتج، كل ميزة في سطر منفصل..."
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3 space-x-reverse">
                <CurrencyDollarIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 mb-1">ملاحظة مهمة</h4>
                  <p className="text-sm text-blue-700">
                    اختيار العملة هنا سيؤثر على جميع التبويبات الأخرى في التطبيق. لا تحتاج إلى إعادة تحديد العملة في تبويبات التحليل التكاليف أو التسعير.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTab;