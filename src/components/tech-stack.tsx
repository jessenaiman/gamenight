'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, Star, TrendingUp } from 'lucide-react';
import { TechStack, TechCategory } from '@/models/tech-stack';

interface TechStackProps {
  techStacks: TechStack[];
  onSelect?: (techStack: TechStack) => void;
  onLearnMore?: (techStack: TechStack) => void;
  className?: string;
}

/**
 * Tech Stack Display Component
 *
 * Displays technology stack information in an organized and visually appealing way.
 * Supports categorization, filtering, and interaction with individual tech stack entries.
 */
export function TechStackComponent({
  techStacks,
  onSelect,
  onLearnMore,
  className
}: TechStackProps) {
  // Group tech stacks by category
  const groupedTechStacks = techStacks.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<TechCategory, TechStack[]>);

  const getCategoryIcon = (category: TechCategory) => {
    const icons = {
      [TechCategory.FRAMEWORK]: Code,
      [TechCategory.LIBRARY]: Star,
      [TechCategory.TOOL]: TrendingUp,
      [TechCategory.DATABASE]: ExternalLink,
      [TechCategory.AUTHENTICATION]: Star,
      [TechCategory.UI_COMPONENT]: Code,
      [TechCategory.DEVELOPMENT_TOOL]: ExternalLink,
      [TechCategory.TESTING_TOOL]: Star,
      [TechCategory.DEPLOYMENT_TOOL]: TrendingUp,
      [TechCategory.OTHER]: Code
    };
    return icons[category] || Code;
  };

  const getCategoryColor = (category: TechCategory) => {
    const colors = {
      [TechCategory.FRAMEWORK]: 'text-blue-600',
      [TechCategory.LIBRARY]: 'text-green-600',
      [TechCategory.TOOL]: 'text-purple-600',
      [TechCategory.DATABASE]: 'text-orange-600',
      [TechCategory.AUTHENTICATION]: 'text-red-600',
      [TechCategory.UI_COMPONENT]: 'text-pink-600',
      [TechCategory.DEVELOPMENT_TOOL]: 'text-indigo-600',
      [TechCategory.TESTING_TOOL]: 'text-yellow-600',
      [TechCategory.DEPLOYMENT_TOOL]: 'text-teal-600',
      [TechCategory.OTHER]: 'text-gray-600'
    };
    return colors[category] || 'text-gray-600';
  };

  const getCategoryBadgeColor = (category: TechCategory) => {
    const colors = {
      [TechCategory.FRAMEWORK]: 'default',
      [TechCategory.LIBRARY]: 'secondary',
      [TechCategory.TOOL]: 'outline',
      [TechCategory.DATABASE]: 'destructive',
      [TechCategory.AUTHENTICATION]: 'default',
      [TechCategory.UI_COMPONENT]: 'secondary',
      [TechCategory.DEVELOPMENT_TOOL]: 'outline',
      [TechCategory.TESTING_TOOL]: 'secondary',
      [TechCategory.DEPLOYMENT_TOOL]: 'outline',
      [TechCategory.OTHER]: 'outline'
    };
    return colors[category] || 'outline';
  };

  if (techStacks.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No technologies found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(groupedTechStacks).map(([category, techs]) => {
        const CategoryIcon = getCategoryIcon(category as TechCategory);
        const iconColor = getCategoryColor(category as TechCategory);
        const badgeVariant = getCategoryBadgeColor(category as TechCategory);

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CategoryIcon className={`h-5 w-5 ${iconColor}`} />
                <span className="capitalize">{category.replace('_', ' ')}</span>
                <Badge variant={badgeVariant} className="ml-auto">
                  {techs.length} {techs.length === 1 ? 'tech' : 'techs'}
                </Badge>
              </CardTitle>
              <CardDescription>
                {category === TechCategory.FRAMEWORK && 'Core frameworks and main application structure'}
                {category === TechCategory.LIBRARY && 'Supporting libraries and utilities'}
                {category === TechCategory.TOOL && 'Development tools and utilities'}
                {category === TechCategory.DATABASE && 'Database systems and data management'}
                {category === TechCategory.AUTHENTICATION && 'Authentication and authorization systems'}
                {category === TechCategory.UI_COMPONENT && 'User interface components and styling'}
                {category === TechCategory.DEVELOPMENT_TOOL && 'Tools for development workflow'}
                {category === TechCategory.TESTING_TOOL && 'Testing frameworks and utilities'}
                {category === TechCategory.DEPLOYMENT_TOOL && 'Deployment and DevOps tools'}
                {category === TechCategory.OTHER && 'Other technologies and tools'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techs.map((tech) => (
                  <div
                    key={tech.id}
                    className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{tech.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          v{tech.version}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        {onSelect && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onSelect(tech)}
                            className="h-8 w-8 p-0"
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                        )}
                        {onLearnMore && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onLearnMore(tech)}
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tech.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="capitalize">
                        {tech.category.replace('_', ' ')}
                      </span>
                      <span>
                        Updated: {tech.updatedAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary footer */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Total Technologies: {techStacks.length}</span>
              <span>Categories: {Object.keys(groupedTechStacks).length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Most Recent:</span>
              <Badge variant="outline">
                {techStacks
                  .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]
                  ?.name || 'N/A'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for individual tech stack cards
interface TechStackCardProps {
  techStack: TechStack;
  onSelect?: () => void;
  onLearnMore?: () => void;
}

export function TechStackCard({ techStack, onSelect, onLearnMore }: TechStackCardProps) {
  const getCategoryIcon = (category: TechCategory) => {
    const icons = {
      [TechCategory.FRAMEWORK]: Code,
      [TechCategory.LIBRARY]: Star,
      [TechCategory.TOOL]: TrendingUp,
      [TechCategory.DATABASE]: ExternalLink,
      [TechCategory.AUTHENTICATION]: Star,
      [TechCategory.UI_COMPONENT]: Code,
      [TechCategory.DEVELOPMENT_TOOL]: ExternalLink,
      [TechCategory.TESTING_TOOL]: Star,
      [TechCategory.DEPLOYMENT_TOOL]: TrendingUp,
      [TechCategory.OTHER]: Code
    };
    return icons[category] || Code;
  };

  const CategoryIcon = getCategoryIcon(techStack.category);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <CategoryIcon className="h-4 w-4 text-gray-500" />
            <span>{techStack.name}</span>
          </CardTitle>
          <Badge variant="outline">v{techStack.version}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{techStack.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="capitalize text-xs">
            {techStack.category.replace('_', ' ')}
          </Badge>
          <div className="flex space-x-2">
            {onSelect && (
              <Button size="sm" variant="outline" onClick={onSelect}>
                Select
              </Button>
            )}
            {onLearnMore && (
              <Button size="sm" onClick={onLearnMore}>
                Learn More
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}