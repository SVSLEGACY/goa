import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import BadgeCanvas from './BadgeCanvas';
import ShareButtons from './ShareButtons';

export default function BuilderPassApp() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [role, setRole] = useState('');
  const [canvasDataUrl, setCanvasDataUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 bg-[#0d0f12] text-white rounded-3xl shadow-2xl border border-gray-800 font-sans">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[#ff2a85] mb-2 uppercase tracking-wide">Generate Wanted Poster</h3>
        <p className="text-gray-400">Upload your photo and claim your bounty for HH Goa 2026.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Form & Uploader */}
        <div className="space-y-6">
          <ImageUploader setPhotoUrl={setPhotoUrl} setIsGenerating={setIsGenerating} />
          
          <div>
            <label className="block text-[#fbe36a] font-bold mb-2 uppercase tracking-wider text-sm">Codename / Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Satoshi Nakamoto" 
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff2a85] transition-shadow"
            />
          </div>

          <div>
            <label className="block text-[#fbe36a] font-bold mb-2 uppercase tracking-wider text-sm">Affiliation / Team Name</label>
            <input 
              type="text" 
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="e.g. Straw Hat Pirates" 
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff2a85] transition-shadow"
            />
          </div>

          <div>
            <label className="block text-[#fbe36a] font-bold mb-2 uppercase tracking-wider text-sm">Role</label>
            <input 
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Full-Stack / Rust / AI" 
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff2a85] transition-shadow"
            />
          </div>
        </div>

        {/* Right Column: Live Preview & Actions */}
        <div className="flex flex-col items-center justify-start space-y-6">
          <div className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-4 min-h-[500px] flex items-center justify-center relative overflow-hidden">
            <BadgeCanvas 
              photoUrl={photoUrl} 
              name={name} 
              affiliation={affiliation}
              role={role} 
              setCanvasDataUrl={setCanvasDataUrl} 
            />
            {isGenerating && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
                <p className="text-[#ff2a85] font-bold animate-pulse">Processing Image...</p>
              </div>
            )}
          </div>
          
          <ShareButtons canvasDataUrl={canvasDataUrl} />
        </div>

      </div>
    </div>
  );
}
