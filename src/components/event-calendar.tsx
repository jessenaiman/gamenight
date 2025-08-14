'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays, Gamepad2, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
    <div className="p-4 md:p-6 lg:grid lg:grid-cols-3 lg:gap-6">
      <div className="lg:col-span-2 mb-6 lg:mb-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-headline">{`${monthName} ${year}`}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-muted-foreground">
          {weekDays.map((day) => (
            <div key={day} className="font-semibold">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`}></div>
          ))}
          {calendarDays.map((day) => {
            const isEventDay = day === eventDate;
            return (
              <div
                key={day}
                className={cn(
                  'aspect-square flex items-center justify-center rounded-lg transition-colors duration-200',
                  isEventDay
                    ? 'bg-primary text-primary-foreground relative ring-2 ring-accent ring-offset-2 ring-offset-background'
                    : 'hover:bg-accent/50',
                  new Date(year, 7, day).getDay() === new Date().getDay() && !isEventDay && 'bg-muted/50'
                )}
              >
                {day}
                {isEventDay && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent"></span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-muted/40 rounded-lg p-4 lg:p-6 flex flex-col justify-center animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
            <div className="flex flex-col items-center justify-center bg-background rounded-md p-2 w-16 h-16">
                <span className="text-sm font-semibold uppercase text-primary">{monthName.substring(0,3)}</span>
                <span className="text-3xl font-bold">{eventDate}</span>
            </div>
            <div>
                <h4 className="font-bold text-lg font-headline">Classic Board Game Night</h4>
                <Badge variant="secondary">Featured Event</Badge>
            </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Join us for an evening of friendly competition across card games, board games, and activity challenges!
        </p>
        <ul className="space-y-2 text-sm mb-4">
          <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>Virtual Event</span></li>
          <li className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><span>20+ players expected</span></li>
          <li className="flex items-center gap-2"><Gamepad2 className="w-4 h-4 text-primary" /><span>3 Game Categories</span></li>
        </ul>
        <Button asChild className="w-full">
          <Link href="/events/classic-board-game-night">
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
