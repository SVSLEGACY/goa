import React from 'react';

export default function ShareButtons({ canvasDataUrl }) {
  
  const handleDownload = () => {
    if (!canvasDataUrl) return;
    const a = document.createElement('a');
    a.href = canvasDataUrl;
    a.download = 'wanted-poster.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (!canvasDataUrl) return;

    const fetchRes = await fetch(canvasDataUrl);
    const blob = await fetchRes.blob();
    const file = new File([blob], 'wanted-poster.png', { type: 'image/png' });
    
    const shareText = "I just got my bounty poster for Hacker House Goa 2026! 🏴‍☠️ #FramedInGoa";

    // 1. Primary Method: Web Share API (Mobile native)
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: 'My Bounty Poster',
          text: shareText,
          files: [file],
        });
        return; // Success
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
      }
    }
    
    // 2. Fallback Method: Twitter Web Intent (Desktop)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <button 
        onClick={handleDownload}
        disabled={!canvasDataUrl}
        className="w-full bg-[#fbe36a] text-[#0d0f12] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Download Poster
      </button>
      
      <button 
        onClick={handleShare}
        disabled={!canvasDataUrl}
        className="w-full bg-[#1da1f2] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1a91da] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
        Share to X
      </button>
    </div>
  );
}
