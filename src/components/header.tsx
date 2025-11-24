import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/icons/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/protocol", label: "Protocol" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="hidden sm:inline-block font-semibold text-xl tracking-tight text-foreground">
              Node Protocol
            </span>
          </Link>
        </div>

        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center gap-10 text-sm md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none">
              Staking
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/staking?type=long-run">Long-run vaults</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/staking?type=node">Node Staking</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </header>
  );
}
