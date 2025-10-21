import React from 'react';

/**
 * Footer component with copyright information for Alwkala Digital Agency.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} جميع الحقوق محفوظة لـ{' '}
            <a
              href="https://alwkala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-teal hover:text-bright-cyan transition-colors duration-200 font-medium"
            >
              Alwkala Digital Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;