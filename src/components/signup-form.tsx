'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CheckCircle, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  status: z.enum(['man', 'woman', 'couple'], {
    required_error: 'Please select an option.',
  }),
  preferredStart: z.string().optional(),
  experience: z.string().min(10, { message: 'Please tell us a bit more.' }),
  dietary: z.string().optional(),
  gameTypes: z.string().optional(),
});

const pricing = {
  man: 30,
  woman: 10,
  couple: 30,
};

export default function SignupForm() {
  const [price, setPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      preferredStart: 'any',
      experience: '',
      dietary: '',
      gameTypes: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, price });
    toast({
      title: 'Registration Submitted!',
      description:
        "We've received your registration. You'll be notified upon approval.",
    });
    setIsSubmitted(true);
  }

  const handleStatusChange = (value: 'man' | 'woman' | 'couple') => {
    form.setValue('status', value);
    setPrice(pricing[value]);
  };

  if (isSubmitted) {
    return (
      <div className='rounded-lg border border-dashed border-green-500/50 bg-green-500/10 p-8 text-center'>
        <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
        <h3 className='text-2xl font-bold text-green-500'>
          Thank You for Registering!
        </h3>
        <p className='text-muted-foreground mt-2'>
          Your registration is{' '}
          <span className='text-primary font-semibold'>pending approval</span>.
          You will receive an email confirmation once it's reviewed by our team.
          We'll also send event reminders and your rotation schedule teaser.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder='you@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Registration Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: 'man' | 'woman' | 'couple') =>
                    handleStatusChange(value)
                  }
                  defaultValue={field.value}
                  className='flex flex-col gap-4 md:flex-row'
                >
                  <FormItem className='flex-1'>
                    <RadioGroupItem
                      value='man'
                      id='man'
                      className='peer sr-only'
                    />
                    <FormLabel
                      htmlFor='man'
                      className='border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4'
                    >
                      Men - $30
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex-1'>
                    <RadioGroupItem
                      value='woman'
                      id='woman'
                      className='peer sr-only'
                    />
                    <FormLabel
                      htmlFor='woman'
                      className='border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4'
                    >
                      Women - $10
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex-1'>
                    <RadioGroupItem
                      value='couple'
                      id='couple'
                      className='peer sr-only'
                    />
                    <FormLabel
                      htmlFor='couple'
                      className='border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4'
                    >
                      Couples - $30
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className='bg-muted/30'>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <FormDescription>
              Your answers help us tailor the event. They are private and only
              viewable by admins.
            </FormDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='preferredStart'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Starting Category (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='No preference' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='any'>No preference</SelectItem>
                      <SelectItem value='card'>Card Games</SelectItem>
                      <SelectItem value='board'>Board Games</SelectItem>
                      <SelectItem value='activity'>Activity Games</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='experience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What is your experience level with board games?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='e.g., Casual player, enjoy party games, competitive strategist...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dietary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Any dietary restrictions for snacks? (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Gluten-free, vegetarian, none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gameTypes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred game types? (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Strategy, cooperative, word games'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className='bg-background flex items-center justify-between gap-4 rounded-lg border p-4'>
          <div className='flex items-center gap-2'>
            <DollarSign className='text-primary h-6 w-6' />
            <span className='text-lg font-semibold'>Total Price:</span>
          </div>
          <span className='text-primary text-2xl font-bold'>${price}</span>
        </div>

        <Button
          type='submit'
          size='lg'
          className='w-full'
          disabled={!form.formState.isValid || price === 0}
        >
          Submit Registration
        </Button>
      </form>
    </Form>
  );
}
