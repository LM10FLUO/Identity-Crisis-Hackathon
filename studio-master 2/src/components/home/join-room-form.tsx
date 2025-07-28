'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { joinRoom } from '@/lib/actions';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Join Room
        </Button>
    );
}

export function JoinRoomForm() {
    return (
        <form action={joinRoom} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username-join" className="text-right">
                    Username
                </Label>
                <Input
                    id="username-join"
                    name="username"
                    className="col-span-3"
                    placeholder="Your unique name"
                    required
                    minLength={2}
                    maxLength={15}
                    autoComplete="off"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomCode" className="text-right">
                    Room Code
                </Label>
                <Input
                    id="roomCode"
                    name="roomCode"
                    className="col-span-3"
                    placeholder="e.g., ABC12"
                    required
                    minLength={5}
                    maxLength={5}
                    autoComplete="off"
                />
            </div>
            <SubmitButton />
        </form>
    );
}
