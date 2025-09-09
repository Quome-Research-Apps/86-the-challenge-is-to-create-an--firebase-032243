'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { SrsFlashcard } from '@/lib/types';
import { RATING_MAP } from '@/lib/srs';

interface FlashcardProps {
  card: SrsFlashcard;
  onReview: (cardId: string, rating: keyof typeof RATING_MAP) => void;
}

export default function FlashcardComponent({ card, onReview }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsFlipped(true);
    setTimeout(() => setIsRevealed(true), 150); // half-way through animation
  };

  const handleRating = (rating: keyof typeof RATING_MAP) => {
    setIsFlipped(false);
    setIsRevealed(false);
    // Let the card flip back before calling onReview to show next card
    setTimeout(() => onReview(card.id, rating), 300);
  };

  return (
    <div className="perspective-1000">
      <div
        className={cn(
          "relative w-full h-80 transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <Card className="flex h-full w-full flex-col items-center justify-center text-center p-6">
            <CardContent className="p-0">
              <p className="text-2xl font-semibold font-body">{card.front}</p>
            </CardContent>
            <div className="absolute bottom-6">
              <Button onClick={handleReveal}>Reveal Answer</Button>
            </div>
          </Card>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <Card className="flex h-full w-full flex-col items-center justify-between p-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm font-headline">Answer</p>
              <p className="text-2xl font-semibold font-body">{card.back}</p>
            </div>
            <div className={cn("flex flex-col sm:flex-row gap-4 transition-opacity duration-300 w-full justify-center", isRevealed ? "opacity-100" : "opacity-0")}>
              <h3 className="w-full text-center text-muted-foreground font-headline">How well did you remember?</h3>
              <div className="flex w-full justify-around gap-2">
                <Button variant="destructive" onClick={() => handleRating('hard')} className="flex-1">Hard</Button>
                <Button variant="outline" onClick={() => handleRating('good')} className="flex-1">Good</Button>
                <Button variant="default" onClick={() => handleRating('easy')} className="flex-1 bg-green-600 hover:bg-green-700">Easy</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
}
