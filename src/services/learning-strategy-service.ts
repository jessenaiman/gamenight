import {
  LearningStrategy,
  CreateLearningStrategyData,
  UpdateLearningStrategyData,
  LearningStrategyFilters,
  LearningStrategySearchOptions,
  DEFAULT_LEARNING_STRATEGIES
} from '@/models/learning-strategy';

/**
 * Learning Strategy Service
 *
 * Provides functionality for managing learning strategies and educational approaches
 * for the AI agent to acquire new knowledge and skills.
 */
class LearningStrategyService {
  private learningStrategies: Map<string, LearningStrategy> = new Map();

  constructor() {
    // Initialize with default learning strategies
    this.initializeDefaultStrategies();
  }

  /**
   * Create a new learning strategy
   */
  async createLearningStrategy(
    data: CreateLearningStrategyData
  ): Promise<LearningStrategy> {
    const now = new Date();
    const id = `strategy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const strategy: LearningStrategy = {
      id,
      goal: data.goal,
      steps: data.steps,
      createdAt: now,
      updatedAt: now
    };

    this.learningStrategies.set(id, strategy);
    return strategy;
  }

  /**
   * Get a learning strategy by ID
   */
  async getLearningStrategy(id: string): Promise<LearningStrategy | null> {
    return this.learningStrategies.get(id) || null;
  }

  /**
   * Update a learning strategy
   */
  async updateLearningStrategy(
    id: string,
    data: UpdateLearningStrategyData
  ): Promise<LearningStrategy | null> {
    const existingStrategy = await this.getLearningStrategy(id);
    if (!existingStrategy) return null;

    const updatedStrategy: LearningStrategy = {
      ...existingStrategy,
      ...data,
      updatedAt: new Date()
    };

    this.learningStrategies.set(id, updatedStrategy);
    return updatedStrategy;
  }

  /**
   * Delete a learning strategy
   */
  async deleteLearningStrategy(id: string): Promise<boolean> {
    return this.learningStrategies.delete(id);
  }

  /**
   * Search learning strategies
   */
  async searchLearningStrategies(
    options: LearningStrategySearchOptions = {}
  ): Promise<LearningStrategy[]> {
    const { filters = {}, limit = 50, offset = 0, orderBy = 'createdAt', orderDirection = 'desc' } = options;

    let strategies = Array.from(this.learningStrategies.values());

    // Apply filters
    if (filters.goal) {
      strategies = strategies.filter(strategy =>
        strategy.goal.toLowerCase().includes(filters.goal!.toLowerCase())
      );
    }

    if (filters.createdAfter) {
      strategies = strategies.filter(strategy => strategy.createdAt >= filters.createdAfter!);
    }

    if (filters.createdBefore) {
      strategies = strategies.filter(strategy => strategy.createdAt <= filters.createdBefore!);
    }

    if (filters.updatedAfter) {
      strategies = strategies.filter(strategy => strategy.updatedAt >= filters.updatedAfter!);
    }

    if (filters.updatedBefore) {
      strategies = strategies.filter(strategy => strategy.updatedAt <= filters.updatedBefore!);
    }

    // Apply sorting
    strategies.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) return orderDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Apply pagination
    return strategies.slice(offset, offset + limit);
  }

  /**
   * Get all learning strategies
   */
  async getAllLearningStrategies(): Promise<LearningStrategy[]> {
    return Array.from(this.learningStrategies.values());
  }

  /**
   * Get learning strategy by goal
   */
  async getLearningStrategyByGoal(goal: string): Promise<LearningStrategy | null> {
    const strategies = await this.getAllLearningStrategies();
    return strategies.find(strategy =>
      strategy.goal.toLowerCase() === goal.toLowerCase()
    ) || null;
  }

  /**
   * Get learning strategies by step count
   */
  async getLearningStrategiesByStepCount(minSteps?: number, maxSteps?: number): Promise<LearningStrategy[]> {
    const strategies = await this.getAllLearningStrategies();

    return strategies.filter(strategy => {
      const stepCount = strategy.steps.length;
      const meetsMin = minSteps === undefined || stepCount >= minSteps;
      const meetsMax = maxSteps === undefined || stepCount <= maxSteps;
      return meetsMin && meetsMax;
    });
  }

  /**
   * Get most recently updated learning strategies
   */
  async getRecentlyUpdatedStrategies(limit = 5): Promise<LearningStrategy[]> {
    const strategies = await this.getAllLearningStrategies();
    return strategies
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, limit);
  }

  /**
   * Get learning strategy statistics
   */
  async getLearningStrategyStatistics(): Promise<{
    totalStrategies: number;
    averageSteps: number;
    mostCommonGoals: string[];
    recentlyCreated: LearningStrategy[];
    recentlyUpdated: LearningStrategy[];
  }> {
    const strategies = await this.getAllLearningStrategies();

    if (strategies.length === 0) {
      return {
        totalStrategies: 0,
        averageSteps: 0,
        mostCommonGoals: [],
        recentlyCreated: [],
        recentlyUpdated: []
      };
    }

    const totalSteps = strategies.reduce((sum, strategy) => sum + strategy.steps.length, 0);
    const averageSteps = totalSteps / strategies.length;

    // Count goal frequency
    const goalCounts = new Map<string, number>();
    strategies.forEach(strategy => {
      const count = goalCounts.get(strategy.goal) || 0;
      goalCounts.set(strategy.goal, count + 1);
    });

    const mostCommonGoals = Array.from(goalCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([goal]) => goal);

    const recentlyCreated = strategies
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    const recentlyUpdated = strategies
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 5);

    return {
      totalStrategies: strategies.length,
      averageSteps,
      mostCommonGoals,
      recentlyCreated,
      recentlyUpdated
    };
  }

  /**
   * Validate learning strategy data
   */
  async validateLearningStrategyData(
    data: Partial<CreateLearningStrategyData>
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!data.goal || data.goal.trim().length === 0) {
      errors.push('Goal is required');
    }

    if (data.goal && data.goal.length > 200) {
      errors.push('Goal must be 200 characters or less');
    }

    if (!data.steps || data.steps.length === 0) {
      errors.push('At least one step is required');
    }

    if (data.steps && data.steps.length > 20) {
      errors.push('Maximum 20 steps allowed');
    }

    if (data.steps) {
      data.steps.forEach((step, index) => {
        if (!step || step.trim().length === 0) {
          errors.push(`Step ${index + 1} is required`);
        }
        if (step && step.length > 300) {
          errors.push(`Step ${index + 1} must be 300 characters or less`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get recommended learning strategy for a topic
   */
  async getRecommendedStrategy(topic: string): Promise<LearningStrategy | null> {
    const strategies = await this.getAllLearningStrategies();

    // Find strategies that match the topic
    const matchingStrategies = strategies.filter(strategy =>
      strategy.goal.toLowerCase().includes(topic.toLowerCase()) ||
      strategy.steps.some(step => step.toLowerCase().includes(topic.toLowerCase()))
    );

    // Return the most recently updated matching strategy
    if (matchingStrategies.length > 0) {
      return matchingStrategies.sort((a, b) =>
        b.updatedAt.getTime() - a.updatedAt.getTime()
      )[0];
    }

    // If no specific match, return a general learning strategy
    const generalStrategies = strategies.filter(strategy =>
      strategy.goal.toLowerCase().includes('learn') ||
      strategy.goal.toLowerCase().includes('understand')
    );

    if (generalStrategies.length > 0) {
      return generalStrategies[0];
    }

    // Fallback to first available strategy
    return strategies[0] || null;
  }

  /**
   * Initialize default learning strategies
   */
  private initializeDefaultStrategies(): void {
    DEFAULT_LEARNING_STRATEGIES.forEach(async (strategy, index) => {
      const entry = await this.createLearningStrategy(strategy);
      // Note: In a real implementation, we would store the ID for later reference
    });
  }

  /**
   * Clear all learning strategies (for testing or reset)
   */
  async clearAllStrategies(): Promise<void> {
    this.learningStrategies.clear();
    this.initializeDefaultStrategies();
  }
}

// Export singleton instance
export const learningStrategyService = new LearningStrategyService();