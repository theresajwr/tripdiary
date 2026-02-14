
export enum Mood {
  EXCITED = '🤩',
  HAPPY = '😊',
  NEUTRAL = '😐',
  SAD = '😔',
  ANGRY = '😡'
}

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: Mood;
  image?: string; // Base64 string
  createdAt: number;
}

export interface MoodConfig {
  label: string;
  color: string;
  bgColor: string;
}

export const MoodMap: Record<Mood, MoodConfig> = {
  [Mood.EXCITED]: { label: 'Excited', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  [Mood.HAPPY]: { label: 'Happy', color: 'text-green-600', bgColor: 'bg-green-100' },
  [Mood.NEUTRAL]: { label: 'Neutral', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  [Mood.SAD]: { label: 'Sad', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  [Mood.ANGRY]: { label: 'Angry', color: 'text-red-600', bgColor: 'bg-red-100' },
};
