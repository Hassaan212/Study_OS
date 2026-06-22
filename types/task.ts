/**
 * Task type definitions for Firestore-backed task system
 */

export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export interface TaskInput {
  title: string;
  subject: string;
  dueDate: Date;
  userId: string;
}

export interface TaskUpdate {
  title?: string;
  subject?: string;
  dueDate?: Date;
  completed?: boolean;
}
