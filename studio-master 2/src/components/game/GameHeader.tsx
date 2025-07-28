'use client';
import { Badge } from "@/components/ui/badge";
import { User, BrainCircuit, Vote, Trophy } from "lucide-react";

type Player = {
    name: string;
    score: number;
};

interface GameHeaderProps {
    round: number;
    phase: 'replying' | 'voting' | 'results' | 'ended';
    players: Player[];
}

const phaseInfo = {
    replying: { text: "Reply Phase", icon: <BrainCircuit className="h-4 w-4" /> },
    voting: { text: "Voting Phase", icon: <Vote className="h-4 w-4" /> },
    results: { text: "Round Results", icon: <Trophy className="h-4 w-4" /> },
    ended: { text: "Game Over", icon: <Trophy className="h-4 w-4" /> },
};


export function GameHeader({ round, phase, players }: GameHeaderProps) {
    const { text, icon } = phaseInfo[phase];

    return (
        <header className="w-full max-w-6xl p-4 bg-card rounded-xl shadow-md border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Round</p>
                        <p className="font-bold font-headline text-2xl text-primary">{round}<span className="text-sm text-muted-foreground">/10</span></p>
                    </div>
                    <div className="h-10 w-px bg-border hidden sm:block" />
                    <div className="flex items-center gap-2">
                         {icon}
                        <p className="font-semibold text-lg">{text}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {players.map(player => (
                        <Badge key={player.name} variant="secondary" className="flex items-center gap-2 p-2 whitespace-nowrap">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium">{player.name}</span>
                            <span className="font-mono font-bold">{player.score}</span>
                        </Badge>
                    ))}
                </div>
            </div>
        </header>
    );
}
