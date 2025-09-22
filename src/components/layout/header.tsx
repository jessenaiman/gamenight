'use client';

import Link from 'next/link';
import {
  Dice5,
  Menu,
  CalendarDays,
  PenSquare,
  Users,
  Lightbulb,
  Gavel,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Calendar', icon: CalendarDays },
  { href: '/signup', label: 'Sign Up', icon: PenSquare },
  { href: '/volunteers', label: 'Volunteers', icon: Users },
  { href: '/ideas', label: 'Ideas & Polls', icon: Lightbulb },
  { href: '/rules', label: 'Rules', icon: Gavel },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, icon: Icon, isMobile = false }: { href: string; label: string; icon: any; isMobile?: boolean }) => (
    <Button
      asChild
      variant={pathname === href ? 'secondary' : 'ghost'}
      className={cn(isMobile && 'justify-start')}
    >
      <Link href={href}>
        <Icon className='mr-2 h-4 w-4' />
        {label}
      </Link>
    </Button>
  );

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <Dice5 className='h-6 w-6 text-primary' />
          <span className='font-headline font-bold sm:inline-block'>
            Game Night Central
          </span>
        </Link>
        <nav className='hidden flex-1 items-center space-x-1 md:flex'>
          {navLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className='flex flex-1 items-center justify-end space-x-2 md:flex-none'>
          <AnimatedThemeToggler />
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <div className='flex flex-col space-y-4'>
                  <Link
                    href='/'
                    className='mb-4 mr-6 flex items-center space-x-2'
                  >
                    <Dice5 className='h-6 w-6 text-primary' />
                    <span className='font-bold'>Game Night Central</span>
                  </Link>
                  <div className='flex flex-col space-y-2'>
                    {navLinks.map(link => (
                      <SheetClose asChild key={link.href}>
                        <NavLink {...link} isMobile />
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
