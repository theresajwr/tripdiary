
import React, { useState, useEffect } from 'react';
import { DiaryEntry, Mood } from './types';
import { EntryForm } from './components/EntryForm';
import { DiaryList } from './components/DiaryList';

const STORAGE_KEY = 'tripdiary_entries';

const App: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<Mood | 'all'>('all');

  // Load entries on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load entries", e);
      }
    }
  }, []);

  // Save entries when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry: DiaryEntry) => {
    setEntries([entry, ...entries]);
    setIsAdding(false);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this memory?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const filteredEntries = filter === 'all' 
    ? entries 
    : entries.filter(e => e.mood === filter);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <h1 className="text-2xl font-serif font-bold text-slate-900">TripDiary</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              className="bg-slate-50 border-none rounded-full px-4 py-2 text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-100"
              value={filter}
              onChange={(e) => setFilter(e.target.value as Mood | 'all')}
            >
              <option value="all">All Moods</option>
              {Object.values(Mood).map(m => (
                <option key={m} value={m}>{m} Filter</option>
              ))}
            </select>
            
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-slate-200"
            >
              New Entry
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12">
        {isAdding ? (
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">Reflect on your day...</h2>
            <EntryForm onAddEntry={handleAddEntry} onCancel={() => setIsAdding(false)} />
          </div>
        ) : (
          <div className="space-y-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4 italic">Hello, Beautiful Soul.</h2>
              <p className="text-slate-400">You have {entries.length} memories stored in your private garden.</p>
            </div>
            
            <DiaryList 
              entries={filteredEntries} 
              onDelete={handleDeleteEntry} 
            />
          </div>
        )}
      </main>

      {/* Footer / Floating Button (Mobile) */}
      {!isAdding && (
        <button 
          onClick={() => setIsAdding(true)}
          className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl hover:bg-indigo-700 transition-all z-20"
        >
          +
        </button>
      )}
    </div>
  );
};

export default App;
