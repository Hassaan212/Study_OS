'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'AI Assistant', href: '#ai-assistant' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#050816]/80 border-cyan-400/30 shadow-lg shadow-cyan-500/10'
              : 'bg-[#050816]/60 border-cyan-400/20'
          } backdrop-blur-xl border`}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center">
              <a
                href="#"
                className="text-xl font-bold text-white tracking-tight hover:text-cyan-300 transition-colors duration-300"
              >
                StudyOS
              </a>
            </div>

            {/* Center - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-gray-300 hover:text-cyan-300 transition-all duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right - CTA Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-cyan-300 transition-all duration-300">
                Sign In
              </button>
              <button className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Get Started</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-cyan-300 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-3xl bg-[#050816]/95 backdrop-blur-xl border border-cyan-400/20 shadow-xl shadow-cyan-500/10 overflow-hidden animate-fade-in-up">
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-base font-medium text-gray-300 hover:text-cyan-300 transition-colors duration-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-cyan-400/20 space-y-3">
                  <button className="w-full px-5 py-3 text-sm font-medium text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl transition-all duration-300">
                    Sign In
                  </button>
                  <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
