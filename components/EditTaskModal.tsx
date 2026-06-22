'use client';

/**
 * Edit Task Modal Component
 */

import { Task, TaskInput } from '@/types/task';
import TaskForm from './TaskForm';

interface EditTaskModalProps {
  task: Task;
  userId: string;
  onSubmit: (taskId: string, taskInput: TaskInput) => Promise<void>;
  onClose: () => void;
}

export default function EditTaskModal({
  task,
  userId,
  onSubmit,
  onClose,
}: EditTaskModalProps) {
  const handleSubmit = async (taskInput: TaskInput) => {
    await onSubmit(task.id, taskInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg">
        <div className="relative group">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-100 pointer-events-none" />

          {/* Modal content */}
          <div className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/5 rounded-3xl border-2 border-cyan-400/30 backdrop-blur-2xl p-8">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />

            {/* Gradient shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Edit Task</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <TaskForm
                userId={userId}
                onSubmit={handleSubmit}
                onCancel={onClose}
                initialData={{
                  title: task.title,
                  subject: task.subject,
                  dueDate: task.dueDate,
                }}
                submitLabel="Update Task"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
