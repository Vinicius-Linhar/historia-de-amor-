export interface TimeCounter {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  category: 'memories' | 'funny' | 'calls' | 'travel';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  description: string;
  embedUrl?: string; // Optional Spotify/Youtube embed URL
}