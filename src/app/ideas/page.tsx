import { Lightbulb, Send, Vote } from 'lucide-react';

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
import Poll from '@/components/poll';

const approvedIdeas = [
  'Themed charades rounds (e.g., 80s movies)',
  "A 'fastest puzzle solver' mini-competition",
  "Add a 'cooperative game' station where everyone wins or loses together",
];

export default function IdeasPage() {
  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='mb-12 text-center'>
        <Lightbulb className='mx-auto mb-4 h-16 w-16 text-primary' />
        <h1 className='font-headline text-4xl font-extrabold md:text-5xl'>
          Ideas & Community Polls
        </h1>
        <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
          Help shape our next game night! Submit your brilliant ideas and vote
          on what you want to play next.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
        <div className='space-y-8'>
          <Card className='shadow-xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 font-headline text-2xl font-bold'>
                <Send className='h-6 w-6 text-primary' />
                Submit Your Idea
              </CardTitle>
              <CardDescription>
                Have a suggestion for a new game, category, or event twist? Let
                us know! Approved ideas will be displayed publicly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='idea-title'>Idea Title</Label>
                  <Input id='idea-title' placeholder='e.g., Themed Charades' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='idea-description'>Description</Label>
                  <Textarea
                    id='idea-description'
                    placeholder='Describe your idea in a few sentences.'
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Submit Idea
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className='bg-muted/30'>
            <CardHeader>
              <CardTitle className='font-headline text-2xl font-bold'>
                Approved Ideas
              </CardTitle>
              <CardDescription>
                Great suggestions from our community!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='list-inside list-disc space-y-2 text-muted-foreground'>
                {approvedIdeas.map((idea, i) => (
                  <li key={i}>{idea}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className='space-y-8'>
          <Card className='sticky top-24 shadow-xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 font-headline text-2xl font-bold'>
                <Vote className='h-6 w-6 text-primary' />
                Community Polls
              </CardTitle>
              <CardDescription>
                Your vote counts! Choose what you'd like to see at future
                events.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <Poll
                question='Vote for the next card game:'
                options={['Rummy', 'Euchre']}
              />
              <Poll
                question='Next Activity Game?'
                options={['Pictionary', 'Heads Up!']}
                defaultVotes={[21, 35]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
