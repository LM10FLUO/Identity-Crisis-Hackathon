import { ActionButtons } from '@/components/home/action-buttons';
import { Gamepad2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-8">
      <div className="flex flex-col items-center text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-6 border-2 border-primary/20">
          <Gamepad2 className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary-foreground mb-4">
          Doppelganger Duel
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground mb-8">
          Can you tell the difference between a human and their AI doppelganger? Enter a room, answer prompts, and vote on which replies are genuine.
        </p>
        <ActionButtons />
      </div>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Powered by Google's Gemini AI
      </footer>
    </main>
  );
}
