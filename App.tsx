import React from 'react';
import { TabProvider } from './context/TabContext';
import Header from './components/Header';
import TabManager from './components/TabManager';
import Footer from './components/Footer';

/**
 * The main application component. It provides the TabContext to the entire application
 * and renders the header and tab manager.
 *
 * @returns {React.ReactElement} The rendered application component.
 */
const App: React.FC = () => {
  return (
    <TabProvider>
      <div className="min-h-screen bg-gradient-to-br from-light-gray/30 to-pure-white flex flex-col" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <TabManager />
        </main>
        <Footer />
      </div>
    </TabProvider>
  );
};

export default App;
