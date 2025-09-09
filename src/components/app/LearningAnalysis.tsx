'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeLearningStrategies } from '@/ai/flows/analyze-learning-strategies';
import type { AnalyzeLearningStrategiesInput } from '@/ai/flows/analyze-learning-strategies';
import { Lightbulb } from 'lucide-react';

interface LearningAnalysisProps {
  input: AnalyzeLearningStrategiesInput;
}

export default function LearningAnalysis({ input }: LearningAnalysisProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAnalysis() {
      if (!input.flashcardDifficulty || Object.keys(input.flashcardDifficulty).length === 0) {
        setAnalysis("Not enough data for an analysis. Complete more reviews next time!");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await analyzeLearningStrategies(input);
        setAnalysis(result.insights);
        setError(null);
      } catch (e) {
        console.error(e);
        setError('Could not generate learning analysis at this time.');
      } finally {
        setLoading(false);
      }
    }
    getAnalysis();
  }, [input]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-accent" />
            AI Learning Coach
        </CardTitle>
        <CardDescription>Personalized feedback on your study patterns from this session.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : error ? (
            <p className="text-destructive">{error}</p>
        ) : (
          <p className="text-sm whitespace-pre-wrap font-body">{analysis}</p>
        )}
      </CardContent>
    </Card>
  );
}
