/**
 * Core type definitions for StudyOS
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  color: string;
  instructor?: string;
}
