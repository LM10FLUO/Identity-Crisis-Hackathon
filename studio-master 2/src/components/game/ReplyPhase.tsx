'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CountdownTimer } from './CountdownTimer';
import { Loader2 } from 'lucide-react';
import { rephraseAnswer } from '@/ai/flows/rephrase-answer';

interface ReplyPhaseProps {
  prompt: string;
  onReplySubmit: (original: string, rephrased: string) => void;
}

export function ReplyPhase({ prompt, onReplySubmit }: ReplyPhaseProps) {
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim() && !isLoading) {
      setIsLoading(true);
      try {
        const result = await rephraseAnswer({ answer: reply });
        onReplySubmit(reply, result.rephrasedAnswer);
      } catch (error) {
        console.error("AI rephrasing failed:", error);
        // Fallback: submit original answer twice if AI fails
        onReplySubmit(reply, `${reply} (rephrased)`);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleTimeout = () => {
    onReplySubmit("", "");
  }

  return (
    <Card className="w-full max-w-2xl animate-fade-in shadow-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
          <CardTitle className="font-headline text-3xl">Your Prompt</CardTitle>
          <CountdownTimer duration={30} onComplete={handleTimeout} />
        </div>
        <CardDescription className="text-lg pt-2 leading-relaxed">{prompt}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
            <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your most human-like answer here..."
                className="min-h-[120px] text-base"
                aria-label="Your answer"
                disabled={isLoading}
            />
        </CardContent>
        <CardFooter>
            <Button type="submit" className="w-full" size="lg" disabled={!reply.trim() || isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : "Submit Reply"}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
