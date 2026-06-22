'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  StickyNote, 
  Bot, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Planner', path: '/planner', icon: Calendar },
  { name: 'Notes', path: '/notes', icon: StickyNote },
  { name: 'AI Assistant', path: '/assistant', icon: Bot },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/30 backdrop-blur-2xl text-white transition-all duration-300 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/25"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40
          w-[300px] max-w-[85vw] lg:w-80
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Main navigation"
      >
        {/* Glassmorphism Container */}
        <div className="relative h-full">
          {/* Background with glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/95 via-[#0a0e27]/95 to-[#0d1028]/95 backdrop-blur-2xl border-r-2 border-cyan-400/20" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          {/* Gradient shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* Content */}
          <div className="relative h-full flex flex-col px-5 sm:px-6 py-5 sm:py-6">
            {/* Logo/Brand */}
            <div className="mb-6 sm:mb-8">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                <h1 className="relative text-2xl sm:text-3xl font-black text-white">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    StudyOS
                  </span>
                </h1>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 font-medium">Your Study Companion</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1.5 sm:space-y-2 overflow-y-auto overflow-x-hidden studyos-scrollbar px-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      relative w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl
                      font-semibold text-sm sm:text-base transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/50 text-white shadow-lg shadow-cyan-500/25' 
                        : 'bg-white/5 border-2 border-white/10 text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/40 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20'
                      }
                      active:scale-[0.98] group
                    `}
                  >
                    <Icon size={20} className={`transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'}`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Section - User Info */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-white/10 px-0.5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 flex-shrink-0">
                      US
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm font-bold truncate">User</p>
                      <p className="text-gray-400 text-[10px] sm:text-xs truncate">Free Plan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
