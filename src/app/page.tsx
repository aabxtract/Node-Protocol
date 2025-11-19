
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ChevronRight,
  Database,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StakingForm from "@/components/staking-form";
import DeFiVaultForm from "@/components/defi-vault-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const liquidStakingImage = PlaceHolderImages.find(
  (p) => p.id === "liquid-staking"
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 grid-background">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Stake. Secure. Earn
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                Stake your STX, secure the Bitcoin L2, and earn rewards with Node Protocol.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Staking
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="#advanced-staking">Learn More</Link>
                </Button>
              </div>
            </div>
            <div
              className="relative flex h-full min-h-[300px] w-full items-center justify-center lg:min-h-[400px]"
              style={{ gap: "0px" }}
            >
              <Image
                src="/stacks-stx-logo.png"
                alt="Stacks STX Logo"
                width={250}
                height={250}
                className="h-auto w-auto z-10 animate-glow-blue transition-transform duration-200 hover:animate-bounce"
              />
              <Image
                src="/bitcoin-btc-logo.png"
                alt="Bitcoin BTC Logo"
                width={250}
                height={250}
                className="h-auto w-auto -ml-16 animate-glow-orange transition-transform duration-200 hover:animate-bounce"
              />
            </div>
          </div>
        </section>

        <section className="bg-background/70 container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <StakingForm />
          </div>
        </section>

        <section id="advanced-staking" className="container mx-auto scroll-mt-20 px-4 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Advanced Staking Ecosystem
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover sophisticated staking solutions tailored for every level of experience, 
              from beginners to advanced DeFi users.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-col overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Activity className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    Liquid Staking
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-muted-foreground">
                  Keep your STX liquid while earning staking rewards. Access DeFi opportunities without compromising your staked position or waiting for unstaking periods.
                </p>
                {liquidStakingImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={liquidStakingImage.imageUrl}
                      alt={liquidStakingImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={liquidStakingImage.imageHint}
                    />
                  </div>
                )}
                <Button variant="link" className="px-0" asChild>
                  <Link href="/staking?type=long-run">
                    Explore Liquid Staking
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Database className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    Node Staking
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-muted-foreground">
                  Node Staking lets you stake STX to help power active nodes in the ecosystem. Earn rewards while directly supporting the network’s security and decentralization.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Higher rewards for securing the network.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Full control over your staking setup.</span>
                  </li>
                </ul>
                <Button variant="outline">
                  Become a Node Operator
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-card py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                AI-Powered DeFi Vaults
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Optimize your yield with our intelligent DeFi vaults. Get a
                personalized recommendation based on your profile.
              </p>
            </div>
            <div className="mx-auto max-w-2xl">
              <DeFiVaultForm />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 sm:py-24">
          <Card className="bg-primary text-primary-foreground">
            <div className="grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="font-headline text-3xl font-bold">
                  Shape the Future of the Protocol
                </h3>
                <p className="mt-2 opacity-90">
                  Stake your Stacks. Be a major contributor to the Bitcoin and Stacks ecosystem and empower Node protocol
                </p>
              </div>
              <div className="flex justify-start md:justify-end">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Stake Now!
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
