import { Github, Send, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/icons/logo";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-lg font-bold">
              EthLaunchpad
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EthLaunchpad. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Telegram"
          >
            <Send className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
