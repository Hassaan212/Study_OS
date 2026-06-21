'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';

export default function AssistantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="relative min-h-screen bg-[#050816] overflow-hidden lg:ml-72">
      {/* Background layers - matching dashboard */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0a0e27] to-[#0d1028] pointer-events-none" />
      
      {/* Radial depth layers */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 35%, transparent 70%)'
        }}
      />
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Enhanced Ambient Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-cyan-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '10s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '12s', animationDelay: '2s' }} />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-10 sm:mb-16 animate-fade-in-up">
          <div className="relative">
            {/* Animated glow behind heading */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse pointer-events-none" 
                 style={{ animationDuration: '4s' }} />
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">AI Assistant</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg font-medium">
                Your intelligent study companion powered by AI
              </p>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
          <div className="relative group">
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            
            {/* Main glass card */}
            <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/5 rounded-3xl border-2 border-purple-400/30 backdrop-blur-2xl p-8 sm:p-10 transition-all duration-500 group-hover:border-purple-400/50 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
              
              {/* Gradient shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              
              {/* Content */}
              <div className="relative text-center py-12 sm:py-20">
                <div className="text-6xl sm:text-7xl mb-6">🤖</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">AI Assistant Coming Soon</h2>
                <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                  Get personalized study recommendations, instant answers to your questions, 
                  and intelligent tutoring support. This feature is currently under development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
