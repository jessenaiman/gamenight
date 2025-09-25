import {
  Heart,
  Sparkles,
  Swords,
  DollarSign,
  Clock,
  ListRules,
  Gift,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// In a real app, this would come from a database based on the slug
const eventData = {
  title: 'Classic Board Game Night',
  slug: 'classic-board-game-night',
  date: 'August 14, 2025',
  duration: '2-3 hours',
  pricing: {
    men: 30,
    women: 10,
    couples: 30,
  },
};

const categories = [
  {
    name: 'Card Games',
    icon: Heart,
    description: 'Rummy, Euchre, and other strategic card-based classics.',
    image: 'https://placehold.co/600x400.png',
    hint: 'card games',
  },
  {
    name: 'Board Games',
    icon: Swords,
    description:
      'Candyland, Snakes and Ladders, and other adventures on the board.',
    image: 'https://placehold.co/600x400.png',
    hint: 'board games',
  },
  {
    name: 'Activity Games',
    icon: Sparkles,
    description:
      'Charades and more! Games that require creativity and quick thinking.',
    image: 'https://placehold.co/600x400.png',
    hint: 'party fun',
  },
];

export default function EventPage() {
  // We're ignoring the slug for now and showing the static event
  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <Card className='mb-8 shadow-lg'>
            <div className='relative h-64 w-full'>
              <Image
                src='https://placehold.co/1200x400.png'
                alt={eventData.title}
                layout='fill'
                objectFit='cover'
                className='rounded-t-lg'
                data-ai-hint='board games night'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
              <div className='absolute bottom-0 left-0 p-6'>
                <Badge>{eventData.date}</Badge>
                <h1 className='font-headline mt-2 text-3xl font-extrabold text-white md:text-4xl'>
                  {eventData.title}
                </h1>
              </div>
            </div>
            <CardContent className='p-6'>
              <h2 className='font-headline mb-4 text-2xl font-bold'>
                Event Format
              </h2>
              <p className='text-muted-foreground mb-4'>
                Get ready for a dynamic evening of fun! Players will be grouped
                and rotate through three exciting game categories. You'll spend
                about 20-30 minutes at each station, ensuring everyone gets to
                experience all the different types of games.
              </p>
              <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
                {categories.map(category => (
                  <Card
                    key={category.name}
                    className='hover:border-primary flex flex-col transition-colors'
                  >
                    <CardHeader className='flex-row items-center gap-4'>
                      <category.icon className='text-primary h-8 w-8' />
                      <CardTitle className='text-xl'>{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-grow'>
                      <p className='text-muted-foreground text-sm'>
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='space-y-6 lg:col-span-1'>
          <Card className='sticky top-24 shadow-lg'>
            <CardHeader>
              <CardTitle className='font-headline text-2xl font-bold'>
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3'>
                <Clock className='text-primary h-5 w-5' />{' '}
                <span>{eventData.duration} total</span>
              </div>

              <h3 className='flex items-center gap-2 pt-2 font-semibold'>
                <DollarSign className='text-primary h-5 w-5' /> Pricing
              </h3>
              <div className='bg-muted/50 flex justify-around rounded-md p-3 text-center text-sm'>
                <div>
                  <p className='text-lg font-bold'>${eventData.pricing.men}</p>
                  <p className='text-muted-foreground'>Men</p>
                </div>
                <div>
                  <p className='text-lg font-bold'>
                    ${eventData.pricing.women}
                  </p>
                  <p className='text-muted-foreground'>Women</p>
                </div>
                <div>
                  <p className='text-lg font-bold'>
                    ${eventData.pricing.couples}
                  </p>
                  <p className='text-muted-foreground'>Couples</p>
                </div>
              </div>

              <h3 className='flex items-center gap-2 pt-2 font-semibold'>
                <ListRules className='text-primary h-5 w-5' /> Rules
              </h3>
              <p className='text-muted-foreground text-sm'>
                Fair play is key! Follow rotation timers and respect all
                players. Detailed rules available{' '}
                <Link href='/rules' className='text-primary underline'>
                  here
                </Link>
                .
              </p>

              <h3 className='flex items-center gap-2 pt-2 font-semibold'>
                <Gift className='text-primary h-5 w-5' /> What to Bring
              </h3>
              <p className='text-muted-foreground text-sm'>
                Just your enthusiasm! Optional snacks to share are welcome.
              </p>

              <Button asChild size='lg' className='mt-4 w-full'>
                <Link href='/signup'>Sign Up Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
