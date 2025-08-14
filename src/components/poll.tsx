'use client';

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface PollProps {
    question: string;
    options: string[];
    defaultVotes?: number[];
}

export default function Poll({ question, options, defaultVotes = [15, 8] }: PollProps) {
    const [votes, setVotes] = useState(defaultVotes);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    const totalVotes = votes.reduce((acc, v) => acc + v, 0);

    const handleVote = () => {
        if (selectedOption) {
            const optionIndex = options.indexOf(selectedOption);
            if (optionIndex > -1) {
                const newVotes = [...votes];
                newVotes[optionIndex]++;
                setVotes(newVotes);
                setHasVoted(true);
            }
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-background">
            <h4 className="font-semibold mb-4">{question}</h4>
            {!hasVoted ? (
                <RadioGroup onValueChange={setSelectedOption} className="space-y-2 mb-4">
                    {options.map(option => (
                        <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                <div className="space-y-3 mb-4">
                    {options.map((option, index) => {
                        const percentage = totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;
                        return (
                            <div key={option}>
                                <div className="flex justify-between items-center mb-1 text-sm">
                                    <span className="font-medium">{option}</span>
                                    <span className="text-muted-foreground">{Math.round(percentage)}% ({votes[index]} votes)</span>
                                </div>
                                <Progress value={percentage} />
                            </div>
                        )
                    })}
                </div>
            )}
            <Button onClick={handleVote} disabled={!selectedOption || hasVoted} className="w-full">
                {hasVoted ? "Thanks for voting!" : "Vote"}
            </Button>
        </div>
    )
}
