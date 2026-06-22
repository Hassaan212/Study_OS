'use client';

/**
 * Custom Task Checkbox Component
 * Modern glassmorphism design matching StudyOS aesthetic
 */

import { useState } from 'react';

interface TaskCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function TaskCheckbox({ checked, onChange, disabled = false }: TaskCheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-5 h-5 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Background Layer */}
      <div
        className={`
          absolute inset-0 rounded-lg border-2 backdrop-blur-sm transition-all duration-300
          ${
            checked
              ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-cyan-400/60'
              : 'bg-white/5 border-gray-400/40'
          }
          ${isHovered && !disabled && !checked ? 'border-cyan-400/50 bg-white/10' : ''}
        `}
      />

      {/* Glow Effect when Checked */}
      {checked && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/40 to-purple-500/40 blur-md animate-pulse pointer-events-none" />
      )}

      {/* Checkmark Icon */}
      <svg
        className={`
          relative z-10 w-3.5 h-3.5 text-white transition-all duration-300
          ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>

      {/* Hover Ring */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
