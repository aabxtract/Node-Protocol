'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LongRunVaults from '@/components/long-run-vaults';
import NodeStaking from '@/components/node-staking';

function StakingPageContent() {
  const searchParams = useSearchParams();
  const stakingType = searchParams.get('type') || 'long-run';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 grid-background">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <Tabs defaultValue={stakingType} className="w-full" key={stakingType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="long-run">Long-run Vaults</TabsTrigger>
                <TabsTrigger value="node">Node Staking</TabsTrigger>
              </TabsList>
              <TabsContent value="long-run">
                <LongRunVaults />
              </TabsContent>
              <TabsContent value="node">
                <NodeStaking />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function StakingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StakingPageContent />
    </Suspense>
  );
}
