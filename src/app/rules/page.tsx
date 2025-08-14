import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Shield, Ban, Clock, Trophy } from "lucide-react";

const ruleSections = [
    {
      title: "General Conduct",
      icon: Shield,
      points: [
        "Be respectful to all participants and volunteers.",
        "Foster an inclusive and welcoming environment for everyone.",
        "Cheating or unsportsmanlike conduct will not be tolerated.",
        "Handle all game components with care."
      ]
    },
    {
      title: "Event-Specific Rules",
      icon: Clock,
      points: [
        "Adhere to the rotation timers. When the time is up, move to your next station promptly.",
        "Listen to the instructions from the Game Facilitator at each station.",
        "Scoring is for fun! Points are awarded per category for a friendly leaderboard.",
        "Some games may have slight rule variations for time; the facilitator's ruling is final."
      ]
    },
    {
      title: "Safety & Etiquette",
      icon: Trophy,
      points: [
        "For in-person events, please follow all venue safety and hygiene protocols.",
        "For virtual events, ensure your tech is ready and you have a stable internet connection.",
        "Keep your area tidy and be mindful of others' space.",
        "Celebrate wins gracefully and be a good sport in defeat."
      ]
    },
    {
        title: "Consequences",
        icon: Ban,
        points: [
          "Minor infractions may result in a friendly warning from a volunteer or admin.",
          "Repeated disruptions or serious violations may lead to being asked to leave the event without a refund.",
          "The event organizers reserve the right to make final decisions on all rule-related matters."
        ]
      }
  ];

export default function RulesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <Gavel className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Rules & Guidelines</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
          To ensure a fun, fair, and safe experience for everyone, please familiarize yourself with our rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ruleSections.map(section => (
            <Card key={section.title} className="shadow-lg hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                    <section.icon className="w-8 h-8 text-primary flex-shrink-0" />
                    <CardTitle className="text-2xl font-bold font-headline">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
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
