import React from 'react';
import { Image } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-6">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image className="h-8 w-8 text-blue-600" />
            <a href="/" className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              JPG to PNG Converter
            </a>
          </div>
          
          <nav aria-label="Main navigation" className="hidden md:block">
            <ol className="flex items-center space-x-6 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
              </li>
              <li>
                <a href="/convert" className="hover:text-blue-600 transition-colors">Convert JPG to PNG</a>
              </li>
              <li>
                <a href="/bulk-convert" className="hover:text-blue-600 transition-colors">Bulk Converter</a>
              </li>
              <li>
                <a href="/#features" className="hover:text-blue-600 transition-colors">Features</a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
              </li>
            </ol>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="/convert"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Converting
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;