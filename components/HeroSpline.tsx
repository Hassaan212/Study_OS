'use client';

interface HeroSplineProps {
  sceneUrl?: string;
}

function PlaceholderState() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-[2rem] border-2 border-cyan-400/30 backdrop-blur-md flex items-center justify-center overflow-hidden">
      {/* Grid pattern inside */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Placeholder content */}
      <div className="relative text-center space-y-6 z-10 px-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border-2 border-cyan-400/30 animate-pulse">
          <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
          Awaiting Spline Scene
        </p>
        <p className="text-sm text-gray-400 max-w-xs">
          Ready for 3D integration
        </p>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
      <div className="absolute bottom-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
    </div>
  );
}

export default function HeroSpline({ sceneUrl }: HeroSplineProps) {
  return (
    <div className="flex items-center justify-center animate-fade-in-up-delayed">
      <div className="relative w-full aspect-square max-w-[600px] group">
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
        
        {/* Main container */}
        <div className="relative h-full rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Static placeholder - Spline rendering disabled */}
          <PlaceholderState />
        </div>
        
        {/* Corner accents */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
      </div>
    </div>
  );
}
