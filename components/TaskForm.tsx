'use client';

/**
 * Task Form Component - For creating and editing tasks
 */

import { useState, useEffect } from 'react';
import { TaskInput } from '@/types/task';

interface TaskFormProps {
  userId: string;
  onSubmit: (task: TaskInput) => Promise<void>;
  onCancel?: () => void;
  initialData?: {
    title: string;
    subject: string;
    dueDate: Date;
  };
  submitLabel?: string;
}

export default function TaskForm({
  userId,
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Add Task',
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate
      ? new Date(initialData.dueDate).toISOString().split('T')[0]
      : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSubject(initialData.subject);
      setDueDate(new Date(initialData.dueDate).toISOString().split('T')[0]);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!subject.trim()) {
      setError('Subject is required');
      return;
    }
    if (!dueDate) {
      setError('Due date is required');
      return;
    }

    try {
      setLoading(true);

      const taskInput: TaskInput = {
        title: title.trim(),
        subject: subject.trim(),
        dueDate: new Date(dueDate),
        userId,
      };

      await onSubmit(taskInput);

      // Reset form only if creating new task (no initialData)
      if (!initialData) {
        setTitle('');
        setSubject('');
        setDueDate('');
      }
    } catch (err) {
      console.error('Error submitting task:', err);
      setError('Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
          <p className="text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}

      <div>
        <label className="text-gray-300 text-sm font-semibold mb-2 block">
          Task Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
          placeholder="e.g., Complete Chapter 5 Assignment"
          disabled={loading}
          maxLength={100}
        />
      </div>

      <div>
        <label className="text-gray-300 text-sm font-semibold mb-2 block">
          Subject <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
          placeholder="e.g., Mathematics, Physics, Chemistry"
          disabled={loading}
          maxLength={50}
        />
      </div>

      <div>
        <label className="text-gray-300 text-sm font-semibold mb-2 block">
          Due Date <span className="text-red-400">*</span>
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-white focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
          disabled={loading}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-white font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
