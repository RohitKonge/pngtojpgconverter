import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2 } from 'lucide-react';
import JSZip from 'jszip';
import UploadArea from './UploadArea';
import ImagePreview from './ImagePreview';

export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  convertedUrl?: string;
  status: 'converting' | 'converted' | 'error';
  error?: string;
}

const ImageConverter: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = Array.from(files)
      .filter(file => file.type === 'image/jpeg' || file.type === 'image/jpg')
      .map(file => ({
        id: Math.random().toString(36).substring(2, 15),
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'converting'
      }));

    setImages(prev => [...prev, ...newImages]);

    for (const image of newImages) {
      await convertImage(image);
    }
  };

  const convertImage = async (image: ImageFile) => {
    try {
      const img = new Image();
      img.src = image.previewUrl;
      
      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const pngDataUrl = canvas.toDataURL('image/png');
            
            setImages(prev => 
              prev.map(imgItem => 
                imgItem.id === image.id 
                  ? { ...imgItem, convertedUrl: pngDataUrl, status: 'converted' } 
                  : imgItem
              )
            );
            
            resolve(null);
          }
        };
        
        img.onerror = () => {
          setImages(prev => 
            prev.map(imgItem => 
              imgItem.id === image.id 
                ? { ...imgItem, status: 'error', error: 'Failed to load image' } 
                : imgItem
            )
          );
          resolve(null);
        };
      });
    } catch (error) {
      setImages(prev => 
        prev.map(imgItem => 
          imgItem.id === image.id 
            ? { ...imgItem, status: 'error', error: 'Conversion failed' } 
            : imgItem
        )
      );
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const clearAllImages = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.convertedUrl) {
        URL.revokeObjectURL(img.convertedUrl);
      }
    });
    setImages([]);
  };

  const downloadImage = (id: string) => {
    const image = images.find(img => img.id === id);
    if (!image || !image.convertedUrl) return;
    
    const link = document.createElement('a');
    link.href = image.convertedUrl;
    link.download = image.file.name.replace('.jpg', '.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImages = async () => {
    const zip = new JSZip();
    
    images.forEach((image, index) => {
      if (image.convertedUrl) {
        const base64Data = image.convertedUrl.split(',')[1];
        zip.file(`image-${index + 1}.png`, base64Data, { base64: true });
      }
    });
    
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'converted-images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value);
    setScrollPosition(newPosition);
    if (sliderRef.current) {
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      sliderRef.current.scrollLeft = (maxScroll * newPosition) / 100;
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/jpg"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {images.length === 0 ? (
        <UploadArea
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        />
      ) : (
        <div className="py-8">
          <div className="relative mb-4">
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map(image => (
                <ImagePreview
                  key={image.id}
                  image={image}
                  onDownload={() => downloadImage(image.id)}
                  onRemove={() => removeImage(image.id)}
                />
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scrollPosition}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-4"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={openFileDialog}
              className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Upload size={18} />
              Add More
            </button>
            
            <button
              onClick={clearAllImages}
              className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={18} />
              Clear All
            </button>
            
            <button
              onClick={downloadAllImages}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto"
            >
              <Download size={18} />
              Download All (ZIP)
            </button>
          </div>
        </div>
      )}

      <div className="py-12">
        <div className="max-w-4xl mx-auto space-y-8 text-gray-600">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold text-gray-800">JPG to PNG Conversion</h2>
            <p className="text-lg leading-relaxed">
              JPG and PNG files are both popular image formats used for different purposes. While they both handle image data like photographs, each format has its unique characteristics and advantages.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              JPG files use compression to reduce file size, which can result in some quality loss. However, this trade-off allows for smaller file sizes while maintaining good visual quality. JPGs are versatile, working well for both digital and print formats.
            </p>
            
            <p className="text-lg leading-relaxed">
              PNG files are specifically designed for lossless transmission over the internet. While they excel at maintaining image quality, they lack support for CMYK color spaces needed for professional printing. This makes them ideal for digital displays like computer monitors and smartphones, but less suitable for print materials.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Why Convert JPG to PNG?</h3>
            <p className="text-lg leading-relaxed">
              Converting from JPG to PNG can be necessary for several reasons. PNG files support transparency, which can be useful for web design and other digital applications. Additionally, PNG's lossless compression ensures that no quality is lost during the conversion process.
            </p>
            
            <p className="text-lg leading-relaxed">
              PNG conversion solves these issues by providing predictable results with transparency and maintaining image quality. This makes PNGs more reliable for both web and digital use where transparency is needed.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">How to Use Our Converter</h3>
            <p className="text-lg leading-relaxed">
              Using our converter is simple. Click the "Select Files" button or drag and drop your JPG files into the upload area. You can convert up to 20 files at once. Once uploaded, your images will be converted automatically in real-time.
            </p>
            
            <p className="text-lg leading-relaxed">
              After conversion, you can download individual images using the "Download" button under each preview, or get all converted images at once using the "Download All (ZIP)" button. For larger batches, simply clear the current files and start a new batch - there's no limit to how many batches you can convert.
            </p>
            
            <p className="text-lg leading-relaxed">
              Remember to download your converted files within one hour, as they're automatically removed from our servers after this time for your privacy and security.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Safety and Privacy</h3>
            <p className="text-lg leading-relaxed">
              Our conversion process is completely safe. We create copies of your original files, leaving your source files untouched on your device. All conversions happen in your browser, and we automatically delete all uploaded and converted files after one hour to ensure your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;