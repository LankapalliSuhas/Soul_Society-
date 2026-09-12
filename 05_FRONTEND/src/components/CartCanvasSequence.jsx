// 05_FRONTEND/src/components/CartCanvasSequence.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CartCanvasSequence({ onLoaded }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frames = useRef([]);
  const totalFrames = 144;

  useEffect(() => {
    let loaded = 0;
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.webp`;
      img.onload = () => {
        loaded++;
        setProgress(Math.floor((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          setIsLoaded(true);
          onLoaded?.();
          playSequence();
        }
      };
      frames.current.push(img);
    }
    return () => { frames.current = []; };
  }, [onLoaded]);

  const playSequence = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let currentFrame = 0;

    const draw = () => {
      if (currentFrame >= totalFrames) return;
      const img = frames.current[currentFrame];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      currentFrame++;
      requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-10 pointer-events-auto">
          <div className="text-white/60 tracking-widest text-sm mb-4">INITIALIZING NEURAL SENSORS</div>
          <div className="w-48 h-px bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#E11D48]"
              initial={{ width: 0 }} animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white/90 font-mono text-xs mt-4">{progress}%</div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full object-contain mix-blend-screen opacity-40" />
    </div>
  );
}
