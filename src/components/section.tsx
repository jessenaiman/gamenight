'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Section, SectionWithSubsections } from '@/models/section';

interface SectionProps {
  section: Section | SectionWithSubsections;
  onEdit?: (section: Section) => void;
  onDelete?: (sectionId: string) => void;
  className?: string;
}

/**
 * Section Component with Markdown Support
 *
 * Displays a section with markdown content and supports nested subsections.
 * This component handles the display and interaction with individual sections
 * of the project plan template.
 */
export function SectionComponent({ section, onEdit, onDelete, className }: SectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showRawMarkdown, setShowRawMarkdown] = useState(false);

  const hasSubsections = 'subsections' in section && section.subsections.length > 0;

  // Render markdown content
  const renderMarkdown = (content: string) => {
    if (showRawMarkdown) {
      return <pre className="text-xs bg-gray-100 p-3 rounded whitespace-pre-wrap">{content}</pre>;
    }

    // Simple markdown rendering
    const lines = content.split('\n');
    return (
      <div className="prose prose-sm max-w-none">
        {lines.map((line, index) => {
          // Headers
          if (line.match(/^#{1,6}\s+/)) {
            const level = line.match(/^(#{1,6})/)?.[1]?.length || 1;
            const title = line.replace(/^#{1,6}\s+/, '');
            const headerClasses = {
              1: 'text-xl font-bold mb-3 mt-4',
              2: 'text-lg font-semibold mb-2 mt-3',
              3: 'text-base font-medium mb-2 mt-2',
              4: 'text-sm font-medium mb-1 mt-2',
              5: 'text-sm font-medium mb-1 mt-1',
              6: 'text-xs font-medium mb-1 mt-1'
            };
            return (
              <div key={index} className={headerClasses[level as keyof typeof headerClasses]}>
                {title}
              </div>
            );
          }

          // Lists
          if (line.match(/^[\s]*[-*+]\s/)) {
            return (
              <li key={index} className="ml-4">
                {line.replace(/^[\s]*[-*+]\s/, '')}
              </li>
            );
          }

          if (line.match(/^[\s]*\d+\.\s/)) {
            return (
              <li key={index} className="ml-4">
                {line.replace(/^[\s]*\d+\.\s/, '')}
              </li>
            );
          }

          // Code blocks
          if (line.match(/^```/)) {
            return (
              <pre key={index} className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                <code>{line.replace(/```/g, '')}</code>
              </pre>
            );
          }

          // Bold text
          if (line.includes('**') || line.includes('__')) {
            return (
              <p key={index} className="mb-2">
                {line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>
            );
          }

          // Italic text
          if (line.includes('*') && !line.includes('**')) {
            return (
              <p key={index} className="mb-2 italic">
                {line.replace(/\*/g, '')}
              </p>
            );
          }

          // Links
          if (line.includes('[') && line.includes('](')) {
            return (
              <p key={index} className="mb-2">
                {line.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                  const match = part.match(/\[([^\]]*)\]\(([^)]*)\)/);
                  if (match) {
                    return (
                      <a
                        key={i}
                        href={match[2]}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {match[1]}
                      </a>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>
            );
          }

          // Empty lines
          if (line.trim() === '') {
            return <br key={index} />;
          }

          // Regular paragraphs
          return (
            <p key={index} className="mb-2 text-gray-700">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <Card className={`${className} ${hasSubsections ? 'border-l-4 border-l-blue-200' : ''}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <div className="flex-1">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    ID: {section.id}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Order: {section.order}
                  </Badge>
                  {hasSubsections && (
                    <Badge variant="secondary" className="text-xs">
                      {section.subsections.length} subsections
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRawMarkdown(!showRawMarkdown)}
                className="text-xs"
              >
                {showRawMarkdown ? 'Rendered' : 'Raw'}
              </Button>

              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(section)}
                  className="text-xs"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}

              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(section.id)}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent>
            <ScrollArea className="max-h-96">
              {renderMarkdown(section.content)}

              {/* Render subsections if they exist */}
              {'subsections' in section && section.subsections.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">Subsections</h4>
                  <div className="space-y-3">
                    {section.subsections.map((subsection) => (
                      <SectionComponent
                        key={subsection.id}
                        section={subsection}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        className="ml-4 border-l-2 border-l-gray-200 pl-4"
                      />
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* Section metadata */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Created: {section.createdAt.toLocaleDateString()}</span>
                <span>Updated: {section.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}