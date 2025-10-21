import React, { useState, useCallback, useEffect } from 'react';
import type { CostInputs, CalculatedCosts } from '../types';
import { getCostAnalysisInsights } from '../services/geminiService';
import { SparklesIcon, KeyIcon } from '@heroicons/react/24/solid';

/**
 * Props for the GeminiInsights component.
 */
interface GeminiInsightsProps {
    /** The current user-provided cost inputs. */
    inputs: CostInputs;
    /** The results of the cost calculations. */
    calculatedCosts: CalculatedCosts;
    /** The name of the currency being used (e.g., 'SAR'). */
    currencyName: string;
}

/**
 * A component that fetches and displays AI-powered insights and recommendations
 * from the Google Gemini API based on the user's cost data. It handles loading
 * and error states for the API call.
 *
 * @param {GeminiInsightsProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered Gemini insights component.
 */
const GeminiInsights: React.FC<GeminiInsightsProps> = ({ inputs, calculatedCosts, currencyName }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [insights, setInsights] = useState('');
    const [error, setError] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [showApiKeyInput, setShowApiKeyInput] = useState(false);

    // Load API key from localStorage on component mount
    useEffect(() => {
        const storedApiKey = localStorage.getItem('geminiApiKey');
        if (storedApiKey) {
            setApiKey(storedApiKey);
        }
    }, []);

    /**
     * Handles API key input change and saves to localStorage.
     */
    const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newApiKey = e.target.value;
        setApiKey(newApiKey);
        localStorage.setItem('geminiApiKey', newApiKey);
    };

    /**
     * Fetches insights from the Gemini service.
     * It sets loading and error states and updates the component with the response.
     * Wrapped in useCallback to prevent re-creation on every render.
     */
    const handleFetchInsights = useCallback(async () => {
        if (!apiKey.trim()) {
            setError('يرجى إدخال مفتاح API الخاص بك أولاً.');
            setShowApiKeyInput(true);
            return;
        }

        setIsLoading(true);
        setError('');
        setInsights('');
        try {
            const response = await getCostAnalysisInsights(inputs, calculatedCosts, currencyName, apiKey);
            setInsights(response);
        } catch (err) {
            setError('حدث خطأ أثناء الحصول على التوصيات. يرجى التحقق من مفتاح API والمحاولة مرة أخرى.');
            console.error(err);
        }
        setIsLoading(false);
    }, [inputs, calculatedCosts, currencyName, apiKey]);

    /**
     * Formats the raw text response from the Gemini API into a structured list
     * with bolded titles for better readability.
     *
     * @param {string} text - The raw insight text from the API.
     * @returns {JSX.Element[]} An array of formatted JSX elements.
     */
    const formatInsights = (text: string) => {
        return text
            .split('**')
            .map((part, index) => (index % 2 !== 0 ? <strong key={index} className="font-bold text-slate-800">{part}</strong> : part))
            .map((part) => (typeof part === 'string' ? part.split('* ') : part))
            .flat()
            .map((part, index) => {
                if(typeof part === 'string' && part.trim() !== '') {
                    return <li key={index} className="mb-2">{part}</li>;
                }
                return part;
            });
    };
    

    return (
        <div className="bg-pure-white p-6 sm:p-8 rounded-2xl shadow-lg border border-light-gray/50 card-hover">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center space-x-3 space-x-reverse mb-4 lg:mb-0">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-electric-teal to-bright-cyan rounded-xl">
                        <SparklesIcon className="h-6 w-6 sm:h-8 sm:w-8 text-pure-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-dark-charcoal font-cairo">توصيات بالذكاء الاصطناعي</h2>
                        <p className="text-slate-gray mt-1 text-sm sm:text-base">احصل على تحليل ونصائح مخصصة لتحسين أرباحك</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    {!apiKey && (
                        <button
                            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-light-gray text-dark-charcoal font-medium rounded-xl hover:bg-slate-gray hover:text-pure-white focus-ring transition-all duration-200 text-sm sm:text-base"
                        >
                            <KeyIcon className="h-4 w-4" />
                            إعداد مفتاح API
                        </button>
                    )}
                    <button
                        onClick={handleFetchInsights}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-electric-teal to-bright-cyan text-pure-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-pure-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                جاري التحليل...
                            </>
                        ) : (
                           <>
                             <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                             احصل على توصيات
                           </>
                        )}
                    </button>
                </div>
            </div>

            {showApiKeyInput && (
                <div className="mt-6 p-6 bg-light-gray/30 rounded-xl border border-electric-teal/20 slide-in-left">
                    <label htmlFor="apiKey" className="block text-sm font-semibold text-dark-charcoal mb-3">
                        مفتاح Google Gemini API
                    </label>
                    <input
                        type="password"
                        id="apiKey"
                        value={apiKey}
                        onChange={handleApiKeyChange}
                        placeholder="أدخل مفتاح API الخاص بك"
                        className="w-full px-4 py-3 bg-pure-white border-2 border-light-gray rounded-xl text-dark-charcoal placeholder-slate-gray focus-ring focus:border-electric-teal transition-all duration-200"
                    />
                    <p className="text-xs text-slate-gray mt-2">
                        يتم حفظ المفتاح محلياً في متصفحك فقط ولن يتم إرساله إلى الخادم.
                    </p>
                </div>
            )}
            
            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl slide-in-left">
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                </div>
            )}

            {insights && (
                 <div className="mt-8 border-t border-light-gray/50 pt-6 slide-in-left">
                     <div className="bg-gradient-to-r from-electric-teal/5 to-bright-cyan/5 p-6 rounded-xl border border-electric-teal/10">
                         <h3 className="text-lg font-semibold text-dark-charcoal mb-4 flex items-center space-x-2 space-x-reverse">
                             <SparklesIcon className="h-5 w-5 text-electric-teal" />
                             <span>التوصيات الذكية</span>
                         </h3>
                         <ul className="space-y-3 text-dark-charcoal">
                             {formatInsights(insights).map((item, i) => (
                                 <li key={i} className="flex items-start space-x-3 space-x-reverse">
                                     <div className="w-2 h-2 bg-electric-teal rounded-full mt-2 flex-shrink-0"></div>
                                     <div className="flex-1">{item}</div>
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
            )}
        </div>
    );
};

export default GeminiInsights;
