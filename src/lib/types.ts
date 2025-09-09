export interface Flashcard {
  front: string;
  back: string;
}

export interface SrsFlashcard extends Flashcard {
  id: string;
  repetition: number;
  easeFactor: number;
  interval: number; // in "minutes" for the simulation
  dueDate: number; // timestamp
}

export interface PerformanceRecord {
  cardId: string;
  reviewTime: number; // in milliseconds
  quality: number; // 1 (hard) to 5 (easy)
  timestamp: number;
}

export type AppState = 'welcome' | 'studying' | 'results';
