'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import Spline from '@splinetool/react-spline';

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
      <div className="relative min-h-screen bg-[#050816] overflow-hidden lg:ml-80">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0a0e27] to-[#0d1028] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 35%, transparent 70%)'
          }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Ambient Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-cyan-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
             style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" 
             style={{ animationDuration: '12s', animationDelay: '2s' }} />
        
        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* SECTION 1: HERO */}
          <div className="animate-fade-in-up mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      AI Study
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Assistant
                    </span>
                  </h1>
                  
                  <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-xl">
                    Help students <span className="text-cyan-400 font-semibold">understand concepts</span>, 
                    <span className="text-purple-400 font-semibold"> generate notes</span>, 
                    <span className="text-blue-400 font-semibold"> create quizzes</span>, 
                    <span className="text-pink-400 font-semibold"> solve problems</span>, and 
                    <span className="text-green-400 font-semibold"> learn faster</span>.
                  </p>
                </div>
                
                {/* Premium Badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/40 rounded-full px-4 py-2">
                      <span className="text-white font-medium text-sm flex items-center gap-2">
                        <span>💡</span> Explain Concepts
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-full px-4 py-2">
                      <span className="text-white font-medium text-sm flex items-center gap-2">
                        <span>📝</span> Generate Notes
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/40 rounded-full px-4 py-2">
                      <span className="text-white font-medium text-sm flex items-center gap-2">
                        <span>✅</span> Create MCQs
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/40 rounded-full px-4 py-2">
                      <span className="text-white font-medium text-sm flex items-center gap-2">
                        <span>🃏</span> Create Flashcards
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2">
                      <span>Start Learning</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                  
                  <button className="relative group">
                    <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                      View Examples
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Right Side: Spline AI Core */}
              <div className="relative lg:h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-cyan-500/30 to-blue-500/30 rounded-3xl blur-3xl opacity-50 transition-opacity duration-500" />
                <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-blue-500/10 backdrop-blur-2xl border-2 border-purple-400/30 rounded-3xl overflow-hidden">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none z-10" />
                  
                  {/* Spline Scene */}
                  <div className="absolute inset-0 w-full h-full">
                    <Spline
                      scene="https://prod.spline.design/rhcoXLUVcaZ9fE-l/scene.splinecode"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SECTION 2: QUICK ACTIONS */}
          <div className="animate-fade-in-up mb-20" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Quick Actions
              </h2>
              <p className="text-gray-400 text-lg">
                Choose what you need help with
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Explain a Topic */}
              <div className="relative group cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-8 transition-all duration-300 group-hover:border-purple-400/40 group-hover:scale-[1.02] flex flex-col">
                  <div className="text-5xl mb-6">🎓</div>
                  <h3 className="text-white font-bold text-xl mb-3">Explain a Topic</h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-grow">Get clear, detailed explanations for any concept you're studying</p>
                </div>
              </div>

              {/* Summarize Notes */}
              <div className="relative group cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:scale-[1.02] flex flex-col">
                  <div className="text-5xl mb-6">📄</div>
                  <h3 className="text-white font-bold text-xl mb-3">Summarize Notes</h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-grow">Transform lengthy notes into concise, focused summaries</p>
                </div>
              </div>

              {/* Generate MCQs */}
              <div className="relative group cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 transition-all duration-300 group-hover:border-blue-400/40 group-hover:scale-[1.02] flex flex-col">
                  <div className="text-5xl mb-6">❓</div>
                  <h3 className="text-white font-bold text-xl mb-3">Generate MCQs</h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-grow">Create practice questions to test your understanding</p>
                </div>
              </div>

              {/* Create Flashcards */}
              <div className="relative group cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-pink-400/20 rounded-2xl p-8 transition-all duration-300 group-hover:border-pink-400/40 group-hover:scale-[1.02] flex flex-col">
                  <div className="text-5xl mb-6">🃏</div>
                  <h3 className="text-white font-bold text-xl mb-3">Create Flashcards</h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-grow">Generate flashcards for effective memorization and recall</p>
                </div>
              </div>

              {/* Solve Problems */}
              <div className="relative group cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-400/20 rounded-2xl p-8 transition-all duration-300 group-hover:border-orange-400/40 group-hover:scale-[1.02] flex flex-col">
                  <div className="text-5xl mb-6">🧮</div>
                  <h3 className="text-white font-bold text-xl mb-3">Solve Problems</h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-grow">Get step-by-step solutions to complex problems</p>
                </div>
              </div>

              {/* Create Study Plan */}
              <div className="relative group cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/20 rounded-2xl p-8 transition-all duration-300 group-hover:border-green-400/40 group-hover:scale-[1.02] flex flex-col">
                  <div className="text-5xl mb-6">📅</div>
                  <h3 className="text-white font-bold text-xl mb-3">Create Study Plan</h3>
                  <p className="text-gray-400 text-base leading-relaxed flex-grow">Build a personalized study schedule tailored to your goals</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* SECTION 3: AI CHAT WORKSPACE */}
          <div className="animate-fade-in-up mb-20" style={{ animationDelay: '0.25s', animationFillMode: 'backwards' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-cyan-500/30 to-blue-500/30 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500 pointer-events-none" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-blue-500/10 rounded-3xl border-2 border-purple-400/30 backdrop-blur-2xl p-8 sm:p-10 transition-all duration-500 group-hover:border-purple-400/50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-4xl">💬</div>
                    <div>
                      <h3 className="text-white font-bold text-2xl">AI Chat Workspace</h3>
                      <p className="text-gray-400 text-sm mt-1">Ask anything about your studies</p>
                    </div>
                  </div>
                  
                  {/* Suggested Prompts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button className="relative group/prompt text-left">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-md opacity-0 group-hover/prompt:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 rounded-xl p-4 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💡</span>
                          <span className="text-white text-sm font-medium">Explain Bubble Sort</span>
                        </div>
                      </div>
                    </button>
                    
                    <button className="relative group/prompt text-left">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-md opacity-0 group-hover/prompt:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 rounded-xl p-4 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">✅</span>
                          <span className="text-white text-sm font-medium">Generate DBMS MCQs</span>
                        </div>
                      </div>
                    </button>
                    
                    <button className="relative group/prompt text-left">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover/prompt:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 rounded-xl p-4 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📝</span>
                          <span className="text-white text-sm font-medium">Summarize Operating Systems</span>
                        </div>
                      </div>
                    </button>
                    
                    <button className="relative group/prompt text-left">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover/prompt:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-pink-400/30 rounded-xl p-4 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🃏</span>
                          <span className="text-white text-sm font-medium">Create Flashcards from Notes</span>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  {/* Chat Input Area */}
                  <div className="relative">
                    <textarea
                      placeholder="Ask anything about your studies..."
                      rows={8}
                      className="w-full bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none studyos-scrollbar-dark text-base"
                      disabled
                    />
                    
                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                      <button 
                        className="relative group/btn"
                        disabled
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <div className="relative bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-not-allowed opacity-70">
                          <span className="text-base">Send</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm text-center pt-2">
                    🔮 AI integration coming soon • This is a UI preview
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* SECTION 4: TRUST / BENEFITS */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.35s', animationFillMode: 'backwards' }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center space-y-3">
                <div className="relative group inline-block">
                  <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center text-3xl sm:text-4xl">
                    ⚡
                  </div>
                </div>
                <h4 className="text-white font-bold text-base sm:text-lg">Instant Responses</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Get answers in seconds, not hours</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="relative group inline-block">
                  <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center text-3xl sm:text-4xl">
                    🎯
                  </div>
                </div>
                <h4 className="text-white font-bold text-base sm:text-lg">Study-Focused</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Tailored specifically for students</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="relative group inline-block">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center text-3xl sm:text-4xl">
                    🕐
                  </div>
                </div>
                <h4 className="text-white font-bold text-base sm:text-lg">Available 24/7</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Study support whenever you need it</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="relative group inline-block">
                  <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center text-3xl sm:text-4xl">
                    📚
                  </div>
                </div>
                <h4 className="text-white font-bold text-base sm:text-lg">Exam Preparation</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Perfect for test preparation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
