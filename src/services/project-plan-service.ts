import {
  ProjectPlanTemplate,
  CreateProjectPlanTemplateData,
  UpdateProjectPlanTemplateData,
  ProjectPlanTemplateWithRelations,
  ProjectPlanTemplateFilters,
  ProjectPlanTemplateSearchOptions,
  ProjectPlanTemplateValidationResult
} from '@/models/project-plan-template';
import { Section, CreateSectionData, SectionValidationResult } from '@/models/section';
import { TechStack } from '@/models/tech-stack';
import { FileStructure } from '@/models/file-structure';
import { LearningStrategy } from '@/models/learning-strategy';
import { KnowledgeManagement } from '@/models/knowledge-management';
import { DatabaseAuthPlan } from '@/models/database-auth-plan';
import { NextSteps } from '@/models/next-steps';

/**
 * Project Plan Template Service
 *
 * Provides CRUD operations for project plan templates and related functionality.
 * Since this is a documentation feature, we'll use in-memory storage for now.
 */
class ProjectPlanTemplateService {
  private templates: Map<string, ProjectPlanTemplate> = new Map();
  private sections: Map<string, Section> = new Map();

  /**
   * Create a new project plan template
   */
  async createProjectPlanTemplate(
    data: CreateProjectPlanTemplateData
  ): Promise<ProjectPlanTemplate> {
    const now = new Date();
    const id = `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Validate input data
    const validation = this.validateProjectPlanTemplateData(data);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
    }

    const template: ProjectPlanTemplate = {
      id,
      title: data.title,
      description: data.description,
      version: data.version,
      createdAt: now,
      updatedAt: now,
      sections: data.sections || []
    };

    this.templates.set(id, template);
    return template;
  }

  /**
   * Get a project plan template by ID
   */
  async getProjectPlanTemplate(id: string): Promise<ProjectPlanTemplate | null> {
    return this.templates.get(id) || null;
  }

  /**
   * Get a project plan template with all relations
   */
  async getProjectPlanTemplateWithRelations(
    id: string
  ): Promise<ProjectPlanTemplateWithRelations | null> {
    const template = await this.getProjectPlanTemplate(id);
    if (!template) return null;

    // For this implementation, we'll return mock related data
    // In a real implementation, these would be fetched from the database
    const templateWithRelations: ProjectPlanTemplateWithRelations = {
      ...template,
      techStack: await this.getDefaultTechStack(),
      fileStructures: await this.getDefaultFileStructures(),
      learningStrategy: await this.getDefaultLearningStrategy(),
      knowledgeManagement: await this.getDefaultKnowledgeManagement(),
      databaseAuthPlan: await this.getDefaultDatabaseAuthPlan(),
      nextSteps: await this.getDefaultNextSteps()
    };

    return templateWithRelations;
  }

  /**
   * Update a project plan template
   */
  async updateProjectPlanTemplate(
    id: string,
    data: UpdateProjectPlanTemplateData
  ): Promise<ProjectPlanTemplate | null> {
    const existingTemplate = await this.getProjectPlanTemplate(id);
    if (!existingTemplate) return null;

    // Validate input data
    const validation = this.validateProjectPlanTemplateData(data);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
    }

    const updatedTemplate: ProjectPlanTemplate = {
      ...existingTemplate,
      ...data,
      updatedAt: new Date()
    };

    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  /**
   * Delete a project plan template
   */
  async deleteProjectPlanTemplate(id: string): Promise<boolean> {
    return this.templates.delete(id);
  }

  /**
   * Search project plan templates
   */
  async searchProjectPlanTemplates(
    options: ProjectPlanTemplateSearchOptions = {}
  ): Promise<ProjectPlanTemplate[]> {
    const { filters = {}, limit = 50, offset = 0, orderBy = 'createdAt', orderDirection = 'desc' } = options;

    let templates = Array.from(this.templates.values());

    // Apply filters
    if (filters.title) {
      templates = templates.filter(t =>
        t.title.toLowerCase().includes(filters.title!.toLowerCase())
      );
    }

    if (filters.version) {
      templates = templates.filter(t => t.version === filters.version);
    }

    if (filters.createdAfter) {
      templates = templates.filter(t => t.createdAt >= filters.createdAfter!);
    }

    if (filters.createdBefore) {
      templates = templates.filter(t => t.createdAt <= filters.createdBefore!);
    }

    if (filters.updatedAfter) {
      templates = templates.filter(t => t.updatedAt >= filters.updatedAfter!);
    }

    if (filters.updatedBefore) {
      templates = templates.filter(t => t.updatedAt <= filters.updatedBefore!);
    }

    // Apply sorting
    templates.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) return orderDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Apply pagination
    return templates.slice(offset, offset + limit);
  }

  /**
   * Get all project plan templates
   */
  async getAllProjectPlanTemplates(): Promise<ProjectPlanTemplate[]> {
    return Array.from(this.templates.values());
  }

  /**
   * Create a section for a project plan template
   */
  async createSection(templateId: string, data: CreateSectionData): Promise<Section> {
    const template = await this.getProjectPlanTemplate(templateId);
    if (!template) {
      throw new Error(`Project plan template with ID ${templateId} not found`);
    }

    const validation = this.validateSectionData(data);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
    }

    const now = new Date();
    const id = `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const section: Section = {
      id,
      title: data.title,
      content: data.content,
      order: data.order,
      parentId: data.parentId,
      createdAt: now,
      updatedAt: now
    };

    this.sections.set(id, section);

    // Update template with new section
    template.sections.push(section);
    template.updatedAt = now;
    this.templates.set(templateId, template);

    return section;
  }

