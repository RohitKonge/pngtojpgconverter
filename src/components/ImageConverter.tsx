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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = Array.from(files)
      .filter(file => file.type === 'image/png')
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
            // Set white background for transparent PNGs
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw the image on top
            ctx.drawImage(img, 0, 0);
            const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.92); // 0.92 quality for good balance
            
            setImages(prev => 
              prev.map(imgItem => 
                imgItem.id === image.id 
                  ? { ...imgItem, convertedUrl: jpgDataUrl, status: 'converted' } 
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
    link.download = image.file.name.replace('.png', '.jpg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImages = async () => {
    const zip = new JSZip();
    
    images.forEach((image, index) => {
      if (image.convertedUrl) {
        const base64Data = image.convertedUrl.split(',')[1];
        zip.file(`image-${index + 1}.jpg`, base64Data, { base64: true });
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

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png"
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
              className="flex overflow-x-auto gap-4 pb-4 scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#94A3B8 #E2E8F0'
              }}
            >
              {images.map(image => (
                <div key={image.id} className="flex-shrink-0">
                  <ImagePreview
                    image={image}
                    onDownload={() => downloadImage(image.id)}
                    onRemove={() => removeImage(image.id)}
                  />
                </div>
              ))}
            </div>
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
            <h2 className="text-4xl font-semibold text-gray-800">PNG to JPG Conversion</h2>
            <p className="text-lg leading-relaxed">
              PNG and JPG files are both popular image formats used for different purposes. While PNG files excel at maintaining quality and supporting transparency, JPG files offer superior compression for photos and complex images.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              PNG files are lossless and support transparency, making them ideal for graphics with text, logos, and images that require crisp edges. However, they can result in larger file sizes, especially for photographs and complex images.
            </p>
            
            <p className="text-lg leading-relaxed">
              JPG files use sophisticated compression algorithms that make them perfect for photographs and images with gradual color transitions. While they don't support transparency, they can dramatically reduce file size while maintaining good visual quality for most use cases.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Why Convert PNG to JPG?</h3>
            <p className="text-lg leading-relaxed">
              Converting from PNG to JPG can be beneficial when you need to reduce file size for web usage, email attachments, or storage constraints. JPG files are typically much smaller than their PNG counterparts, especially for photographs and complex images.
            </p>
            
            <p className="text-lg leading-relaxed">
              While this conversion may result in slight quality loss due to JPG's lossy compression, our converter uses optimal settings to maintain the best possible visual quality while achieving significant file size reduction.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">How to Use Our Converter</h3>
            <p className="text-lg leading-relaxed">
              Using our converter is simple. Click the "Select Files" button or drag and drop your PNG files into the upload area. You can convert up to 20 files at once. Once uploaded, your images will be converted automatically in real-time.
            </p>
            
            <p className="text-lg leading-relaxed">
              After conversion, you can download individual images using the "Download" button under each preview, or get all converted images at once using the "Download All (ZIP)" button. For larger batches, simply clear the current files and start a new batch - there's no limit to how many batches you can convert.
            </p>
            
            <p className="text-lg leading-relaxed">
              Remember that all conversion happens directly in your browser - your files are never uploaded to any server, ensuring complete privacy and security.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Safety and Privacy</h3>
            <p className="text-lg leading-relaxed">
              Our conversion process is completely safe and private. All processing happens locally in your browser - your files never leave your device. We don't store any of your images, and the conversion process creates new files while leaving your original PNG files untouched.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;