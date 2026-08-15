# Output Validation Rules

## Mandatory Output Format

Every subagent MUST return structured output:

### Required Fields
- `status`: success|partial|failed
- `agent`: agent name
- `task`: task description
- `timestamp`: ISO-8601
- `outputs`: object with primary and secondary outputs
- `validation`: object with validation results

### Validation Requirements

#### Before Return
1. MUST validate all required fields present
2. MUST validate output matches expected schema
3. MUST validate all file paths exist
4. MUST validate no blockers remain unresolved

#### Validation Checklist
- [ ] Status field present and valid
- [ ] Agent name matches current agent
- [ ] Task description present
- [ ] Timestamp present and valid
- [ ] Outputs object present
- [ ] Validation object present with all fields
- [ ] All file paths point to existing files
- [ ] No unresolved blockers

### Invalid Output Handling
1. If validation fails, MUST retry with corrected output
2. If retry fails, MUST return partial output with blockers
3. MUST log validation failure details
4. MUST NOT return invalid output

### Output Storage
- Store outputs in `.opencode/outputs/{agent-name}/`
- Name files: `{task-name}-{timestamp}.json`
- Keep last 10 outputs per agent
- Archive old outputs to cold storage

### Validation
- Every output MUST be validated before return
- Every validation failure MUST be logged
- Every retry MUST be logged
- Invalid outputs MUST NOT be returned
