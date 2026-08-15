---
name: output-validation
description: "Use when validating subagent outputs to ensure structured and correct results"
risk: low
source: factory
date_added: "2026-07-22"
---

# Output Validation Skill

Ensure all subagent outputs are structured and valid.

## When to Use
- Subagent completes task
- Before returning output to parent agent
- Before phase transition
- When validating file outputs

## Required Output Format

Every subagent MUST return output in this format:

```json
{
  "status": "success|partial|failed",
  "agent": "agent-name",
  "task": "task-description",
  "timestamp": "ISO-8601",
  "duration": "elapsed time",
  "outputs": {
    "primary": {
      "type": "file|text|data",
      "path": "file path if applicable",
      "content": "content if applicable"
    },
    "secondary": []
  },
  "metadata": {
    "files_created": [],
    "files_modified": [],
    "decisions_made": [],
    "blockers": []
  },
  "validation": {
    "schema_valid": true,
    "required_fields_present": true,
    "outputs_complete": true
  }
}
```

## Validation Rules

### Before Return
1. Validate all required fields are present
2. Validate output matches expected schema
3. Validate all file paths exist
4. Validate no blockers remain unresolved

### Validation Checklist
- [ ] Status field present and valid
- [ ] Agent name matches current agent
- [ ] Task description present
- [ ] Timestamp present and valid
- [ ] Outputs object present
- [ ] Validation object present with all fields
- [ ] All file paths point to existing files
- [ ] No unresolved blockers

### Invalid Output Handling
1. If validation fails, retry with corrected output
2. If retry fails, return partial output with blockers
3. Log validation failure details
4. Do not return invalid output

## Output Storage
- Store outputs in `.opencode/outputs/{agent-name}/`
- Name files: `{task-name}-{timestamp}.json`
- Keep last 10 outputs per agent
- Archive old outputs to cold storage
