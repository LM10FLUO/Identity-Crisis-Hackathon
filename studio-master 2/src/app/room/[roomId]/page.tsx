'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, CheckCircle, Hourglass, Copy, PartyPopper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

type Player = {
  id: number;
  name: string;
  isReady: boolean;
  isHost: boolean;
};

export default function WaitingRoomPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const roomId = (params.roomId as string)?.toUpperCase();
  const username = searchParams.get('username') || 'Player';

  const [players, setPlayers] = useState<Player[]>([]);
  const [isCurrentUserReady, setCurrentUserReady] = useState(false);

  useEffect(() => {
    // In a real app, you'd subscribe to a real-time database (e.g., Firestore)
    // Here we simulate players joining and the current user's entry
    const initialPlayers: Player[] = [
      { id: 1, name: 'AI_Host', isReady: true, isHost: true },
      { id: 2, name: 'CoolCat', isReady: true, isHost: false },
    ];
    
    const currentUser: Player = { id: Date.now(), name: username, isReady: isCurrentUserReady, isHost: false };
    
    setPlayers([...initialPlayers, currentUser]);
  }, [isCurrentUserReady, username]);


  useEffect(() => {
    const allReady = players.length >= 2 && players.every(p => p.isReady);
    if (allReady) {
      const timeoutId = setTimeout(() => {
        router.push(`/game/${roomId}?username=${encodeURIComponent(username)}`);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [players, router, roomId, username]);

  const handleReadyClick = () => {
    setCurrentUserReady(prev => !prev);
  };
  
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: 'Copied!',
      description: 'Room code copied to clipboard.',
    });
  };

  const readyCount = players.filter(p => p.isReady).length;
  const totalPlayers = players.length;
  const allReady = totalPlayers >= 2 && readyCount === totalPlayers;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-3xl">Waiting Room</CardTitle>
              <CardDescription>Share the code with your friends to join.</CardDescription>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary cursor-pointer" onClick={copyRoomCode}>
                <span className="text-2xl font-bold font-mono tracking-widest text-secondary-foreground">
                    {roomId}
                </span>
                <Copy className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <p>Players in room</p>
              <p>Ready: {readyCount} / {totalPlayers}</p>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto p-1">
              {players.map(player => (
                <div key={player.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <span className="font-medium">{player.name} {player.name === username ? '(You)' : ''}</span>
                    {player.isHost && <Badge variant="outline">Host</Badge>}
                  </div>
                  {player.isReady ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span>Ready</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-400">
                        <Hourglass className="h-5 w-5" />
                        <span>Waiting</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex flex-col items-center gap-4 pt-4">
              {allReady ? (
                <div className="text-center p-4">
                    <PartyPopper className="h-12 w-12 text-primary mx-auto animate-bounce" />
                    <p className="text-lg font-medium text-primary mt-2">All players are ready! Starting game...</p>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleReadyClick}
                    size="lg"
                    className={`w-full font-bold transition-all ${isCurrentUserReady ? 'bg-destructive hover:bg-destructive/90' : 'bg-accent text-accent-foreground hover:bg-accent/90'}`}
                  >
                    {isCurrentUserReady ? 'Not Ready' : 'I am Ready!'}
                  </Button>
                  <p className="text-xs text-muted-foreground">The game will start automatically when everyone is ready.</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
