/**
 * Note type definitions for Firestore-backed notes system
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface NoteInput {
  title: string;
  content: string;
  subject: string;
  userId: string;
}

export interface NoteUpdate {
  title?: string;
  content?: string;
  subject?: string;
}
