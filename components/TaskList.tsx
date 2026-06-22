'use client';

/**
 * Task List Component - Display and manage tasks
 */

import { useState } from 'react';
import { Task } from '@/types/task';
import TaskCheckbox from './TaskCheckbox';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string, currentStatus: boolean) => void;
}

export default function TaskList({
  tasks,
  loading,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (taskId: string) => {
    setDeletingId(taskId);
  };

  const confirmDelete = (taskId: string) => {
    onDelete(taskId);
    setDeletingId(null);
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const formatDueDate = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
    if (diffDays === 0) return 'Due Today';
    if (diffDays === 1) return 'Due Tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;

    return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDueDateColor = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-red-400'; // Overdue
    if (diffDays === 0) return 'text-orange-400'; // Today
    if (diffDays === 1) return 'text-yellow-400'; // Tomorrow
    return 'text-gray-300'; // Future
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-7xl mb-6">📝</div>
        <h3 className="text-2xl font-bold text-white mb-3">No Tasks Yet</h3>
        <p className="text-gray-400 text-base max-w-md mx-auto">
          Start planning your study schedule by adding your first task above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="relative group"
        >
          {/* Delete Confirmation Overlay */}
          {deletingId === task.id && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border-2 border-red-400/50 backdrop-blur-2xl p-6 z-10 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-base font-semibold mb-4">Delete this task?</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => confirmDelete(task.id)}
                    className="px-5 py-2 rounded-xl bg-red-500 text-white font-bold transition-all duration-300 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold transition-all duration-300 hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Task Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border-2 border-white/10 backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <div className="pt-1">
                <TaskCheckbox
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id, task.completed)}
                />
              </div>

              {/* Task Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base font-bold mb-2 ${
                    task.completed ? 'text-gray-500 line-through' : 'text-white'
                  }`}
                >
                  {task.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
                    {task.subject}
                  </span>
                  <span className={`text-xs font-medium ${getDueDateColor(task.dueDate)}`}>
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-4 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
