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
const AUTO_SAVE_DELAY = 3000; // 3 seconds
const DRAFT_KEY = 'studyos_note_draft';

export default function NoteForm({ onSubmit, onCancel, editingNote, isSubmitting = false }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('General');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('General');
  const [customSubject, setCustomSubject] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDraftRestored, setIsDraftRestored] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate stats
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min

  // Load draft from local storage on mount
  useEffect(() => {
    if (!editingNote) {
      try {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          const draftAge = Date.now() - draft.timestamp;
          // Only restore drafts less than 24 hours old
          if (draftAge < 24 * 60 * 60 * 1000) {
            setTitle(draft.title || '');
            setContent(draft.content || '');
            setSubject(draft.subject || 'General');
            setSelectedDropdownValue(draft.selectedDropdownValue || 'General');
            setCustomSubject(draft.customSubject || '');
            setShowCustomInput(draft.showCustomInput || false);
            setIsDraftRestored(true);
            setLastSaved(new Date(draft.timestamp));
          } else {
            // Clear old drafts
            localStorage.removeItem(DRAFT_KEY);
          }
        }
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, [editingNote]);

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

  // Auto-save draft to local storage
  useEffect(() => {
    // Don't auto-save when editing existing notes
    if (editingNote) return;

    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Only save if there's content
    if (title.trim() || content.trim()) {
      autoSaveTimerRef.current = setTimeout(() => {
        try {
          const draft = {
            title,
            content,
            subject,
            selectedDropdownValue,
            customSubject,
            showCustomInput,
            timestamp: Date.now(),
          };
          localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
          setLastSaved(new Date());
          setIsDraftRestored(false);
        } catch (error) {
          console.error('Failed to save draft:', error);
        }
      }, AUTO_SAVE_DELAY);
    }

    // Cleanup
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [title, content, subject, selectedDropdownValue, customSubject, showCustomInput, editingNote]);

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Fix double spaces
    value = value.replace(/  +/g, ' ');
    setTitle(value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    
    // Fix double spaces
    value = value.replace(/  +/g, ' ');
    
    // Auto-capitalize sentences
    value = value.replace(/(^\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
    
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that if custom is selected, custom subject is not empty
    if (selectedDropdownValue === CUSTOM_SUBJECT_VALUE && !customSubject.trim()) {
      return;
    }
    
    if (title.trim() && content.trim() && subject.trim()) {
      onSubmit(title.trim(), content.trim(), subject.trim());
      
      // Clear draft after successful submission (only for new notes)
      if (!editingNote) {
        localStorage.removeItem(DRAFT_KEY);
      }
      
      // Reset form only if not editing
      if (!editingNote) {
        setTitle('');
        setContent('');
        setSubject('General');
        setSelectedDropdownValue('General');
        setCustomSubject('');
        setShowCustomInput(false);
        setLastSaved(null);
        setIsDraftRestored(false);
      }
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setTitle('');
    setContent('');
    setSubject('General');
    setSelectedDropdownValue('General');
    setCustomSubject('');
    setShowCustomInput(false);
    setLastSaved(null);
    setIsDraftRestored(false);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Draft restored notification */}
      {isDraftRestored && !editingNote && (
        <div className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-cyan-300 font-medium">Draft restored from {lastSaved && getTimeAgo(lastSaved)}</span>
          </div>
          <button
            type="button"
            onClick={clearDraft}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Title input */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
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
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-300">
            Content
          </label>
          {/* Statistics bar */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {wordCount} words
            </span>
            <span>•</span>
            <span>{charCount} chars</span>
            {wordCount > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
              </>
            )}
          </div>
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your note here..."
          required
          rows={8}
          className="w-full px-4 py-3 bg-blue-500/10 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all resize-none studyos-scrollbar"
        />
      </div>

      {/* Auto-save status */}
      {!editingNote && lastSaved && !isDraftRestored && (
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span>Draft saved {getTimeAgo(lastSaved)}</span>
          </div>
        </div>
      )}

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
