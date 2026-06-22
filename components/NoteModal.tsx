/**
 * Note Modal Component - for viewing and editing notes in a modal
 */

import { Note } from '@/types/note';
import NoteForm from './NoteForm';
import { useEffect, useRef } from 'react';

interface NoteModalProps {
  note: Note | null;
  onClose: () => void;
  onEdit?: (noteId: string, title: string, content: string, subject: string) => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

const PREDEFINED_SUBJECTS = [
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

export default function NoteModal({ note, onClose, onEdit, isEditing = false, isSubmitting = false }: NoteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!note) return null;

  const isCustomSubject = !PREDEFINED_SUBJECTS.includes(note.subject);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleSubmit = (title: string, content: string, subject: string) => {
    if (onEdit) {
      onEdit(note.id, title, content, subject);
    }
  };

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle click outside
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-[95vw] sm:w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto studyos-scrollbar-dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-blue-400/30 shadow-2xl py-4 pr-3 sm:pr-3"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-3 sm:top-6 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 hover:text-white bg-gray-800/50 rounded-full hover:bg-gray-700 transition-all"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-4 sm:px-8 pb-4 pr-2 sm:pr-0">
          {isEditing ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 pr-6 sm:pr-0">Edit Note</h2>
              <NoteForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                editingNote={note}
                isSubmitting={isSubmitting}
              />
            </>
          ) : (
            <>
              {/* Subject badge and timestamp - mobile responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 pr-6 sm:pr-0">
                <span className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-all w-fit ${
                  isCustomSubject
                    ? 'text-purple-300 bg-purple-500/20 border-purple-400/30'
                    : 'text-cyan-300 bg-cyan-500/20 border-cyan-400/30'
                }`}>
                  {isCustomSubject && '✏️ '}
                  {note.subject}
                </span>
                <span className="text-xs sm:text-sm text-gray-400">
                  Updated: {formatDate(note.updatedAt)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 pr-6 sm:pr-0 break-words">{note.title}</h2>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-700">
                <span>Created: {formatDate(note.createdAt)}</span>
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none pr-2 sm:pr-0">
                <div className="text-sm sm:text-base text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
                  {note.content}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
