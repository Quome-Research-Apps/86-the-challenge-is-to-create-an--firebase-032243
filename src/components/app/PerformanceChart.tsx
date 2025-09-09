'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { PerformanceRecord, Flashcard } from '@/lib/types';
import { ChartTooltipContent } from '@/components/ui/chart';

interface PerformanceChartProps {
  performanceData: PerformanceRecord[];
  flashcards: Flashcard[];
}

export default function PerformanceChart({ performanceData, flashcards }: PerformanceChartProps) {
  const chartData = React.useMemo(() => {
    const aggregatedData: { [key: string]: { totalTime: number; count: number } } = {};

    performanceData.forEach(record => {
      if (!aggregatedData[record.cardId]) {
        aggregatedData[record.cardId] = { totalTime: 0, count: 0 };
      }
      aggregatedData[record.cardId].totalTime += record.reviewTime;
      aggregatedData[record.cardId].count += 1;
    });

    return Object.keys(aggregatedData).map(cardId => {
      const cardIndex = parseInt(cardId.split('-')[1]);
      const card = flashcards[cardIndex];
      const avgTime = aggregatedData[cardId].totalTime / aggregatedData[cardId].count;
      return {
        name: card ? card.front.substring(0, 20) + '...' : `Card ${cardId}`,
        "Average Time (ms)": Math.round(avgTime),
      };
    });
  }, [performanceData, flashcards]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Review Time Analysis</CardTitle>
        <CardDescription>Average time spent per flashcard. Longer times may indicate more difficult concepts.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={70} />
            <YAxis unit="ms" />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="Average Time (ms)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
