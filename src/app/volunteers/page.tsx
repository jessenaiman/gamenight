import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Gamepad2, Gift, Handshake, Shield, Star, Users, Code, Heart } from "lucide-react";

const volunteerRoles = [
    {
      role: "Registration & Door Manager",
      description: "The flirty first face of the event, welcoming people in and making them feel special.",
      icon: Heart
    },
    {
      role: "Set Up & Tear Down Crew",
      description: "Strong, energetic people who aren't afraid to get their hands dirty. I promise to make it worth your while. 😉",
      icon: Star
    },
    {
      role: "Safety & Security",
      description: "It's always a community effort to keep things safe, but this person is the designated point of contact. Your leadership will be invaluable.",
      icon: Shield
    },
    {
      role: "Nerdy Web Developers & Sys Admins",
      description: "I have a domain and a self-hosted server, so if you're into that sort of thing, I've got a special place for you on the team.",
      icon: Code
    }
  ];
  
  const volunteerBenefits = [
    "Free entry to the event",
    "Become an integral part of the team",
    "Natural leadership development opportunities",
    "Grow together as a community",
    "Note: There's no guaranteed thank you gift either"
  ];

export default function VolunteersPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-12">
                <Users className="w-16 h-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Join Our Volunteer Team!</h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
                    Building a great community takes a village, and I'm looking for a handful of amazing volunteers to help me bring these events to life. Not only will you get free entry to events, but you'll also be an integral part of the team. The more you get involved, the more you'll become a natural leader—that's how we grow together.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6 font-headline">Volunteer Roles</h2>
                    <div className="space-y-6">
                    {volunteerRoles.map(role => (
                        <Card key={role.role} className="flex items-start gap-4 p-4 hover:border-primary transition-colors">
                            <role.icon className="w-12 h-12 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">{role.role}</h3>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                        </Card>
                    ))}
                    </div>
                    <h2 className="text-2xl font-bold mt-8 mb-6 font-headline">Volunteer Perks</h2>
                    <Card className="bg-muted/30">
                        <CardContent className="p-6">
                            <ul className="space-y-3">
                                {volunteerBenefits.map(benefit => (
                                    <li key={benefit} className="flex items-center gap-3">
                                        <Gift className="w-5 h-5 text-accent flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="shadow-xl sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold font-headline">Sign Up to Volunteer</CardTitle>
                            <CardDescription>Ready to help? Fill out the form below and we'll be in touch!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Alex Ray" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact">Email or Phone</Label>
                                    <Input id="contact" placeholder="alex@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="availability">Availability</Label>
                                    <Input id="availability" placeholder="e.g., Weekday evenings, weekends" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experience">Relevant Experience (optional)</Label>
                                    <Textarea id="experience" placeholder="Have you moderated charades before? Tell us about it!" />
                                </div>
                                <Button type="submit" className="w-full" size="lg">I'm Ready to Help!</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
