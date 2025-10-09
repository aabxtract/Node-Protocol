"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Zap, Shield, Gem, Flame } from "lucide-react";

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
  type DeFiVaultRecommendationOutput,
} from "@/ai/flows/defi-vault-recommendation";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high";

const formSchema = z.object({
  riskPreference: z.enum(["low", "medium", "high"], {
    required_error: "You need to select a risk preference.",
  }),
  stakingAmount: z.coerce
    .number({ invalid_type_error: "Please enter a valid number." })
    .positive({ message: "Staking amount must be positive." }),
});

const VAULT_CONFIG = {
  low: {
    name: "Low Risk Vault",
    icon: Shield,
    color: "hsl(var(--vault-low))",
    textColor: "text-green-400",
    borderColor: "border-green-500/50",
    glowColor: "shadow-[0_0_15px_2px_hsl(var(--vault-low))]",
  },
  medium: {
    name: "Medium Risk Vault",
    icon: Gem,
    color: "hsl(var(--vault-medium))",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/50",
    glowColor: "shadow-[0_0_15px_2px_hsl(var(--vault-medium))]",
  },
  high: {
    name: "High Risk Vault",
    icon: Flame,
    color: "hsl(var(--vault-high))",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/50",
    glowColor: "shadow-[0_0_15px_2px_hsl(var(--vault-high))]",
  },
};

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

  function getVaultRecommendation(
    amount: number,
    risk: RiskLevel
  ): { recommendedRisk: RiskLevel; message: string; isMatch: boolean } {
    let recommendedRisk: RiskLevel;
    let message: string;
    let isMatch = false;

    if (amount <= 100) {
      recommendedRisk = "high";
      message =
        "Since your stake is relatively small, the High Risk Vault may offer better short-term yield potential.";
    } else if (amount > 100 && amount <= 1000) {
      recommendedRisk = "medium";
      message =
        "A balanced vault suits your stake size — steady growth with manageable volatility.";
    } else {
      // amount > 1000
      recommendedRisk = "low";
      message =
        "For higher stakes, the Low Risk Vault ensures consistent returns with minimal fluctuation.";
    }

    if (recommendedRisk === risk) {
      isMatch = true;
      message = `Perfect match! The ${VAULT_CONFIG[risk].name} you selected aligns with your stake and strategy.`;
    }

    return { recommendedRisk, message, isMatch };
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);

    const { recommendedRisk, message, isMatch } = getVaultRecommendation(
      values.stakingAmount,
      values.riskPreference as RiskLevel
    );

    const vaultConfig = VAULT_CONFIG[recommendedRisk];
    const Icon = vaultConfig.icon;

    toast({
      duration: 5000,
      className: cn(
        "bg-card/80 backdrop-blur-sm border-2",
        vaultConfig.borderColor,
        vaultConfig.glowColor
      ),
      title: (
        <div className="flex items-center gap-2">
          <Icon className={cn("h-5 w-5", vaultConfig.textColor)} />
          <span className={cn("font-bold", vaultConfig.textColor)}>
            {isMatch
              ? `Perfect Match: ${vaultConfig.name}`
              : `Recommended Vault: ${vaultConfig.name}`}
          </span>
        </div>
      ),
      description: <p className="text-muted-foreground">{message}</p>,
      action: (
        <Button
          variant="link"
          className={cn("text-base", vaultConfig.textColor)}
        >
          Explore Vaults
        </Button>
      ),
    });

    try {
      const result = await getDeFiVaultRecommendation({
        riskPreference: recommendedRisk,
        ethStakingAmount: values.stakingAmount,
      });
      setRecommendation(result);
    } catch (error) {
      console.error("Error getting recommendation:", error);
      // We can still show the local recommendation even if the AI fails.
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
                          🛡️ Low Risk (Stable returns)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          💎 Medium Risk (Balanced growth)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          🔥 High Risk (Maximum yield)
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
            <h4 className="mb-2 font-semibold">AI Recommendation Details:</h4>
            {isLoading && !recommendation ? (
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
