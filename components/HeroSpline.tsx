'use client';

import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

interface HeroSplineProps {
  sceneUrl?: string;
}

function PlaceholderState() {
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-24 pointer-events-none">
      {/* Ambient glow behind placeholder */}
      <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/25 to-purple-500/25 blur-[140px] animate-pulse pointer-events-none" />
      
      {/* Content */}
      <div className="relative text-center space-y-6 z-10 animate-float pointer-events-none">
        <div className="text-8xl">🤖</div>
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
          Loading AI Experience
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}

export default function HeroSpline({ sceneUrl = 'https://prod.spline.design/v2DNFUffljiKNFGE/scene.splinecode' }: HeroSplineProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Debug event listeners
    const splineEl = splineRef.current;
    if (!splineEl || isMobile) return;

    const logEvent = (e: MouseEvent) => {
      console.log('🖱️ Mouse event on Spline:', e.type, 'at', e.clientX, e.clientY);
    };

    splineEl.addEventListener('mousemove', logEvent);
    splineEl.addEventListener('mouseenter', logEvent);
    splineEl.addEventListener('mouseleave', logEvent);
    splineEl.addEventListener('pointermove', logEvent);

    console.log('✅ Event listeners attached to Spline container');

    return () => {
      splineEl.removeEventListener('mousemove', logEvent);
      splineEl.removeEventListener('mouseenter', logEvent);
      splineEl.removeEventListener('mouseleave', logEvent);
      splineEl.removeEventListener('pointermove', logEvent);
    };
  }, [isLoaded, isMobile]);

  const handleLoad = () => {
    console.log('✅ Spline scene loaded successfully');
    setIsLoaded(true);
  };

  const handleError = () => {
    console.error('❌ Spline scene loading failed');
    setHasError(true);
  };

  // Show placeholder if no scene URL provided or if there's an error
  const shouldShowPlaceholder = !sceneUrl || hasError;

  return (
    <div 
      className="relative w-full h-full flex items-center justify-end"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ 
        pointerEvents: 'none',
      }}
    >
      {/* Robot container - Flexbox aligned, takes 45% width on right side */}
      <div 
        className="relative w-full lg:w-[45%] h-[600px] md:h-[700px] lg:h-[800px] overflow-visible" 
        style={{ pointerEvents: 'none' }}
      >
        
        {/* ENHANCED PREMIUM AI AURA - Multi-layered radial glows */}
        
        {/* Core cyan glow - Robot head/face area - Bright and focused */}
        <div 
          className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[300px] h-[300px] pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div className="absolute inset-0 bg-cyan-400/40 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute inset-0 bg-cyan-300/30 rounded-full blur-[60px]" />
        </div>
        
        {/* Large purple glow - Upper body - Creates depth */}
        <div 
          className="absolute left-1/2 top-[45%] -translate-x-1/2 w-[550px] h-[550px] pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div className="absolute inset-0 bg-purple-500/35 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-0 bg-purple-400/25 rounded-full blur-[100px]" />
        </div>
        
        {/* Blended ambient base layer */}
        <div 
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-[140px] transition-all duration-1000 pointer-events-none ${
            isHovering ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
          }`}
          style={{ zIndex: 0 }}
        />
        
        {/* Depth layer - Light falloff cyan accent */}
        <div className="absolute left-1/3 top-1/3 w-[350px] h-[350px] bg-cyan-400/15 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ zIndex: 0 }} />
        
        {/* Depth layer - Light falloff purple accent */}
        <div className="absolute right-1/4 bottom-1/3 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-[140px] animate-pulse pointer-events-none" style={{ animationDelay: '1s', zIndex: 0 }} />
        
        {/* Energy field edge highlights - Adds dimensionality */}
        <div 
          className="absolute left-1/2 top-[25%] -translate-x-1/2 w-[200px] h-[200px] bg-cyan-300/25 rounded-full blur-[50px] pointer-events-none"
          style={{ zIndex: 1 }}
        />
        <div 
          className="absolute left-1/2 top-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-purple-300/20 rounded-full blur-[90px] pointer-events-none"
          style={{ zIndex: 0 }}
        />
        
        {/* Show placeholder while loading or if error */}
        {(!isLoaded || shouldShowPlaceholder) && <PlaceholderState />}
        
        {/* Main Spline robot - centered within its container */}
        {sceneUrl && !hasError && (
          <div 
            ref={splineRef}
            className={`absolute inset-0 transition-all duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              overflow: 'visible',
              pointerEvents: isMobile ? 'none' : 'auto',
              zIndex: 50,
            }}
          >
            {/* Spline component wrapper */}
            <div 
              style={{ 
                width: '100%', 
                height: '100%',
                overflow: 'visible',
                position: 'relative',
                pointerEvents: isMobile ? 'none' : 'auto',
              }}
            >
              <Spline
                scene={sceneUrl}
                onLoad={handleLoad}
                onError={handleError}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  overflow: 'visible',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: isMobile ? 'none' : 'auto',
                }}
              />
            </div>
          </div>
        )}
        
        {/* Subtle accent glows - Corner highlights */}
        <div 
          className={`absolute top-10 right-10 w-32 h-32 bg-cyan-500/12 rounded-full blur-2xl transition-all duration-1000 pointer-events-none ${
            isHovering ? 'scale-125 opacity-100' : 'scale-100 opacity-60'
          }`}
          style={{ zIndex: 5 }}
        />
        <div 
          className={`absolute bottom-16 left-10 w-40 h-40 bg-purple-500/12 rounded-full blur-2xl transition-all duration-1000 pointer-events-none ${
            isHovering ? 'scale-125 opacity-100' : 'scale-100 opacity-60'
          }`}
          style={{ zIndex: 5 }}
        />
      </div>
    </div>
  );
}
