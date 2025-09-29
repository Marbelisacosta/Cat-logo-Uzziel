'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized product suggestions based on user height and gender.
 *
 * The flow takes user height and gender as input and returns a list of product suggestions.
 * @file
 * - personalizedProductSuggestions - A function that takes user height and gender and returns personalized product suggestions.
 * - PersonalizedProductSuggestionsInput - The input type for the personalizedProductSuggestions function.
 * - PersonalizedProductSuggestionsOutput - The output type for the personalizedProductSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedProductSuggestionsInputSchema = z.object({
  heightCm: z
    .number()
    .describe('The height of the user in centimeters.')
    .min(50) // Minimum height
    .max(250), // Maximum height
  gender: z.enum(['male', 'female', 'other']).describe('The gender of the user.'),
});
export type PersonalizedProductSuggestionsInput = z.infer<
  typeof PersonalizedProductSuggestionsInputSchema
>;

const PersonalizedProductSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of product suggestions tailored to the user.'),
});
export type PersonalizedProductSuggestionsOutput = z.infer<
  typeof PersonalizedProductSuggestionsOutputSchema
>;

export async function personalizedProductSuggestions(
  input: PersonalizedProductSuggestionsInput
): Promise<PersonalizedProductSuggestionsOutput> {
  return personalizedProductSuggestionsFlow(input);
}

const personalizedProductSuggestionsPrompt = ai.definePrompt({
  name: 'personalizedProductSuggestionsPrompt',
  input: {schema: PersonalizedProductSuggestionsInputSchema},
  output: {schema: PersonalizedProductSuggestionsOutputSchema},
  prompt: `You are a personal shopping assistant. Based on the user's height and gender, suggest products from our online store that would be a good fit.  Return a list of product suggestions.

User Height (cm): {{{heightCm}}}
User Gender: {{{gender}}}

Consider these constraints:
*  Suggest clothing items. Do not suggest accessories, shoes, or other non-clothing items.
*  Be specific.  Instead of "a shirt", suggest "a blue button-down shirt".
*  Suggest items that are appropriate for the user's gender.
*  Do not include any preamble or commentary.  Just list the suggestions.
`,
});

const personalizedProductSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedProductSuggestionsFlow',
    inputSchema: PersonalizedProductSuggestionsInputSchema,
    outputSchema: PersonalizedProductSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await personalizedProductSuggestionsPrompt(input);
    return output!;
  }
);
