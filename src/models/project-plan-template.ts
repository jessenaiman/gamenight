import { Section } from './section';
import { TechStack } from './tech-stack';
import { FileStructure } from './file-structure';
import { LearningStrategy } from './learning-strategy';
import { KnowledgeManagement } from './knowledge-management';
import { DatabaseAuthPlan } from './database-auth-plan';
import { NextSteps } from './next-steps';

/**
 * Project Plan Template Entity Model
 *
 * Represents the main project plan template structure that serves as a reference
 * guide for the AI agent to understand project context and execute tasks efficiently.
 */
export interface ProjectPlanTemplate {
  /** Unique identifier for the project plan template */
  id: string;

  /** Document title */
  title: string;

  /** Document description */
  description: string;

  /** Template version */
  version: string;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;

  /** Document sections */
  sections: Section[];
}

/**
 * Create ProjectPlanTemplate data transfer object
 */
export interface CreateProjectPlanTemplateData {
  title: string;
  description: string;
  version: string;
  sections?: Section[];
}

/**
 * Update ProjectPlanTemplate data transfer object
 */
export interface UpdateProjectPlanTemplateData {
  title?: string;
  description?: string;
  version?: string;
  sections?: Section[];
}

/**
 * Project Plan Template with all related entities
 */
export interface ProjectPlanTemplateWithRelations extends ProjectPlanTemplate {
  /** Technology stack information */
  techStack?: TechStack;

  /** File structure documentation */
  fileStructures: FileStructure[];

  /** Learning strategy guidelines */
  learningStrategy?: LearningStrategy;

  /** Knowledge management practices */
  knowledgeManagement?: KnowledgeManagement;

  /** Database and authentication plan */
  databaseAuthPlan?: DatabaseAuthPlan;

  /** Next steps for AI agent operations */
  nextSteps: NextSteps[];
}

/**
 * Project Plan Template search filters
 */
export interface ProjectPlanTemplateFilters {
  title?: string;
  version?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * Project Plan Template search options
 */
export interface ProjectPlanTemplateSearchOptions {
  filters?: ProjectPlanTemplateFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'title' | 'version';
  orderDirection?: 'asc' | 'desc';
  includeRelations?: boolean;
}

/**
 * Project Plan Template validation errors
 */
export interface ProjectPlanTemplateValidationError {
  field: keyof ProjectPlanTemplate;
  message: string;
}

/**
 * Project Plan Template validation result
 */
export interface ProjectPlanTemplateValidationResult {
  isValid: boolean;
  errors: ProjectPlanTemplateValidationError[];
}