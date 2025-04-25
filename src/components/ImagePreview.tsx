import React from 'react';
import { Download, Loader, X } from 'lucide-react';
import { ImageFile } from './ImageConverter';

interface ImagePreviewProps {
  image: ImageFile;
  onDownload: () => void;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onDownload, onRemove }) => {
  return (
    <div className="flex-shrink-0 w-64 bg-gray-50 rounded-md overflow-hidden border border-gray-200 relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
      >
        <X size={16} className="text-gray-600" />
      </button>
      
      <div className="p-4">
        <div className="mb-2 truncate text-sm font-medium text-gray-700" title={image.file.name}>
          {image.file.name}
        </div>
        
        <div className="aspect-video bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
          {image.status === 'converting' && (
            <div className="flex flex-col items-center justify-center">
              <Loader size={24} className="text-blue-500 animate-spin mb-2" />
              <div className="text-xs text-gray-500">Converting to PNG...</div>
            </div>
          )}
          
          {image.status === 'error' && (
            <div className="text-xs text-red-500">{image.error || 'Error converting image'}</div>
          )}
          
          {image.status === 'converted' && image.convertedUrl && (
            <img 
              src={image.convertedUrl} 
              alt="Converted PNG" 
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      </div>
      
      {image.status === 'converted' && (
        <div className="p-3 bg-green-50 border-t border-green-100">
          <div className="flex justify-between items-center">
            <span className="text-xs text-green-600">Ready as PNG</span>
            <button
              onClick={onDownload}
              className="text-xs flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;