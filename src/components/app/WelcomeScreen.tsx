'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import { createFlashcards } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard } from '@/lib/types';

interface WelcomeScreenProps {
  onStartSession: (cards: Flashcard[]) => void;
}

const initialState = {
  error: '',
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Generating...' : 'Start Simulation'}
    </Button>
  );
}

export default function WelcomeScreen({ onStartSession }: WelcomeScreenProps) {
  const [state, formAction] = useFormState(createFlashcards, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
    if (state.data) {
      onStartSession(state.data);
    }
  }, [state, onStartSession, toast]);

  return (
    <div className="animate-in fade-in-0 zoom-in-95 duration-500">
      <Card className="w-full">
        <CardHeader className="items-center text-center">
          <Logo />
          <CardTitle className="font-headline text-3xl pt-2">Welcome to the MetaLearn Simulator</CardTitle>
          <CardDescription className="max-w-prose">
            Experience the science of learning firsthand. Enter a topic you want to study, and our AI will generate a small set of flashcards. Then, we'll simulate a Spaced Repetition System (SRS) session to show you how adaptive learning works.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Study Topic</Label>
              <Input
                id="topic"
                name="topic"
                placeholder="e.g., 'Photosynthesis', 'Roman History', 'React Hooks'"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
