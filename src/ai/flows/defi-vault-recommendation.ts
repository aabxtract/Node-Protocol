'use server';

/**
 * @fileOverview A DeFi vault recommendation AI agent.
 *
 * - getDeFiVaultRecommendation - A function that recommends DeFi vaults based on user input.
 * - DeFiVaultRecommendationInput - The input type for the getDeFiVaultRecommendation function.
 * - DeFiVaultRecommendationOutput - The return type for the getDeFiVaultRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeFiVaultRecommendationInputSchema = z.object({
  riskPreference: z
    .enum(['low', 'medium', 'high'])
    .describe('The user\u0027s risk preference.'),
  ethStakingAmount: z
    .number()
    .describe('The amount of ETH the user is staking.'),
});
export type DeFiVaultRecommendationInput = z.infer<
  typeof DeFiVaultRecommendationInputSchema
>;

const DeFiVaultRecommendationOutputSchema = z.object({
  vaultName: z.string().describe('The name of the recommended DeFi vault.'),
  apy: z.number().describe('The Annual Percentage Yield (APY) of the vault.'),
  description: z
    .string()
    .describe('A brief description of the DeFi vault and its strategy.'),
});
export type DeFiVaultRecommendationOutput = z.infer<
  typeof DeFiVaultRecommendationOutputSchema
>;

export async function getDeFiVaultRecommendation(
  input: DeFiVaultRecommendationInput
): Promise<DeFiVaultRecommendationOutput> {
  return defiVaultRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'defiVaultRecommendationPrompt',
  input: {schema: DeFiVaultRecommendationInputSchema},
  output: {schema: DeFiVaultRecommendationOutputSchema},
  prompt: `You are an expert in DeFi vaults and yield optimization strategies.

  Based on the user's risk preference and ETH staking amount, recommend a DeFi vault that aligns with their needs.

  Risk Preference: {{{riskPreference}}}
  ETH Staking Amount: {{{ethStakingAmount}}}

  Consider factors such as APY, vault strategy, and risk level when making your recommendation.
  Ensure the APY is represented as a number.
  Response should be in JSON format.
  `,
});

const defiVaultRecommendationFlow = ai.defineFlow(
  {
    name: 'defiVaultRecommendationFlow',
    inputSchema: DeFiVaultRecommendationInputSchema,
    outputSchema: DeFiVaultRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
