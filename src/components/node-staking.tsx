'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDownUp,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { openContractCall } from '@stacks/connect';
import { 
  uintCV, 
  standardPrincipalCV,
  PostConditionMode,
  createSTXPostCondition,
  FungibleConditionCode 
} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

// Contract constants
const NODE_CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const NODE_CONTRACT_NAME = 'node';
const FULL_CONTRACT_ID = `${NODE_CONTRACT_ADDRESS}.${NODE_CONTRACT_NAME}`;
const NETWORK = new StacksTestnet();

export default function NodeStaking() {
  const [stakeAmount, setStakeAmount] = useState('1');
  const [stakingPeriod, setStakingPeriod] = useState('7');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stakingPosition, setStakingPosition] = useState<any>(null);
  
  const stxPrice = 0.6;
  const receivedAmount = 0.95;

  const getRewardForPeriod = (period: string) => {
    switch (period) {
      case '7': return 2;   // 2% APR for 7 days (from node.clar reward-rate-7 u200)
      case '15': return 3;  // 3% APR for 15 days (from node.clar reward-rate-15 u300)
      case '30': return 4;  // 4% APR for 30 days (from node.clar reward-rate-30 u400)
      default: return 2;
    }
  };
  const currentReward = getRewardForPeriod(stakingPeriod);
  const nodePowerReceived = parseFloat(stakeAmount || '0') * receivedAmount;

  // Contract interaction functions
  const handleStakeStx = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert STX to microSTX (multiply by 1,000,000)
      const amountInMicroStx = Math.floor(parseFloat(stakeAmount) * 1000000);
      const days = parseInt(stakingPeriod);
      
      console.log(`Calling stake-stx with amount: ${amountInMicroStx}, days: ${days}`);
      console.log(`Contract: ${FULL_CONTRACT_ID}`);
      
      // Create post condition to ensure STX is transferred
      const postConditions = [
        createSTXPostCondition(
          'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Replace with actual user address
          FungibleConditionCode.Equal,
          amountInMicroStx
        )
      ];
      
      const txOptions = {
        contractAddress: NODE_CONTRACT_ADDRESS,
        contractName: NODE_CONTRACT_NAME,
        functionName: 'stake-stx',
        functionArgs: [
          uintCV(amountInMicroStx),
          uintCV(days)
        ],
        network: NETWORK,
        postConditionMode: PostConditionMode.Deny,
        postConditions,
        onFinish: (data: any) => {
          console.log('Transaction submitted:', data.txId);
          alert(`Transaction submitted! TX ID: ${data.txId}`);
          setIsLoading(false);
        },
        onCancel: () => {
          console.log('Transaction cancelled');
          setIsLoading(false);
        }
      };
      
      await openContractCall(txOptions);
      
    } catch (err) {
      console.error('Transaction error:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
      setIsLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Calling claim-rewards on contract: ${FULL_CONTRACT_ID}`);
      
      const txOptions = {
        contractAddress: NODE_CONTRACT_ADDRESS,
        contractName: NODE_CONTRACT_NAME,
        functionName: 'claim-rewards',
        functionArgs: [],
        network: NETWORK,
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data: any) => {
          console.log('Claim rewards transaction submitted:', data.txId);
          alert(`Claim transaction submitted! TX ID: ${data.txId}`);
          setIsLoading(false);
        },
        onCancel: () => {
          console.log('Claim transaction cancelled');
          setIsLoading(false);
        }
      };
      
      await openContractCall(txOptions);
      
    } catch (err) {
      console.error('Claim error:', err);
      setError(err instanceof Error ? err.message : 'Claim failed');
      setIsLoading(false);
    }
  };

  const handleUnstakeStx = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Calling unstake-stx on contract: ${FULL_CONTRACT_ID}`);
      
      const txOptions = {
        contractAddress: NODE_CONTRACT_ADDRESS,
        contractName: NODE_CONTRACT_NAME,
        functionName: 'unstake-stx',
        functionArgs: [],
        network: NETWORK,
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data: any) => {
          console.log('Unstake transaction submitted:', data.txId);
          alert(`Unstake transaction submitted! TX ID: ${data.txId}`);
          setIsLoading(false);
        },
        onCancel: () => {
          console.log('Unstake transaction cancelled');
          setIsLoading(false);
        }
      };
      
      await openContractCall(txOptions);
      
    } catch (err) {
      console.error('Unstake error:', err);
      setError(err instanceof Error ? err.message : 'Unstake failed');
      setIsLoading(false);
    }
  };


  return (
    <Card className="w-full mt-4">
      <CardContent className="p-6 space-y-4">
        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-3">
            <div className="flex items-center text-destructive text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {error}
            </div>
          </div>
        )}
        
        {/* Stake STX Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <Label htmlFor="stake-stx-node">Stake STX</Label>
            <span className="text-muted-foreground">Balance: 0.00 STX</span>
          </div>
          <div className="relative">
            <Input
              id="stake-stx-node"
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="h-12 pr-24 text-xl font-mono"
              placeholder="1.0"
              min="1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button variant="ghost" size="sm" className="mr-2">Max</Button>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            ≈ ${' '}
            {(parseFloat(stakeAmount || '0') * stxPrice).toLocaleString(
              'en-US',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
            {' '}USD
          </div>
           <div className="flex items-center text-destructive text-sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {parseFloat(stakeAmount || '0') < 1 ? 'Minimum stake is 1 STX' : 'Insufficient balance'}
          </div>
        </div>

        <div className="flex justify-center -my-3">
          <Button variant="outline" size="icon" className="rounded-full z-10 bg-card">
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Staking Period Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3 -mt-3">
           <div className="space-y-2">
            <Label htmlFor="staking-period">Choose staking period</Label>
            <Select onValueChange={setStakingPeriod} defaultValue={stakingPeriod}>
              <SelectTrigger id="staking-period" className="w-full">
                <SelectValue placeholder="Select a period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days (2% APR)</SelectItem>
                <SelectItem value="15">15 Days (3% APR)</SelectItem>
                <SelectItem value="30">30 Days (4% APR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Receive Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <Label>Receive Node Power (est.)</Label>
            <span className="text-muted-foreground">Current Power: 0</span>
          </div>
          <div className="relative">
            <div className="h-12 pr-4 flex items-center text-xl font-mono w-full">
              {nodePowerReceived.toFixed(4)}
            </div>
          </div>
           <div className="text-right text-sm text-muted-foreground">
            ≈ ${' '}
            {(nodePowerReceived * stxPrice / receivedAmount).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {' '}USD
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex justify-between w-full">
                <span>Exchange Rate</span>
                <span className="font-mono pr-4">1 STX ≈ 0.95 Node Power</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
             The conversion rate for staking STX to Node Power.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex justify-between w-full">
                <span>Node Reward (APR)</span>
                <span className="font-mono pr-4 text-primary">≈ {currentReward}%</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              Estimated annual percentage rate for the selected staking period.
            </AccordionContent>
          </AccordionItem>
          <Separator className="my-2" />
           <div className="flex justify-between items-center py-2 text-sm">
            <span>Min. Received</span>
            <span className="font-mono">{(parseFloat(stakeAmount || '0') * receivedAmount * 0.995).toFixed(4)}</span>
          </div>
           <div className="flex justify-between items-center py-2 text-sm">
            <span>Network Fee</span>
            <span className="font-mono">≈ 0.1 STX</span>
          </div>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button 
          size="lg" 
          className="w-full py-6 text-lg" 
          disabled={parseFloat(stakeAmount || '0') < 1 || isLoading}
          onClick={handleStakeStx}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : parseFloat(stakeAmount || '0') < 1 ? (
            'Minimum 1 STX Required'
          ) : (
            'Stake STX'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
