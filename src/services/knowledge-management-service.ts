import {
  KnowledgeManagement,
  CreateKnowledgeManagementData,
  UpdateKnowledgeManagementData,
  KnowledgeManagementFilters,
  KnowledgeManagementSearchOptions,
  KnowledgeCategory,
  KnowledgePriority,
  DEFAULT_KNOWLEDGE_PRACTICES
} from '@/models/knowledge-management';

/**
 * Knowledge Management Service
 *
 * Provides functionality for managing project knowledge, documentation practices,
 * and information organization.
 */
class KnowledgeManagementService {
  private knowledgeEntries: Map<string, KnowledgeManagement> = new Map();

  constructor() {
    // Initialize with default knowledge practices
    this.initializeDefaultKnowledge();
  }

  /**
   * Create a new knowledge management entry
   */
  async createKnowledgeEntry(
    data: CreateKnowledgeManagementData
  ): Promise<KnowledgeManagement> {
    const now = new Date();
    const id = `knowledge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const entry: KnowledgeManagement = {
      id,
      practice: data.practice,
      description: data.description,
      createdAt: now,
      updatedAt: now
    };

    this.knowledgeEntries.set(id, entry);
    return entry;
  }

  /**
   * Get a knowledge management entry by ID
   */
  async getKnowledgeEntry(id: string): Promise<KnowledgeManagement | null> {
    return this.knowledgeEntries.get(id) || null;
  }

  /**
   * Update a knowledge management entry
   */
  async updateKnowledgeEntry(
    id: string,
    data: UpdateKnowledgeManagementData
  ): Promise<KnowledgeManagement | null> {
    const existingEntry = await this.getKnowledgeEntry(id);
    if (!existingEntry) return null;

    const updatedEntry: KnowledgeManagement = {
      ...existingEntry,
      ...data,
      updatedAt: new Date()
    };

    this.knowledgeEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  /**
   * Delete a knowledge management entry
   */
  async deleteKnowledgeEntry(id: string): Promise<boolean> {
    return this.knowledgeEntries.delete(id);
  }

  /**
   * Search knowledge management entries
   */
  async searchKnowledgeEntries(
    options: KnowledgeManagementSearchOptions = {}
  ): Promise<KnowledgeManagement[]> {
    const { filters = {}, limit = 50, offset = 0, orderBy = 'createdAt', orderDirection = 'desc' } = options;

    let entries = Array.from(this.knowledgeEntries.values());

    // Apply filters
    if (filters.practice) {
      entries = entries.filter(entry =>
        entry.practice.toLowerCase().includes(filters.practice!.toLowerCase())
      );
    }

    if (filters.createdAfter) {
      entries = entries.filter(entry => entry.createdAt >= filters.createdAfter!);
    }

    if (filters.createdBefore) {
      entries = entries.filter(entry => entry.createdAt <= filters.createdBefore!);
    }

    if (filters.updatedAfter) {
      entries = entries.filter(entry => entry.updatedAt >= filters.updatedAfter!);
    }

    if (filters.updatedBefore) {
      entries = entries.filter(entry => entry.updatedAt <= filters.updatedBefore!);
    }

    // Apply sorting
    entries.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) return orderDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Apply pagination
    return entries.slice(offset, offset + limit);
  }

  /**
   * Get all knowledge management entries
   */
  async getAllKnowledgeEntries(): Promise<KnowledgeManagement[]> {
    return Array.from(this.knowledgeEntries.values());
  }

  /**
   * Get knowledge entries by category
   */
  async getKnowledgeEntriesByCategory(category: KnowledgeCategory): Promise<KnowledgeManagement[]> {
    const entries = await this.getAllKnowledgeEntries();
    return entries.filter(entry => this.categorizeKnowledge(entry.practice) === category);
  }

  /**
   * Get knowledge entries by priority
   */
  async getKnowledgeEntriesByPriority(priority: KnowledgePriority): Promise<KnowledgeManagement[]> {
    const entries = await this.getAllKnowledgeEntries();
    return entries.filter(entry => this.getKnowledgePriority(entry.practice) === priority);
  }

  /**
   * Categorize knowledge based on practice name
   */
  private categorizeKnowledge(practice: string): KnowledgeCategory {
    const practiceLower = practice.toLowerCase();

    if (practiceLower.includes('document') || practiceLower.includes('markdown')) {
      return KnowledgeCategory.DOCUMENTATION;
    }
    if (practiceLower.includes('pattern') || practiceLower.includes('code')) {
      return KnowledgeCategory.CODE_PATTERN;
    }
    if (practiceLower.includes('practice') || practiceLower.includes('best')) {
      return KnowledgeCategory.BEST_PRACTICE;
    }
    if (practiceLower.includes('troubleshoot') || practiceLower.includes('debug')) {
      return KnowledgeCategory.TROUBLESHOOTING;
    }
    if (practiceLower.includes('learn') || practiceLower.includes('resource')) {
      return KnowledgeCategory.LEARNING_RESOURCE;
    }
    if (practiceLower.includes('guideline') || practiceLower.includes('project')) {
      return KnowledgeCategory.PROJECT_GUIDELINE;
    }

    return KnowledgeCategory.DOCUMENTATION; // Default category
  }

  /**
   * Get knowledge priority based on practice
   */
  private getKnowledgePriority(practice: string): KnowledgePriority {
    const practiceLower = practice.toLowerCase();

    // Critical practices
    if (practiceLower.includes('read-only') ||
        practiceLower.includes('never') ||
        practiceLower.includes('avoid')) {
      return KnowledgePriority.CRITICAL;
    }

    // High priority practices
    if (practiceLower.includes('always') ||
        practiceLower.includes('must') ||
        practiceLower.includes('required')) {
      return KnowledgePriority.HIGH;
    }

    // Medium priority practices
    if (practiceLower.includes('should') ||
        practiceLower.includes('recommend')) {
      return KnowledgePriority.MEDIUM;
    }

    // Low priority practices
    return KnowledgePriority.LOW;
  }

  /**
   * Get knowledge statistics
   */
  async getKnowledgeStatistics(): Promise<{
    totalEntries: number;
    byCategory: Record<KnowledgeCategory, number>;
    byPriority: Record<KnowledgePriority, number>;
    recentlyUpdated: KnowledgeManagement[];
  }> {
    const entries = await this.getAllKnowledgeEntries();
    const recentlyUpdated = entries
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 5);

    const byCategory: Record<KnowledgeCategory, number> = {
      [KnowledgeCategory.DOCUMENTATION]: 0,
      [KnowledgeCategory.CODE_PATTERN]: 0,
      [KnowledgeCategory.BEST_PRACTICE]: 0,
      [KnowledgeCategory.TROUBLESHOOTING]: 0,
      [KnowledgeCategory.LEARNING_RESOURCE]: 0,
      [KnowledgeCategory.PROJECT_GUIDELINE]: 0
    };

    const byPriority: Record<KnowledgePriority, number> = {
      [KnowledgePriority.CRITICAL]: 0,
      [KnowledgePriority.HIGH]: 0,
      [KnowledgePriority.MEDIUM]: 0,
      [KnowledgePriority.LOW]: 0
    };

    entries.forEach(entry => {
      const category = this.categorizeKnowledge(entry.practice);
      const priority = this.getKnowledgePriority(entry.practice);

      byCategory[category]++;
      byPriority[priority]++;
    });

    return {
      totalEntries: entries.length,
      byCategory,
      byPriority,
      recentlyUpdated
    };
  }

  /**
   * Validate knowledge entry data
   */
  async validateKnowledgeEntryData(
    data: Partial<CreateKnowledgeManagementData>
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!data.practice || data.practice.trim().length === 0) {
      errors.push('Practice is required');
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (data.practice && data.practice.length > 100) {
      errors.push('Practice name must be 100 characters or less');
    }

    if (data.description && data.description.length > 500) {
      errors.push('Description must be 500 characters or less');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Initialize default knowledge practices
   */
  private initializeDefaultKnowledge(): void {
    DEFAULT_KNOWLEDGE_PRACTICES.forEach(async (practice, index) => {
      const entry = await this.createKnowledgeEntry(practice);
      // Note: In a real implementation, we would store the ID for later reference
    });
  }

  /**
   * Clear all knowledge entries (for testing or reset)
   */
  async clearAllKnowledge(): Promise<void> {
    this.knowledgeEntries.clear();
    this.initializeDefaultKnowledge();
  }
}

// Export singleton instance
export const knowledgeManagementService = new KnowledgeManagementService();