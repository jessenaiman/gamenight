# 📄 Project Plan Template (VS Code + AI Agent)

> _This document serves as a reference guide for the AI agent to understand the project context, navigate files, manage knowledge, and execute tasks efficiently without requiring real-time scanning._

---

## 🔹 Table of Contents (TOC) – Top 3 Relevant Topics

_(Use this section to quickly locate high-level topics)_

1. [Project Start & Tech Stack](#project-start--tech-stack)
2. [Top 5 Commands](#top-5-commands)
3. [File Tree Structure](#file-tree-structure)
4. [Learning Strategy](#learning-strategy)
5. [Knowledge Management with Markdown](#knowledge-management-with-markdown)

---

## 🚀 Project Start & Tech Stack

### Frameworks & Libraries

- **Tailwind CSS** → Used via `@tailwind` directives (`@include`)
- **Shadcn UI** → Pre-built React components (installed, read-only)
- **React** → Frontend framework used throughout

> ✅ All components are imported from `@radix-ui/react-*` or `@headlessui/react` via shadcn’s wrapper.
> ⚠️ Shadcn components are **read-only**; avoid modifying source files.

---

## 🔧 Top 5 Commands [TODO: update with actual tool calls]

The AI agent should prioritize these actions:

| Command  | Purpose                                              |
| -------- | ---------------------------------------------------- |
| `search` | Find content across files using keywords or patterns |
| `read`   | Read file contents (e.g., `.ts`, `.tsx`, `.md`)      |
| `write`  | Modify or create new files (with caution)            |
| `save`   | Save changes after editing                           |
| `list`   | List directory contents or available files           |

> 💡 Use `search` first before writing — always check if content already exists.

---

## 📁 File Tree Structure

[Complete]

> 📌 The AI agent must respect read-only directories like `src/components/ui`.

---

## 🧠 Learning Strategy

### Goal: Learn `<Topic>` for `<Task>`

When tasked with learning a new concept or completing a task:

1. **Create a markdown note**:
   - Use filename pattern: `notes/<topic>.md`
   - Example: `notes/forms-validation.md`

2. **Search for existing knowledge**:

   ```bash
   search "forms validation"
   ```

   - If found, **read** and extend it.
   - If not found, **create** new note.

3. **Read TOC to find relevant sections**:
   - Use the table of contents at the top of the project plan or in `README.md` to navigate.

4. **Update TOC when adding new topics**:
   - Add entries under "Table of Contents" if the topic is significant.

> ✅ Always follow the principle: **Don’t duplicate**. Reuse or extend existing knowledge.

---

## 📝 Knowledge Management with Markdown

### How to Store & Retrieve Knowledge

#### ✅ Create New Knowledge

```markdown
# <Topic>

## Overview

Brief description of the topic.

## Usage Examples

Code snippets or usage patterns.

## Related Files

- `src/components/form.tsx`
- `src/hooks/useForm.ts`
```

#### 🔍 Retrieve Knowledge

- Use `search "<keyword>"` to locate related files.
- Use `read notes/<topic>.md` to load stored knowledge.
- Use `read README.md` to review project overview and TOC.

#### 🔄 Update Knowledge

- Append to existing `.md` files instead of creating duplicates.
- Ensure consistency in naming and formatting.

> 🛠️ Tip: Use `#` and `##` headers consistently so TOC can be auto-generated.

---

## 🧩 Next Steps for AI Agent

1. **On startup**: Load `README.md` and this plan to establish context.
2. **Before any task**: Search for existing notes or code.
3. **After learning**: Write a markdown note and update TOC if needed.
4. **Always verify**: Confirm whether a file is read-only before attempting to write.

---

> ✅ This template ensures the AI agent operates with full awareness of the project’s scope, tools, and knowledge system — reducing redundant work and improving accuracy.
