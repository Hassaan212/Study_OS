/**
 * Note Form Component - for creating and editing notes
 */

import { useState, useEffect, useRef } from 'react';
import { Note } from '@/types/note';
import SubjectSelector from './SubjectSelector';

interface NoteFormProps {
  onSubmit: (title: string, content: string, subject: string) => void;
  onCancel: () => void;
  editingNote?: Note | null;
  isSubmitting?: boolean;
}

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'History',
  'Literature',
  'Languages',
  'Economics',
  'Psychology',
  'General',
];

const CUSTOM_SUBJECT_VALUE = '__CUSTOM__';

export default function NoteForm({ onSubmit, onCancel, editingNote, isSubmitting = false }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('General');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('General');
  const [customSubject, setCustomSubject] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      
      // Check if the subject is in predefined list
      if (SUBJECTS.includes(editingNote.subject)) {
        setSubject(editingNote.subject);
        setSelectedDropdownValue(editingNote.subject);
        setShowCustomInput(false);
      } else {
        // It's a custom subject
        setSubject(editingNote.subject);
        setCustomSubject(editingNote.subject);
        setSelectedDropdownValue(CUSTOM_SUBJECT_VALUE);
        setShowCustomInput(true);
      }
    }
  }, [editingNote]);

  // Auto-focus custom input when it appears
  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
    
    if (value === CUSTOM_SUBJECT_VALUE) {
      setShowCustomInput(true);
      setSubject(customSubject || '');
    } else {
      setShowCustomInput(false);
      setSubject(value);
      setCustomSubject('');
    }
  };

  const handleCustomSubjectChange = (value: string) => {
    setCustomSubject(value);
    setSubject(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that if custom is selected, custom subject is not empty
    if (selectedDropdownValue === CUSTOM_SUBJECT_VALUE && !customSubject.trim()) {
      return;
    }
    
    if (title.trim() && content.trim() && subject.trim()) {
      onSubmit(title.trim(), content.trim(), subject.trim());
      // Reset form only if not editing
      if (!editingNote) {
        setTitle('');
        setContent('');
        setSubject('General');
        setSelectedDropdownValue('General');
        setCustomSubject('');
        setShowCustomInput(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title input */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          required
          className="w-full px-4 py-3 bg-blue-500/10 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all"
        />
      </div>

      {/* Subject selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Subject
        </label>
        <SubjectSelector
          subjects={SUBJECTS}
          value={selectedDropdownValue}
          onChange={handleDropdownChange}
          customSubjectValue={CUSTOM_SUBJECT_VALUE}
        />
        
        {/* Custom subject input - animated */}
        <div 
          className={`transition-all duration-150 ease-out ${
            showCustomInput ? 'max-h-28 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className={`${showCustomInput ? 'block' : 'hidden'}`}>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Custom Subject
            </label>
            <div className="relative">
              <input
                ref={customInputRef}
                type="text"
                value={customSubject}
                onChange={(e) => handleCustomSubjectChange(e.target.value)}
                placeholder="Enter custom subject name..."
                className="w-full px-4 py-3 pl-10 bg-blue-500/10 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all"
              />
              {/* Pencil icon */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              {/* Character count */}
              {customSubject && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className={`text-xs font-medium transition-colors ${
                    customSubject.length > 30 ? 'text-orange-400' : 'text-gray-400'
                  }`}>
                    {customSubject.length}
                  </span>
                </div>
              )}
            </div>
            {customSubject && customSubject.length > 30 && (
              <p className="text-xs text-orange-400/90 mt-1.5 ml-0.5">
                ⚠️ Consider a shorter subject name for better display
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content textarea */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          required
          rows={8}
          className="w-full px-4 py-3 bg-blue-500/10 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all resize-none"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 text-sm font-semibold text-gray-300 bg-gray-700/50 border border-gray-600/50 rounded-xl hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={
            isSubmitting || 
            !title.trim() || 
            !content.trim() || 
            (selectedDropdownValue === CUSTOM_SUBJECT_VALUE && !customSubject.trim())
          }
          className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25"
        >
          {isSubmitting ? 'Saving...' : editingNote ? 'Update Note' : 'Create Note'}
        </button>
      </div>
    </form>
  );
}
