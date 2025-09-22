'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Gamepad2,
  MapPin,
  Users,
} from 'lucide-react';

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
        <div className='grid grid-cols-7 gap-1 text-center text-sm text-muted-foreground'>
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
                    ? 'relative bg-primary text-primary-foreground ring-2 ring-accent ring-offset-2 ring-offset-background'
                    : 'hover:bg-accent/50',
                  new Date(year, 7, day).getDay() === new Date().getDay() &&
                    !isEventDay &&
                    'bg-muted/50'
                )}
              >
                {day}
                {isEventDay && (
                  <span className='absolute bottom-1 h-1 w-1 rounded-full bg-accent'></span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className='animate-fade-in flex flex-col justify-center rounded-lg bg-muted/40 p-4 lg:p-6'>
        <div className='mb-3 flex items-center gap-3'>
          <div className='flex h-16 w-16 flex-col items-center justify-center rounded-md bg-background p-2'>
            <span className='text-sm font-semibold uppercase text-primary'>
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
        <p className='mb-4 text-sm text-muted-foreground'>
          Join us for an evening of friendly competition across card games,
          board games, and activity challenges!
        </p>
        <ul className='mb-4 space-y-2 text-sm'>
          <li className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-primary' />
            <span>Virtual Event</span>
          </li>
          <li className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span>20+ players expected</span>
          </li>
          <li className='flex items-center gap-2'>
            <Gamepad2 className='h-4 w-4 text-primary' />
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
