'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDownUp,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
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
const LOCK_CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const LOCK_CONTRACT_NAME = 'lock';
const FULL_CONTRACT_ID = `${LOCK_CONTRACT_ADDRESS}.${LOCK_CONTRACT_NAME}`;
const NETWORK = new StacksTestnet();

export default function LongRunVaults() {
  const [stakeAmount, setStakeAmount] = useState('10');
  const [stakingDuration, setStakingDuration] = useState('3');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockPosition, setLockPosition] = useState<any>(null);
  
  const stxPrice = 0.6;
  const receivedAmount = 0.873781;

  const getAprForDuration = (duration: string) => {
    switch (duration) {
      case '3':
        return 5.0;  // 5% APR for 3 months (from lock.clar reward-rate-3m u500)
      case '6':
        return 8.0;  // 8% APR for 6 months (from lock.clar reward-rate-6m u800)
      case '12':
        return 12.0; // 12% APR for 12 months (from lock.clar reward-rate-12m u1200)
      default:
        return 5.0;
    }
  };

  const currentApr = getAprForDuration(stakingDuration);
  const nStxReceived = parseFloat(stakeAmount || '0') * receivedAmount * (1 + currentApr/100 * (parseInt(stakingDuration)/12));

  // Contract interaction functions
  const handleLockStx = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert STX to microSTX (multiply by 1,000,000)
      const amountInMicroStx = Math.floor(parseFloat(stakeAmount) * 1000000);
      const months = parseInt(stakingDuration);
      
      console.log(`Calling lock-stx with amount: ${amountInMicroStx}, months: ${months}`);
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
        contractAddress: LOCK_CONTRACT_ADDRESS,
        contractName: LOCK_CONTRACT_NAME,
        functionName: 'lock-stx',
        functionArgs: [
          uintCV(amountInMicroStx),
          uintCV(months)
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
        contractAddress: LOCK_CONTRACT_ADDRESS,
        contractName: LOCK_CONTRACT_NAME,
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

  const handleUnlockStx = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Calling unlock-stx on contract: ${FULL_CONTRACT_ID}`);
      
      const txOptions = {
        contractAddress: LOCK_CONTRACT_ADDRESS,
        contractName: LOCK_CONTRACT_NAME,
        functionName: 'unlock-stx',
        functionArgs: [],
        network: NETWORK,
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data: any) => {
          console.log('Unlock transaction submitted:', data.txId);
          alert(`Unlock transaction submitted! TX ID: ${data.txId}`);
          setIsLoading(false);
        },
        onCancel: () => {
          console.log('Unlock transaction cancelled');
          setIsLoading(false);
        }
      };
      
      await openContractCall(txOptions);
      
    } catch (err) {
      console.error('Unlock error:', err);
      setError(err instanceof Error ? err.message : 'Unlock failed');
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
        
        {/* Stake ETH Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <Label htmlFor="stake-eth">Stake STX</Label>
            <span className="text-muted-foreground">Balance: 0.00 STX</span>
          </div>
          <div className="relative">
            <Input
              id="stake-eth"
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="h-12 pr-24 text-xl font-mono"
              placeholder="10.0"
              min="10"
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
            {parseFloat(stakeAmount || '0') < 10 ? 'Minimum stake is 10 STX' : 'Insufficient balance'}
          </div>
        </div>

        <div className="flex justify-center -my-3">
          <Button variant="outline" size="icon" className="rounded-full z-10 bg-card">
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Staking Duration Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3 -mt-3">
          <Label>Select Staking Duration</Label>
          <RadioGroup 
            defaultValue="3" 
            className="grid grid-cols-3 gap-2"
            onValueChange={setStakingDuration}
          >
            <div>
              <RadioGroupItem value="3" id="r1" className="peer sr-only" />
              <Label
                htmlFor="r1"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                3 Months
                <span className="text-xs text-primary mt-1">{getAprForDuration('3')}% APR</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="6" id="r2" className="peer sr-only" />
              <Label
                htmlFor="r2"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                6 Months
                <span className="text-xs text-primary mt-1">{getAprForDuration('6')}% APR</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="12" id="r3" className="peer sr-only" />
              <Label
                htmlFor="r3"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                12 Months
                <span className="text-xs text-primary mt-1">{getAprForDuration('12')}% APR</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Receive nSTX Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <Label>Receive nSTX (est.)</Label>
            <span className="text-muted-foreground">Balance: 0.00 nSTX</span>
          </div>
          <div className="relative">
            <div className="h-12 pr-4 flex items-center text-xl font-mono w-full">
              {nStxReceived.toFixed(6)}
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            ≈ ${' '}
            {(nStxReceived * stxPrice * 1.002).toLocaleString('en-US', {
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
                <span className="font-mono pr-4">1 STX ≈ {receivedAmount} nSTX</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              The rate is not guaranteed and may vary.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex justify-between w-full">
                <span>Selected Return</span>
                <span className="font-mono pr-4 text-primary">≈ {currentApr}% APR</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              This is an estimated average return based on historical data for the selected duration.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex justify-between w-full">
                <span>Slippage Tolerance</span>
                <span className="font-mono pr-4">0.5%</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              The maximum price change you're willing to accept.
            </AccordionContent>
          </AccordionItem>
          <Separator className="my-2" />
           <div className="flex justify-between items-center py-2 text-sm">
            <span>Min. Received</span>
            <span className="font-mono">{(nStxReceived * 0.995).toFixed(6)} nSTX</span>
          </div>
           <div className="flex justify-between items-center py-2 text-sm">
            <span>Network Fee</span>
            <span className="font-mono">0 STX (Gasless)</span>
          </div>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button 
          size="lg" 
          className="w-full py-6 text-lg" 
          disabled={parseFloat(stakeAmount || '0') < 10 || isLoading}
          onClick={handleLockStx}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : parseFloat(stakeAmount || '0') < 10 ? (
            'Minimum 10 STX Required'
          ) : (
            'Lock STX'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
