/**
 * Custom hook for real-time note management with Firestore listeners
 */

import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Note, NoteInput, NoteUpdate } from '@/types/note';
import { createNote, updateNote, deleteNote } from '@/lib/notes';

const NOTES_COLLECTION = 'notes';

/**
 * Convert Firestore document to Note object
 */
const convertFirestoreNote = (id: string, data: any): Note => {
  return {
    id,
    title: data.title,
    content: data.content,
    subject: data.subject,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    userId: data.userId,
  };
};

export function useNotesRealtime(userId: string | null) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Set up real-time listener for user's notes
   */
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setNotes([]);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, NOTES_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    // Real-time listener
    const unsubscribe: Unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const notesData: Note[] = [];
        querySnapshot.forEach((doc) => {
          notesData.push(convertFirestoreNote(doc.id, doc.data()));
        });
        setNotes(notesData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching notes:', err);
        setError('Failed to load notes');
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId]);

  /**
   * Create a new note
   */
  const addNote = useCallback(
    async (noteInput: NoteInput): Promise<void> => {
      if (!userId) return;

      try {
        await createNote(noteInput);
        // Real-time listener will automatically update the UI
      } catch (err) {
        console.error('Error creating note:', err);
        throw err;
      }
    },
    [userId]
  );

  /**
   * Update an existing note
   */
  const editNote = useCallback(
    async (noteId: string, updates: NoteUpdate): Promise<void> => {
      try {
        await updateNote(noteId, updates);
        // Real-time listener will automatically update the UI
      } catch (err) {
        console.error('Error updating note:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Delete a note
   */
  const removeNote = useCallback(async (noteId: string): Promise<void> => {
    try {
      await deleteNote(noteId);
      // Real-time listener will automatically update the UI
    } catch (err) {
      console.error('Error deleting note:', err);
      throw err;
    }
  }, []);

  /**
   * Search notes by title, content, or subject
   */
  const searchNotes = useCallback(
    (searchTerm: string): Note[] => {
      if (!searchTerm.trim()) {
        return notes;
      }

      const searchLower = searchTerm.toLowerCase();
      return notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchLower) ||
          note.content.toLowerCase().includes(searchLower) ||
          note.subject.toLowerCase().includes(searchLower)
      );
    },
    [notes]
  );

  return {
    notes,
    loading,
    error,
    addNote,
    editNote,
    removeNote,
    searchNotes,
  };
}
