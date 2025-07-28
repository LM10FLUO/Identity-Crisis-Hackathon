'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Crown, Trophy } from 'lucide-react';

const mockFinalScores = [
  { rank: 1, name: 'CoolCat', score: 1250 },
  { rank: 2, name: 'You', score: 980 },
  { rank: 3, name: 'PlayerOne', score: 760 },
];

export default function ResultsPage() {
    const router = useRouter();
    const params = useParams();
    const winner = mockFinalScores[0];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-slate-900/70">
            <Card className="w-full max-w-2xl text-center animate-fade-in">
                <CardHeader>
                    <div className="flex flex-col items-center">
                        <Trophy className="h-16 w-16 text-yellow-400 mb-4" />
                        <CardTitle className="font-headline text-4xl">Game Over!</CardTitle>
                        <CardDescription className="text-lg mt-2">Final Leaderboard</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-center p-6 bg-primary/10 rounded-lg mb-6 border border-primary/20">
                        <p className="text-sm uppercase text-primary font-semibold tracking-wider">Winner</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <Crown className="h-8 w-8 text-yellow-400" />
                            <p className="text-3xl font-bold font-headline">{winner.name}</p>
                        </div>
                        <p className="text-xl text-muted-foreground">{winner.score} points</p>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Rank</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockFinalScores.map(player => (
                                <TableRow key={player.rank} className={player.rank === 1 ? 'bg-primary/20 hover:bg-primary/30' : ''}>
                                    <TableCell className="font-bold text-lg">{player.rank}</TableCell>
                                    <TableCell className="text-left font-medium">{player.name}</TableCell>
                                    <TableCell className="text-right font-mono text-lg">{player.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push('/')} className="w-full" size="lg">
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
