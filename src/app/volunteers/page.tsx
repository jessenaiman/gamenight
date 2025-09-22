import { Gift, Shield, Star, Users, Code, Heart } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const volunteerRoles = [
  {
    role: 'Registration & Door Manager',
    description:
      'The flirty first face of the event, welcoming people in and making them feel special.',
    icon: Heart,
  },
  {
    role: 'Set Up & Tear Down Crew',
    description:
      "Strong, energetic people who aren't afraid to get their hands dirty. I promise to make it worth your while. 😉",
    icon: Star,
  },
  {
    role: 'Safety & Security',
    description:
      "It's always a community effort to keep things safe, but this person is the designated point of contact. Your leadership will be invaluable.",
    icon: Shield,
  },
  {
    role: 'Nerdy Web Developers & Sys Admins',
    description:
      "I have a domain and a self-hosted server, so if you're into that sort of thing, I've got a special place for you on the team.",
    icon: Code,
  },
];

const volunteerBenefits = [
  'Free entry to the event',
  'Become an integral part of the team',
  'Natural leadership development opportunities',
  'Grow together as a community',
  "Note: There's no guaranteed thank you gift either",
];

export default function VolunteersPage() {
  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='mb-12 text-center'>
        <Users className='text-primary mx-auto mb-4 h-16 w-16' />
        <h1 className='font-headline text-4xl font-extrabold md:text-5xl'>
          Join Our Volunteer Team!
        </h1>
        <p className='text-muted-foreground mx-auto mt-4 max-w-3xl text-lg'>
          Building a great community takes a village, and I'm looking for a
          handful of amazing volunteers to help me bring these events to life.
          Not only will you get free entry to events, but you'll also be an
          integral part of the team. The more you get involved, the more you'll
          become a natural leader—that's how we grow together.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
        <div>
          <h2 className='font-headline mb-6 text-2xl font-bold'>
            Volunteer Roles
          </h2>
          <div className='space-y-6'>
            {volunteerRoles.map(role => (
              <Card
                key={role.role}
                className='hover:border-primary flex items-start gap-4 p-4 transition-colors'
              >
                <role.icon className='text-primary mt-1 h-12 w-12 flex-shrink-0' />
                <div>
                  <h3 className='text-lg font-semibold'>{role.role}</h3>
                  <p className='text-muted-foreground text-sm'>
                    {role.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <h2 className='font-headline mt-8 mb-6 text-2xl font-bold'>
            Volunteer Perks
          </h2>
          <Card className='bg-muted/30'>
            <CardContent className='p-6'>
              <ul className='space-y-3'>
                {volunteerBenefits.map(benefit => (
                  <li key={benefit} className='flex items-center gap-3'>
                    <Gift className='text-accent h-5 w-5 flex-shrink-0' />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className='sticky top-24 shadow-xl'>
            <CardHeader>
              <CardTitle className='font-headline text-2xl font-bold'>
                Sign Up to Volunteer
              </CardTitle>
              <CardDescription>
                Ready to help? Fill out the form below and we'll be in touch!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input id='name' placeholder='Alex Ray' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='contact'>Email or Phone</Label>
                  <Input id='contact' placeholder='alex@example.com' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='availability'>Availability</Label>
                  <Input
                    id='availability'
                    placeholder='e.g., Weekday evenings, weekends'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='experience'>
                    Relevant Experience (optional)
                  </Label>
                  <Textarea
                    id='experience'
                    placeholder='Have you moderated charades before? Tell us about it!'
                  />
                </div>
                <Button type='submit' className='w-full' size='lg'>
                  I'm Ready to Help!
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
