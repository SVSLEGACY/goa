import React, { useState, useRef } from 'react';

export default function BuilderPassGenerator() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPhoto(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      photo: photo ? photo.name : null,
      name,
      role
    };
    console.log('Generated Pass Data:', payload);
    alert('Pass data captured! Check console.');
  };

  return (
    <div className="min-h-screen bg-residency-bg bg-dotted text-residency-dark py-12 px-4 font-sans flex flex-col items-center">
      
      {/* Top Section */}
      <div className="text-center mb-10 animate-slide-up-1">
        <h1 className="text-xl md:text-2xl font-medium mb-6">
          Personalize & generate your official builder pass for Hacker House Goa 2026
        </h1>
        
        {/* Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-3 animate-slide-up-2">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium hover:-translate-y-1 hover:shadow-md hover:border-gray-300 transition-all duration-300">
            <span>📸</span> Upload Photo
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium hover:-translate-y-1 hover:shadow-md hover:border-gray-300 transition-all duration-300">
            <span>⚡</span> Auto Builder
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium hover:-translate-y-1 hover:shadow-md hover:border-gray-300 transition-all duration-300">
            <span>🚀</span> Share Pass
          </button>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="glassmorphism rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 animate-slide-up-3 relative overflow-hidden">
        {/* Subtle decorative glow behind card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-white/40 blur-3xl rounded-full -z-10"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* Field 1: Builder Photo */}
          <div>
            <label className="block text-residency-dark font-bold mb-2">
              Builder Photo
            </label>
            <div 
              className={`w-full bg-residency-bg/80 backdrop-blur-sm border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                isDragging 
                  ? 'border-green-500 bg-green-50/50 scale-[1.02]' 
                  : 'border-gray-300 hover:border-residency-dark hover:bg-residency-bg hover:shadow-inner'
              }`}
              onClick={handlePhotoClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className={`w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center mb-3 bg-white shadow-sm transition-transform duration-300 ${isDragging ? 'scale-110 shadow-md' : ''}`}>
                <svg className={`w-6 h-6 text-gray-600 transition-colors ${isDragging ? 'text-green-600 animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
              </div>
              <p className="font-bold text-center text-residency-dark">
                {photo ? photo.name : 'Drop your photo here or click to browse'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG, WEBP or HEIC • Max 10MB
              </p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.webp,.heic"
              />
            </div>
          </div>

          {/* Field 2: Full Name */}
          <div className="group">
            <label className="block text-residency-dark font-bold mb-2 group-focus-within:text-emerald-800 transition-colors">
              Full Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Satoshi Nakamoto" 
              className="w-full bg-residency-bg/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-residency-dark/20 focus:border-residency-dark focus:bg-white transition-all duration-300"
              required
            />
          </div>

          {/* Field 3: Stack / Role */}
          <div className="group">
            <label className="block text-residency-dark font-bold mb-2 group-focus-within:text-emerald-800 transition-colors">
              Stack / Role
            </label>
            <input 
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Full-Stack / Rust / AI" 
              className="w-full bg-residency-bg/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-residency-dark/20 focus:border-residency-dark focus:bg-white transition-all duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="group w-full bg-gradient-to-r from-residency-dark to-emerald-900 text-residency-yellow font-bold text-lg rounded-lg px-4 py-4 mt-8 flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Generate Pass <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </button>
          
        </form>
      </div>

    </div>
  );
}
