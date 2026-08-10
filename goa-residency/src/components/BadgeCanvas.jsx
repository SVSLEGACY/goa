import React, { useEffect, useRef, useState } from 'react';

// Use the uploaded local template
const TEMPLATE_URL = '/wanted-template.jpg';

export default function BadgeCanvas({ photoUrl, name, affiliation, role, setCanvasDataUrl }) {
  const canvasRef = useRef(null);
  const [templateImg, setTemplateImg] = useState(null);

  // Load template once
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = TEMPLATE_URL;
    img.onload = () => setTemplateImg(img);
  }, []);

  useEffect(() => {
    if (!templateImg) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the template (723x1024)
    canvas.width = templateImg.width;
    canvas.height = templateImg.height;

    const draw = async () => {
      // 1. Draw base template first so we can draw the photo "under" or "on" the white box
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

      // 2. Exact coordinates of the white box from our python script
      const photoBoxX = 77;
      const photoBoxY = 239;
      const photoBoxW = 580;
      const photoBoxH = 435;

      if (photoUrl) {
        const userImg = await loadImage(photoUrl);
        
        // Smart crop math (object-fit: cover)
        const imgRatio = userImg.width / userImg.height;
        const boxRatio = photoBoxW / photoBoxH;
        
        let sWidth, sHeight, sx, sy;
        
        if (imgRatio > boxRatio) {
          // Image is wider than box
          sHeight = userImg.height;
          sWidth = sHeight * boxRatio;
          sx = (userImg.width - sWidth) / 2;
          sy = 0;
        } else {
          // Image is taller than box
          sWidth = userImg.width;
          sHeight = sWidth / boxRatio;
          sx = 0;
          sy = (userImg.height - sHeight) / 2;
        }

        // Draw cropped image
        ctx.save();
        ctx.beginPath();
        ctx.rect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);
        ctx.clip();
        ctx.drawImage(userImg, sx, sy, sWidth, sHeight, photoBoxX, photoBoxY, photoBoxW, photoBoxH);
        ctx.restore();
        
        // Add a slight dark inner shadow effect to blend it into the paper
        ctx.strokeStyle = 'rgba(43, 29, 15, 0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(photoBoxX + 2, photoBoxY + 2, photoBoxW - 4, photoBoxH - 4);
      }

      // 3. Render Text overlay
      const displayName = name.trim().toUpperCase() || 'UNKNOWN';
      const displayAffiliation = affiliation.trim().toUpperCase() || 'UNKNOWN';
      const displayRole = role.trim() || 'Fighter';

      ctx.textAlign = 'center';
      ctx.fillStyle = '#2b1d0f'; // Dark vintage brown/black ink
      
      // Line 1: Bounty (Fixed)
      ctx.font = 'bold 50px "Playfair Display", serif';
      ctx.fillText('Bounty: ฿1,000,000,000', canvas.width / 2, 760);
      
      // Line 2: Codename
      ctx.font = 'bold 36px "Playfair Display", serif';
      ctx.fillText(`Codename: ${displayName}`, canvas.width / 2, 825);
      
      // Line 3: Affiliation
      ctx.font = 'bold 32px "Playfair Display", serif';
      ctx.fillText(`Affiliation: ${displayAffiliation}`, canvas.width / 2, 885);

      // Line 4: Role
      ctx.font = 'bold 32px "Playfair Display", serif';
      ctx.fillText(`Role: ${displayRole}`, canvas.width / 2, 945);

      // Extract to DataURL and pass up
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setCanvasDataUrl(dataUrl);
    };

    draw();

  }, [templateImg, photoUrl, name, affiliation, role, setCanvasDataUrl]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* 
        The canvas is rendered, but scaled down by CSS via max-w-full and h-auto. 
      */}
      <canvas 
        ref={canvasRef} 
        className="max-w-full max-h-[600px] w-auto h-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)] object-contain"
      />
    </div>
  );
}

// Helper to load image securely for canvas
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
