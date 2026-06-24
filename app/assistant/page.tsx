'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import Spline from '@splinetool/react-spline';
import type { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export default function AssistantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleQuickAction = (prompt: string) => {
    setChatInput(prompt);
    setTimeout(() => {
      chatInputRef.current?.focus();
      // Smooth scroll to input
      chatInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    setError(null);

    try {
      // Prepare messages for API (only role and content)
      const apiMessages = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add assistant message to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          
          {/* SECTION 1: HERO */}
          <div className="animate-fade-in-up mb-12 sm:mb-16 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              
              {/* Left Side: Content */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      AI Study
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Assistant
                    </span>
                  </h1>
                  
                  <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
                    Help students <span className="text-cyan-400 font-semibold">understand concepts</span>, 
                    <span className="text-purple-400 font-semibold"> generate notes</span>, 
                    <span className="text-blue-400 font-semibold"> create quizzes</span>, 
                    <span className="text-pink-400 font-semibold"> solve problems</span>, and 
                    <span className="text-green-400 font-semibold"> learn faster</span>.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <button className="relative group w-full sm:w-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                      <span>Start Learning</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                  
                  <button className="relative group w-full sm:w-auto">
                    <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 text-center">
                      View Examples
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Right Side: Spline AI Core */}
              <div className="relative lg:h-[500px] flex items-center justify-center order-first lg:order-last">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-cyan-500/30 to-blue-500/30 rounded-3xl blur-3xl opacity-50 transition-opacity duration-500" />
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-blue-500/10 backdrop-blur-2xl border-2 border-purple-400/30 rounded-2xl sm:rounded-3xl overflow-hidden">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl sm:rounded-3xl pointer-events-none z-10" />
                  
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
          <div className="animate-fade-in-up mb-12 sm:mb-16 lg:mb-20" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Quick Actions
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Choose what you need help with
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Explain a Topic */}
              <div 
                className="relative group cursor-pointer h-full transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleQuickAction('Explain the following topic in detail: ')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-active:from-purple-500/20 group-active:to-pink-500/20 rounded-xl sm:rounded-2xl transition-all duration-200" />
                <div className="relative h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-purple-400/50 group-hover:shadow-lg group-hover:shadow-purple-500/20 flex flex-col">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">🎓</div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Explain a Topic</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow">Get clear, detailed explanations for any concept you're studying</p>
                </div>
              </div>

              {/* Summarize Notes */}
              <div 
                className="relative group cursor-pointer h-full transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleQuickAction('Summarize these notes concisely: ')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-active:from-cyan-500/20 group-active:to-blue-500/20 rounded-xl sm:rounded-2xl transition-all duration-200" />
                <div className="relative h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 flex flex-col">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">📄</div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Summarize Notes</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow">Transform lengthy notes into concise, focused summaries</p>
                </div>
              </div>

              {/* Generate MCQs */}
              <div 
                className="relative group cursor-pointer h-full transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleQuickAction('Generate 10 multiple-choice questions on: ')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-active:from-blue-500/20 group-active:to-purple-500/20 rounded-xl sm:rounded-2xl transition-all duration-200" />
                <div className="relative h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-lg group-hover:shadow-blue-500/20 flex flex-col">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">❓</div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Generate MCQs</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow">Create practice questions to test your understanding</p>
                </div>
              </div>

              {/* Create Flashcards */}
              <div 
                className="relative group cursor-pointer h-full transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleQuickAction('Create flashcards (front and back) for: ')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-active:from-pink-500/20 group-active:to-purple-500/20 rounded-xl sm:rounded-2xl transition-all duration-200" />
                <div className="relative h-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-pink-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-pink-400/50 group-hover:shadow-lg group-hover:shadow-pink-500/20 flex flex-col">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">🃏</div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Create Flashcards</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow">Generate flashcards for effective memorization and recall</p>
                </div>
              </div>

              {/* Solve Problems */}
              <div 
                className="relative group cursor-pointer h-full transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleQuickAction('Solve the following problem step-by-step: ')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-active:from-orange-500/20 group-active:to-red-500/20 rounded-xl sm:rounded-2xl transition-all duration-200" />
                <div className="relative h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-orange-400/50 group-hover:shadow-lg group-hover:shadow-orange-500/20 flex flex-col">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">🧮</div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Solve Problems</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow">Get step-by-step solutions to complex problems</p>
                </div>
              </div>

              {/* Create Study Plan */}
              <div 
                className="relative group cursor-pointer h-full transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleQuickAction('Create a detailed study plan for: ')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-active:from-green-500/20 group-active:to-emerald-500/20 rounded-xl sm:rounded-2xl transition-all duration-200" />
                <div className="relative h-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-green-400/50 group-hover:shadow-lg group-hover:shadow-green-500/20 flex flex-col">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">📅</div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">Create Study Plan</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow">Build a personalized study schedule tailored to your goals</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* SECTION 3: AI CHAT WORKSPACE */}
          <div className="animate-fade-in-up pb-8 sm:pb-12" style={{ animationDelay: '0.25s', animationFillMode: 'backwards' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl sm:rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500 pointer-events-none" />
              
              {/* Main Card Container - Everything must stay inside */}
              <div className="relative bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-blue-500/10 rounded-2xl sm:rounded-3xl border-2 border-purple-400/30 backdrop-blur-2xl transition-all duration-500 group-hover:border-purple-400/50 overflow-hidden" style={{ height: '700px' }}>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                {/* Flex Container for proper layout */}
                <div className="relative flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 sm:p-8 border-b border-purple-400/20 flex-shrink-0">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-3xl sm:text-4xl">💬</div>
                      <div>
                        <h3 className="text-white font-bold text-xl sm:text-2xl">AI Chat Workspace</h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">Ask anything about your studies</p>
                      </div>
                    </div>
                    {messages.length > 0 && (
                      <button
                        onClick={clearChat}
                        className="text-gray-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-white/5 text-sm"
                      >
                        Clear Chat
                      </button>
                    )}
                  </div>
                  
                  {/* Messages Area - Scrollable, grows to fill space */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 studyos-scrollbar-dark"
                    style={{ minHeight: 0 }}
                  >
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
                          <div className="text-6xl sm:text-7xl mb-6 animate-float-robot">🤖</div>
                          <h4 className="text-white font-bold text-2xl sm:text-3xl mb-3">
                            Start a Conversation
                          </h4>
                          <p className="text-gray-400 text-base sm:text-lg mb-8">
                            Ask me anything about your studies, or try one of these:
                          </p>
                          
                          {/* Suggestion Chips */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                            <button
                              onClick={() => handleQuickAction('Explain Bubble Sort algorithm with examples')}
                              className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-400/20 hover:border-purple-400/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl flex-shrink-0">💡</span>
                                <div>
                                  <p className="text-white font-semibold text-sm mb-1">Explain Bubble Sort</p>
                                  <p className="text-gray-400 text-xs">Learn algorithm concepts</p>
                                </div>
                              </div>
                            </button>
                            
                            <button
                              onClick={() => handleQuickAction('Generate 20 MCQs on Database Management Systems')}
                              className="group relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-400/20 hover:border-cyan-400/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl flex-shrink-0">❓</span>
                                <div>
                                  <p className="text-white font-semibold text-sm mb-1">Generate MCQs on DBMS</p>
                                  <p className="text-gray-400 text-xs">Practice with questions</p>
                                </div>
                              </div>
                            </button>
                            
                            <button
                              onClick={() => handleQuickAction('Create flashcards for Operating Systems concepts - Process, Threads, Memory Management')}
                              className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-400/20 hover:border-blue-400/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl flex-shrink-0">🃏</span>
                                <div>
                                  <p className="text-white font-semibold text-sm mb-1">OS Flashcards</p>
                                  <p className="text-gray-400 text-xs">Memorize key concepts</p>
                                </div>
                              </div>
                            </button>
                            
                            <button
                              onClick={() => handleQuickAction('Create a 2-week study plan for Data Structures and Algorithms exam preparation')}
                              className="group relative overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-400/20 hover:border-green-400/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl flex-shrink-0">📅</span>
                                <div>
                                  <p className="text-white font-semibold text-sm mb-1">Build Study Plan</p>
                                  <p className="text-gray-400 text-xs">Organize your learning</p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 sm:gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                          >
                            {message.role === 'assistant' && (
                              <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/50">
                                AI
                              </div>
                            )}
                            <div
                              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-lg ${
                                message.role === 'user'
                                  ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-purple-500/30'
                                  : 'bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-gray-700/50 text-gray-100 shadow-black/20'
                              }`}
                            >
                              {message.role === 'user' ? (
                                <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed" style={{ lineHeight: '1.7' }}>
                                  {message.content}
                                </p>
                              ) : (
                                <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                    components={{
                                      h1: ({node, ...props}) => <h1 className="text-xl sm:text-2xl font-bold mb-3 text-cyan-400" {...props} />,
                                      h2: ({node, ...props}) => <h2 className="text-lg sm:text-xl font-bold mb-2 text-cyan-400" {...props} />,
                                      h3: ({node, ...props}) => <h3 className="text-base sm:text-lg font-bold mb-2 text-cyan-300" {...props} />,
                                      h4: ({node, ...props}) => <h4 className="text-sm sm:text-base font-bold mb-2 text-cyan-300" {...props} />,
                                      p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-gray-100" {...props} />,
                                      ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1 text-gray-100" {...props} />,
                                      ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-100" {...props} />,
                                      li: ({node, ...props}) => <li className="leading-relaxed text-gray-100" {...props} />,
                                      code: ({node, inline, ...props}: any) => 
                                        inline ? (
                                          <code className="bg-gray-950/50 text-cyan-400 px-1.5 py-0.5 rounded text-sm" {...props} />
                                        ) : (
                                          <code className="block bg-gray-950/70 p-4 rounded-lg overflow-x-auto text-sm my-3 border border-gray-700/50" {...props} />
                                        ),
                                      pre: ({node, ...props}) => <pre className="bg-gray-950/70 p-4 rounded-lg overflow-x-auto my-3 border border-gray-700/50" {...props} />,
                                      strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                                      em: ({node, ...props}) => <em className="italic text-gray-200" {...props} />,
                                      a: ({node, ...props}) => <a className="text-cyan-400 hover:text-cyan-300 underline" {...props} />,
                                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 my-3" {...props} />,
                                    }}
                                  >
                                    {message.content}
                                  </ReactMarkdown>
                                </div>
                              )}
                            </div>
                            {message.role === 'user' && (
                              <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/50">
                                U
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                          <div className="flex gap-3 sm:gap-4 justify-start animate-fade-in">
                            <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/50">
                              AI
                            </div>
                            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-2xl px-6 py-5 shadow-lg shadow-black/20">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
                                  <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
                                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }} />
                                </div>
                                <span className="text-gray-400 text-sm ml-2">Thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>
                  
                  {/* Error Message */}
                  {error && (
                    <div className="px-6 sm:px-8 pb-2 flex-shrink-0 animate-fade-in">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                          <span className="text-red-400 text-lg flex-shrink-0">⚠️</span>
                          <div className="flex-1">
                            <p className="text-red-400 text-sm">{error}</p>
                          </div>
                          <button
                            onClick={() => setError(null)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Input Area */}
                  <div className="p-6 sm:p-8 border-t border-purple-400/20 flex-shrink-0">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-focus-within:opacity-100 blur-lg transition-opacity duration-500" />
                      <textarea
                        ref={chatInputRef}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about your studies... (Shift+Enter for new line)"
                        rows={3}
                        disabled={isTyping}
                        className="relative w-full bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 hover:border-purple-400/50 focus:border-cyan-400/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 pr-16 sm:pr-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 resize-none studyos-scrollbar-dark text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      
                      <button
                        onClick={sendMessage}
                        disabled={!chatInput.trim() || isTyping}
                        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg sm:rounded-xl blur opacity-75 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <div className="relative bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </button>
                    </div>
                    
                    <p className="text-gray-500 text-xs text-center mt-3">
                      Powered by Google Gemini AI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
