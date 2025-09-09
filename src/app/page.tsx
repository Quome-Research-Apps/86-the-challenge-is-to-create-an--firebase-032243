'use client';

import { useState } from 'react';
import type { AppState, Flashcard as FlashcardType, PerformanceRecord, SrsFlashcard } from '@/lib/types';
import WelcomeScreen from '@/components/app/WelcomeScreen';
import StudySession from '@/components/app/StudySession';
import ResultsDashboard from '@/components/app/ResultsDashboard';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceRecord[]>([]);
  const [finalDeck, setFinalDeck] = useState<SrsFlashcard[]>([]);

  const handleStartSession = (cards: FlashcardType[]) => {
    setFlashcards(cards);
    setPerformanceData([]);
    setFinalDeck([]);
    setAppState('studying');
  };

  const handleEndSession = (records: PerformanceRecord[], deck: SrsFlashcard[]) => {
    setPerformanceData(records);
    setFinalDeck(deck);
    setAppState('results');
  };

  const handleReset = () => {
    setFlashcards([]);
    setPerformanceData([]);
    setFinalDeck([]);
    setAppState('welcome');
  };

  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {appState === 'welcome' && <WelcomeScreen onStartSession={handleStartSession} />}
        {appState === 'studying' && <StudySession initialCards={flashcards} onEndSession={handleEndSession} />}
        {appState === 'results' && (
          <ResultsDashboard
            performanceData={performanceData}
            flashcards={flashcards}
            finalDeck={finalDeck}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
