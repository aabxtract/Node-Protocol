'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDownUp,
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

export default function NodeStaking() {
  const [stakeAmount, setStakeAmount] = useState('1');
  const [stakingPeriod, setStakingPeriod] = useState('7');
  const stxPrice = 0.6;
  const receivedAmount = 0.95;

  const getRewardForPeriod = (period: string) => {
    switch (period) {
      case '7': return 2;
      case '15': return 3;
      case '30': return 4;
      default: return 2;
    }
  };
  const currentReward = getRewardForPeriod(stakingPeriod);
  const nodePowerReceived = parseFloat(stakeAmount || '0') * receivedAmount;


  return (
    <Card className="w-full mt-4">
      <CardContent className="p-6 space-y-4">
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
              placeholder="0.0"
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
            Insufficient balance
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
                <SelectItem value="7">7 Days (2% Reward)</SelectItem>
                <SelectItem value="15">15 Days (3% Reward)</SelectItem>
                <SelectItem value="30">30 Days (4% Reward)</SelectItem>
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
                <span>Node Reward</span>
                <span className="font-mono pr-4 text-primary">≈ {currentReward}%</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              Estimated reward for the selected staking period.
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
        <Button size="lg" className="w-full py-6 text-lg">
          Connect Wallet
        </Button>
      </CardFooter>
    </Card>
  );
}