  /**
   * Validate project plan template data
   */
  private validateProjectPlanTemplateData(
    data: Partial<CreateProjectPlanTemplateData>
  ): ProjectPlanTemplateValidationResult {
    const errors: any[] = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title is required' });
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.push({ field: 'description', message: 'Description is required' });
    }

    if (!data.version || data.version.trim().length === 0) {
      errors.push({ field: 'version', message: 'Version is required' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate section data
   */
  private validateSectionData(data: CreateSectionData): SectionValidationResult {
    const errors: any[] = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title is required' });
    }

    if (!data.content || data.content.trim().length === 0) {
      errors.push({ field: 'content', message: 'Content is required' });
    }

    if (data.order < 0) {
      errors.push({ field: 'order', message: 'Order must be non-negative' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get default tech stack (mock implementation)
   */
  private async getDefaultTechStack(): Promise<TechStack> {
    return {
      id: 'default-tech-stack',
      name: 'Next.js',
      version: '15+',
      description: 'React framework for production',
      category: 'framework' as any,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Get default file structures (mock implementation)
   */
  private async getDefaultFileStructures(): Promise<FileStructure[]> {
    return [
      {
        id: 'default-file-structure-1',
        path: 'src/',
        type: 'directory' as any,
        description: 'Main source code directory',
        readOnly: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  /**
   * Get default learning strategy (mock implementation)
   */
  private async getDefaultLearningStrategy(): Promise<LearningStrategy> {
    return {
      id: 'default-learning-strategy',
      goal: 'Learn new technologies',
      steps: ['Research', 'Practice', 'Document'],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Get default knowledge management (mock implementation)
   */
  private async getDefaultKnowledgeManagement(): Promise<KnowledgeManagement> {
    return {
      id: 'default-knowledge-management',
      practice: 'Markdown Documentation',
      description: 'Use markdown format for all documentation',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Get default database auth plan (mock implementation)
   */
  private async getDefaultDatabaseAuthPlan(): Promise<DatabaseAuthPlan> {
    return {
      id: 'default-database-auth-plan',
      status: 'implemented' as any,
      features: ['Authentication', 'Database', 'Security'],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Get default next steps (mock implementation)
   */
  private async getDefaultNextSteps(): Promise<NextSteps[]> {
    return [
      {
        id: 'default-next-step-1',
        step: 'Load project documentation',
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}

// Export singleton instance
export const projectPlanTemplateService = new ProjectPlanTemplateService();