"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function StakingForm() {
  return (
    <Card className="w-full shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Stake Your ETH</CardTitle>
        <CardDescription>
          Enter the amount of ETH you want to stake and start earning rewards
          instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Total ETH Staked</p>
            <p className="text-2xl font-bold">1,234,567</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Staking APR</p>
            <p className="text-2xl font-bold text-primary">4.20%</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="eth-amount" className="text-base">
            Amount
          </Label>
          <div className="relative">
            <Input
              id="eth-amount"
              type="number"
              placeholder="0.00"
              className="h-14 pr-16 text-lg"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="font-bold text-muted-foreground">ETH</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full py-7 text-lg">
          Stake Now
        </Button>
      </CardFooter>
    </Card>
  );
}
