import { Gavel, Shield, Ban, Clock, Trophy } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ruleSections = [
  {
    title: 'General Conduct',
    icon: Shield,
    points: [
      'Be respectful to all participants and volunteers.',
      'Foster an inclusive and welcoming environment for everyone.',
      'Cheating or unsportsmanlike conduct will not be tolerated.',
      'Handle all game components with care.',
    ],
  },
  {
    title: 'Event-Specific Rules',
    icon: Clock,
    points: [
      'Adhere to the rotation timers. When the time is up, move to your next station promptly.',
      'Listen to the instructions from the Game Facilitator at each station.',
      'Scoring is for fun! Points are awarded per category for a friendly leaderboard.',
      "Some games may have slight rule variations for time; the facilitator's ruling is final.",
    ],
  },
  {
    title: 'Safety & Etiquette',
    icon: Trophy,
    points: [
      'For in-person events, please follow all venue safety and hygiene protocols.',
      'For virtual events, ensure your tech is ready and you have a stable internet connection.',
      "Keep your area tidy and be mindful of others' space.",
      'Celebrate wins gracefully and be a good sport in defeat.',
    ],
  },
  {
    title: 'Consequences',
    icon: Ban,
    points: [
      'Minor infractions may result in a friendly warning from a volunteer or admin.',
      'Repeated disruptions or serious violations may lead to being asked to leave the event without a refund.',
      'The event organizers reserve the right to make final decisions on all rule-related matters.',
    ],
  },
];

export default function RulesPage() {
  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='mb-12 text-center'>
        <Gavel className='mx-auto mb-4 h-16 w-16 text-primary' />
        <h1 className='font-headline text-4xl font-extrabold md:text-5xl'>
          Rules & Guidelines
        </h1>
        <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
          To ensure a fun, fair, and safe experience for everyone, please
          familiarize yourself with our rules.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {ruleSections.map(section => (
          <Card
            key={section.title}
            className='shadow-lg transition-colors hover:border-primary'
          >
            <CardHeader className='flex flex-row items-center gap-4'>
              <section.icon className='h-8 w-8 flex-shrink-0 text-primary' />
              <CardTitle className='font-headline text-2xl font-bold'>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='list-inside list-disc space-y-3 text-muted-foreground'>
                {section.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
