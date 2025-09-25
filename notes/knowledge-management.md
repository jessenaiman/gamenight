# Knowledge Management System

## Overview

This document outlines the knowledge management system for Game Night Central, providing a structured approach to storing and retrieving project information.

## Memory Bank Structure

### Core Files

- `notes/project-plan.md` - Main project reference and guidelines
- `notes/gamenight-features.md` - Feature documentation and overview
- `notes/tech-stack.md` - Technology stack and dependencies
- `notes/ai-functionality.md` - AI features and implementation notes

### Documentation Sources

- `docs/blueprint.md` - Original project blueprint and requirements
- `docs/data-structures.md` - Database schema and data structure analysis
- `README.md` - Project overview and setup instructions

## Knowledge Categories

### 1. Features & Functionality

- **Pattern**: `notes/feature-name.md`
- **Examples**:
  - `notes/event-calendar.md`
  - `notes/registration-system.md`
  - `notes/admin-dashboard.md`

### 2. Technical Implementation

- **Pattern**: `notes/tech-topic.md`
- **Examples**:
  - `notes/database-setup.md`
  - `notes/authentication.md`
  - `notes/api-integration.md`

### 3. Development Guidelines

- **Pattern**: `notes/dev-topic.md`
- **Examples**:
  - `notes/code-standards.md`
  - `notes/testing-strategy.md`
  - `notes/deployment.md`

### 4. User Experience

- **Pattern**: `notes/ux-topic.md`
- **Examples**:
  - `notes/accessibility.md`
  - `notes/responsive-design.md`
  - `notes/user-flows.md`

## Usage Guidelines

### Creating New Knowledge

1. **Check existing knowledge first**:
   ```bash
   search "topic keyword"
   ```

2. **If not found, create new file**:
   - Use descriptive filename: `notes/descriptive-name.md`
   - Follow standard markdown structure
   - Include related files section

3. **Standard Structure**:
   ```markdown
   # Topic Name

   ## Overview
   Brief description of the topic.

   ## Implementation Details
   Technical details and code examples.

   ## Usage Examples
   How to use this feature or implement this concept.

   ## Related Files
   - `src/components/example.tsx`
   - `src/hooks/useExample.ts`

   ## Notes
   Additional considerations or edge cases.
   ```

### Retrieving Knowledge

1. **Search by keyword**:
   ```bash
   search "keyword"
   ```

2. **Read specific topic**:
   ```bash
   read notes/topic-name.md
   ```

3. **Check related files**:
   - Use file paths listed in "Related Files" sections
   - Cross-reference between different knowledge areas

### Updating Knowledge

1. **Extend existing files** rather than creating duplicates
2. **Update related files sections** when adding new components
3. **Keep information current** with code changes
4. **Use consistent formatting** across all files

## Search Strategies

### Common Search Patterns

- **Feature implementation**: `search "component name"`
- **Technical solutions**: `search "problem description"`
- **Code patterns**: `search "functionality keyword"`
- **Dependencies**: `search "library name"`

### Advanced Search

- Use regex patterns for complex searches
- Search within specific directories
- Combine multiple search terms

## Maintenance

### Regular Tasks

1. **Review and update** knowledge files when making significant changes
2. **Consolidate** duplicate information
3. **Archive** outdated information
4. **Update links** when files are moved or renamed

### Quality Checks

- Ensure all code examples are current
- Verify all file paths are accurate
- Check for broken internal links
- Maintain consistent formatting

## Integration with Development

### Before Starting Work

1. Search for existing implementations
2. Review related knowledge files
3. Check project plan for guidelines

### After Completing Work

1. Document new features or changes
2. Update related knowledge files
3. Add to project plan TOC if significant

### During Development

1. Reference existing patterns
2. Follow established conventions
3. Update documentation as you go

## Tools and Commands

### Essential Commands

- `search "keyword"` - Find content across files
- `read notes/filename.md` - Read specific knowledge file
- `list notes/` - List all knowledge files
- `write notes/new-file.md` - Create new knowledge file

### File Organization

- Keep knowledge files in `notes/` directory
- Use descriptive, searchable filenames
- Group related topics together
- Maintain consistent naming conventions
