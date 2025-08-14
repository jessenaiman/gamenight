import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, Swords, User, Users, DollarSign, Clock, ListRules, Gift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    { name: "Card Games", icon: Heart, description: "Rummy, Euchre, and other strategic card-based classics.", image: "https://placehold.co/600x400.png", hint: "card games" },
    { name: "Board Games", icon: Swords, description: "Candyland, Snakes and Ladders, and other adventures on the board.", image: "https://placehold.co/600x400.png", hint: "board games" },
    { name: "Activity Games", icon: Sparkles, description: "Charades and more! Games that require creativity and quick thinking.", image: "https://placehold.co/600x400.png", hint: "party fun" },
];

export default function EventPage({ params }: { params: { slug: string } }) {
  // We're ignoring the slug for now and showing the static event
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="mb-8 shadow-lg">
                <div className="relative h-64 w-full">
                     <Image src="https://placehold.co/1200x400.png" alt={eventData.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint="board games night" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                     <div className="absolute bottom-0 left-0 p-6">
                        <Badge>{eventData.date}</Badge>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-headline">{eventData.title}</h1>
                     </div>
                </div>
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 font-headline">Event Format</h2>
                    <p className="text-muted-foreground mb-4">
                        Get ready for a dynamic evening of fun! Players will be grouped and rotate through three exciting game categories. You'll spend about 20-30 minutes at each station, ensuring everyone gets to experience all the different types of games.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                        {categories.map(category => (
                            <Card key={category.name} className="flex flex-col hover:border-primary transition-colors">
                                <CardHeader className="flex-row items-center gap-4">
                                    <category.icon className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">{category.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground">{category.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary" /> <span>{eventData.duration} total</span></div>
                    
                    <h3 className="font-semibold flex items-center gap-2 pt-2"><DollarSign className="w-5 h-5 text-primary" /> Pricing</h3>
                    <div className="flex justify-around text-center text-sm bg-muted/50 p-3 rounded-md">
                        <div>
                            <p className="font-bold text-lg">${eventData.pricing.men}</p>
                            <p className="text-muted-foreground">Men</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">${eventData.pricing.women}</p>
                            <p className="text-muted-foreground">Women</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">${eventData.pricing.couples}</p>
                            <p className="text-muted-foreground">Couples</p>
                        </div>
                    </div>

                    <h3 className="font-semibold flex items-center gap-2 pt-2"><ListRules className="w-5 h-5 text-primary" /> Rules</h3>
                    <p className="text-sm text-muted-foreground">Fair play is key! Follow rotation timers and respect all players. Detailed rules available <Link href="/rules" className="text-primary underline">here</Link>.</p>

                    <h3 className="font-semibold flex items-center gap-2 pt-2"><Gift className="w-5 h-5 text-primary" /> What to Bring</h3>
                    <p className="text-sm text-muted-foreground">Just your enthusiasm! Optional snacks to share are welcome.</p>

                    <Button asChild size="lg" className="w-full mt-4">
                        <Link href="/signup">Sign Up Now</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
