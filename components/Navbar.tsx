'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
              ? 'bg-[#050816]/70 border-cyan-400/40 shadow-lg shadow-cyan-500/20'
              : 'bg-[#050816]/50 border-cyan-400/30 shadow-md shadow-cyan-500/10'
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
                  onClick={() => {
                    // Close mobile menu if open (harmless on desktop)
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right - CTA Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/login" className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-cyan-300 transition-all duration-300 inline-flex items-center justify-center">
                Sign In
              </Link>
              <Link href="/signup" className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Get Started</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-cyan-300 transition-colors relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 relative">
                {/* Hamburger to X animation */}
                <span
                  className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'top-3 rotate-45' : 'top-1'
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 w-full h-0.5 bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-3xl bg-[#050816]/85 backdrop-blur-xl border border-cyan-400/20 shadow-xl shadow-cyan-500/10 overflow-hidden transition-all duration-300 ease-out origin-top ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block text-base font-medium text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5 rounded-xl px-4 py-3 transition-all duration-300 ${
                    isMobileMenuOpen ? 'animate-slide-in' : ''
                  }`}
                  style={{
                    animationDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div
                className={`pt-4 border-t border-cyan-400/20 space-y-3 ${
                  isMobileMenuOpen ? 'animate-slide-in' : ''
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
                }}
              >
                <Link href="/login" className="w-full px-5 py-3 text-sm font-medium text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl transition-all duration-300 inline-flex items-center justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link href="/signup" className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 inline-flex items-center justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
