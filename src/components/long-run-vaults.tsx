'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDownUp,
  ChevronDown,
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

export default function LongRunVaults() {
  const [stakeAmount, setStakeAmount] = useState('1');
  const ethPrice = 4485.8;
  const receivedAmount = 0.873781;

  return (
    <Card className="w-full mt-4">
      <CardContent className="p-6 space-y-4">
        {/* Stake ETH Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <Label htmlFor="stake-eth">Stake STX</Label>
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
              id="stake-eth"
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
            {(parseFloat(stakeAmount || '0') * ethPrice).toLocaleString(
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

        {/* Receive rETH Section */}
        <div className="rounded-lg border bg-card p-4 space-y-3 -mt-3">
          <div className="flex justify-between items-center text-sm">
            <Label>Receive nSTX</Label>
            <span className="text-muted-foreground">Balance: 0.00 nSTX</span>
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
              {receivedAmount.toFixed(6)}
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            ≈ ${' '}
            {(receivedAmount * ethPrice * 1.002).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {' '}USD
          </div>
        </div>

        {/* Routing Section */}
        <div>
          <div className="flex justify-between items-center text-sm mb-2">
            <Label>Routing</Label>
            <Link
              href="#"
              className="text-primary text-xs hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              What's the difference?
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border-2 border-transparent bg-card/50 p-3 text-center text-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span>Protocol</span>
              </div>
              <p className="font-mono text-base">0.870948 nSTX</p>
            </div>
            <div className="rounded-lg border-2 border-green-500 bg-card/50 p-3 text-center text-sm relative">
               <div className="absolute -top-3 right-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                0.32% better
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>CoW Swap</span>
              </div>
              <p className="font-mono text-base">0.873781 nSTX</p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex justify-between w-full">
                <span>Exchange Rate</span>
                <span className="font-mono pr-4">1 STX ≈ 0.873781 nSTX</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              The rate is not guaranteed and may vary.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex justify-between w-full">
                <span>Average Return</span>
                <span className="font-mono pr-4 text-primary">≈ 2.45% APR</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              This is an estimated average return based on historical data.
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
          <AccordionItem value="item-4" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex justify-between w-full">
                <span>Order Expiry</span>
                <span className="font-mono pr-4">30 minutes</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground text-xs">
              The time after which your order will expire if not filled.
            </AccordionContent>
          </AccordionItem>
          <Separator className="my-2" />
           <div className="flex justify-between items-center py-2 text-sm">
            <span>Min. Received</span>
            <span className="font-mono">0.869412 nSTX</span>
          </div>
           <div className="flex justify-between items-center py-2 text-sm">
            <span>Network Fee</span>
            <span className="font-mono">0 STX (Gasless)</span>
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
