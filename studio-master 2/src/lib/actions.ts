'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

const createRoomSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters.').max(15, 'Username cannot be longer than 15 characters.'),
});

const joinRoomSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters.').max(15, 'Username cannot be longer than 15 characters.'),
  roomCode: z.string().length(5, 'Room code must be 5 characters.').regex(/^[A-Z0-9]+$/, 'Room code must be uppercase letters and numbers.'),
});

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createRoom(formData: FormData) {
  const validatedFields = createRoomSchema.safeParse({
    username: formData.get('username'),
  });

  if (!validatedFields.success) {
    // In a real app, you would return form errors.
    // This is a simplified example.
    redirect(`/?error=${validatedFields.error.flatten().fieldErrors.username?.[0]}`);
    return;
  }
  
  const roomCode = generateRoomCode();
  
  redirect(`/room/${roomCode}?username=${encodeURIComponent(validatedFields.data.username)}`);
}

export async function joinRoom(formData: FormData) {
    const validatedFields = joinRoomSchema.safeParse({
        username: formData.get('username'),
        roomCode: formData.get('roomCode'),
    });

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors;
        const errorMessage = errors.username?.[0] || errors.roomCode?.[0] || 'Invalid input.';
        redirect(`/?error=${errorMessage}`);
        return;
    }

    const { username, roomCode } = validatedFields.data;

    redirect(`/room/${roomCode.toUpperCase()}?username=${encodeURIComponent(username)}`);
}
