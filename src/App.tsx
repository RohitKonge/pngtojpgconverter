import React from 'react';
import { ArrowRight, Upload, Download, Trash2 } from 'lucide-react';
import Footer from './components/Footer';
import ImageConverter from './components/ImageConverter';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <header className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-center">
            PNG to JPG Converter
          </h1>
          <p className="mt-4 text-xl text-center text-gray-600 max-w-2xl mx-auto">
            Convert PNG images to JPG format instantly. Free, secure, and easy to use. No registration required.
          </p>
        </div>
      </header>

      <main className="flex-grow" role="main">
        <article className="w-full max-w-4xl mx-auto px-4">
          <ImageConverter />
          
          <section className="mt-0 prose mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Our PNG to JPG Converter?</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start">
                <span className="font-semibold mr-2">✓</span>
                <div>
                  <strong>100% Free & Secure:</strong> Convert unlimited PNG files to JPG without any cost. All processing happens in your browser for complete privacy.
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">✓</span>
                <div>
                  <strong>Bulk Conversion:</strong> Convert multiple PNG files to JPG simultaneously, saving you time and effort.
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">✓</span>
                <div>
                  <strong>High Quality:</strong> Maintain excellent image quality while reducing file size with our advanced conversion algorithm.
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">✓</span>
                <div>
                  <strong>No Registration:</strong> Start converting immediately - no sign-up, no email required.
                </div>
              </li>
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Convert PNG to JPG</h2>
            <ol className="space-y-6 list-decimal pl-6">
              <li className="text-lg text-gray-700">
                <strong>Upload Files:</strong> Click the upload button or drag and drop your PNG files into the converter area.
              </li>
              <li className="text-lg text-gray-700">
                <strong>Automatic Conversion:</strong> Your files will be converted instantly to JPG format.
              </li>
              <li className="text-lg text-gray-700">
                <strong>Download:</strong> Get your converted JPG files individually or download all at once in a ZIP file.
              </li>
            </ol>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Is there a file size limit?</h3>
                <p className="text-gray-700">Yes, you can upload PNG files up to 50MB each. For larger files, we recommend splitting them into smaller parts.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Are my files secure?</h3>
                <p className="text-gray-700">Absolutely! All conversion happens locally in your browser. Your files are never uploaded to any server.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What happens to my original files?</h3>
                <p className="text-gray-700">Your original PNG files remain untouched. We create new JPG copies during conversion.</p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default App;