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
import Link from 'next/link';

export default function NodeStaking() {
  const [stakeAmount, setStakeAmount] = useState('1');
  const stxPrice = 4485.8;
  const receivedAmount = 0.95;

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
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <svg
                className="h-5 w-5 text-muted-foreground"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M15.92 24.1L8 19.432 15.92 32l7.92-12.568-7.92 4.668zM16.08 0L8 18.182l8.08 4.588 8.08-4.588L16.08 0z" />
              </svg>
            </div>
            <Input
              id="stake-stx-node"
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="h-12 pl-10 pr-24 text-xl font-mono"
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

        {/* Receive Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3 -mt-3">
          <div className="flex justify-between items-center text-sm">
            <Label>Receive Node Power</Label>
            <span className="text-muted-foreground">Current Power: 0</span>
          </div>
          <div className="relative">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <svg
                className="h-5 w-5 text-muted-foreground"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M15.92 24.1L8 19.432 15.92 32l7.92-12.568-7.92 4.668zM16.08 0L8 18.182l8.08 4.588 8.08-4.588L16.08 0z" />
              </svg>
            </div>
            <div className="h-12 pl-10 pr-4 flex items-center text-xl font-mono w-full">
              {(parseFloat(stakeAmount || '0') * receivedAmount).toFixed(4)}
            </div>
          </div>
           <div className="text-right text-sm text-muted-foreground">
            ≈ ${' '}
            {(parseFloat(stakeAmount || '0') * stxPrice * 0.998).toLocaleString('en-US', {
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
                <span>Node Reward APR</span>
                <span className="font-mono pr-4 text-primary">≈ 5.5%</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              Estimated annual return for staking on a node.
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
