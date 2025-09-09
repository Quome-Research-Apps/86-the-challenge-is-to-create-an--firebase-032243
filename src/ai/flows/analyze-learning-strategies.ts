// This is an auto-generated file from Firebase Studio.
'use server';

/**
 * @fileOverview Analyzes the user's performance data from the SRS simulation and provides personalized recommendations on how to improve their learning strategies.
 *
 * - analyzeLearningStrategies - A function that analyzes the learning strategies.
 * - AnalyzeLearningStrategiesInput - The input type for the analyzeLearningStrategies function.
 * - AnalyzeLearningStrategiesOutput - The return type for the analyzeLearningStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLearningStrategiesInputSchema = z.object({
  flashcardDifficulty: z.record(z.number()).describe('A map of flashcard IDs to their difficulty scores.'),
  reviewTimings: z.record(z.array(z.number())).describe('A map of flashcard IDs to an array of review timings in seconds.'),
});
export type AnalyzeLearningStrategiesInput = z.infer<typeof AnalyzeLearningStrategiesInputSchema>;

const AnalyzeLearningStrategiesOutputSchema = z.object({
  insights: z.string().describe('Personalized recommendations on how to improve learning strategies based on the performance data.'),
});
export type AnalyzeLearningStrategiesOutput = z.infer<typeof AnalyzeLearningStrategiesOutputSchema>;

export async function analyzeLearningStrategies(input: AnalyzeLearningStrategiesInput): Promise<AnalyzeLearningStrategiesOutput> {
  return analyzeLearningStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeLearningStrategiesPrompt',
  input: {schema: AnalyzeLearningStrategiesInputSchema},
  output: {schema: AnalyzeLearningStrategiesOutputSchema},
  prompt: `You are an expert learning strategist. Analyze the user's flashcard performance data and provide personalized recommendations on how to improve their learning strategies.

Flashcard Difficulty: {{{JSON.stringify(flashcardDifficulty)}}}
Review Timings: {{{JSON.stringify(reviewTimings)}}}

Based on this data, what specific recommendations can you give the user to optimize their study habits? Focus on actionable advice related to memory techniques, time management, and understanding complex topics.
`,
});

const analyzeLearningStrategiesFlow = ai.defineFlow(
  {
    name: 'analyzeLearningStrategiesFlow',
    inputSchema: AnalyzeLearningStrategiesInputSchema,
    outputSchema: AnalyzeLearningStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
