'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PerformanceRecord, Flashcard, SrsFlashcard } from '@/lib/types';
import PerformanceChart from './PerformanceChart';
import LearningAnalysis from './LearningAnalysis';
import { ArrowLeft } from 'lucide-react';

interface ResultsDashboardProps {
  performanceData: PerformanceRecord[];
  flashcards: Flashcard[];
  finalDeck: SrsFlashcard[];
  onReset: () => void;
}

export default function ResultsDashboard({ performanceData, flashcards, finalDeck, onReset }: ResultsDashboardProps) {

  const analysisInput = React.useMemo(() => {
    const reviewTimings: Record<string, number[]> = {};
    const flashcardDifficulty: Record<string, number> = {};

    performanceData.forEach(record => {
      if (!reviewTimings[record.cardId]) {
        reviewTimings[record.cardId] = [];
      }
      reviewTimings[record.cardId].push(record.reviewTime);
    });

    finalDeck.forEach(card => {
        // Difficulty is inversely related to the ease factor.
        // A standard ease factor is 2.5. We scale it to be a more intuitive number.
        flashcardDifficulty[card.id] = Math.max(0, 2.5 - card.easeFactor);
    });
    
    return { reviewTimings, flashcardDifficulty };
  }, [performanceData, finalDeck]);

  return (
    <div className="space-y-6 w-full animate-in fade-in-0 duration-500">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Session Results</CardTitle>
          <CardDescription>
            Here's a breakdown of your performance during the simulation.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart performanceData={performanceData} flashcards={flashcards} />
        <LearningAnalysis input={analysisInput} />
      </div>

      <div className="flex justify-center">
        <Button onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Start New Simulation
        </Button>
      </div>
    </div>
  );
}
