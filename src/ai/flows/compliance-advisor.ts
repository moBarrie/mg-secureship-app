// src/ai/flows/compliance-advisor.ts
'use server';
/**
 * @fileOverview A compliance advisor AI agent.
 *
 * - getComplianceInformation - A function that handles the compliance information retrieval process.
 * - ComplianceInformationInput - The input type for the getComplianceInformation function.
 * - ComplianceInformationOutput - The return type for the getComplianceInformation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ComplianceInformationInputSchema = z.object({
  mineralType: z.string().describe('The type of precious mineral being shipped (e.g., gold, diamonds).'),
  quantity: z.string().describe('The quantity or weight of the mineral being shipped (e.g., 1 kg, 10 carats).'),
  origin: z.string().default('Sierra Leone').describe('The origin country of the shipment.'),
  destination: z.string().describe('The destination country of the shipment.'),
});

export type ComplianceInformationInput = z.infer<typeof ComplianceInformationInputSchema>;

const ComplianceInformationOutputSchema = z.object({
  complianceInformation: z.string().describe(
    'Detailed compliance information regarding global shipping regulations for precious minerals, ' +
    'including required documentation, restrictions, and handling requirements.'
  ),
});

export type ComplianceInformationOutput = z.infer<typeof ComplianceInformationOutputSchema>;

/**
 * Get compliance information for shipping precious minerals
 * @param input Information about the shipment
 * @returns Compliance requirements and recommendations
 */
export async function getComplianceInformation(
  input: ComplianceInformationInput
): Promise<ComplianceInformationOutput> {
  // Set default origin if not provided
  const normalizedInput = {
    ...input,
    origin: input.origin || 'Sierra Leone',
  };

  try {
    return await complianceInformationFlow(normalizedInput);
  } catch (error) {
    console.error('Error getting compliance information:', error);
    throw new Error('Failed to get compliance information. Please try again.');
  }
}

const prompt = ai.definePrompt({
  name: 'complianceInformationPrompt',
  input: {schema: ComplianceInformationInputSchema},
  output: {schema: ComplianceInformationOutputSchema},
  prompt: `You are an expert in global shipping regulations for precious minerals.

  Provide compliance information for the shipment details below, considering the origin and destination countries.

  Mineral Type: {{{mineralType}}}
  Quantity: {{{quantity}}}
  Origin: {{{origin}}}
  Destination: {{{destination}}}
  `,
});

const complianceInformationFlow = ai.defineFlow(
  {
    name: 'complianceInformationFlow',
    inputSchema: ComplianceInformationInputSchema,
    outputSchema: ComplianceInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
