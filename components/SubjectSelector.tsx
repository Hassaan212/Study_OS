/**
 * Custom Subject Selector Component - StudyOS Design System
 */

import { useState, useRef, useEffect } from 'react';

interface SubjectSelectorProps {
  subjects: string[];
  value: string;
  onChange: (value: string) => void;
  customSubjectValue: string;
}

export default function SubjectSelector({
  subjects,
  value,
  onChange,
  customSubjectValue,
}: SubjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter subjects based on search
  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getDisplayValue = () => {
    if (value === customSubjectValue) {
      return '✏️ Other / Custom Subject';
    }
    return value;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected value button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-blue-500/10 border border-blue-400/30 rounded-xl text-white text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all hover:bg-blue-500/15 hover:border-blue-400/40 relative group"
        style={{
          color: '#ffffff',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        }}
      >
        <span className="block truncate pr-8">{getDisplayValue()}</span>
        
        {/* Arrow icon */}
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Focus glow */}
        <div className="absolute inset-0 rounded-xl bg-cyan-500/0 group-hover:bg-cyan-500/5 group-focus:bg-cyan-500/5 transition-all duration-200 pointer-events-none" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute z-50 mt-2 w-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-xl border border-blue-400/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-up"
          style={{ animationDuration: '150ms' }}
        >
          {/* Search input */}
          <div className="p-3 border-b border-blue-400/20">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subjects..."
                className="w-full px-4 py-2 pl-9 bg-blue-500/10 border border-blue-400/30 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all"
              />
              {/* Search icon */}
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {filteredSubjects.length > 0 ? (
              <>
                {filteredSubjects.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleSelect(subject)}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-all relative group ${
                      value === subject
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-gray-300 hover:bg-blue-500/15 hover:text-white'
                    }`}
                  >
                    {/* Selection indicator */}
                    {value === subject && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500" />
                    )}
                    
                    {/* Subject text */}
                    <span className="block pl-2">{subject}</span>
                    
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  </button>
                ))}
                
                {/* Divider before custom option */}
                <div className="border-t border-blue-400/20 my-1" />
              </>
            ) : (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                No subjects found
              </div>
            )}
            
            {/* Custom subject option - always visible */}
            <button
              type="button"
              onClick={() => handleSelect(customSubjectValue)}
              className={`w-full px-4 py-2.5 text-left text-sm transition-all relative group ${
                value === customSubjectValue
                  ? 'bg-purple-500/20 text-purple-300 font-semibold'
                  : 'text-gray-300 hover:bg-purple-500/15 hover:text-white'
              }`}
            >
              {/* Selection indicator */}
              {value === customSubjectValue && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-500" />
              )}
              
              {/* Custom subject text */}
              <span className="block pl-2 flex items-center gap-1.5">
                <span>✏️</span>
                <span className="font-semibold">Other / Custom Subject</span>
              </span>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
