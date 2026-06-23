'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import { useTasks } from '@/hooks/useTasks';
import TaskCheckbox from '@/components/TaskCheckbox';
import Link from 'next/link';

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
        const name = user.displayName || user.email?.split('@')[0] || 'User';
        setUserName(name);
        setLoading(false);
      } else {
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Every expert was once a beginner. Keep pushing forward!",
      "Success is the sum of small efforts repeated day in and day out.",
      "The secret to getting ahead is getting started.",
      "Focus on progress, not perfection.",
      "Your future self will thank you for the work you do today."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
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
    if (!currentStatus) {
      setCompletingTaskIds((prev) => new Set(prev).add(taskId));
      
      const { toggleTaskCompletion: directToggle } = await import('@/lib/tasks');
      await directToggle(taskId, currentStatus);
      
      setTimeout(() => {
        setCompletingTaskIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(taskId);
          return newSet;
        });
        fetchTasks();
      }, 2000);
    } else {
      await toggleTaskCompletion(taskId, currentStatus);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
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

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* SECTION 1 — Welcome Hero */}
          <div className="mb-10 sm:mb-14 animate-fade-in-up pt-12 lg:pt-0">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse pointer-events-none" 
                   style={{ animationDuration: '4s' }} />
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2">
                      {getGreeting()}, <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">{userName}</span>
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg font-medium mb-3">{getCurrentDate()}</p>
                    <p className="text-gray-300 text-sm sm:text-base font-semibold italic">
                      "{getMotivationalMessage()}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/40 backdrop-blur-md">
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🔥</span>
                          <span className="text-3xl font-black text-white">7</span>
                        </div>
                        <p className="text-cyan-300 text-xs font-bold uppercase tracking-wide">Day Streak</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => auth.signOut().then(() => router.push('/'))}
                      className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/20 backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>


              </div>
            </div>
          </div>

          {/* SECTION 3 — Today's Focus */}
          <div className="mb-10 sm:mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              
              <div className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/5 rounded-3xl border-2 border-cyan-400/30 backdrop-blur-2xl p-6 sm:p-8 transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/25">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">Today's Focus</h2>
                      <p className="text-gray-300 text-sm font-medium">Your priority tasks for today</p>
                    </div>
                    <div className="text-4xl">🎯</div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Tasks List */}
                    <div className="lg:col-span-2">
                      {tasksLoading ? (
                        <div className="flex justify-center py-12">
                          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : tasksDueToday.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">📋</div>
                          <p className="text-white text-lg font-bold mb-2">No tasks for today</p>
                          <p className="text-gray-400 text-sm mb-6">Start planning by adding tasks to your schedule</p>
                          <Link href="/planner">
                            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/40 text-cyan-300 text-sm font-bold backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5">
                              Add Your First Task
                            </button>
                          </Link>
                        </div>
                      ) : tasksDueToday.filter((task) => !task.completed).length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">🎉</div>
                          <p className="text-white text-lg font-bold mb-2">All caught up!</p>
                          <p className="text-gray-400 text-sm mb-6">You've completed all tasks for today</p>
                          <Link href="/planner">
                            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/40 text-green-300 text-sm font-bold backdrop-blur-md transition-all duration-300 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5">
                              Plan Tomorrow
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {tasksDueToday
                            .filter((task) => !task.completed || completingTaskIds.has(task.id))
                            .slice(0, 5)
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
                                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        isCompleting
                                          ? 'bg-white/5 text-gray-400'
                                          : 'bg-white/10 text-gray-300'
                                      }`}>
                                        {task.subject}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>

                    {/* Right: Progress Visualization */}
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 backdrop-blur-sm">
                        <p className="text-gray-300 text-sm font-bold mb-4">Completion Rate</p>
                        <div className="relative w-32 h-32 mx-auto">
                          <svg className="transform -rotate-90 w-32 h-32">
                            <circle 
                              cx="64" 
                              cy="64" 
                              r="56" 
                              stroke="currentColor" 
                              strokeWidth="10" 
                              fill="transparent" 
                              className="text-white/10"
                            />
                            <circle 
                              cx="64" 
                              cy="64" 
                              r="56" 
                              stroke="url(#progressGradient2)" 
                              strokeWidth="10" 
                              fill="transparent" 
                              strokeDasharray="352" 
                              strokeDashoffset={352 - (352 * (tasksLoading ? 0 : taskStats.progressPercentage) / 100)}
                              strokeLinecap="round"
                              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-3xl font-black text-white">{tasksLoading ? '0' : taskStats.progressPercentage}%</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-gray-300 text-xs font-medium mt-4">
                          {tasksLoading ? 'Loading...' : `${taskStats.completedTasksDueToday} of ${taskStats.totalTasksDueToday} tasks`}
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">⏰</span>
                          <div>
                            <p className="text-white text-sm font-bold">Upcoming Tasks</p>
                            <p className="text-gray-300 text-xs font-medium">Next deadlines</p>
                          </div>
                        </div>
                        
                        {tasksLoading ? (
                          <div className="flex justify-center py-4">
                            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : upcomingTasks.length === 0 ? (
                          <p className="text-gray-400 text-xs text-center py-4">No upcoming tasks</p>
                        ) : (
                          <div className="space-y-3">
                            {upcomingTasks
                              .filter((task) => !task.completed || completingTaskIds.has(task.id))
                              .slice(0, 3)
                              .map((task) => {
                                const isCompleting = completingTaskIds.has(task.id);
                                
                                return (
                                  <div 
                                    key={task.id}
                                    className={`
                                      flex items-start gap-3 p-3 rounded-xl backdrop-blur-sm transition-all duration-500
                                      ${
                                        isCompleting
                                          ? 'bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-400/40 opacity-60'
                                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                                      }
                                    `}
                                  >
                                    <TaskCheckbox
                                      checked={task.completed}
                                      onChange={() => handleTaskToggle(task.id, task.completed)}
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-xs font-semibold transition-all duration-500 truncate ${
                                        isCompleting 
                                          ? 'text-gray-400 line-through' 
                                          : task.completed 
                                            ? 'text-gray-500 line-through' 
                                            : 'text-white'
                                      }`}>
                                        {task.title}
                                      </p>
                                      <p className={`text-xs font-medium mt-1 ${
                                        isCompleting ? 'text-gray-500' : 'text-gray-400'
                                      }`}>
                                        {formatDueDate(task.dueDate)}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4 — Quick Actions */}
          <div className="mb-10 sm:mb-14 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <h2 className="text-2xl font-black text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/notes">
                <button className="group relative w-full p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-400/30 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl pointer-events-none" />
                  <div className="relative flex flex-col items-center gap-3">
                    <span className="text-4xl">📝</span>
                    <p className="text-white font-bold text-base">Create Note</p>
                    <p className="text-gray-400 text-xs font-medium text-center">Capture your ideas instantly</p>
                  </div>
                </button>
              </Link>

              <Link href="/planner">
                <button className="group relative w-full p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl transition-all duration-300 hover:border-purple-400/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl pointer-events-none" />
                  <div className="relative flex flex-col items-center gap-3">
                    <span className="text-4xl">✅</span>
                    <p className="text-white font-bold text-base">Add Task</p>
                    <p className="text-gray-400 text-xs font-medium text-center">Plan your next move</p>
                  </div>
                </button>
              </Link>

              <Link href="/assistant">
                <button className="group relative w-full p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl transition-all duration-300 hover:border-green-400/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl pointer-events-none" />
                  <div className="relative flex flex-col items-center gap-3">
                    <span className="text-4xl">🤖</span>
                    <p className="text-white font-bold text-base">Ask AI</p>
                    <p className="text-gray-400 text-xs font-medium text-center">Get instant answers</p>
                  </div>
                </button>
              </Link>

              <button className="group relative w-full p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-400/30 backdrop-blur-xl transition-all duration-300 hover:border-orange-400/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731608_1px,transparent_1px),linear-gradient(to_bottom,#f9731608_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl pointer-events-none" />
                <div className="relative flex flex-col items-center gap-3">
                  <span className="text-4xl">📚</span>
                  <p className="text-white font-bold text-base">Start Session</p>
                  <p className="text-gray-400 text-xs font-medium text-center">Begin focused study</p>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Grid - SECTION 5 & 6 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            
            {/* SECTION 5 — Recent Activity */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl border-2 border-blue-400/30 backdrop-blur-2xl p-7 transition-all duration-500 group-hover:border-blue-400/60 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-blue-500/25">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📊</span>
                    <h2 className="text-xl font-black text-white">Recent Activity</h2>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto studyos-scrollbar-dark">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shadow-lg shadow-green-400/50 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">Completed Math Assignment</p>
                        <p className="text-gray-400 text-xs mt-1 font-medium">Calculus II • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 shadow-lg shadow-purple-400/50 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">Created Chemistry Notes</p>
                        <p className="text-gray-400 text-xs mt-1 font-medium">Organic Chemistry • 3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-lg shadow-cyan-400/50 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">AI Study Session</p>
                        <p className="text-gray-400 text-xs mt-1 font-medium">Physics Concepts • 5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shadow-lg shadow-blue-400/50 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">Updated Study Plan</p>
                        <p className="text-gray-400 text-xs mt-1 font-medium">Weekly Planning • Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shadow-lg shadow-orange-400/50 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">Achieved 7-Day Streak</p>
                        <p className="text-gray-400 text-xs mt-1 font-medium">Study Milestone • Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 shadow-lg shadow-pink-400/50 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">Added Biology Notes</p>
                        <p className="text-gray-400 text-xs mt-1 font-medium">Cell Structure • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 6 — Study Progress Visualization */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl border-2 border-purple-400/30 backdrop-blur-2xl p-7 transition-all duration-500 group-hover:border-purple-400/60 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📈</span>
                    <h2 className="text-xl font-black text-white">Weekly Progress</h2>
                  </div>

                  {/* Circular Progress */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative w-48 h-48">
                      <svg className="transform -rotate-90 w-48 h-48" style={{ filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.2))' }}>
                        <circle 
                          cx="96" 
                          cy="96" 
                          r="84" 
                          stroke="currentColor" 
                          strokeWidth="16" 
                          fill="transparent" 
                          className="text-white/10"
                        />
                        <defs>
                          <linearGradient id="weeklyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                            <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                        <circle 
                          cx="96" 
                          cy="96" 
                          r="84" 
                          stroke="url(#weeklyGradient)" 
                          strokeWidth="16" 
                          fill="transparent" 
                          strokeDasharray="528" 
                          strokeDashoffset="132"
                          strokeLinecap="round"
                          style={{ 
                            filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.3))',
                            transition: 'stroke-dashoffset 1.5s ease-in-out'
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-5xl font-black bg-gradient-to-br from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">75%</p>
                          <p className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-wide">Complete</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Study Hours</p>
                      <p className="text-white font-black text-2xl">12.5h</p>
                      <p className="text-purple-300 text-xs font-medium mt-1">↗ +2.5h</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Focus Score</p>
                      <p className="text-white font-black text-2xl">8.4</p>
                      <p className="text-purple-300 text-xs font-medium mt-1">↗ +0.6</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Tasks Done</p>
                      <p className="text-white font-black text-2xl">18</p>
                      <p className="text-purple-300 text-xs font-medium mt-1">↗ +4</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm">
                      <p className="text-gray-400 text-xs font-medium mb-2">Subjects</p>
                      <p className="text-white font-black text-2xl">5</p>
                      <p className="text-purple-300 text-xs font-medium mt-1">Active</p>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🏆</div>
                      <div>
                        <p className="text-white text-sm font-bold">Week Champion</p>
                        <p className="text-purple-200 text-xs font-medium">You're on fire this week!</p>
                      </div>
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
