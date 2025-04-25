import React from 'react';
import { Image } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-6">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">PNG to JPG Converter</span>
          </div>
          
          <nav aria-label="Breadcrumb" className="hidden md:block">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600">Home</a>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <a href="/tools" className="hover:text-blue-600">Tools</a>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-800">PNG to JPG Converter</span>
              </li>
            </ol>
          </nav>
          
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</a>
            <a href="#faq" className="text-gray-600 hover:text-blue-600">FAQ</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;