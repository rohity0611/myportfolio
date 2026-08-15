---
name: review-pipeline
description: "Use when verifying implementations through multi-pass review pipeline"
risk: medium
source: factory
date_added: "2026-07-22"
---

# Review Pipeline Skill

Multi-pass review pipeline for comprehensive verification.

## When to Use
- After implementation completion
- Before phase transition
- When validating critical outputs
- When checking for quality issues

## Pipeline Protocol

### Pass 1: Spec Compliance (spec-reviewer)
- Did the implementation match the spec?
- Are all requirements met?
- Is anything extra that wasn't requested?

### Pass 2: Code Quality (code-standards-agent)
- Is the code well-structured?
- Are naming conventions followed?
- Is complexity manageable?

### Pass 3: Security (security-reviewer)
- Are there vulnerabilities?
- Is auth correct?
- Are secrets managed?

### Pass 4: Integration (resilience-hardener)
- Does it work with existing code?
- Are error paths handled?
- Will it scale?

## Pipeline Rules

### Pass 1 Failure → STOP
- Fix before continuing
- Re-run pass 1 after fix

### Pass 2 Failure → Fix, Re-run
- Fix quality issues
- Re-run pass 2 only

### Pass 3 Failure → STOP
- Fix before continuing
- Re-run pass 3 after fix

### Pass 4 Failure → Fix, Re-run
- Fix integration issues
- Re-run pass 4 only

## Execution Protocol

### 1. Prepare Review
- Gather implementation output
- Gather spec/requirements
- Prepare review context

### 2. Execute Pass 1: Spec Compliance
- Dispatch spec-reviewer agent
- Check requirements compliance
- Record findings

### 3. Execute Pass 2: Code Quality
- Dispatch code-standards-agent
- Check code quality
- Record findings

### 4. Execute Pass 3: Security
- Dispatch security-reviewer agent
- Check security
- Record findings

### 5. Execute Pass 4: Integration
- Dispatch resilience-hardener agent
- Check integration
- Record findings

### 6. Synthesize Results
- Combine all findings
- Prioritize issues
- Generate report

## Output Format

```json
{
  "pipelineId": "unique-pipeline-id",
  "timestamp": "ISO-8601",
  "passes": [
    {
      "pass": 1,
      "name": "Spec Compliance",
      "status": "passed|failed",
      "findings": [],
      "agent": "spec-reviewer"
    },
    {
      "pass": 2,
      "name": "Code Quality",
      "status": "passed|failed",
      "findings": [],
      "agent": "code-standards-agent"
    },
    {
      "pass": 3,
      "name": "Security",
      "status": "passed|failed",
      "findings": [],
      "agent": "security-reviewer"
    },
    {
      "pass": 4,
      "name": "Integration",
      "status": "passed|failed",
      "findings": [],
      "agent": "resilience-hardener"
    }
  ],
  "summary": {
    "totalFindings": 0,
    "criticalFindings": 0,
    "overallStatus": "passed|failed"
  }
}
```

## Usage

When verifying implementations:
1. Prepare review context
2. Execute pass 1: spec compliance
3. If pass 1 fails, STOP and fix
4. Execute pass 2: code quality
5. If pass 2 fails, fix and re-run pass 2
6. Execute pass 3: security
7. If pass 3 fails, STOP and fix
8. Execute pass 4: integration
9. If pass 4 fails, fix and re-run pass 4
10. Synthesize results
