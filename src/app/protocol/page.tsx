import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Rocket,
  Milestone,
  Scaling,
  Users,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const protocolHeroImage = PlaceHolderImages.find((p) => p.id === "protocol-hero");

export default function ProtocolPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 grid-background">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-1">
            <div className="space-y-6 text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                The Future of Decentralized Staking
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Node Protocol is a decentralized protocol built to enhance the
                utility of STX through innovative staking solutions on the Bitcoin L2.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/">
                    Start Staking
                    <Rocket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="https://docs.nodeprotocol.com" target="_blank">
                    Read the Docs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background/70 container mx-auto px-4 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Vision & Impact
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Our vision is to create a more secure, decentralized, and
              accessible financial ecosystem powered by Stacks on Bitcoin. We empower
              users to participate in network security and earn rewards without
              sacrificing liquidity.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Milestone className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    Our Mission
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide a seamless and rewarding staking experience that
                  contributes to the long-term growth and stability of the
                  Stacks network on Bitcoin.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Scaling className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    For the Ecosystem
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Node Protocol contributes to stacks DeFi space by offering
                  different staking derivatives, increasing capital efficiency
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    For the User
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We put users first with a simple interface, transparent
                  rewards, allowing you to shape the protocol's future.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Join the Movement
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Become part of a growing community dedicated to building the
              future of finance on Stacks and Bitcoin.
            </p>
            <Button size="lg" className="mt-8">
              Join our Community
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
