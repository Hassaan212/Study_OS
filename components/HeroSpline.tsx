'use client';

import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';

interface HeroSplineProps {
  sceneUrl?: string;
}

function PlaceholderState() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-[2rem] border-2 border-cyan-400/30 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500">
      {/* Grid pattern inside */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Content */}
      <div className="relative text-center space-y-6 z-10">
        <div className="text-7xl animate-float">🎨</div>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
          Future AI Visual
        </p>
        <p className="text-base text-gray-400 font-medium">
          Spline 3D Scene Loading...
        </p>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
      <div className="absolute bottom-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
    </div>
  );
}

export default function HeroSpline({ sceneUrl = 'https://prod.spline.design/v2DNFUffljiKNFGE/scene.splinecode' }: HeroSplineProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoad = () => {
    console.log('✅ Spline scene loaded successfully');
    setIsLoaded(true);
  };

  const handleError = (error: any) => {
    console.error('❌ Spline scene loading failed:', error);
    setHasError(true);
  };

  // Show placeholder if no scene URL provided or if there's an error
  const shouldShowPlaceholder = !sceneUrl || hasError;

  return (
    <div className="flex items-center justify-center animate-fade-in-up-delayed">
      <div className="relative w-full aspect-square max-w-[600px] group">
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
        
        {/* Main container */}
        <div className="relative h-full rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Show placeholder while loading or if error */}
          {(!isLoaded || shouldShowPlaceholder) && <PlaceholderState />}
          
          {/* Spline scene */}
          {sceneUrl && !hasError && (
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-[2rem] border-2 border-cyan-400/30 backdrop-blur-md overflow-hidden transition-opacity duration-700 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />
              
              {/* Spline component */}
              <div className={`w-full h-full ${isMobile ? 'pointer-events-none' : ''}`}>
                <Spline
                  scene={sceneUrl}
                  onLoad={handleLoad}
                  onError={handleError}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Corner accents */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
      </div>
    </div>
  );
}
