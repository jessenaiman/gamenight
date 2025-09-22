import { PenSquare } from 'lucide-react';

import SignupForm from '@/components/signup-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='flex justify-center'>
        <Card className='w-full max-w-2xl shadow-xl'>
          <CardHeader className='text-center'>
            <div className='mx-auto mb-4 w-fit rounded-full bg-primary/10 p-3'>
              <PenSquare className='h-8 w-8 text-primary' />
            </div>
            <CardTitle className='font-headline text-3xl font-bold'>
              Register for Game Night
            </CardTitle>
            <CardDescription>
              Complete the form below to secure your spot. We can't wait to see
              you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
