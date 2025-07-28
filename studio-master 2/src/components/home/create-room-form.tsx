'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createRoom } from '@/lib/actions';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create and Enter
        </Button>
    );
}

export function CreateRoomForm() {
    return (
        <form action={createRoom} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Username
                </Label>
                <Input
                    id="username"
                    name="username"
                    className="col-span-3"
                    placeholder="Your unique name"
                    required
                    minLength={2}
                    maxLength={15}
                    autoComplete="off"
                />
            </div>
            <SubmitButton />
        </form>
    );
}
