'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CreateRoomForm } from './create-room-form';
import { JoinRoomForm } from './join-room-form';
import { useToast } from '@/hooks/use-toast';

export function ActionButtons() {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isJoinOpen, setJoinOpen] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [searchParams, toast]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={() => setCreateOpen(true)} className="font-bold text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 transition-transform hover:scale-105">
          Create Room
        </Button>
        <Button size="lg" variant="outline" onClick={() => setJoinOpen(true)} className="font-bold text-lg px-8 py-6 shadow-lg shadow-black/20 transition-transform hover:scale-105">
          Join Room
        </Button>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Create a New Game Room</DialogTitle>
            <DialogDescription>
              Choose a username to get started. We'll generate a unique room code for you to share.
            </DialogDescription>
          </DialogHeader>
          <CreateRoomForm />
        </DialogContent>
      </Dialog>

      <Dialog open={isJoinOpen} onOpenChange={setJoinOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Join an Existing Room</DialogTitle>
            <DialogDescription>
              Enter your username and the room code from your friend.
            </DialogDescription>
          </DialogHeader>
          <JoinRoomForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
