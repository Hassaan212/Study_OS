'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import TaskCheckbox from '@/components/TaskCheckbox';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('User');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [completingTaskIds, setCompletingTaskIds] = useState<Set<string>>(new Set());

  // Task management hook
  const {
    tasksDueToday,
    upcomingTasks,
    loading: tasksLoading,
    error: tasksError,
    toggleTaskCompletion,
    getTaskStats,
    fetchTasks,
  } = useTasks(userId);

  const taskStats = getTaskStats();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserId(user.uid);
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

  const formatDueDate = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due: Today';
    if (diffDays === 1) return 'Due: Tomorrow';
    if (diffDays > 1 && diffDays <= 7) return `Due: In ${diffDays} days`;
    
    return `Due: ${dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const handleTaskToggle = async (taskId: string, currentStatus: boolean) => {
    // If completing a task (not uncompleting)
    if (!currentStatus) {
      // Add to completing set for visual state
      setCompletingTaskIds((prev) => new Set(prev).add(taskId));
      
      // Update Firestore immediately but don't refresh tasks yet
      // We'll use the lib function directly to avoid the automatic refresh
      const { toggleTaskCompletion: directToggle } = await import('@/lib/tasks');
      await directToggle(taskId, currentStatus);
      
      // Wait for animation, then remove from completing set and refresh
      setTimeout(() => {
        setCompletingTaskIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(taskId);
          return newSet;
        });
        // Now refresh to get updated task list
        fetchTasks();
      }, 2000); // 2000ms (2 seconds) animation duration
    } else {
      // Uncompleting - no animation needed
      await toggleTaskCompletion(taskId, currentStatus);
    }
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
      <div className="relative min-h-screen bg-[#050816] overflow-hidden lg:ml-72">
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
      
      {/* Enhanced Ambient Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-cyan-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '10s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '12s', animationDelay: '2s' }} />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Section - User Welcome */}
        <div className="mb-10 sm:mb-16 animate-fade-in-up pt-12 lg:pt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="relative">
              {/* Animated glow behind heading */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse pointer-events-none" 
                   style={{ animationDuration: '4s' }} />
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
                  Welcome back, <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>{userName}</span>
                </h1>
                <p className="text-gray-300 text-base sm:text-lg font-medium">{userEmail}</p>
                <p className="text-gray-500 text-sm sm:text-base mt-2">{getCurrentDate()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 text-sm font-bold backdrop-blur-md shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 hover:border-cyan-400/60">
                Free Plan
              </span>
              <button 
                onClick={() => auth.signOut().then(() => router.push('/'))}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/20 backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Today's Goal Card - Hero Section */}
        <div className="mb-10 sm:mb-14 animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
          <div className="relative group">
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            
            {/* Main glass card */}
            <div className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/5 rounded-3xl border-2 border-cyan-400/30 backdrop-blur-2xl p-6 sm:p-7 transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/25">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
              
              {/* Gradient shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              
              {/* Content */}
              <div className="relative space-y-5">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">Today's Goal</h3>
                    <p className="text-gray-300 text-sm font-medium">Keep the momentum going</p>
                  </div>
                  <div className="text-3xl sm:text-4xl">🎯</div>
                </div>
                
                {/* Tasks Complete & Progress Bar */}
                <div className="flex items-center justify-between gap-6">
                  <div>
                    {tasksLoading ? (
                      <div className="text-4xl sm:text-5xl font-black text-white/50">...</div>
                    ) : taskStats.totalTasksDueToday === 0 ? (
                      <div>
                        <div className="text-4xl sm:text-5xl font-black text-white">0</div>
                        <p className="text-gray-300 text-sm font-semibold mt-1">No tasks today</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl sm:text-5xl font-black text-white">
                          {taskStats.completedTasksDueToday} / {taskStats.totalTasksDueToday}
                        </div>
                        <p className="text-gray-300 text-sm font-semibold mt-1">Tasks Complete</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="flex-1 max-w-xs space-y-2">
                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                      {/* Progress fill with gradient and glow */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50 transition-all duration-1000"
                        style={{ width: `${tasksLoading ? 0 : taskStats.progressPercentage}%` }}
                      >
                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-medium">Progress</span>
                      <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {tasksLoading ? '0' : taskStats.progressPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Motivational Message */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl pointer-events-none" />
                  <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-400/30 p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="text-xl sm:text-2xl flex-shrink-0">💡</div>
                      <div>
                        <p className="text-white text-sm sm:text-base font-bold italic leading-relaxed">
                          "Consistency beats intensity."
                        </p>
                        <p className="text-gray-300 text-xs mt-1.5 font-medium">
                          Small daily progress compounds into extraordinary results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          
          {/* Card 1: Study Progress - Expanded */}
          <div className="relative group animate-fade-in-up md:col-span-2" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl border-2 border-cyan-400/30 backdrop-blur-2xl p-7 transition-all duration-500 group-hover:border-cyan-400/60 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-cyan-500/25 h-full flex flex-col">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              <div className="relative flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-6">Study Progress</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center flex-1">
                  {/* Progress Circle */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-44 h-44">
                      {/* Subtle outer glow effect */}
                      <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-xl"></div>
                      
                      {/* SVG Progress Ring */}
                      <svg className="transform -rotate-90 w-44 h-44 relative z-10" style={{ filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.15))' }}>
                        {/* Background circle */}
                        <circle 
                          cx="88" 
                          cy="88" 
                          r="76" 
                          stroke="currentColor" 
                          strokeWidth="14" 
                          fill="transparent" 
                          className="text-white/10"
                        />
                        
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                        
                        {/* Progress circle with gradient */}
                        <circle 
                          cx="88" 
                          cy="88" 
                          r="76" 
                          stroke="url(#progressGradient)" 
                          strokeWidth="14" 
                          fill="transparent" 
                          strokeDasharray="477" 
                          strokeDashoffset="119" 
                          strokeLinecap="round"
                          style={{ 
                            filter: 'drop-shadow(0 0 3px rgba(6, 182, 212, 0.2))',
                            transition: 'stroke-dashoffset 1s ease-in-out'
                          }}
                        />
                      </svg>
                      
                      {/* Center content */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="text-center">
                          <span className="text-4xl font-black bg-gradient-to-br from-white via-white to-cyan-100 bg-clip-text text-transparent">
                            75%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Hours Today</p>
                      <p className="text-white font-black text-3xl">2.5h</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Hours This Week</p>
                      <p className="text-white font-black text-3xl">12.5h</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Tasks Today</p>
                      <p className="text-white font-black text-3xl">
                        {tasksLoading ? '-' : `${taskStats.completedTasksDueToday}/${taskStats.totalTasksDueToday}`}
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Tasks Completed</p>
                      <p className="text-white font-black text-3xl">
                        {tasksLoading ? '-' : taskStats.completedTasksDueToday}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Current Subject */}
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm font-medium mb-1">Current Subject</p>
                      <p className="text-white font-bold text-lg">Calculus II</p>
                    </div>
                    <div className="text-3xl">📐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Study Streak - Enhanced */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl border-2 border-orange-400/30 backdrop-blur-2xl p-7 transition-all duration-500 group-hover:border-orange-400/60 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-orange-500/25">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff660008_1px,transparent_1px),linear-gradient(to_bottom,#ff660008_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-6">Study Streak</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-7xl drop-shadow-[0_0_20px_rgba(251,146,60,0.5)] transition-transform duration-300 group-hover:scale-110">🔥</div>
                </div>
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-white mb-2">7 Days</div>
                  <p className="text-orange-300 text-base font-bold">Current Streak</p>
                </div>
                
                {/* Additional Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-gray-300 text-sm font-medium">Best Streak</span>
                    <span className="text-orange-300 font-bold text-base">14 Days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-gray-300 text-sm font-medium">This Month</span>
                    <span className="text-orange-300 font-bold text-base">18 Sessions</span>
                  </div>
                </div>
                
                {/* Achievement Badge */}
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 border-2 border-orange-400/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <p className="text-white text-sm font-bold">Consistency Master</p>
                      <p className="text-orange-200 text-xs font-medium">Keep up the momentum!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Recent Activity */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl border-2 border-blue-400/30 backdrop-blur-2xl p-7 transition-all duration-500 group-hover:border-blue-400/60 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-blue-500/25">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 shadow-lg shadow-cyan-400/50"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">Completed Math Assignment</p>
                      <p className="text-gray-300 text-xs mt-1.5 font-medium">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-2 shadow-lg shadow-purple-400/50"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">Studied Chemistry Notes</p>
                      <p className="text-gray-300 text-xs mt-1.5 font-medium">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 mt-2 shadow-lg shadow-blue-400/50"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">AI Practice Session</p>
                      <p className="text-gray-300 text-xs mt-1.5 font-medium">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Upcoming Tasks */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl border-2 border-green-400/30 backdrop-blur-2xl p-7 transition-all duration-500 group-hover:border-green-400/60 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-green-500/25">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-6">Upcoming Tasks</h3>
                {tasksLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : tasksError ? (
                  <div className="text-center py-6">
                    <p className="text-red-400 text-sm">{tasksError}</p>
                  </div>
                ) : upcomingTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">✨</div>
                    <p className="text-gray-400 text-sm font-medium">No upcoming tasks</p>
                    <p className="text-gray-500 text-xs mt-1">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingTasks
                      .filter((task) => !task.completed || completingTaskIds.has(task.id))
                      .map((task) => {
                        const isCompleting = completingTaskIds.has(task.id);
                        
                        return (
                          <div 
                            key={task.id}
                            className={`
                              flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm transition-all duration-500
                              ${
                                isCompleting
                                  ? 'bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-2 border-green-400/40 opacity-60 scale-95 shadow-lg shadow-green-500/20'
                                  : 'bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]'
                              }
                            `}
                          >
                            <TaskCheckbox
                              checked={task.completed}
                              onChange={() => handleTaskToggle(task.id, task.completed)}
                            />
                            <div className="flex-1">
                              <p className={`text-sm font-semibold transition-all duration-500 ${
                                isCompleting 
                                  ? 'text-gray-400 line-through' 
                                  : task.completed 
                                    ? 'text-gray-500 line-through' 
                                    : 'text-white'
                              }`}>
                                {task.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-500 ${
                                  isCompleting
                                    ? 'bg-white/5 text-gray-400'
                                    : 'bg-white/10 text-gray-300'
                                }`}>
                                  {task.subject}
                                </span>
                                <p className={`text-xs font-medium transition-all duration-500 ${
                                  isCompleting ? 'text-gray-500' : 'text-gray-300'
                                }`}>
                                  {formatDueDate(task.dueDate)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 6: AI Recommendations */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            <div className="relative bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl border-2 border-pink-400/30 backdrop-blur-2xl p-7 transition-all duration-500 group-hover:border-pink-400/60 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-pink-500/25">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ec489908_1px,transparent_1px),linear-gradient(to_bottom,#ec489908_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">✨</span>
                  <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                    <p className="text-white text-sm font-bold mb-2">Focus on weak areas</p>
                    <p className="text-gray-300 text-xs mb-4 leading-relaxed">Your calculus scores can improve with 30 min daily practice</p>
                    <button className="text-cyan-300 text-xs font-bold hover:text-cyan-200 transition-all duration-300 hover:translate-x-1">
                      Start Practice →
                    </button>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                    <p className="text-white text-sm font-bold mb-2">Optimize study time</p>
                    <p className="text-gray-300 text-xs mb-4 leading-relaxed">Studies show you learn best between 2-4 PM</p>
                    <button className="text-cyan-300 text-xs font-bold hover:text-cyan-200 transition-all duration-300 hover:translate-x-1">
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
    </>
  );
}
