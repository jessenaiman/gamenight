import Link from 'next/link';
import { Dice5 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <Dice5 className="h-6 w-6 text-primary" />
            <p className="text-sm font-semibold font-headline">Game Night Central</p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Game Night Central. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/rules" className="text-sm text-muted-foreground hover:text-primary">
              Rules & Guidelines
            </Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
