/**
 * Note Modal Component - for viewing and editing notes in a modal
 */

import { Note } from '@/types/note';
import NoteForm from './NoteForm';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-blue-400/30 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white bg-gray-800/50 rounded-full hover:bg-gray-700 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {isEditing ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Edit Note</h2>
              <NoteForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                editingNote={note}
                isSubmitting={isSubmitting}
              />
            </>
          ) : (
            <>
              {/* Subject badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full border transition-all ${
                  isCustomSubject
                    ? 'text-purple-300 bg-purple-500/20 border-purple-400/30'
                    : 'text-cyan-300 bg-cyan-500/20 border-cyan-400/30'
                }`}>
                  {isCustomSubject && '✏️ '}
                  {note.subject}
                </span>
                <span className="text-sm text-gray-400">
                  Updated: {formatDate(note.updatedAt)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-2">{note.title}</h2>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-700">
                <span>Created: {formatDate(note.createdAt)}</span>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
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
