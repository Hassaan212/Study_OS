/**
 * Custom hook for task management and state
 */

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/types/task';
import {
  getUserTasks,
  getTasksDueToday,
  getUpcomingTasks,
  toggleTaskCompletion as toggleTaskCompletionService,
} from '@/lib/tasks';

export interface TaskStats {
  totalTasksDueToday: number;
  completedTasksDueToday: number;
  progressPercentage: number;
}

export function useTasks(userId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksDueToday, setTasksDueToday] = useState<Task[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all user tasks
   */
  const fetchTasks = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [allTasks, todayTasks, upcoming] = await Promise.all([
        getUserTasks(userId),
        getTasksDueToday(userId),
        getUpcomingTasks(userId, 5),
      ]);

      setTasks(allTasks);
      setTasksDueToday(todayTasks);
      setUpcomingTasks(upcoming);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Toggle task completion and refresh data
   */
  const toggleTaskCompletion = useCallback(
    async (taskId: string, currentStatus: boolean) => {
      if (!userId) return;

      try {
        await toggleTaskCompletionService(taskId, currentStatus);
        // Refresh tasks after toggle
        await fetchTasks();
      } catch (err) {
        console.error('Error toggling task:', err);
        setError('Failed to update task');
      }
    },
    [userId, fetchTasks]
  );

  /**
   * Calculate task statistics for today
   */
  const getTaskStats = useCallback((): TaskStats => {
    const totalTasksDueToday = tasksDueToday.length;
    const completedTasksDueToday = tasksDueToday.filter((task) => task.completed).length;
    const progressPercentage =
      totalTasksDueToday > 0 ? Math.round((completedTasksDueToday / totalTasksDueToday) * 100) : 0;

    return {
      totalTasksDueToday,
      completedTasksDueToday,
      progressPercentage,
    };
  }, [tasksDueToday]);

  /**
   * Fetch tasks on mount and when userId changes
   */
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    tasksDueToday,
    upcomingTasks,
    loading,
    error,
    fetchTasks,
    toggleTaskCompletion,
    getTaskStats,
  };
}
