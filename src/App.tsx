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
          <p className="mt-4 text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Convert PNG to JPG online instantly. 100% Free, secure, and unlimited conversions. 
            No signup required. Best quality guaranteed in 2025.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              ✓ Free Forever
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
              ✓ No Registration
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
              ✓ Instant Convert
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow" role="main">
        <article className="w-full max-w-4xl mx-auto px-4">
          <ImageConverter />
          
          <section className="mt-16 prose mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Best Free PNG to JPG Converter Online</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <div>
                  <strong>100% Free & No Registration:</strong> Convert unlimited PNG files to JPG without any cost or signup. No hidden fees, no watermarks.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <div>
                  <strong>Optimized Quality:</strong> Our advanced algorithm ensures the best balance between image quality and file size reduction.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <div>
                  <strong>Bulk Conversion:</strong> Convert multiple PNG files to JPG simultaneously with our powerful batch processing.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <div>
                  <strong>100% Secure:</strong> All conversions happen in your browser - your files never leave your device.
                </div>
              </li>
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Convert PNG to JPG - Simple Steps</h2>
            <ol className="space-y-6 list-decimal pl-6">
              <li className="text-lg text-gray-700">
                <strong>Upload Your Files:</strong> Simply drag and drop your PNG files into the converter area or click "Select Files".
              </li>
              <li className="text-lg text-gray-700">
                <strong>Instant Conversion:</strong> Our advanced algorithm converts your files instantly to optimized JPG format.
              </li>
              <li className="text-lg text-gray-700">
                <strong>Download Converted Files:</strong> Download your JPG files individually or get all files in a ZIP archive.
              </li>
            </ol>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why should I convert PNG to JPG?</h3>
                <p className="text-gray-700">JPG format offers excellent compression for photographs and complex images, resulting in much smaller file sizes while maintaining good visual quality. This makes JPG perfect for web images, email attachments, and storage optimization.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Is this converter really free?</h3>
                <p className="text-gray-700">Yes, our PNG to JPG converter is completely free! There are no hidden costs, no watermarks, and no limits on file sizes or number of conversions.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How secure is my data?</h3>
                <p className="text-gray-700">Your privacy and security are our top priority. All conversion happens locally in your browser - your files are never uploaded to any server, ensuring 100% privacy.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What's the maximum file size?</h3>
                <p className="text-gray-700">You can convert PNG files up to 50MB in size. For bulk conversions, you can process multiple files simultaneously without any limits.</p>
              </div>
            </div>
          </section>

          <section className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Our PNG to JPG Converter?</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Our converter stands out as the best PNG to JPG converter available online in 2025. With features like instant conversion, bulk processing, and complete privacy, we offer everything you need for perfect image conversion.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Whether you're a professional photographer, web developer, or just need to reduce file sizes, our tool makes the process simple and efficient. No technical knowledge required - just drag, drop, and convert!
            </p>
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Popular Uses for JPG Files</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center space-x-2 text-blue-700">
                  <span>✓</span>
                  <span>Web-optimized photos</span>
                </li>
                <li className="flex items-center space-x-2 text-blue-700">
                  <span>✓</span>
                  <span>Email attachments</span>
                </li>
                <li className="flex items-center space-x-2 text-blue-700">
                  <span>✓</span>
                  <span>Social media images</span>
                </li>
                <li className="flex items-center space-x-2 text-blue-700">
                  <span>✓</span>
                  <span>Digital photo albums.</span>
                </li>
              </ul>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default App;