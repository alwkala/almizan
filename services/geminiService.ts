import { GoogleGenAI } from '@google/genai';
import type { ProductInputs, CostInputs, CalculatedCosts, eScalePricingInputs } from '../types';

/**
 * Sends cost analysis data to the Google Gemini API and requests actionable insights.
 * It constructs a detailed prompt with the user's data and returns the AI's textual response.
 *
 * @param {CostInputs} inputs - The user-provided cost inputs.
 * @param {CalculatedCosts} calculatedCosts - The results of the local cost calculations.
 * @param {string} currencyName - The name of the currency being used (e.g., 'SAR').
 * @param {string} apiKey - The user's Gemini API key.
 * @returns {Promise<string>} A promise that resolves to the AI-generated insight text.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getCostAnalysisInsights = async (
  inputs: CostInputs,
  calculatedCosts: CalculatedCosts,
  currencyName: string,
  apiKey: string
): Promise<string> => {
  // Construct a detailed prompt for the AI model.
  const prompt = `
    أنت خبير في تحليل تكاليف صناعة مستحضرات التجميل والعناية بالبشرة والشعر. بناءً على البيانات التالية، قدم توصيات مفصلة لتحسين الربحية وتقليل التكاليف وتحديد المخاطر المحتملة. اجعل التوصيات على شكل نقاط واضحة وقابلة للتنفيذ باستخدام علامة * لكل نقطة. استخدم ** لتغميق العناوين الرئيسية.
    العملة المستخدمة في التحليل هي: ${currencyName}.

    **بيانات التكاليف والإنتاج:**
    - إجمالي تكلفة المواد الخام: ${inputs.rawMaterials.toLocaleString('ar-SA')} ${currencyName}
    - تكلفة التعبئة للوحدة: ${inputs.packagingPerUnit.toLocaleString('ar-SA')} ${currencyName}
    - تكلفة الشحن للوحدة: ${inputs.shippingPerUnit.toLocaleString('ar-SA')} ${currencyName}
    - التكاليف الثابتة (تسويق, عمالة, تشغيل): ${calculatedCosts.totalFixedCosts.toLocaleString('ar-SA')} ${currencyName}
    - عدد الوحدات المنتجة: ${inputs.unitsProduced.toLocaleString('ar-SA')} وحدة
    - سعر بيع الوحدة: ${inputs.pricePerUnit.toLocaleString('ar-SA')} ${currencyName}

    **النتائج الحالية:**
    - تكلفة إنتاج الوحدة الواحدة: ${calculatedCosts.costPerUnit.toLocaleString('ar-SA')} ${currencyName}
    - إجمالي الربح المتوقع: ${calculatedCosts.totalProfit.toLocaleString('ar-SA')} ${currencyName}
    - هامش الربح: ${calculatedCosts.profitMargin.toFixed(2)}%
    - نقطة التعادل: ${Math.ceil(calculatedCosts.breakEvenUnits).toLocaleString('ar-SA')} وحدة

    **المطلوب (قدم إجابتك مباشرة على شكل نقاط):**
    **تحليل التكاليف:**
    * هل هناك أي تكاليف تبدو مرتفعة بشكل غير طبيعي؟ وما هي اقتراحاتك لتقليلها؟

    **استراتيجيات التسعير:**
    * هل السعر الحالي مناسب؟ ما هي مخاطر وفوائد رفع أو خفض السعر بناءً على هامش الربح الحالي؟

    **الكفاءة التشغيلية:**
    * كيف يمكن تحسين كفاءة الإنتاج أو زيادة عدد الوحدات المنتجة لتقليل التكلفة الثابتة لكل وحدة؟

    **توصيات عامة:**
    * نصائح إضافية لزيادة الأرباح في هذا السيناريو المحدد.
  `;

  try {
    // Initialize the GoogleGenAI client instance with the provided API key.
    const ai = new GoogleGenAI({ apiKey });

    // Call the Gemini API to generate content.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    // Return the text from the response.
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch insights from Gemini API.");
  }
};

/**
 * Sends product and pricing data to the Google Gemini API and requests AI-powered recommendations
 * for pricing strategy, product improvements, and market positioning tailored for entrepreneurs and e-commerce.
 * It constructs a detailed prompt with product info, cost data, competitors, and market factors.
 *
 * @param {ProductInputs} productInputs - The product information inputs.
 * @param {CostInputs} costInputs - The user-provided cost inputs.
 * @param {CalculatedCosts} calculatedCosts - The results of the local cost calculations.
 * @param {eScalePricingInputs} aiInputs - The AI recommendations inputs (competitors, strategy, etc.).
 * @param {string} currencyName - The name of the currency being used (e.g., 'SAR').
 * @param {string} apiKey - The user's Gemini API key.
 * @returns {Promise<string>} A promise that resolves to the AI-generated recommendations text.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getAIRecommendationsInsights = async (
  productInputs: ProductInputs,
  costInputs: CostInputs,
  calculatedCosts: CalculatedCosts,
  aiInputs: eScalePricingInputs,
  currencyName: string,
  apiKey: string
): Promise<string> => {
  // Construct competitors list
  const competitorsText = aiInputs.competitors.length > 0
    ? aiInputs.competitors.map(comp => `- ${comp.name}: ${comp.price} ${currencyName} (جودة: ${comp.quality})`).join('\n')
    : 'لا توجد بيانات منافسين محددة';

  // Construct a detailed prompt for the AI model
  const prompt = `
    أنت خبير في التسعير واستراتيجيات التسويق لرواد الأعمال والتجارة الإلكترونية في الشرق الأوسط. بناءً على البيانات الشاملة من جميع التبويبات (المنتج + التكاليف + التسعير)، قدم توصيات شاملة لاستراتيجية التسعير، تحسين المنتج، وتحليل السوق. اجعل التوصيات على شكل نقاط واضحة وقابلة للتنفيذ باستخدام علامة * لكل نقطة. استخدم ** لتغميق العناوين الرئيسية.
    العملة المستخدمة في التحليل هي: ${currencyName}.

    **معلومات المنتج:**
    - اسم المنتج: ${productInputs.productName}
    - وصف المنتج: ${productInputs.productDescription}
    - الجمهور المستهدف: ${productInputs.targetAudience}
    - الفئة: ${productInputs.category}
    - الفئة الفرعية: ${productInputs.subcategory}
    - البلد المستهدف: ${productInputs.country}
    - الميزات الرئيسية: ${productInputs.keyFeatures}

    **البيانات المالية والتكاليف:**
    - إجمالي تكلفة المواد الخام: ${costInputs.rawMaterials.toLocaleString('ar-SA')} ${currencyName}
    - تكلفة التعبئة للوحدة: ${costInputs.packagingPerUnit.toLocaleString('ar-SA')} ${currencyName}
    - تكلفة الشحن للوحدة: ${costInputs.shippingPerUnit.toLocaleString('ar-SA')} ${currencyName}
    - التكاليف الثابتة (تسويق, عمالة, تشغيل): ${calculatedCosts.totalFixedCosts.toLocaleString('ar-SA')} ${currencyName}
    - عدد الوحدات المنتجة: ${costInputs.unitsProduced.toLocaleString('ar-SA')} وحدة
    - سعر بيع الوحدة: ${costInputs.pricePerUnit.toLocaleString('ar-SA')} ${currencyName}
    - تكلفة إنتاج الوحدة: ${calculatedCosts.costPerUnit.toLocaleString('ar-SA')} ${currencyName}
    - إجمالي الربح المتوقع: ${calculatedCosts.totalProfit.toLocaleString('ar-SA')} ${currencyName}
    - هامش الربح الحالي: ${calculatedCosts.profitMargin.toFixed(2)}%
    - نقطة التعادل: ${Math.ceil(calculatedCosts.breakEvenUnits).toLocaleString('ar-SA')} وحدة
    - هامش الربح المستهدف: ${aiInputs.targetProfitMargin}%

    **المنافسون:**
    ${competitorsText}

    **استراتيجية التسعير المختارة:** ${aiInputs.selectedStrategy}

    **المطلوب (قدم إجابتك مباشرة على شكل نقاط):**
    **استراتيجية التسعير:**
    * تحليل السعر المثالي بناءً على التكاليف والمنافسين والسوق المستهدف
    * مقارنة بين استراتيجيات التسعير المختلفة المناسبة لهذا المنتج
    * توصيات لتعديل السعر لتحقيق هامش الربح المستهدف

    **تحسين المنتج:**
    * اقتراحات لتحسين الميزات أو الجودة لتبرير سعر أعلى
    * تحليل نقاط القوة والضعف في المنتج الحالي
    * توصيات لتطوير المنتج بناءً على اتجاهات السوق

    **اتجاهات السوق وتحليل المنافسين:**
    * تحليل الفرص في السوق المستهدف (${productInputs.country})
    * كيفية التميز عن المنافسين
    * اتجاهات السوق الحالية في فئة ${productInputs.category}

    **التوصيات العامة لرواد الأعمال:**
    * نصائح للتسويق والترويج الفعال
    * استراتيجيات لزيادة المبيعات في التجارة الإلكترونية
    * تحذيرات من المخاطر المحتملة وكيفية تجنبها
  `;

  try {
    // Initialize the GoogleGenAI client instance with the provided API key
    const ai = new GoogleGenAI({ apiKey });

    // Call the Gemini API to generate content
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    // Return the text from the response
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch AI recommendations from Gemini API.");
  }
};
