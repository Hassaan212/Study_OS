/**
 * Firestore CRUD operations for notes
 */

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Note, NoteInput, NoteUpdate } from '@/types/note';

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

/**
 * Create a new note in Firestore
 */
export async function createNote(noteInput: NoteInput): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
      title: noteInput.title,
      content: noteInput.content,
      subject: noteInput.subject,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userId: noteInput.userId,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
}

/**
 * Update an existing note
 */
export async function updateNote(noteId: string, updates: NoteUpdate): Promise<void> {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId);
    const updateData: any = {
      updatedAt: serverTimestamp(),
    };

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.content !== undefined) updateData.content = updates.content;
    if (updates.subject !== undefined) updateData.subject = updates.subject;

    await updateDoc(noteRef, updateData);
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
}

/**
 * Delete a note
 */
export async function deleteNote(noteId: string): Promise<void> {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId);
    await deleteDoc(noteRef);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}

/**
 * Get all notes for a specific user
 */
export async function getUserNotes(userId: string): Promise<Note[]> {
  try {
    const q = query(
      collection(db, NOTES_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const notes: Note[] = [];

    querySnapshot.forEach((doc) => {
      notes.push(convertFirestoreNote(doc.id, doc.data()));
    });

    return notes;
  } catch (error) {
    console.error('Error getting user notes:', error);
    throw error;
  }
}

/**
 * Search notes by title, content, or subject
 */
export async function searchNotes(userId: string, searchTerm: string): Promise<Note[]> {
  try {
    // Get all user notes first (Firestore doesn't support full-text search natively)
    const allNotes = await getUserNotes(userId);
    
    // Filter notes based on search term
    const searchLower = searchTerm.toLowerCase();
    const filteredNotes = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower) ||
        note.subject.toLowerCase().includes(searchLower)
    );

    return filteredNotes;
  } catch (error) {
    console.error('Error searching notes:', error);
    throw error;
  }
}
