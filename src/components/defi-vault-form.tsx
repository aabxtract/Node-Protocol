"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  getDeFiVaultRecommendation,
  type DeFiVaultRecommendationInput,
  type DeFiVaultRecommendationOutput,
} from "@/ai/flows/defi-vault-recommendation";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  riskPreference: z.enum(["low", "medium", "high"], {
    required_error: "You need to select a risk preference.",
  }),
  stakingAmount: z.coerce
    .number({ invalid_type_error: "Please enter a valid number." })
    .positive({ message: "Staking amount must be positive." }),
});

export default function DeFiVaultForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] =
    useState<DeFiVaultRecommendationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stakingAmount: 1,
      riskPreference: "medium",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getDeFiVaultRecommendation({
        riskPreference: values.riskPreference,
        ethStakingAmount: values.stakingAmount,
      } as DeFiVaultRecommendationInput);
      setRecommendation(result);
    } catch (error) {
      console.error("Error getting recommendation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a recommendation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline">
              Find Your Perfect Vault
            </CardTitle>
            <CardDescription>
              Answer a few questions and our AI will recommend the best vault
              for your strategy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="riskPreference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What is your risk preference?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Low Risk (Stable returns)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Medium Risk (Balanced growth)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          High Risk (Maximum yield)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stakingAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How much STX are you planning to stake?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Recommendation"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {(isLoading || recommendation) && (
        <div className="p-6 pt-0">
          <div className="rounded-lg border bg-background p-4">
            <h4 className="mb-2 font-semibold">AI Recommendation:</h4>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : recommendation ? (
              <div className="space-y-2">
                <h5 className="flex items-center gap-2 text-xl font-bold text-primary">
                  <Zap className="h-5 w-5" />
                  {recommendation.vaultName}
                </h5>
                <p className="font-mono text-lg font-semibold">
                  {recommendation.apy}% APY
                </p>
                <p className="text-muted-foreground">
                  {recommendation.description}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Card>
  );
}
