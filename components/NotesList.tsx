/**
 * Notes List Component - displays grid of note cards
 */

import { Note } from '@/types/note';
import NoteCard from './NoteCard';

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onView: (note: Note) => void;
}

export default function NotesList({ notes, onEdit, onDelete, onView }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">📝</div>
        <h3 className="text-2xl font-bold text-white mb-2">No notes yet</h3>
        <p className="text-gray-400">Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
