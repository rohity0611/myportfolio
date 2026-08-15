# Memory & Knowledge Capture

Claude-mem provides persistent memory across sessions. Observations, summaries, and context are stored in a local SQLite database with ChromaDB vector search.

## When to Use Memory

- Before making decisions — search for past decisions on the same topic
- When debugging — search for past fixes to similar issues
- When implementing — search for past patterns and conventions
- When answering questions about the project — search for context
- At session start — recent context is injected automatically

## Memory Tools

### Search memory
```
mem-search(query: "what to search for", limit: 10)
```

### Get chronological context around an observation
```
mem-timeline(anchor: observation_id, depth_before: 3, depth_after: 3)
```

### Get full observation details by IDs
```
mem-get-observations(ids: [id1, id2, id3])
```

## Memory Types Stored

| Type | When Captured | Example |
|------|---------------|---------|
| **Tool observations** | Every tool call | File reads, edits, searches |
| **Session summaries** | On session idle | What happened in the session |
| **Decisions** | From conversation | Architecture choices, trade-offs |
| **Bug fixes** | From conversation | What was broken, how it was fixed |

## Best Practices

- Search before answering questions about past decisions
- Use specific queries — vague searches return noise
- Check observation IDs before fetching full details
- Don't search for secrets, credentials, or sensitive data
- Memory context is injected automatically into new sessions — no manual action needed
