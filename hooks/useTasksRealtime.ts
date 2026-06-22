/**
 * Custom hook for real-time task management with Firestore listeners
 */

import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Task, TaskInput } from '@/types/task';
import { addTask, updateTask, deleteTask, toggleTaskCompletion as toggleTaskCompletionService } from '@/lib/tasks';

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

export function useTasksRealtime(userId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Set up real-time listener for user's tasks
   */
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setTasks([]);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      orderBy('dueDate', 'asc')
    );

    // Real-time listener
    const unsubscribe: Unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const tasksData: Task[] = [];
        querySnapshot.forEach((doc) => {
          tasksData.push(convertFirestoreTask(doc.id, doc.data()));
        });
        setTasks(tasksData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks');
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId]);

  /**
   * Create a new task
   */
  const createTask = useCallback(
    async (taskInput: TaskInput): Promise<void> => {
      if (!userId) return;

      try {
        await addTask(taskInput);
        // Real-time listener will automatically update the UI
      } catch (err) {
        console.error('Error creating task:', err);
        throw err;
      }
    },
    [userId]
  );

  /**
   * Update an existing task
   */
  const editTask = useCallback(
    async (taskId: string, taskInput: TaskInput): Promise<void> => {
      try {
        await updateTask(taskId, {
          title: taskInput.title,
          subject: taskInput.subject,
          dueDate: taskInput.dueDate,
        });
        // Real-time listener will automatically update the UI
      } catch (err) {
        console.error('Error updating task:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Delete a task
   */
  const removeTask = useCallback(async (taskId: string): Promise<void> => {
    try {
      await deleteTask(taskId);
      // Real-time listener will automatically update the UI
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    }
  }, []);

  /**
   * Toggle task completion
   */
  const toggleComplete = useCallback(
    async (taskId: string, currentStatus: boolean): Promise<void> => {
      try {
        await toggleTaskCompletionService(taskId, currentStatus);
        // Real-time listener will automatically update the UI
      } catch (err) {
        console.error('Error toggling task:', err);
        throw err;
      }
    },
    []
  );

  return {
    tasks,
    loading,
    error,
    createTask,
    editTask,
    removeTask,
    toggleComplete,
  };
}
