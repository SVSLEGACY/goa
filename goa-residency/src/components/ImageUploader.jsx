import React, { useRef, useState } from 'react';
import heic2any from 'heic2any';

export default function ImageUploader({ setPhotoUrl, setIsGenerating }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;
    setIsGenerating(true);

    try {
      let processableFile = file;
      
      // Intercept HEIC and convert to JPEG blob
      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8
        });
        // heic2any can return an array of blobs if it's an image sequence, grab the first
        processableFile = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      }

      const url = URL.createObjectURL(processableFile);
      setPhotoUrl(url);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Try a different format.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <label className="block text-[#fbe36a] font-bold mb-2 uppercase tracking-wider text-sm">Builder Photo</label>
      <div 
        className={`w-full bg-gray-900 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragging 
            ? 'border-[#ff2a85] bg-[#ff2a85]/10 scale-[1.02]' 
            : 'border-gray-600 hover:border-[#ff2a85] hover:bg-gray-800'
        }`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className={`w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center mb-3 bg-gray-800 shadow-sm transition-transform duration-300 ${isDragging ? 'scale-110 shadow-md border-[#ff2a85]' : ''}`}>
          <svg className={`w-6 h-6 text-gray-400 transition-colors ${isDragging ? 'text-[#ff2a85] animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
          </svg>
        </div>
        <p className="font-bold text-center text-white">Drop photo or click to browse</p>
        <p className="text-xs text-gray-500 mt-2">JPG, PNG, WEBP, HEIC</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".jpg,.jpeg,.png,.webp,.heic"
        />
      </div>
    </div>
  );
}
