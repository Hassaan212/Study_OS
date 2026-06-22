'use client';

/**
 * Task Manager Component - For testing and managing tasks
 * This component can be temporarily added to the dashboard for adding sample tasks
 */

import { useState } from 'react';
import { addTask } from '@/lib/tasks';
import { TaskInput } from '@/types/task';

interface TaskManagerProps {
  userId: string;
  onTaskAdded?: () => void;
}

export default function TaskManager({ userId, onTaskAdded }: TaskManagerProps) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !subject || !dueDate) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const taskInput: TaskInput = {
        title,
        subject,
        dueDate: new Date(dueDate),
        userId,
      };

      await addTask(taskInput);
      
      // Reset form
      setTitle('');
      setSubject('');
      setDueDate('');
      setMessage('Task added successfully!');
      
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const addSampleTasks = async () => {
    try {
      setLoading(true);
      setMessage('');

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const twoDays = new Date(today);
      twoDays.setDate(twoDays.getDate() + 2);
      
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const sampleTasks: TaskInput[] = [
        { title: 'Complete Calculus Assignment', subject: 'Mathematics', dueDate: today, userId },
        { title: 'Read Chapter 5 - Physics', subject: 'Physics', dueDate: today, userId },
        { title: 'Chemistry Lab Report', subject: 'Chemistry', dueDate: today, userId },
        { title: 'Physics Assignment', subject: 'Physics', dueDate: tomorrow, userId },
        { title: 'Review Biology Chapter', subject: 'Biology', dueDate: twoDays, userId },
        { title: 'English Essay Draft', subject: 'English', dueDate: nextWeek, userId },
      ];

      for (const task of sampleTasks) {
        await addTask(task);
      }

      setMessage('Sample tasks added successfully!');
      
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error('Error adding sample tasks:', error);
      setMessage('Failed to add sample tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group animate-fade-in-up">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
      <div className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/5 rounded-3xl border-2 border-cyan-400/30 backdrop-blur-2xl p-6 transition-all duration-500">
        <h3 className="text-xl font-bold text-white mb-4">Add Task (Testing)</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none"
              placeholder="Task title"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none"
              placeholder="e.g., Mathematics, Physics"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-400/50 focus:outline-none"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>

        <button
          onClick={addSampleTasks}
          disabled={loading}
          className="w-full px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold transition-all duration-300 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Sample Tasks'}
        </button>

        {message && (
          <p className={`mt-4 text-sm text-center ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
