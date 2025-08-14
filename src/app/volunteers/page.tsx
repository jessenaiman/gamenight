import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Gamepad2, Gift, Handshake, ShieldQuestion, Star, Users } from "lucide-react";

const volunteerRoles = [
    {
      role: "Game Facilitator",
      description: "Be the expert at one of our game stations. You'll explain rules, guide players, and keep the energy high.",
      icon: Gamepad2
    },
    {
      role: "Timekeeper & Host",
      description: "Help players rotate smoothly between stations. You'll be the friendly face ensuring everyone is on schedule and having fun.",
      icon: Handshake
    },
    {
      role: "Setup & Teardown Crew",
      description: "The backbone of the event! Help us prepare the space before and clean up after, making the magic happen.",
      icon: Star
    }
  ];
  
  const volunteerBenefits = [
    "Free entry to the event",
    "Exclusive early access to games",
    "A special thank-you gift",
    "Become a core part of our community"
  ];

export default function VolunteersPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-12">
                <Users className="w-16 h-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Join Our Volunteer Team!</h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
                    Volunteers are the heart of our game nights. Help us create an unforgettable experience and enjoy some great perks along the way.
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
                                        <Gift className="w-5 h-5 text-accent" />
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
