'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Code, Database, FileText, Lightbulb, Settings, Users, Zap } from 'lucide-react';
import { ProjectPlanTemplateWithRelations } from '@/models/project-plan-template';
import { projectPlanTemplateService } from '@/services/project-plan-service';

interface ProjectPlanTemplateProps {
  templateId?: string;
  className?: string;
}

/**
 * Main Project Plan Template Component
 *
 * Displays the comprehensive project plan template with all sections and related information.
 * This serves as the main interface for the AI agent to understand the project structure and guidelines.
 */
export function ProjectPlanTemplate({ templateId, className }: ProjectPlanTemplateProps) {
  const [template, setTemplate] = useState<ProjectPlanTemplateWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTemplate();
  }, [templateId]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      setError(null);

      let templateData: ProjectPlanTemplateWithRelations | null;

      if (templateId) {
        templateData = await projectPlanTemplateService.getProjectPlanTemplateWithRelations(templateId);
      } else {
        // Create a default template for demonstration
        templateData = await createDefaultTemplate();
      }

      setTemplate(templateData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project plan template');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultTemplate = async (): Promise<ProjectPlanTemplateWithRelations> => {
    // Create a default template using the service
    const defaultTemplate = await projectPlanTemplateService.createProjectPlanTemplate({
      title: 'Game Night Central - Project Plan Template',
      description: 'Comprehensive reference guide for the AI agent to understand the project context, navigate files, manage knowledge, and execute tasks efficiently.',
      version: '1.0.0',
      sections: []
    });

    const templateData = await projectPlanTemplateService.getProjectPlanTemplateWithRelations(defaultTemplate.id);
    if (!templateData) {
      throw new Error('Failed to load default template with relations');
    }
    return templateData;
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-red-600">Error: {error}</div>
          <Button onClick={loadTemplate} variant="outline" className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!template) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">No project plan template found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">{template.title}</CardTitle>
                <CardDescription className="text-base">
                  Version {template.version}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <FileText className="h-3 w-3 mr-1" />
              Documentation Template
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{template.description}</p>
          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
            <span>Created: {template.createdAt.toLocaleDateString()}</span>
            <span>Updated: {template.updatedAt.toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tech Stack Section */}
        {template.techStack && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-green-600" />
                <span>Tech Stack</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{template.techStack.name}</span>
                  <Badge variant="outline">{template.techStack.version}</Badge>
                </div>
                <p className="text-sm text-gray-600">{template.techStack.description}</p>
                <Badge variant="secondary" className="capitalize">
                  {template.techStack.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Structure Section */}
        {template.fileStructures.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-purple-600" />
                <span>File Structure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {template.fileStructures.slice(0, 5).map((structure) => (
                    <div key={structure.id} className="flex items-center justify-between text-sm">
                      <span className="font-mono text-xs">{structure.path}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={structure.readOnly ? "destructive" : "default"} className="text-xs">
                          {structure.type}
                        </Badge>
                        {structure.readOnly && (
                          <span className="text-xs text-red-600">Read-only</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {template.fileStructures.length > 5 && (
                    <div className="text-xs text-gray-500 text-center pt-2">
                      ... and {template.fileStructures.length - 5} more
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Learning Strategy Section */}
      {template.learningStrategy && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>Learning Strategy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">{template.learningStrategy.goal}</h4>
                <div className="mt-3">
                  <h5 className="font-medium mb-2">Steps:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    {template.learningStrategy.steps.map((step: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Knowledge Management Section */}
      {template.knowledgeManagement && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Knowledge Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">{template.knowledgeManagement.practice}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {template.knowledgeManagement.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Database and Auth Plan Section */}
      {template.databaseAuthPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-indigo-600" />
              <span>Database & Authentication</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <Badge variant="outline" className="capitalize">
                  {template.databaseAuthPlan.status}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {template.databaseAuthPlan.features.map((feature: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps Section */}
      {template.nextSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span>Next Steps</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {template.nextSteps.slice(0, 5).map((nextStep) => (
                <div key={nextStep.id} className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-0.5">
                    {nextStep.priority}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{nextStep.step}</p>
                  </div>
                </div>
              ))}
              {template.nextSteps.length > 5 && (
                <div className="text-xs text-gray-500 text-center pt-2">
                  ... and {template.nextSteps.length - 5} more steps
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Template ID: {template.id}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Sections: {template.sections.length}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>File Structures: {template.fileStructures.length}</span>
            </div>
            <Button onClick={loadTemplate} variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}