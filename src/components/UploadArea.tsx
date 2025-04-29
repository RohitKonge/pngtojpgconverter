import React from 'react';
import { Upload } from 'lucide-react';

interface UploadAreaProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onDragOver, onDrop, onClick }) => {
  return (
    <section 
      className="p-12 border-5 border-dashed border-blue-200 bg-blue-100 rounded-2xl m-6 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Upload PNG files"
      data-testid="upload-area"
    >
      <div className="text-center">
        <Upload className="mx-auto h-20 w-20 text-blue-400 mb-6" aria-hidden="true" />
        <h2 className="text-2xl font-medium text-gray-700 mb-3">Upload PNG images</h2>
        <div className="space-y-4">
          <p className="text-gray-500">Drag and drop your PNG files here, or click to browse</p>
          <p className="text-sm text-gray-500">
            <strong>Supported formats:</strong> PNG images up to 50MB
          </p>
          <p className="text-sm text-gray-500">
            <strong>Privacy:</strong> Files are processed locally in your browser
          </p>
          <button 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Select Files
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadArea;