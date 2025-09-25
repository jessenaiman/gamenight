# 📄 Project Plan Template (VS Code + AI Agent)

> *This document serves as a reference guide for the AI agent to understand the project context, navigate files, manage knowledge, and execute tasks efficiently without requiring real-time scanning.*

---


---

## 📁 File Tree Structure

[Complete]

> 📌 The AI agent must respect read-only directories like `src/components/ui`.

---

## 🧠 Learning Strategy

### Goal: Learn `<Topic>` for `<Task>`

When tasked with learning a new concept or completing a task:

1. **Check Memory Bank:**  
    - Search `notes/` for the topic.  
    - If found, return the match and suggest an update if outdated.

2. **Context7 Research:**  
    - Use Context7 MCP for official docs, best practices, usage, version info, and code examples.  
    - Prefer trusted sources.

3. **Advanced Tools (if needed):**  
    - Use web search, MCP server tools, or repo analysis for extra info.

4. **Document & Save:**  
    - Summarize findings: key info, best practices, code, version notes, sources.  
    - Save new/contradictory info to `notes/` with a clear filename.
    - MUST HAVE Table of Contents linking to the headers within the file 
    - Add timestamp
    - use XML and markdown
    - KISS and simplify context and prose to staments like that relevant and useful 

3. **Read TOC to find relevant sections**:
   - Use the table of contents at the top of the project plan or in `README.md` to navigate.

4. **Update TOC when adding new topics**:
   - Add entries under "Table of Contents" if the topic is significant.

> ✅ Always follow the principle: **Don’t duplicate**. Reuse or extend existing knowledge.

---

### How to Store & Retrieve Knowledge

#### ✅ Create New Knowledge Example

<CreateNew>
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
</CreateNew>

#### 🔍 Retrieve Knowledge
- Use `search "<keyword>"` to locate related files.
- Use `read notes/<topic>.md` to load stored knowledge.
- Use `read README.md` to review project overview and TOC.

#### 🔄 Update Knowledge
- Append to existing `.md` files instead of creating duplicates.
- Ensure consistency in naming and formatting.

> 🛠️ Tip: Use `#` and `##` headers consistently so TOC can be auto-generated.

---

---

> ✅ This template ensures the AI agent operates with full awareness of the project’s scope, tools, and knowledge system — reducing redundant work and improving accuracy.
