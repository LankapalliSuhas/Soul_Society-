import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollCartAnimation() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const totalFrames = 250;
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Preload all 250 frames
    const preloadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Format number to 3 digits like 001, 002
      const frameIndex = String(i).padStart(3, '0');
      img.src = `/cart_frames/ezgif-frame-${frameIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      preloadedImages.push(img);
    }
    setImages(preloadedImages);
  }, []);

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[frameIndex] || !images[frameIndex].complete) return;
    
    const ctx = canvas.getContext('2d');
    const img = images[frameIndex];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background with black to match the space theme
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate scale to fit screen, keeping aspect ratio
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Draw initial frame once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        // Redraw current frame on resize
        const currentFrame = Math.min(
          totalFrames - 1,
          Math.floor(scrollYProgress.get() * totalFrames)
        );
        drawFrame(currentFrame);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, scrollYProgress]);

  // Scrub animation on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(latest * totalFrames)
    );
    // Add small delay to smooth rendering
    requestAnimationFrame(() => drawFrame(frameIndex));
  });

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-red-500 tracking-widest text-sm animate-pulse font-mono">
            INITIALIZING CORE SYSTEMS...
          </div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover opacity-80" 
      />
      {/* Subtle grid overlay for tech look */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(225, 29, 72, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 29, 72, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
