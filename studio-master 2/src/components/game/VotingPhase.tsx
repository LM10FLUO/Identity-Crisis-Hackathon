'use client';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit, User } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

type Answer = {
  id: string;
  text: string;
};

const mockAnswers: Answer[] = [
    { id: '1a', text: "My perfect day involves a long hike in the mountains, followed by a good book and a cup of tea." },
    { id: '1b', text: "The ideal day for me includes a lengthy trek through hilly terrain, concluding with an enjoyable novel and a warm beverage." },
    { id: '2a', text: "I'd want the power to talk to animals. It would be amazing to hear their stories." },
    { id: '2b', text: "The ability to communicate with animals would be my choice of superpower. Hearing their tales would be incredible." },
    { id: '3a', text: "The weirdest thing I've eaten is probably fried scorpion. It was surprisingly crunchy." },
    { id: '3b', text: "Fried scorpion is likely the strangest food I've ever consumed. It had an unexpectedly crisp texture." },
];

interface VotingPhaseProps {
    onVoteComplete: () => void;
}

export function VotingPhase({ onVoteComplete }: VotingPhaseProps) {
  const [votes, setVotes] = useState<Record<string, 'human' | 'ai' | null>>({});
  const shuffledAnswers = useMemo(() => [...mockAnswers].sort(() => Math.random() - 0.5), []);
  
  const handleVote = (answerId: string, vote: 'human' | 'ai') => {
    setVotes(prev => ({ ...prev, [answerId]: vote }));
  };

  const allVoted = useMemo(() => {
    return shuffledAnswers.every(answer => votes[answer.id] != null);
  }, [votes, shuffledAnswers]);

  useEffect(() => {
    if (allVoted) {
      const timer = setTimeout(onVoteComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [allVoted, onVoteComplete]);


  return (
    <div className="w-full max-w-4xl animate-fade-in">
        <div className="flex justify-center mb-4">
            <CountdownTimer duration={30} onComplete={onVoteComplete} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shuffledAnswers.map(answer => (
            <Card key={answer.id} className="flex flex-col">
            <CardContent className="p-4 flex-grow">
                <p className="text-muted-foreground">{answer.text}</p>
            </CardContent>
            <div className="flex border-t p-2 gap-2">
                <Button 
                    onClick={() => handleVote(answer.id, 'human')} 
                    variant={votes[answer.id] === 'human' ? 'default' : 'outline'}
                    className="w-full"
                >
                    <User className="mr-2 h-4 w-4" /> Human
                </Button>
                <Button 
                    onClick={() => handleVote(answer.id, 'ai')}
                    variant={votes[answer.id] === 'ai' ? 'default' : 'outline'}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 data-[variant=outline]:bg-transparent data-[variant=outline]:text-accent data-[variant=outline]:border-accent"
                >
                    <BrainCircuit className="mr-2 h-4 w-4" /> AI
                </Button>
            </div>
            </Card>
        ))}
        </div>
    </div>
  );
}
