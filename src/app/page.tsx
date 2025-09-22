import { Dice5 } from 'lucide-react';
import Link from 'next/link';

import EventCalendar from '@/components/event-calendar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <section className='mb-12 text-center md:mb-16'>
        <h1 className='animate-fade-in-down mb-4 font-headline text-4xl font-extrabold tracking-tighter md:text-6xl'>
          Welcome to <span className='text-primary'>Game Night Central</span>
        </h1>
        <p className='mx-auto mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl'>
          Discover, schedule, and join thrilling game nights. From classic board
          games to interactive challenges, your next adventure awaits!
        </p>
        <div className='flex justify-center gap-4'>
          <Button asChild size='lg'>
            <Link href='#calendar'>View Events</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/signup'>Sign Up Now</Link>
          </Button>
        </div>
      </section>

      <section id='calendar'>
        <Card className='overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-primary/20'>
          <CardHeader className='bg-muted/30 text-center'>
            <CardTitle className='flex items-center justify-center gap-2 font-headline text-3xl font-bold'>
              <Dice5 className='h-8 w-8 text-primary' />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Mark your calendar for our next game night!
            </CardDescription>
          </CardHeader>
          <CardContent className='p-0'>
            <EventCalendar />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
