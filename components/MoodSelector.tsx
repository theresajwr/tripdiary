
import React from 'react';
import { Mood, MoodMap } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood;
  onSelect: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">How are you feeling?</span>
      <div className="flex gap-2">
        {Object.values(Mood).map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => onSelect(mood)}
            className={`text-2xl p-2 rounded-xl transition-all duration-200 transform hover:scale-110 ${
              selectedMood === mood 
                ? `${MoodMap[mood].bgColor} ring-2 ring-indigo-400 scale-110` 
                : 'hover:bg-slate-50'
            }`}
            title={MoodMap[mood].label}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};
