import React, { useState } from 'react';
import TermsModal from './TermsModal';

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">About Our Converter</h4>
            <p className="text-sm leading-relaxed">
              Our JPG to PNG converter is the web's most reliable tool for converting JPG/JPEG images to PNG format. 
              Fast, secure, and completely free to use.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors">
                  Terms & Privacy Policy
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Related Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/png-to-jpg" className="hover:text-white transition-colors">PNG to JPG Converter</a>
              </li>
              <li>
                <a href="/image-compressor" className="hover:text-white transition-colors">Image Compressor</a>
              </li>
              <li>
                <a href="/bulk-image-converter" className="hover:text-white transition-colors">Bulk Image Converter</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© {currentYear} JPG to PNG Converter. All rights reserved.</p>
            <div className="text-sm">
              <span>Made with ❤️ for the image conversion community</span>
            </div>
          </div>
        </div>
      </div>
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;