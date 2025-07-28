'use server';

/**
 * @fileOverview An AI agent that rephrases a given answer.
 *
 * - rephraseAnswer - A function that handles the rephrasing of an answer.
 * - RephraseAnswerInput - The input type for the rephraseAnswer function.
 * - RephraseAnswerOutput - The return type for the rephraseAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RephraseAnswerInputSchema = z.object({
  answer: z.string().describe('The answer to be rephrased.'),
});
export type RephraseAnswerInput = z.infer<typeof RephraseAnswerInputSchema>;

const RephraseAnswerOutputSchema = z.object({
  rephrasedAnswer: z
    .string()
    .describe('The rephrased answer, subtly altered by AI.'),
});
export type RephraseAnswerOutput = z.infer<typeof RephraseAnswerOutputSchema>;

export async function rephraseAnswer(input: RephraseAnswerInput): Promise<RephraseAnswerOutput> {
  return rephraseAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rephraseAnswerPrompt',
  input: {schema: RephraseAnswerInputSchema},
  output: {schema: RephraseAnswerOutputSchema},
  prompt: `You are an AI expert at subtly rephrasing answers while preserving the original meaning and tone.

  Rephrase the following answer to make it sound slightly different, as if it were a "doppelganger" of the original.  Do not add any introductory or concluding remarks, only the rephrased answer.

  Answer: {{{answer}}} `,
});

const rephraseAnswerFlow = ai.defineFlow(
  {
    name: 'rephraseAnswerFlow',
    inputSchema: RephraseAnswerInputSchema,
    outputSchema: RephraseAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
