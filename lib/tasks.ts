/**
 * Firestore CRUD operations for tasks
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
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Task, TaskInput, TaskUpdate } from '@/types/task';

const TASKS_COLLECTION = 'tasks';

/**
 * Convert Firestore document to Task object
 */
const convertFirestoreTask = (id: string, data: any): Task => {
  return {
    id,
    title: data.title,
    subject: data.subject,
    dueDate: data.dueDate?.toDate() || new Date(),
    completed: data.completed || false,
    createdAt: data.createdAt?.toDate() || new Date(),
    userId: data.userId,
  };
};

/**
 * Add a new task to Firestore
 */
export async function addTask(taskInput: TaskInput): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      title: taskInput.title,
      subject: taskInput.subject,
      dueDate: Timestamp.fromDate(taskInput.dueDate),
      completed: false,
      createdAt: serverTimestamp(),
      userId: taskInput.userId,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

/**
 * Update an existing task
 */
export async function updateTask(taskId: string, updates: TaskUpdate): Promise<void> {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    const updateData: any = {};

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.subject !== undefined) updateData.subject = updates.subject;
    if (updates.dueDate !== undefined) updateData.dueDate = Timestamp.fromDate(updates.dueDate);
    if (updates.completed !== undefined) updateData.completed = updates.completed;

    await updateDoc(taskRef, updateData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: string): Promise<void> {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

/**
 * Toggle task completion status
 */
export async function toggleTaskCompletion(taskId: string, currentStatus: boolean): Promise<void> {
  try {
    await updateTask(taskId, { completed: !currentStatus });
  } catch (error) {
    console.error('Error toggling task completion:', error);
    throw error;
  }
}

/**
 * Get all tasks for a specific user
 */
export async function getUserTasks(userId: string): Promise<Task[]> {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      orderBy('dueDate', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      tasks.push(convertFirestoreTask(doc.id, doc.data()));
    });

    return tasks;
  } catch (error) {
    console.error('Error getting user tasks:', error);
    throw error;
  }
}

/**
 * Get tasks due today for a specific user
 */
export async function getTasksDueToday(userId: string): Promise<Task[]> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      where('dueDate', '>=', Timestamp.fromDate(today)),
      where('dueDate', '<', Timestamp.fromDate(tomorrow)),
      orderBy('dueDate', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      tasks.push(convertFirestoreTask(doc.id, doc.data()));
    });

    return tasks;
  } catch (error) {
    console.error('Error getting tasks due today:', error);
    throw error;
  }
}

/**
 * Get upcoming incomplete tasks for a specific user
 */
export async function getUpcomingTasks(userId: string, limit: number = 5): Promise<Task[]> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      where('completed', '==', false),
      where('dueDate', '>=', Timestamp.fromDate(today)),
      orderBy('dueDate', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      if (tasks.length < limit) {
        tasks.push(convertFirestoreTask(doc.id, doc.data()));
      }
    });

    return tasks;
  } catch (error) {
    console.error('Error getting upcoming tasks:', error);
    throw error;
  }
}
