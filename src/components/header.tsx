import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/icons/logo";

const navLinks = [
  { href: "#", label: "Stake" },
  { href: "#", label: "Node Staking" },
  { href: "#", label: "Protocol" },
  { href: "#", label: "Docs" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-lg font-bold">
              Node Protocol
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </header>
  );
}
