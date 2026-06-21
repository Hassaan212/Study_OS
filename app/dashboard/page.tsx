'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('User');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        // Extract name from email or use display name
        const name = user.displayName || user.email?.split('@')[0] || 'User';
        setUserName(name);
        setLoading(false);
      } else {
        // Redirect to login if not authenticated
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

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
    <div className="relative min-h-screen bg-[#050816] overflow-hidden">
      {/* Background layers - matching landing page */}
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
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Section - User Welcome */}
        <div className="mb-8 sm:mb-12 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
                Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{userName}</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">{userEmail}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">{getCurrentDate()}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-400 text-sm font-semibold backdrop-blur-sm">
                Free Plan
              </span>
              <button 
                onClick={() => auth.signOut().then(() => router.push('/'))}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Study Progress */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-400/30 backdrop-blur-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4">Study Progress</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="352" strokeDashoffset="88" className="text-cyan-400" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">75%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Hours this week</span>
                    <span className="text-white font-semibold">12.5h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Tasks completed</span>
                    <span className="text-white font-semibold">24/32</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Study Streak */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-400/30 backdrop-blur-xl p-6 hover:border-orange-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff660005_1px,transparent_1px),linear-gradient(to_bottom,#ff660005_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4">Study Streak</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-6xl">🔥</div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-4xl font-black text-white mb-1">7 Days</div>
                  <p className="text-orange-400 text-sm font-medium">Current Streak</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-gray-300 text-sm text-center italic">
                    "Keep going! You're building great habits 💪"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Quick Actions */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-400/30 backdrop-blur-xl p-6 hover:border-purple-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f705_1px,transparent_1px),linear-gradient(to_bottom,#a855f705_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white font-medium transition-all duration-300 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] text-left flex items-center gap-3">
                    <span className="text-xl">📚</span>
                    <span>Create Study Plan</span>
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-white font-medium transition-all duration-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 hover:scale-[1.02] active:scale-[0.98] text-left flex items-center gap-3">
                    <span className="text-xl">🤖</span>
                    <span>AI Assistant</span>
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-white font-medium transition-all duration-300 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50 hover:scale-[1.02] active:scale-[0.98] text-left flex items-center gap-3">
                    <span className="text-xl">📝</span>
                    <span>Notes</span>
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-white font-medium transition-all duration-300 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50 hover:scale-[1.02] active:scale-[0.98] text-left flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <span>Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Recent Activity */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-400/30 backdrop-blur-xl p-6 hover:border-blue-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Completed Math Assignment</p>
                      <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Studied Chemistry Notes</p>
                      <p className="text-gray-400 text-xs mt-1">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">AI Practice Session</p>
                      <p className="text-gray-400 text-xs mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Upcoming Tasks */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-400/30 backdrop-blur-xl p-6 hover:border-green-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4">Upcoming Tasks</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Physics Assignment</p>
                      <p className="text-gray-400 text-xs">Due: Tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Review Biology Chapter</p>
                      <p className="text-gray-400 text-xs">Due: In 2 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">English Essay Draft</p>
                      <p className="text-gray-400 text-xs">Due: Next week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: AI Recommendations */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-400/30 backdrop-blur-xl p-6 hover:border-pink-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ec489905_1px,transparent_1px),linear-gradient(to_bottom,#ec489905_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">✨</span>
                  <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-white text-sm font-medium mb-2">Focus on weak areas</p>
                    <p className="text-gray-400 text-xs mb-3">Your calculus scores can improve with 30 min daily practice</p>
                    <button className="text-cyan-400 text-xs font-medium hover:text-cyan-300 transition-colors">
                      Start Practice →
                    </button>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-white text-sm font-medium mb-2">Optimize study time</p>
                    <p className="text-gray-400 text-xs mb-3">Studies show you learn best between 2-4 PM</p>
                    <button className="text-cyan-400 text-xs font-medium hover:text-cyan-300 transition-colors">
                      Adjust Schedule →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
