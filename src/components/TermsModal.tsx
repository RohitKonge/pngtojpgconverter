import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Terms and Privacy Policy</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-8 text-gray-600">
            <div className="space-y-4">
              <p className="text-lg">
                Welcome to our JPG to PNG Converter. By using our service, you agree to these terms and privacy policy.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Terms of Service</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>Our service is provided "as is" without any warranties.</li>
                <li>You may use our converter for both personal and commercial purposes.</li>
                <li>You are responsible for the content of the files you upload.</li>
                <li>We reserve the right to modify or discontinue the service at any time.</li>
                <li>You agree not to use our service for any illegal or unauthorized purposes.</li>
                <li>Maximum file size per upload is limited to 50MB.</li>
                <li>You can convert up to 20 files simultaneously.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Privacy Policy</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>We do not store your images - all conversions happen in your browser.</li>
                <li>Your files are automatically deleted after one hour.</li>
                <li>We don't collect any personal information.</li>
                <li>We use essential cookies to improve your experience.</li>
                <li>We don't share any data with third parties.</li>
                <li>We use analytics to understand how our service is used.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Data Security</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>All file processing is done locally in your browser.</li>
                <li>We don't upload your files to any server.</li>
                <li>Your original files remain untouched on your device.</li>
                <li>We use secure HTTPS encryption for all communications.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Contact</h3>
              <p className="text-lg">
                If you have any questions about these terms or our privacy policy, please contact us at support@jpgtopngconverter.com
              </p>
            </div>

            <div className="pt-4 text-sm text-gray-500">
              Last updated: April 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;