'use server';

import { generateFlashcardsFromTopic } from '@/ai/flows/generate-flashcards-from-topic';
import { z } from 'zod';

const TopicSchema = z.string().min(3, { message: 'Topic must be at least 3 characters long.' }).max(100);

export async function createFlashcards(prevState: any, formData: FormData) {
  const topic = formData.get('topic');

  const validatedTopic = TopicSchema.safeParse(topic);

  if (!validatedTopic.success) {
    return {
      error: validatedTopic.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const flashcards = await generateFlashcardsFromTopic({ topic: validatedTopic.data });
    if (!flashcards || flashcards.length === 0) {
      return { error: 'Could not generate flashcards for this topic. Please try another.' };
    }
    return { data: flashcards };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
