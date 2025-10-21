import React from 'react';
import { ScaleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import TabNavigation from './TabNavigation';

/**
 * Renders the main header for the application.
 * It displays the application's title, subtitle, and tab navigation.
 * This component is excluded from printing.
 *
 * @returns {React.ReactElement} The rendered header component.
 */
const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-deep-navy to-dark-charcoal shadow-lg print:hidden fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-24 py-4 sm:py-0">
          <div className="flex items-center space-x-3 space-x-reverse mb-3 sm:mb-0">
            <div className="relative">
              <ScaleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-electric-teal" />
              <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5 text-bright-cyan absolute -top-1 -right-1" />
            </div>
            <div className="text-center sm:text-right">
              <h1 className="text-2xl sm:text-3xl font-bold text-electric-teal font-cairo">الميزان v2.1</h1>
              <p className="text-xs sm:text-sm text-slate-gray mt-1">أداة شاملة لتحليل التكاليف واستراتيجيات التسعير الذكية للأعمال التجارية</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-electric-teal rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-gray">مدعوم بالذكاء الاصطناعي</span>
          </div>
        </div>
      </div>
      <TabNavigation />
    </header>
  );
};

export default Header;
