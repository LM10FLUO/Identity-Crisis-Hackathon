'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ReplyPhase } from '@/components/game/ReplyPhase';
import { VotingPhase } from '@/components/game/VotingPhase';
import { RoundResults } from '@/components/game/RoundResults';
import { GameHeader } from '@/components/game/GameHeader';
import { CountdownTimer } from '@/components/game/CountdownTimer';

type GamePhase = 'replying' | 'voting' | 'results' | 'ended';

const mockQuestions = [
  "What's a small thing that makes you happy?",
  "If you could have any superpower, what would it be and why?",
  "What's the weirdest food you've ever eaten?",
  "Describe your perfect day.",
  "What's a movie you can watch over and over again?",
  "If you were an animal, what would you be?",
  "What's the best piece of advice you've ever received?",
  "What's something you're surprisingly good at?",
  "What's your go-to karaoke song?",
  "If you could travel anywhere in time, where would you go?",
];

type Player = {
  name: string;
  score: number;
};

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const roomId = params.roomId as string;
  const username = searchParams.get('username') || 'Player';

  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState<GamePhase>('replying');
  const [players, setPlayers] = useState<Player[]>([
      { name: username, score: 0 },
      { name: 'AI_Host', score: 0 },
      { name: 'CoolCat', score: 0 },
  ]);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const advancePhase = useCallback(() => {
    setPhase(currentPhase => {
        if(currentPhase === 'replying') return 'voting';
        if(currentPhase === 'voting') return 'results';
        if(currentPhase === 'results') {
            if (round < 10) {
                setRound(r => r + 1);
                // Simulate score update
                setPlayers(p => p.map(player => ({...player, score: player.score + Math.floor(Math.random() * 50)})));
                return 'replying';
            }
            return 'ended';
        }
        return currentPhase;
    });
  }, [round]);

  useEffect(() => {
    if (phase === 'replying') {
      setCurrentPrompt(mockQuestions[round - 1] || 'No more questions!');
    }
    if (phase === 'ended') {
      router.push(`/results/${roomId}`);
    }
  }, [phase, round, router, roomId]);

  const handleReplySubmit = (original: string, rephrased: string) => {
    console.log(`Submitted answer: ${original}, Rephrased: ${rephrased}`);
    advancePhase();
  };
  
  const handleVoteComplete = () => {
    advancePhase();
  }

  const handleResultsComplete = () => {
    advancePhase();
  }


  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8">
      <GameHeader round={round} phase={phase} players={players} />
      <main className="w-full max-w-6xl flex-grow flex flex-col items-center justify-center mt-8">
        {phase === 'replying' && (
          <ReplyPhase prompt={currentPrompt} onReplySubmit={handleReplySubmit} />
        )}
        {phase === 'voting' && <VotingPhase onVoteComplete={handleVoteComplete} />}
        {phase === 'results' && 
            <div className="w-full flex items-center justify-center">
                <RoundResults />
                {/* This is a trick to advance after the animation */}
                <CountdownTimer duration={5} onComplete={handleResultsComplete} size={0} />
            </div>
        }
      </main>
    </div>
  );
}
