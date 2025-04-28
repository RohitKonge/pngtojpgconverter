import React, { useState } from 'react';
import TermsModal from './TermsModal';

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-white font-semibold text-lg mb-4">JPG to PNG Converter</h2>
            <p className="text-sm leading-relaxed mb-4">
              The web's most trusted tool for converting JPG/JPEG images to PNG format. 
              Fast, secure, and completely free to use. Convert your images with the highest quality in 2025.
            </p>
            <p className="text-sm">
              <strong>Our Promise:</strong> 100% free, no registration required, unlimited conversions.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/convert" className="hover:text-white transition-colors">Convert JPG to PNG</a>
              </li>
              <li>
                <a href="/bulk-convert" className="hover:text-white transition-colors">Bulk Converter</a>
              </li>
              <li>
                <button onClick={() => setIsModalOpen(true)} className="text-gray-300 hover:text-white transition-colors">
                  Terms & Privacy Policy
                </button>
              </li>
              <li>
                <a href="/#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Image Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/jpg-to-png" className="hover:text-white transition-colors">JPG to PNG</a>
              </li>
              <li>
                <a href="/png-to-jpg" className="hover:text-white transition-colors">PNG to JPG</a>
              </li>
              <li>
                <a href="/bulk-converter" className="hover:text-white transition-colors">Bulk Image Converter</a>
              </li>
              <li>
                <a href="/compress-images" className="hover:text-white transition-colors">Image Compressor</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© {currentYear} JPG to PNG Converter. All rights reserved.</p>
            <div className="text-sm flex gap-4">
              <a href="https://jpg2png.xyz" className="hover:text-white transition-colors">jpg2png.xyz</a>
              <span>|</span>
              <span>The Best Free JPG to PNG Converter</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <p>* All processing is done locally in your browser. Your images are never uploaded to our servers.</p>
          <p>* JPG to PNG Converter is a free online tool for converting JPEG images to PNG format.</p>
        </div>
      </div>
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;