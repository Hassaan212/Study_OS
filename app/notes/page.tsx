'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import { useNotesRealtime } from '@/hooks/useNotesRealtime';
import NotesList from '@/components/NotesList';
import NoteForm from '@/components/NoteForm';
import NoteModal from '@/components/NoteModal';
import { Note } from '@/types/note';

export default function NotesPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { notes, loading: notesLoading, addNote, editNote, removeNote, searchNotes } = useNotesRealtime(userId);

  // Handle browser back button and history management for modals
  useEffect(() => {
    const handlePopState = () => {
      // Close any open modal when back button is pressed
      if (selectedNote) {
        setSelectedNote(null);
        setViewMode(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedNote]);

  // Push history state when modal opens
  useEffect(() => {
    if (selectedNote && viewMode) {
      // Push a new history state when modal opens
      window.history.pushState({ modal: true }, '');
    }
  }, [selectedNote, viewMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleCreateNote = async (title: string, content: string, subject: string) => {
    if (!userId) return;
    
    setIsSubmitting(true);
    try {
      await addNote({
        title,
        content,
        subject,
        userId,
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditNote = async (noteId: string, title: string, content: string, subject: string) => {
    setIsSubmitting(true);
    try {
      await editNote(noteId, { title, content, subject });
      setSelectedNote(null);
      setViewMode(null);
    } catch (error) {
      console.error('Error editing note:', error);
      alert('Failed to update note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await removeNote(noteId);
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setViewMode('view');
  };

  const handleEditClick = (note: Note) => {
    setSelectedNote(note);
    setViewMode('edit');
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
    setViewMode(null);
    
    // Go back in history if we pushed a state for the modal
    if (window.history.state?.modal) {
      window.history.back();
    }
  };

  // Filter notes based on search
  const filteredNotes = searchTerm.trim() ? searchNotes(searchTerm) : notes;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="relative min-h-screen bg-[#050816] overflow-hidden lg:ml-72">
      {/* Background layers - matching dashboard */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0a0e27] to-[#0d1028] pointer-events-none" />
      
      {/* Radial depth layers */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 35%, transparent 70%)'
        }}
      />
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Enhanced Ambient Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-cyan-500/30 rounded-full blur-[140px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '10s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" 
           style={{ animationDuration: '12s', animationDelay: '2s' }} />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-10 sm:mb-16 animate-fade-in-up pt-12 lg:pt-0">
          <div className="relative">
            {/* Animated glow behind heading */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse pointer-events-none" 
                 style={{ animationDuration: '4s' }} />
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">Study Notes</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg font-medium">
                Create, organize, and access your notes anytime, anywhere
              </p>
            </div>
          </div>
        </div>

        {/* Search and Create Section */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes by title, content, or subject..."
                className="w-full px-5 py-3 pl-12 bg-blue-500/10 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Create button */}
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/25 whitespace-nowrap"
            >
              {showCreateForm ? 'Cancel' : '+ Create Note'}
            </button>
          </div>
        </div>

        {/* Create Note Form */}
        {showCreateForm && (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
              <div className="relative bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/5 rounded-3xl border-2 border-blue-400/30 backdrop-blur-2xl p-8 transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Note</h2>
                <NoteForm
                  onSubmit={handleCreateNote}
                  onCancel={() => setShowCreateForm(false)}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
          {notesLoading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading notes...</p>
            </div>
          ) : (
            <NotesList
              notes={filteredNotes}
              onEdit={handleEditClick}
              onDelete={handleDeleteNote}
              onView={handleViewNote}
            />
          )}
        </div>
      </div>
    </div>

      {/* Note Modal */}
      {selectedNote && viewMode && (
        <NoteModal
          note={selectedNote}
          onClose={handleCloseModal}
          onEdit={handleEditNote}
          isEditing={viewMode === 'edit'}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
