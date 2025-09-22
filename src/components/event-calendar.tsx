'use client';

import Link from 'next/link';
import { ArrowRight, Gamepad2, MapPin, Users } from 'lucide-react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';

import { cn } from '@/lib/utils';

const eventDate = 14;
const monthName = 'August';
const year = 2025;

const daysInMonth = 31;
const startDay = 5; // Friday

const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
const emptyDays = Array.from({ length: startDay - 1 }, (_, i) => i);

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function EventCalendar() {
  return (
    <div className='p-4 md:p-6 lg:grid lg:grid-cols-3 lg:gap-6'>
      <div className='mb-6 lg:col-span-2 lg:mb-0'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='font-headline text-xl font-bold'>{`${monthName} ${year}`}</h3>
        </div>
        <div className='text-muted-foreground grid grid-cols-7 gap-1 text-center text-sm'>
          {weekDays.map(day => (
            <div key={day} className='font-semibold'>
              {day}
            </div>
          ))}
        </div>
        <div className='mt-2 grid grid-cols-7 gap-1'>
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`}></div>
          ))}
          {calendarDays.map(day => {
            const isEventDay = day === eventDate;
            return (
              <div
                key={day}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-lg transition-colors duration-200',
                  isEventDay
                    ? 'bg-primary text-primary-foreground ring-accent ring-offset-background relative ring-2 ring-offset-2'
                    : 'hover:bg-accent/50',
                  new Date(year, 7, day).getDay() === new Date().getDay() &&
                    !isEventDay &&
                    'bg-muted/50'
                )}
              >
                {day}
                {isEventDay && (
                  <span className='bg-accent absolute bottom-1 h-1 w-1 rounded-full'></span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className='animate-fade-in bg-muted/40 flex flex-col justify-center rounded-lg p-4 lg:p-6'>
        <div className='mb-3 flex items-center gap-3'>
          <div className='bg-background flex h-16 w-16 flex-col items-center justify-center rounded-md p-2'>
            <span className='text-primary text-sm font-semibold uppercase'>
              {monthName.substring(0, 3)}
            </span>
            <span className='text-3xl font-bold'>{eventDate}</span>
          </div>
          <div>
            <h4 className='font-headline text-lg font-bold'>
              Classic Board Game Night
            </h4>
            <Badge variant='secondary'>Featured Event</Badge>
          </div>
        </div>
        <p className='text-muted-foreground mb-4 text-sm'>
          Join us for an evening of friendly competition across card games,
          board games, and activity challenges!
        </p>
        <ul className='mb-4 space-y-2 text-sm'>
          <li className='flex items-center gap-2'>
            <MapPin className='text-primary h-4 w-4' />
            <span>Virtual Event</span>
          </li>
          <li className='flex items-center gap-2'>
            <Users className='text-primary h-4 w-4' />
            <span>20+ players expected</span>
          </li>
          <li className='flex items-center gap-2'>
            <Gamepad2 className='text-primary h-4 w-4' />
            <span>3 Game Categories</span>
          </li>
        </ul>
        <Button asChild className='w-full'>
          <Link href='/events/classic-board-game-night'>
            View Details <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>
      </div>
    </div>
  );
}
