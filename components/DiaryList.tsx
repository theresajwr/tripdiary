
import React from 'react';
import { DiaryEntry, MoodMap } from '../types';

interface DiaryListProps {
  entries: DiaryEntry[];
  onDelete: (id: string) => void;
}

export const DiaryList: React.FC<DiaryListProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">✍️</div>
        <h3 className="text-xl font-medium text-slate-400">Your diary is empty. Start writing today.</h3>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
      {entries.map((entry) => (
        <article key={entry.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow duration-300">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-1">{entry.date}</p>
                <h2 className="text-2xl font-serif font-bold text-slate-800">{entry.title}</h2>
              </div>
              <div className={`text-3xl p-3 rounded-2xl ${MoodMap[entry.mood].bgColor}`}>
                {entry.mood}
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">{entry.content}</p>

            {entry.image && (
              <img 
                src={entry.image} 
                alt={entry.title} 
                className="w-full h-80 object-cover rounded-2xl mb-6"
              />
            )}

            <div className="flex justify-end">
              <button 
                onClick={() => onDelete(entry.id)}
                className="text-slate-300 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete Entry
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
