'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getNextCardToReview, updateSrsCard, RATING_MAP } from '@/lib/srs';
import type { Flashcard, PerformanceRecord, SrsFlashcard } from '@/lib/types';
import FlashcardComponent from './Flashcard';

interface StudySessionProps {
  initialCards: Flashcard[];
  onEndSession: (records: PerformanceRecord[], finalDeck: SrsFlashcard[]) => void;
}

export default function StudySession({ initialCards, onEndSession }: StudySessionProps) {
  const initialDeck = useMemo(() => initialCards.map((card, index) => ({
    ...card,
    id: `card-${index}`,
    repetition: 0,
    easeFactor: 2.5,
    interval: 0,
    dueDate: Date.now(),
  })), [initialCards]);

  const [deck, setDeck] = useState<SrsFlashcard[]>(initialDeck);
  const [currentCard, setCurrentCard] = useState<SrsFlashcard | null>(null);
  const [performanceRecords, setPerformanceRecords] = useState<PerformanceRecord[]>([]);
  const [cardStartTime, setCardStartTime] = useState<number>(0);
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    const nextCard = getNextCardToReview(deck);
    setCurrentCard(nextCard);
    setCardStartTime(Date.now());
  }, [deck]);

  const handleReview = (cardId: string, rating: keyof typeof RATING_MAP) => {
    const quality = RATING_MAP[rating];
    const reviewTime = Date.now() - cardStartTime;
    const cardToUpdate = deck.find((c) => c.id === cardId);

    if (cardToUpdate) {
      const updatedCard = updateSrsCard(cardToUpdate, quality);

      setDeck(deck.map((c) => (c.id === cardId ? updatedCard : c)));
      setPerformanceRecords([...performanceRecords, { cardId, quality, reviewTime, timestamp: Date.now() }]);
      setReviewedCount(prev => prev + 1);
    }
  };

  const sessionProgress = (reviewedCount / (initialCards.length * 3)) * 100; // rough goal of 3 reviews per card

  if (!currentCard) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Session...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in-0 duration-500">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Session Progress</span>
          <span>{reviewedCount} cards reviewed</span>
        </div>
        <Progress value={sessionProgress} />
      </div>

      <FlashcardComponent key={currentCard.id} card={currentCard} onReview={handleReview} />
      
      <div className="flex justify-end">
        <Button onClick={() => onEndSession(performanceRecords, deck)} variant="outline">
          End Session & See Results
        </Button>
      </div>
    </div>
  );
}
