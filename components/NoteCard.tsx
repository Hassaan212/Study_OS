/**
 * Note Card Component - displays individual note
 */

import { Note } from '@/types/note';
import { useState } from 'react';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onView: (note: Note) => void;
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

export default function NoteCard({ note, onEdit, onDelete, onView }: NoteCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isCustomSubject = !PREDEFINED_SUBJECTS.includes(note.subject);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleDelete = () => {
    onDelete(note.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative group">
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      {/* Main card */}
      <div className="relative bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/5 rounded-2xl border border-blue-400/30 backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-xl group-hover:shadow-blue-500/20">
        {/* Subject badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
              isCustomSubject
                ? 'text-purple-300 bg-purple-500/20 border-purple-400/30'
                : 'text-cyan-300 bg-cyan-500/20 border-cyan-400/30'
            }`}>
              {isCustomSubject && '✏️ '}
              {note.subject}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {formatDate(note.updatedAt)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-white mb-2 cursor-pointer hover:text-cyan-300 transition-colors"
          onClick={() => onView(note)}
        >
          {note.title}
        </h3>

        {/* Content preview */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {truncateContent(note.content)}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-blue-400/20">
          <button
            onClick={() => onView(note)}
            className="flex-1 px-4 py-2 text-sm font-medium text-blue-300 bg-blue-500/10 border border-blue-400/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300"
          >
            View
          </button>
          <button
            onClick={() => onEdit(note)}
            className="flex-1 px-4 py-2 text-sm font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-sm font-medium text-red-300 bg-red-500/10 border border-red-400/30 rounded-lg hover:bg-red-500/20 hover:border-red-400/50 transition-all duration-300"
          >
            Delete
          </button>
        </div>

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-red-400/30 p-6 max-w-md mx-4 shadow-2xl">
              <h4 className="text-xl font-bold text-white mb-2">Delete Note?</h4>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete &quot;{note.title}&quot;? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 border border-red-400 rounded-lg hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
