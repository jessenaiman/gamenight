import EventCalendar from "@/components/event-calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dice5 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 font-headline animate-fade-in-down">
          Welcome to <span className="text-primary">Game Night Central</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          Discover, schedule, and join thrilling game nights. From classic board games to interactive challenges, your next adventure awaits!
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="#calendar">View Events</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      <section id="calendar">
        <Card className="overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-primary/20">
          <CardHeader className="text-center bg-muted/30">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2 font-headline">
              <Dice5 className="w-8 h-8 text-primary" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Mark your calendar for our next game night!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <EventCalendar />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
