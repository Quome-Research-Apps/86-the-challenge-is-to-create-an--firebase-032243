'use server';

/**
 * @fileOverview Flashcard generation flow.
 *
 * - generateFlashcardsFromTopic - A function that generates a set of flashcards from a given topic.
 * - GenerateFlashcardsFromTopicInput - The input type for the generateFlashcardsFromTopic function.
 * - GenerateFlashcardsFromTopicOutput - The return type for the generateFlashcardsFromTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsFromTopicInputSchema = z.object({
  topic: z.string().describe('The topic to generate flashcards for.'),
});

export type GenerateFlashcardsFromTopicInput = z.infer<
  typeof GenerateFlashcardsFromTopicInputSchema
>;

const GenerateFlashcardsFromTopicOutputSchema = z.array(
  z.object({
    front: z.string().describe('The front of the flashcard.'),
    back: z.string().describe('The back of the flashcard.'),
  })
);

export type GenerateFlashcardsFromTopicOutput = z.infer<
  typeof GenerateFlashcardsFromTopicOutputSchema
>;

export async function generateFlashcardsFromTopic(
  input: GenerateFlashcardsFromTopicInput
): Promise<GenerateFlashcardsFromTopicOutput> {
  return generateFlashcardsFromTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardsFromTopicPrompt',
  input: {schema: GenerateFlashcardsFromTopicInputSchema},
  output: {schema: GenerateFlashcardsFromTopicOutputSchema},
  prompt: `You are an expert educator. Generate a set of flashcards for the following topic:

{{topic}}

Each flashcard should have a front and a back. The front should contain a question or concept, and the back should contain the answer or explanation.

Return a JSON array of flashcards. Each flashcard should have a \"front\" and \"back\" field.

Example:

[
  {
    "front": "What is the capital of France?",
    "back": "Paris"
  },
  {
    "front": "What is the formula for water?",
    "back": "H2O"
  }
]
`,
});

const generateFlashcardsFromTopicFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFromTopicFlow',
    inputSchema: GenerateFlashcardsFromTopicInputSchema,
    outputSchema: GenerateFlashcardsFromTopicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
