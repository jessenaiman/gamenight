import Link from 'next/link';
import { Dice5 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='flex items-center space-x-2'>
            <Dice5 className='text-primary h-6 w-6' />
            <p className='font-headline text-sm font-semibold'>
              Game Night Central
            </p>
          </div>
          <p className='text-muted-foreground text-sm'>
            © {new Date().getFullYear()} Game Night Central. All rights
            reserved.
          </p>
          <div className='flex items-center space-x-4'>
            <Link
              href='/rules'
              className='text-muted-foreground hover:text-primary text-sm'
            >
              Rules & Guidelines
            </Link>
            <Link
              href='/admin'
              className='text-muted-foreground hover:text-primary text-sm'
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
