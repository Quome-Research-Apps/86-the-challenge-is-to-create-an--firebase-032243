import type { SrsFlashcard } from './types';

export const RATING_MAP: { [key: string]: number } = {
  hard: 1,
  good: 3,
  easy: 5,
};

const MIN_EASE_FACTOR = 1.3;
const MINUTE_IN_MS = 60 * 1000;

export function updateSrsCard(card: SrsFlashcard, quality: number): SrsFlashcard {
  if (quality < 3) {
    // If recall was poor, reset progress and review again soon.
    return {
      ...card,
      repetition: 0,
      interval: 1, // review in 1 minute
      dueDate: Date.now() + MINUTE_IN_MS,
    };
  }

  // Calculate new ease factor based on performance
  let newEaseFactor = card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < MIN_EASE_FACTOR) newEaseFactor = MIN_EASE_FACTOR;

  let newInterval: number;
  const newRepetition = card.repetition + 1;

  if (newRepetition === 1) {
    newInterval = 1; // 1 min
  } else if (newRepetition === 2) {
    newInterval = 5; // 5 mins
  } else {
    // Subsequent intervals increase based on the last interval and ease factor
    newInterval = Math.ceil(card.interval * newEaseFactor);
  }

  const newDueDate = Date.now() + newInterval * MINUTE_IN_MS;

  return {
    ...card,
    repetition: newRepetition,
    easeFactor: newEaseFactor,
    interval: newInterval,
    dueDate: newDueDate,
  };
}

export function getNextCardToReview(deck: SrsFlashcard[]): SrsFlashcard | null {
  if (!deck || deck.length === 0) {
    return null;
  }
  // In this simulation, we always want to show a card.
  // We'll pick the one with the earliest due date, even if it's in the future,
  // effectively "fast-forwarding" time for the user.
  return [...deck].sort((a, b) => a.dueDate - b.dueDate)[0];
}
