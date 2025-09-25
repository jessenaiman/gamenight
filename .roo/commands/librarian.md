---
description: Research and document topics using Context7 and memory bank tools
---

# Librarian Command

## LLM Instructions

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

5. **Cite & Validate:**  
    - Add timestamp and source citations for future updates.

**Notes:**  

- Focus on actionable, compatible info.  
- Update docs for new versions or practices.

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
