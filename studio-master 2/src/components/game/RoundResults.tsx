'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Award } from 'lucide-react';

export function RoundResults() {
  // In a real app, this data would be passed as props based on the round's outcome.
  const pointsEarned = 150;
  const isCorrect = true;

  return (
    <Card className="w-full max-w-md animate-fade-in text-center">
      <CardHeader>
        <div className="mx-auto w-fit mb-4">
            {isCorrect ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
                <XCircle className="h-16 w-16 text-destructive" />
            )}
        </div>
        <CardTitle className="font-headline text-3xl">Round Over!</CardTitle>
        <CardDescription>
          {isCorrect ? "You fooled them!" : "They saw through the deception!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-2 p-4 bg-secondary rounded-lg">
            <Award className="h-8 w-8 text-primary" />
            <p className="text-2xl font-bold">
                +{pointsEarned} <span className="text-lg font-medium text-muted-foreground">points</span>
            </p>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Next round starting soon...
        </p>
      </CardContent>
    </Card>
  );
}
