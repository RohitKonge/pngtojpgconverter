import React from 'react';
import { Settings } from 'lucide-react';

interface ConversionSettingsProps {
  quality: number;
  onQualityChange: (quality: number) => void;
}

const ConversionSettings: React.FC<ConversionSettingsProps> = ({ quality, onQualityChange }) => {
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQualityChange(Number(e.target.value));
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Settings size={18} className="text-gray-600" />
        <h3 className="text-sm font-medium text-gray-700">Conversion Settings</h3>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <label htmlFor="quality" className="text-sm text-gray-600">JPEG Quality: {quality}%</label>
          <span className="text-xs text-gray-500">
            {quality < 50 ? 'Small file size, lower quality' : 
             quality < 80 ? 'Balanced file size and quality' : 
             'High quality, larger file size'}
          </span>
        </div>
        
        <input
          id="quality"
          type="range"
          min="10"
          max="100"
          step="1"
          value={quality}
          onChange={handleQualityChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>10%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mt-3">
        <p>Lower quality = smaller file size, higher quality = larger file size.</p>
      </div>
    </div>
  );
};

export default ConversionSettings;